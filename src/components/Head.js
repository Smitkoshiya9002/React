import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
    const [searchquery, setseachquery] = useState("");
    const [searchSuggestion, setSearchSuggestion] = useState([]);
    const [showSuggestion, setShowSuggestion] = useState(false);

    const searchcache = useSelector((store) => store.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchcache[searchquery]) {
                setSearchSuggestion(searchcache[searchquery]);
            } else {
                getSearchSuggestion();
            }
        }, 200);

        return () => {
            clearTimeout(timer);
        };
    }, [searchquery]);

    const getSearchSuggestion = async () => {
        console.log("API CALL = " + searchquery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchquery);
        const json = await data.json();
        setSearchSuggestion(json[1]);
        // console.log(searchSuggestion);
        dispatch(
            cacheResults({
                [searchquery]: json[1],
                // iphone: [1, 2, 3],
            })
        );
    };

    const dispatch = useDispatch();

    const toggleMunuHandler = () => {
        dispatch(toggleMenu());
    };
    return (
        <div className="grid grid-flow-col p-4 m-2 shadow-lg">
            <div className="flex col-span-1">
                <img
                    onClick={() => toggleMunuHandler()}
                    className="h-6 mx-1 my-0.5 cursor-pointer"
                    alt="menu"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAUVBMVEX///8AAADc3NxhYWGcnJz4+PhFRUXq6upmZmbk5OR2dnZKSkp9fX3Z2dk+Pj7n5+dwcHDOzs5PT09JSUmsrKxaWlqlpaWPj4+5ubmWlpaOjo50viuFAAABtklEQVR4nO3d2U7DMBAF0EADlLJ0YSnw/x+KKKp4chKRkaZ2zvmCe5XIqa0m03UAAAAAAAAAi3Zzf12j+5uJ9frnq1o99xNK9tkpZ+rHCh6yE852GC54m50vwO1QwU12uhCbcsGn7GxBnooNX7KjBXkoFbzLThbmrtDwNTtYmNdCw8fsYGEeCw3X2cHCrBfbsP27tP2VZpsdLEzpadE9ZCcLUnziL+BXWyNrTWmdOWl+99R1b9n5ZnsbLth179kJZ3ofK7iAk6iTbfbB4L9sJ7YDAAAAAAAAAACAy7I/7lY12h33k/p9Zv+FcpbP8euXHXG2kev4kZ0vwMdQwTZeRxh4GaHLzhakXLDuReZPebnJThamVLD+dfSstJ4es4OFKd2mu+xgYUrfHFhlBwuzav4a7goNv7KDhTkudi1t/3lY/feFzga+M5QdLUi5YCN7i+uBhu3vD1u4ikO7w191b6HGz2l+7PtN9rHZv2z6aWdtAAAAAAAAAAAAcGFMy71YpuX+MC23AqbltsC03AaYlls/03LrZ1pu/UzLrZ5pudUzLbd2puUu4CTqxLRcAAAAAAAAgBp9AzUbQ/K4oxl8AAAAAElFTkSuQmCC"
                />
                <img
                    className="h-7 p-1 mx-2"
                    alt="logo"
                    src="data:image/png;base64,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"
                />
            </div>
            <div className="col-span-10 pl-40 ">
                <div>
                    <input
                        type="text"
                        className="w-1/2 border border-gray-800 p-1 rounded-l-full"
                        value={searchquery}
                        onChange={(e) => setseachquery(e.target.value)}
                        onFocus={() => setShowSuggestion(true)}
                        onBlur={() => setShowSuggestion(false)}
                    />
                    <button className="border border-gray-800 p-1 px-2 rounded-r-full">
                        🔎
                    </button>
                </div>
                {showSuggestion && (
                    <div className="fixed bg-white py-5 px-3 w-[29rem] rounded-lg shadow-lg">
                        <ul>
                            {searchSuggestion.map((ss) => (
                                <li
                                    key={ss}
                                    className="p-1 shadow-sm hover:bg-gray-100"
                                >
                                    {ss}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="col-span-1">
                <img
                    className="h-8"
                    alt="user-icon"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAACUCAMAAAC3HHtWAAAAY1BMVEX///8AAAD8/Pz39/fm5uYyMjL09PTr6+s9PT3e3t5paWlDQ0Pw8PDJycnS0tLi4uKvr68iIiJVVVV/f3+np6crKyuQkJCfn5+IiIhcXFy7u7sPDw9JSUmWlpZubm55eXkbGxvGxdzLAAAGkUlEQVR4nO1c2ZaiMBBlFdkXQQFB/P+vnGYcTwtUQt0QdB6858xTT6cvWWq5VYlhfPHFF198Anbk+COcyP40lQesg5dk51txdKs8z+8//yr3WNzOWeIdrM/R8uJy6EwRuqGMvQ+wspwycK9CWg9c3aB03jt1flaskPpFkflv4xUPFZvXiGqI30HLuRwhWg8cL87OvKJahddfbnW0Iy/nrEjrgfNe82YpreNk3i57HFSrzTfyGpG32rlFNw28Rtw0b7dszajycc008rJrbbxG1Nqcvq9jh70i1+QVMt3EfqjpWFF7mw0T4bx5Ra1gF2KmGWw0Hw4/pkBRbPIIXrgbMdMMN8SVjjhi1YFOedacPWdsRKhIzdtvjz1RKC2o3exOzDQbFeOh1yOJUOPE+rcQM80eJda+iZhpthgxX1/Us4Yr5N7tvXwShQA5Be/Z/U8ApyB5KzHTTLjEvK05Eooj1+Ce3kzMNE97rmUVFk3TFCEmeTzBWk+Vc9n1beLZlmHZXtL2ChEK63zCNjasZxqZ5dRwlMKxt+ByHEsqtY1K8BRVuqfsWh8E4xxqzI2sTloEBWWVTLKLodkv1lSFDBpNHpNi6c1aCops3WDtMyPkmIfysWJgqGZd1YmQuFgu5gJaVMeRmyLAtt1kA/kufyCeGwYciisL1C78cUoWMcMo+UNeJMPw577ghns2/4B24lGAqWeHVHoG5YeyBZuYYfAnTRjcHvjGDCnX8C1RKHJ1CVtchGQcvqCUi5aTfzLPADHD4KuWgtNp8c0sVnvjL+eNFiJtvlKM6SQ2e9ycHthnD3CEiBkGP4qk3QA/AJJ6OAL8bUKHQvxkDtVv+LoSnd7xLSLXZz7B952kBY/4uwGtgPD3yZEKrXx+2L4fs4o6AvGd/fuycIUC34TfKUsJpHOouAqIXlRyB2RNDcgMyAaojQLEs4yEegIg8aQ2ClItxGofDjAyEStYiGqG6dGIIHFa+nRrAH4/gJgh+fBAMEPaHkizIwJgKMk4CCv+Ip4TqsYQpWKMWc6vNVtQgwDFDGti4Tt1IBU26dVETsBPqs81HA4gSJj0CQC1dmbvANq7QFgNyNKO4K0ntpZ0VgZ4pwc4sRAkYY6gvBM8yHU9t4vhYiT1uXitNV+jFuMdRZTfw79vba+he8wUrAPkRJ4YxAKHh5mhB0i3B2QoL8hbOq221doiyQwFyOomKAhudqs6GPmZymXNvJ80tXtxr9xLR2fCsNn4xTUM+jbxHT9p+yDc0LdA20i+4rIf6LgPUKn2gkClAuOgPSBQ9nDPqR2i5J+vIP+gq9skTVphXTo8ZX9/jhTVhQpyxFfd79nTTjgt9be79hlZehlfLwmFRTau/uBmk53q18XrbOdFPTlidsYNa8V6CbMQUy8i7UPSXk5B0zXB6dImi3qDw/xkScmIs5yFynWXmOOtZFVhxukcRBUYOQ6MyEMmy61GQvdMtanZWj0J8sR/xdi6Wy4uxSsHQa7lywsxYbqBmGGk8m288tWy8HG1C2IN0i6JtcKMJBRq1Pb+Kw4SXXQtSRS3MRTbif1QE1qP9SYL0aQd9VzwckTbhZFX04Yj37b5f5HSYQNHlCYnjawgqIGuiHCkCLKbUOftKerTed2+hE3bep1lAkq4Yi7JIr3r9N5E9hbnn9m1ujw/YDv6KubiDv/cz9YTU/85mK0ncLwm6yntvlLDtJuMu5YjJl7E5XcncZG8MsO83uTmQqX7Kr73as2xmwuzTdrpcgAPpJOzCR+vSU1Gk9N8YHr04Rsys/D2qG+vJRNiaFPKiGnAIu02RjDtTFYLraam+lrq8FBWORHXVJ3LzBcM2+9rR9PcTn37+tOUotu62ZKpwww3mPD5XZlyy+1ee1YfYN+LIZHOwoJCfdqSWQqw1UgugqlBbcB0rh5sD/kW9/fdMz6mdZ7n51ru8ZeLwL0HO0kWNf472sEmQLIQ+I9LCU3Ma/mMyVWbR7GJ8kqYMd7bsZyM0DJOGp9hsqiCoHsr5achLW+U/KPFmfzCo8WSfBgvhy3+93hVbKBT3kD7u0tiZS4MTn02Vp08zxsrT1l/CkR6lLoyKMOhx1ovlnB7HaoNhXTbXdhab2g8hXdSnTf3tPfDXv/r608jrDbA6o15oP+VIBH8EnhlrHzfK2Mj7PRSVKsvs1XFJf3Eu3tefLlJXrO7XT7ymt0/WJETl3XTVfn9fh1xv+dV19Rl7EQffAHwFbaX+n7i+ynhq7744gscfwCaTF+ul3N18AAAAABJRU5ErkJggg=="
                />
            </div>
        </div>
    );
};

export default Head;
