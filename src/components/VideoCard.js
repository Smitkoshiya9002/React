import React from "react";

const VideoCard = ({ info }) => {
    if (!info) {
        return <div>Loading...</div>;
    }

    // console.log(info);

    const { snippet, statistics } = info;

    const { channelTitle, thumbnails, title } = snippet;

    return (
        <div className="m-2 p-2 w-80 shadow-sm">
            <img
                className="rounded-lg"
                src={thumbnails.medium.url}
                alt="videoimg"
            />
            <ul>
                <li className="font-bold m-2 mx-0">{title}</li>
                <li className="text-sm">{channelTitle}</li>
                <li className="text-sm">{statistics.viewCount}</li>
            </ul>
        </div>
    );
};

export const Advideocard = ({ info }) => {
    return (
        <div className="border border-black">
            <VideoCard info={info} />
        </div>
    );
};

export default VideoCard;
