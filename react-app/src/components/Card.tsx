import React from "react";
import "../styles/card.css";

interface CardProps {
    title: string;
    value: string;
    color: "blue" | "green" | "red";
}

const Card: React.FC<CardProps> = ({ title, value, color }) => {
    return (
        <div className={`card ${color}`}>
            <h3>{title}</h3>
            <p>${value}</p>
        </div>
    );
}

export default Card;