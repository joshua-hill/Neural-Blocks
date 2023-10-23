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
            adjustedPosition.top += 40;  
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
        // This loop will ensure that we keep adjusting the position until no overlap is found
        while (blocks.some(block => block.position.left === newPosition.left && block.position.top === newPosition.top)) {
            newPosition.top += 40;  
        }
        console.log("Moving block with ID:", blockId, "to new position:", newPosition);
        const updatedBlocks = blocks.map(block => 
            block.id === blockId ? { ...block, position: newPosition } : block
        );
        setBlocks(updatedBlocks);
        console.log('Updated Blocks State:', updatedBlocks);
        console.log(`Block ${blockId} - Updated Position in onMoveBlock:`, newPosition);
    };

    const getBlocksConnectedBelow = (blockId, blocks) => {
        const connectedBlocks = [];
    
        const findConnectedBlocks = (currentId) => {
            const currentBlock = blocks.find(b => b.id === currentId);
            console.log("Examining block:", currentBlock);
            const blockDirectlyBelow = blocks.find(b => b.position.left === currentBlock.position.left && b.position.top === currentBlock.position.top + 40);
            console.log("Block directly below:", blockDirectlyBelow);
            if (blockDirectlyBelow) {
                connectedBlocks.push(blockDirectlyBelow);
                findConnectedBlocks(blockDirectlyBelow.id);
            }
        };
    
        findConnectedBlocks(blockId);

        console.log("All connected blocks:", connectedBlocks);
    
        return connectedBlocks;
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
                    <Canvas onDrop={handleDrop} blocks={blocks} onMoveBlock={handleMoveBlock} getBlocksConnectedBelow={getBlocksConnectedBelow} setBlocks={setBlocks}>
                    {blocks.map((block, idx) => (
                        <Block 
                        key={block.id} 
                        id={block.id} 
                        type={block.type} 
                        position={block.position} 
                        onMoveBlock={handleMoveBlock}
                        onClick={() => handleBlockClick(block, block.id)}
                        onDelete={() => handleDelete(block.id)}
                        properties={block.properties}
                        getBlocksConnectedBelow={getBlocksConnectedBelow}
                        blocks={blocks}
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
