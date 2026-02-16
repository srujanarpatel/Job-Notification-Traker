import React from 'react';
import './components.css';

const Card = ({ title, className = '', children }) => {
    return (
        <div className={`card ${className}`}>
            {title && <div className="card-title">{title}</div>}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

export default Card;
