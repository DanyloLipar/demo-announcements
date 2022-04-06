import React, { useState, useEffect } from 'react';
import { Announcement } from './types/Announcement';
import { AnnounceList } from './components/AnnounceList';
import { NewAnnouncement } from './components/NewAnnouncement';
import allAnnounce from './api/api.json';
import './App.scss';
import { Search } from './icons/Search';

export const App = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    localStorage.setItem("Announce", JSON.stringify(allAnnounce));
  }, [])

  const showAnnounce = (announce: Announcement[]) => {
    setAnnouncements(announce);
  };

  const addAnnounce = (announce: Announcement) => {
    const newList = [...announcements, announce];
    setAnnouncements(newList);
    localStorage.setItem('Announce', JSON.stringify(newList));
  }

  const showedAnnouncements = announcements
    .filter(announce => announce.title.toLowerCase().includes(query.toLowerCase()));


  return (
    <div className="app">
      {openList && (<NewAnnouncement
        addAnnounce={addAnnounce}
        announcements={announcements}
      />)}
      <div className="app__buttons buttons">
        <div className="buttons__items">
          {openList ? (
            <button
              onClick={() => {
                setOpenList(!openList);
                setAnnouncements([]);
                setDeleting(false);
              }}
            >
              Close list of announcements
            </button>) : (
            <button
              onClick={() => {
                showAnnounce(JSON.parse(localStorage.getItem('Announce') || ''));
                setOpenList(!openList);
              }}
            >
              Show my list of announcements
            </button>
          )}
        </div>
        <div className="buttons__remove remove">
          <div className="remove__inp">
            <div className="remove__inp-search">
              <label htmlFor="search-annnounce">
                {openList && (
                  <Search />)}
                {openList && (
                  <input
                    id='search-annnounce'
                    onChange={event => setQuery(event.currentTarget.value)}
                  />
                )}
              </label>
            </div>
            <div className="remove__inp-on">
              {openList && (
                <button
                  onClick={() => {
                    setDeleting(true);
                  }}
                >Delete</button>)}
              {deleting && (<button
                onClick={() => {
                  setDeleting(false)
                }}
              >Cancel deleting</button>)}
            </div>
          </div>
        </div>
      </div>
      <div className='app__list'>
        <AnnounceList
          setAnnouncement={setAnnouncements}
          deleting={deleting}
          announcements={showedAnnouncements}
          announcementsTwo={announcements}
        />
      </div>
    </div>
  );
}
