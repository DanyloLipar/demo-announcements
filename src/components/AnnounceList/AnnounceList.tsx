import React from "react";
import './AnnounceList.scss';
import { AnnounceCard } from "../AnnounceCard";
import { Announcement } from "../../types/Announcement";


type Props = {
    announcements: Announcement[];
    announcementsTwo: Announcement[];
    deleting: boolean;
    setAnnouncement: (el: Announcement[]) => void;
};

export const AnnounceList: React.FC<Props> = ({
    announcements,
    deleting,
    setAnnouncement,
    announcementsTwo
}) => {

    return (
        <>
            <ul className="list">
                {announcements.map(announcement => (
                    <li
                        key={announcement.title}
                        className="list__item"
                    >
                        <AnnounceCard
                            announcementsTwo={announcementsTwo}
                            wholeAnnouncements={announcements}
                            announcement={announcement}
                            deleting={deleting}
                            setAnnouncement={setAnnouncement}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};