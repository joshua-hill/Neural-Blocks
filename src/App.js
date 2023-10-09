import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Block from './Block';
import Canvas from './Canvas';
import PropertyModal from './PropertyModal';
import './App.css';

function App() {
    const [blocks, setBlocks] = useState([]);

    const [nextId, setNextId] = useState(0);


    const handleDrop = (type, position) => {
        let adjustedPosition = { ...position };

        // This loop will ensure that we keep adjusting the position until no overlap is found
        while (blocks.some(block => block.position.left === adjustedPosition.left && block.position.top === adjustedPosition.top)) {
            adjustedPosition.top += 40;  // Assuming block height + margin = 60px, adjust as needed
        }
        const newBlock = {
            id: nextId,
            type: type,
            position: adjustedPosition,
            properties: getDefaultProperties(type)
        };
        console.log("Setting block position:", position);

        setBlocks([...blocks, newBlock]);
        setNextId(nextId + 1);
    };
    
    const getDefaultProperties = (type) => {
        switch(type) {
            case "Input":
                return { features: 0 };
            case "Dense":
                return { neurons: 0, activation: 'relu' };
            case "Conv2D":
                return { filters: 0, kernelSize: 0, strides: 1, activation: 'relu' };
            case "MaxPooling2D":
                return { poolSize: 2, strides: 2 };
            // Add default properties for other block types as they're added
            default:
                return {};
        }
    };
    

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingBlock, setEditingBlock] = useState(null);
    const [editingBlockIndex, setEditingBlockIndex] = useState(null);


    const handleBlockClick = (blockType, index) => {
        setEditingBlock(blockType);
        setEditingBlockIndex(index);
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

    const handlePropertiesSave = (index, updatedProperties) => {
        const updatedBlocks = [...blocks];
        updatedBlocks[index].properties = updatedProperties;
        setBlocks(updatedBlocks);
    };
    
    const handleDelete = (index) => {
        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index, 1);
        setBlocks(updatedBlocks);
    };

    const handleMoveBlock = (blockId, newPosition) => {
        const updatedBlocks = blocks.map(block => 
            block.id === blockId ? { ...block, position: newPosition } : block
        );
        setBlocks(updatedBlocks);
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
                    <Block type="Conv2D" />
                    <Block type="MaxPooling2D" />
                </div>

                <div className="canvas">
                    <Canvas onDrop={handleDrop} blocks={blocks} onMoveBlock={handleMoveBlock}>
                    {blocks.map((block, idx) => (
                        <div key={idx} 
                            style={{ border: '1px solid black', margin: '10px',  position: 'absolute', left: block.position.left, 
                            top: block.position.top  }} 
                            onClick={() => handleBlockClick(block, idx)}>

                            <button style={{ position: 'absolute', top: 0, right: 0 }} onClick={(e) => { e.stopPropagation(); handleDelete(idx); }}>Delete</button>
                            {block.type} 
                            {block.properties.neurons ? `(Neurons: ${block.properties.neurons})` : null} 
                            {block.properties.features ? `(Features: ${block.properties.features})` : null}
                            {block.properties.activation ? `(Activation: ${block.properties.activation})` : null}
                            {block.properties.filters ? `(Filters: ${block.properties.filters})` : null}
                            {block.properties.kernelSize ? `(Kernel Size: ${block.properties.kernelSize})` : null}
                            {block.properties.poolSize ? `(Pool Size: ${block.properties.poolSize})` : null}
                            {block.properties.strides ? `(Strides: ${block.properties.strides})` : null}
                            
                        </div>
                    ))}

                    </Canvas>
                </div>

            </div>

            {isModalOpen && <PropertyModal blockType={editingBlock.type} blockIndex={editingBlockIndex} onClose={() => setModalOpen(false)} onSave={handlePropertiesSave} />}

        </DndProvider>
    );

    
}

export default App;
