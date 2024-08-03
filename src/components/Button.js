import React from "react";

const Button = ({ name }) => {
    return (
        <div>
            <button className="p-2 px-5 m-3 rounded-lg bg-gray-300">
                {name}
            </button>
        </div>
    );
};

export default Button;
