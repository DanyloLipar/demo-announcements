import React, { useState } from "react";
import classNames from "classnames";
import './NewAnnouncement.scss';
import { Announcement } from "../../types/Announcement";

type Props = {
    addAnnounce: (announce: Announcement) => void,
    announcements: Announcement[],
};

export const NewAnnouncement: React.FC<Props> = ({
    addAnnounce,
    announcements,
}) => {
    const [modal, setModal] = useState(false);
    const id = announcements.length + 1;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');;
    const [date, setDate] = useState('');
    const [titleCheck, setTitleCheck] = useState(false);
    const [descriptionCheck, setDescriptionCheck] = useState(false);
    const [dateCheck, setDateCheck] = useState(false);

    const attachAnnounce = () => {
        setModal(!modal);
        document.body.style.overflow = "hidden";
    }

    const clear = () => {
        setTitle('');
        setDescription('');
        setDate('');
    }

    const closerModal = (event: React.FormEvent) => {
        event.preventDefault();
        setModal(!modal);
        setDateCheck(false);
        setTitleCheck(false);
        setDescriptionCheck(false);
        document.body.style.overflow = "visible";
        clear();
    }

    const inputError = () => {
        if (title === '') {
            setTitleCheck(true);
        }

        if (description === '') {
            setDescriptionCheck(true);
        }
        if (date === '') {
            setDateCheck(true);
        }
    };

    const onAdd = (event: React.FormEvent) => {
        event.preventDefault();
        const newAnnouncement: Announcement = {
            id,
            title,
            description,
            date,
        };

        inputError();

        if (title && description && date) {
            addAnnounce(newAnnouncement);
            closerModal(event);
            clear();
        }
    };

    return (
        <>
            <div id="myModal" className={classNames({
                "modal": !modal,
                "modal-on": modal,
            })}>
                <form
                    className="content"
                    onSubmit={onAdd}
                >
                    <div className='content__form form'>
                        <label className='form__name'>
                            Title:
                            <input
                                value={title}
                                className={classNames({
                                    'red': titleCheck,
                                })}
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
                                className={classNames({
                                    'red': dateCheck,
                                })}
                            />
                        </label>

                        <textarea
                            value={description}
                            placeholder='Description'
                            className={classNames({
                                'red': descriptionCheck,
                            })}
                            onChange={(event) => {
                                setDescription(event.target.value)
                            }}
                        />
                        <div className='form__btn'>
                            <button
                                type="submit"
                            >
                                Add
                            </button>
                            <button
                                type='button'
                                onClick={closerModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <button
                type="button"
                className="adder"
                onClick={() => {
                    attachAnnounce();
                }}
            >Add</button>
        </>
    )
}