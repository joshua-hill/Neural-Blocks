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
        console.log("New block:", newBlock);
        console.log("Setting block position:", position);

        setBlocks([...blocks, newBlock]);
        console.log("Updated blocks:", blocks);

        setNextId(nextId + 1);
        console.log("Dropped item type:", type);
        console.log("Dropped item position:", position);

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
                    <Block type="Input" isTemplate={true} />
                    <Block type="Dense" isTemplate={true} />
                    <Block type="Conv2D" isTemplate={true} />
                    <Block type="MaxPooling2D" isTemplate={true} />
                </div>

                <div className="canvas">
                    <Canvas onDrop={handleDrop} blocks={blocks} onMoveBlock={handleMoveBlock}>
                    {blocks.map((block, idx) => (
                        <Block 
                        key={idx} 
                        id={idx} 
                        type={block.type} 
                        position={block.position} 
                        onMoveBlock={handleMoveBlock}
                        onClick={() => handleBlockClick(block, idx)}
                        onDelete={() => handleDelete(idx)}
                        properties={block.properties}
                    />
                    ))}

                    </Canvas>
                </div>

            </div>

            {isModalOpen && <PropertyModal blockType={editingBlock.type} blockIndex={editingBlockIndex} onClose={() => setModalOpen(false)} onSave={handlePropertiesSave} />}

        </DndProvider>
    );

    
}

export default App;
