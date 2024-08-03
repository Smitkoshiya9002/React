import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_API_VIDEOS } from "../utils/contants";
import SideBarVideoCard from "./SideBarVideoCard";
import Comment from "./Comment";
import LiveChat from "./LiveChat";

const WatchPage = () => {
    const dispatch = useDispatch();
    const [videos, setVideos] = useState([]);
    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("v"));

    useEffect(() => {
        dispatch(closeMenu());
        getVideos();
    }, []);

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_API_VIDEOS);
        const json = await data.json();
        setVideos(json.items);
    };

    if (videos.length === 0) {
        return <div>Loading...</div>;
    }

    const selectedVideo = videos.find(
        (video) => video.id === searchParams.get("v")
    );

    const { snippet, statistics } = selectedVideo;
    const { channelTitle, title, publishedAt } = snippet;
    return (
        <div className="flex">
            <div className="pl-20 pt-5 pr-5 rounded-lg">
                <iframe
                    className="rounded-3xl"
                    width="850"
                    height="500"
                    src={
                        "https://www.youtube.com/embed/" + searchParams.get("v")
                    }
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
                <p className="py-2 font-bold text-2xl px-2">{title}</p>
                <span className="px-2 font-bold bg-gray-400 rounded-lg w-auto p-1">
                    {channelTitle}
                </span>
                <div className="flex py-2 justify-between">
                    <p className="px-2 font-semibold">
                        Total View : {statistics.viewCount}
                    </p>
                    <p className="px-2 font-medium">
                        Upload Date : {publishedAt}
                    </p>
                </div>
                <div>
                    <Comment />
                </div>
            </div>
            <div>
                <div>
                    <LiveChat />
                </div>
                <div className="shadow-md overflow-scroll">
                    {videos.map((video) => (
                        <SideBarVideoCard info={video} key={video.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchPage;
