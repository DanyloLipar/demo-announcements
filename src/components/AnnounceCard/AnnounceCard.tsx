import React, { useState } from "react";
import './AnnounceCard.scss';
import classNames from "classnames";
import { Announcement } from "../../types/Announcement";
import { CloseArrow } from "../../icons/CloseArrow";
import { OpenedArrow } from "../../icons/OpenedArrow";

type Props = {
    announcement: Announcement;
    deleting: boolean;
    setAnnouncement: (el: Announcement[]) => void;
    announcementsTwo: Announcement[];
}

export const AnnounceCard: React.FC<Props> = ({
    announcement,
    deleting,
    setAnnouncement,
    announcementsTwo,
}) => {
    const [modal, setModal] = useState(false);
    const [openedArrow, setOpenedArrow] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [confimCheck, setConfirmCheck] = useState(false);
    const titleArray = announcement.title.split(' ').map(el => el.trim());
    const descArray = announcement.description.split(' ').map(el => el.trim());
    const similarAnnouncements = announcementsTwo.filter(announce => {
        if (announce.id === announcement.id) {
            return false;
        }
        const arrayTitle = announce.title.split(' ').map(el => el.trim());
        const arrayDesc = announce.description.split(' ').map(el => el.trim());
        if (titleArray.some(item => arrayTitle.includes(item.trim()))) {
            return true;
        }
        if (descArray.some(item => arrayDesc.includes(item.trim()))) {
            return true;
        }
    })


    const removing = () => {
        localStorage.setItem('Announce', JSON.stringify(announcementsTwo.filter(el => el.title !== announcement.title)));
        setAnnouncement(JSON.parse(localStorage.getItem('Announce') || ''))

    }

    const clear = () => {
        setTitle('');
        setDescription('');
        setDate('');
    }

    const editor = (event: React.FormEvent) => {
        if (title) {
            announcement.title = title;
            setModal(!modal);
            setConfirmCheck(false);
        }
        if (description) {
            announcement.description = description;
            setModal(!modal);
            setConfirmCheck(false);
        }
        if (!title && !description && !date) {
            setConfirmCheck(!confimCheck);
        }

        clear();
        event.preventDefault();
    }

    return (
        <div
            className="announcement"
            id={String(announcement.id)}
        >
            <div id="myModal" className={classNames({
                "modal": !modal,
                "modal-edit": modal,
            })}>
                <form
                    className="content"
                    onSubmit={editor}
                >
                    <div className='content__form form'>
                        <label className='form__name'>
                            Title:
                            <input
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                        </label>
                        <label >
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(event) => {
                                    setDate(event.target.value)
                                }}
                            />
                        </label>

                        <textarea
                            value={description}
                            placeholder='Description'
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                        />
                        <div className='form__btn'>
                            <button
                                type="submit"
                                className={classNames({
                                    "red": confimCheck,
                                })}
                            >
                                Confirm
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    setModal(!modal);
                                    setConfirmCheck(false);
                                    clear();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="announcement__head">
                <div className="announcement__head-txt">
                    <h3>{announcement.title}</h3>
                    <div className="btn">
                        <button
                            className="btn__edit"
                            onClick={() => setModal(!modal)}
                        >
                            Edit
                        </button>
                        {deleting && (<button
                            className="btn__cancel"
                            onClick={removing}
                        >Remove</button>)}
                    </div>
                </div>
                {openedArrow ?
                    (
                        <button
                            className="announcement__head-arrow"
                            onClick={() => setOpenedArrow(!openedArrow)}
                        >
                            <OpenedArrow />
                        </button>
                    ) : (
                        <button
                            className="announcement__head-arrow"
                            onClick={() => setOpenedArrow(!openedArrow)}
                        >
                            <CloseArrow />
                        </button>
                    )}
            </div>
            {openedArrow && (
                <div className="announcement__info general">
                    <p>{announcement.description}</p>
                    <p>{announcement.date}</p>
                    <p className="general__head">Similar events:</p>
                    <ul className="general__list">
                        {similarAnnouncements.splice(0, 3).map(announce => (
                            <li
                                key={announce.title}
                                className="general__list-content"
                            >
                                <a href={`#${announce.id}`}>{announce.title}</a>
                                <p>{announcement.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}