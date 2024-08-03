import React from "react";

const SideBarVideoCard = ({ info }) => {
    // console.log(info);

    if (info.length === 0) {
        return <div>Loading...</div>;
    }

    const { snippet, statistics } = info;

    const { channelTitle, thumbnails, title } = snippet;
    return (
        <div className="shadow-sm">
            <div className="h-auto pt-5 flex m-1 w-full">
                <img
                    className="rounded-lg min-w-44 h-28"
                    src={thumbnails.high.url}
                    alt="videoimg"
                />
                <ul className="px-3 pr-10">
                    <li className="font-bold m-2 mx-0 text-sm">{title}</li>
                    <li className="text-sm">{channelTitle}</li>
                    <li className="text-sm">{statistics.viewCount}</li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarVideoCard;
