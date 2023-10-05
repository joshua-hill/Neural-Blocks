import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const Canvas = ({ onDrop, children }) => {
    const gridSize = 40;  // This matches the grid size set in the CSS

    const canvasRef = useRef(null);

    const [{ isOver }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item, monitor) => {
            const canvasRect = canvasRef.current.getBoundingClientRect(); // Get canvas position

             // Adjust for canvas offset
            const delta = monitor.getDifferenceFromInitialOffset();
             
            let left = Math.round((item.initialLeft + delta.x - canvasRect.left) / gridSize) * gridSize;
            let top = Math.round((item.initialTop + delta.y - canvasRect.top) / gridSize) * gridSize;

            console.log("Calculated position:", { left, top });


            // Call the onDrop function passed from the parent component (App)
            onDrop(item.type, { left, top });

            // Return the new snapped position (might be useful later)
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

