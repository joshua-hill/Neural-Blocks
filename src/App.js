import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Block from './Block';
import Canvas from './Canvas';
import PropertyModal from './PropertyModal';
import './App.css';

function App() {
    const [blocks, setBlocks] = useState([]);

    const handleDrop = (type) => {
        setBlocks([...blocks, type]);
    };

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);

    const handleBlockClick = (blockType) => {
        setEditingBlock(blockType);
        setModalOpen(true);
    };

    const handleSave = () => {
        alert('Save functionality not yet implemented.');
    };
    
    const handleLoad = () => {
        alert('Load functionality not yet implemented.');
    };
    
    const handleTrain = () => {
        alert('Train functionality not yet implemented.');
    };
    


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">

                <nav style={{ width: '100%', padding: '10px', borderBottom: '1px solid black' }}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={handleTrain}>Train</button>
                </nav>

                <header className="App-header">
                    Neural Block Interface
                </header>

                <div className="palette">
                    Available Blocks:
                    <Block type="Input" />
                    <Block type="Dense" />
                </div>

                <div className="canvas">
                    <Canvas onDrop={handleDrop}>
                        {blocks.map((blockType, idx) => (
                            <div key={idx} style={{ border: '1px solid black', margin: '10px' }} onClick={() => handleBlockClick(blockType)}>
                                {blockType}
                            </div>
                        ))}
                    </Canvas>
                </div>

            </div>

            {isModalOpen && <PropertyModal blockType={editingBlock} onClose={() => setModalOpen(false)} />} 

        </DndProvider>
    );

    
}

export default App;
