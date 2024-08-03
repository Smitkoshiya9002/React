import React, { useEffect, useState } from "react";
import { YOUTUBE_API_VIDEOS } from "../utils/contants";
import VideoCard, { Advideocard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_API_VIDEOS);
        const json = await data.json();
        setVideos(json.items);
    };

    return (
        <div className="flex flex-wrap justify-evenly">
            {videos[0] && <Advideocard info={videos[0]} />}
            {videos.map((v) => (
                <Link key={v.id} to={"/watch?v=" + v.id}>
                    <VideoCard info={v} />
                </Link>
            ))}
        </div>
    );
};

export default VideoContainer;
