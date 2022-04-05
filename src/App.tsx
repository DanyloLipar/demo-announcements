import React, { useState } from 'react';
import { Announcement } from './types/Announcement';
import { AnnounceList } from './components/AnnounceList';
import { NewAnnouncement } from './components/NewAnnouncement';
import allAnnounce from './api/api.json';
import './App.scss';

export const App = () => {
  localStorage.setItem('Announce', JSON.stringify(allAnnounce));
  const getAnnounce = JSON.parse(localStorage.getItem('Announce') || '');
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [deleting, setDeleting] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [query, setQuery] = useState('');
  const search: string = require("./icons/searching.svg").default;

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
      <NewAnnouncement
        addAnnounce={addAnnounce}
        announcements={announcements}
      />
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
                showAnnounce(getAnnounce);
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
              <label>
                {openList && (
                  <input
                    onChange={event => setQuery(event.currentTarget.value)}
                  />
                )}
                {openList && (<img
                  src={search}
                  alt="search"
                />)}
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
