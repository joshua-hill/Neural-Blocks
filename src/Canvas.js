import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';



const Canvas = ({ onDrop, children, blocks, onMoveBlock, getBlocksConnectedBelow, setBlocks }) => {
    useEffect(() => {
        console.log("Component (Canvas or Block) re-rendered");
    });
    const gridSize = 40;  // This matches the grid size set in the CSS

    const canvasRef = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item, monitor) => {
            console.log("Dropped item:", item);
            const canvasRect = canvasRef.current.getBoundingClientRect(); 
        
            const delta = monitor.getDifferenceFromInitialOffset();
            console.log("Delta:", delta);
            let left = Math.round((item.initialLeft + delta.x - canvasRect.left) / gridSize) * gridSize;
            let top = Math.round((item.initialTop + delta.y - canvasRect.top) / gridSize) * gridSize;
            console.log(`Block ${item.id} - Calculated New Position:`, { left, top });
        
            if (item.id !== undefined) {  // It's an existing block
                // Update the main block's position
                console.log("current blockie: ", item)
                onMoveBlock(item.id, { left, top });
        
                
            } else {  // It's a new block from the palette
                onDrop(item.type, { left, top });
            }
        
            return { left, top };
        },

        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
        });

    return (
        <div 
        ref={node => {
            canvasRef.current = node;
            drop(node);
        }}
        style= {{ 
            width:'100%',
            height: '100vh', 
            backgroundColor: isOver ? '#eaeaea' : 'white',
            backgroundSize: '40px 40px',
            position: 'relative'
            }} 
        >
            {children}  {/* Render blocks here */}

        </div>
    );
};

export default Canvas;

