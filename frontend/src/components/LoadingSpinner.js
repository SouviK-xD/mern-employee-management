import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{ textAlign: 'center', margin: '10px' }}>
            <div className="spinner" />
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
