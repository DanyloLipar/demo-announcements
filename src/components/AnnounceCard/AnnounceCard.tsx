import React, { useState } from "react";
import './AnnounceCard.scss';
import classNames from "classnames";
import { Announcement } from "../../types/Announcement";
import { CloseArrow } from "../../icons/CloseArrow";
import { OpenedArrow } from "../../icons/OpenedArrow";

type Props = {
    announcement: Announcement;
    wholeAnnouncements: Announcement[];
    deleting: boolean;
    setAnnouncement: (el: Announcement[]) => void;
    announcementsTwo: Announcement[];
}

export const AnnounceCard: React.FC<Props> = ({
    announcement,
    wholeAnnouncements,
    deleting,
    setAnnouncement,
    announcementsTwo
}) => {
    const [openedArrow, setOpenedArrow] = useState(false);
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [confimCheck, setConfirmCheck] = useState(false);

    const removing = () => {
        localStorage.setItem('Announce', JSON.stringify(announcementsTwo.filter(el => el.title !== announcement.title)));
        setAnnouncement(JSON.parse(localStorage.getItem('Announce') || ''))

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
        if (date) {
            announcement.date = date;
            setModal(!modal);
            setConfirmCheck(false);
        }
        if (!title && !description && !date) {
            setConfirmCheck(!confimCheck);
        }

        event.preventDefault();
    }

    return (
        <div className="announcement">
            <div id="myModal" className={classNames({
                "modal": !modal,
                "modal-on": modal,
            })}>
                <form
                    className="content"
                    onSubmit={editor}
                >
                    <div className='content__form form'>
                        <label className='form__name'>
                            Title:
                            <input
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                        </label>
                        <label >
                            Date:
                            <input
                                onChange={(event) => {
                                    setDate(event.target.value)
                                }}
                            />
                        </label>

                        <textarea
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
                <div className="announcement__info">
                    <p>{announcement.description}</p>
                    <p>{announcement.date}</p>
                </div>
            )}
        </div>
    )
}