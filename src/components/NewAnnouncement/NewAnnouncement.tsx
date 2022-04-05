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

    const closerModal = (event: React.FormEvent) => {
        event.preventDefault();
        setModal(!modal);
        setDateCheck(false);
        setTitleCheck(false);
        setDescriptionCheck(false);
        document.body.style.overflow = "visible";
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
            title,
            description,
            date,
        };

        inputError();

        if (title && description && date) {
            addAnnounce(newAnnouncement);
            closerModal(event);
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
                                onChange={(event) => {
                                    setDate(event.target.value)
                                }}
                                className={classNames({
                                    'red': dateCheck,
                                })}
                            />
                        </label>

                        <textarea
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
                                Add Product
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
                onClick={attachAnnounce}
            >Add</button>
        </>
    )
}