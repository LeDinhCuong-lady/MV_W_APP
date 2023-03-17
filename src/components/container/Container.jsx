import React from 'react';
import './style.scss';

function Container({children}) {
    return (
        <div className="contentWrapper">
            {children}
        </div>
    );
}

export default Container;