import React from 'react';

const PropertyModal = ({onClose, blockType}) => {
    return (
        <div style={{ position: 'fixed', top: '10%', left: '30%', width: '40%', height: '50%', backgroundColor: 'white', border: '1px solid black', zIndex: 10 }}>
            <h3>{blockType} Modal</h3>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PropertyModal;
