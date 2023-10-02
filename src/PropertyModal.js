import React, { useState } from 'react';


const PropertyModal = ({onClose, blockType, onSave, blockIndex}) => {
    const [localProperties, setLocalProperties] = useState({});

    const handlePropertyChange = (key, value) => {
        setLocalProperties({
            ...localProperties,
            [key]: value
        });
    };

    const handleSaveClick = () => {
        onSave(blockIndex, localProperties);
        onClose();
    };
    
    return (
        <div style={{ position: 'fixed', top: '10%', left: '30%', width: '40%', height: '50%', backgroundColor: 'white', border: '1px solid black', zIndex: 10 }}>
            <h3>{blockType} Properties</h3>

            {blockType === "Input" && (
                <div>
                    <label>Features: </label>
                    <input type="number" onChange={(e) => handlePropertyChange("features", e.target.value)} />
                </div>
            )}

            {blockType === "Dense" && (
                <>
                    <div>
                        <label>Neurons: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("neurons", e.target.value)} />
                    </div>
                    <div>
                        <label>Activation: </label>
                        <select onChange={(e) => handlePropertyChange("activation", e.target.value)}>
                            <option value="" disabled selected>Please select an activation</option>
                            <option value="relu">ReLU</option>
                            <option value="sigmoid">Sigmoid</option>
                            {/* Add other activations as needed */}
                        </select>
                    </div>
                </>
            )}
            {blockType === "Conv2D" && (
                <>
                    <div>
                        <label>Filters: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("filters", e.target.value)} />
                    </div>
                    <div>
                        <label>Kernel Size: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("kernelSize", e.target.value)} />
                    </div>
                    <div>
                        <label>Strides: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("strides", e.target.value)} />
                    </div>
                    <div>
                        <label>Activation: </label>
                        <select onChange={(e) => handlePropertyChange("activation", e.target.value)}>
                            <option value="" disabled selected>Please select an activation</option>
                            <option value="relu">ReLU</option>
                            <option value="sigmoid">Sigmoid</option>
                            {/* Add other activations as needed */}
                        </select>
                    </div>
                </>
            )}

            {blockType === "MaxPooling2D" && (
                <>
                    <div>
                        <label>Pool Size: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("poolSize", e.target.value)} />
                    </div>
                    <div>
                        <label>Strides: </label>
                        <input type="number" onChange={(e) => handlePropertyChange("strides", e.target.value)} />
                    </div>
                </>
            )}


            <button onClick={onClose}>Close</button>
            <button onClick={handleSaveClick}>Save</button>

        </div>
    );
};

export default PropertyModal;
