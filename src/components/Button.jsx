import React from 'react';
import './components.css';

const Button = ({ variant = 'primary', children, className = '', ...props }) => {
    const variantClass = variant === 'secondary' ? 'btn-secondary'
        : variant === 'success' ? 'btn-success'
            : variant === 'warning' ? 'btn-warning'
                : 'btn-primary';

    return (
        <button
            className={`btn ${variantClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
