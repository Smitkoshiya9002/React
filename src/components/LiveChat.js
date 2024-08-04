import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, genrateRandomString } from "../utils/helper";
const LiveChat = () => {
    const [livemessage, setlivemessage] = useState("");

    const dispatch = useDispatch();

    const chatMessage = useSelector((store) => store.chat.fmessage);

    useEffect(() => {
        const i = setInterval(() => {
            console.log("Api Polling.");

            
            dispatch(
                addMessage({
                    name: generateRandomName(),
                    message: genrateRandomString(20),
                })
            );
        }, 2000);

        return () => clearInterval(i);
    }, []);

    

    return (
        <>
            <div className="mt-5 flex m-1 w-full shadow-lg relative right-2 border border-black rounded-lg h-[500px] flex-col-reverse overflow-scroll">
                {chatMessage.map((c, index) => (
                    <ChatMessage
                        key={index}
                        name={c.name}
                        message={c.message}
                    />
                ))}
            </div>
            <form
                className="border border-black ml-1 p-1 relative right-2 rounded-md"
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("on form submit " + livemessage);

                    dispatch(
                        addMessage({
                            name: "Smit koshiya",
                            message: livemessage,
                        })
                    );
                    setlivemessage("");
                }}
            >
                <input
                    type="text"
                    className="w-[390px] mx-2 rounded-md border-none"
                    placeholder="Enter Live Chat"
                    value={livemessage}
                    onChange={(e) => {
                        setlivemessage(e.target.value);
                    }}
                />
                <button className="bg-gray-200 rounded-lg p-1 font-bold">
                    Submit
                </button>
            </form>
        </>
    );
};

export default LiveChat;
