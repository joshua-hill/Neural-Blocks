import React from 'react';
import { useDrop } from 'react-dnd';

const Canvas = ({ onDrop, children }) => {
    const gridSize = 40;  // This matches the grid size set in the CSS

    const [{ isOver }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            let left = clientOffset.x;
            let top = clientOffset.y;

            // Adjusting for the grid
            left = Math.round(left / gridSize) * gridSize;
            top = Math.round(top / gridSize) * gridSize;

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
        <div ref={drop} style={{ width:'100%', 
        backgroundColor: isOver ? '#eaeaea' : 'white',
        backgroundSize: '40px 40px',
        position: 'relative'
            }}>
            {children}  {/* Render blocks here */}

        </div>
    );
};

export default Canvas;

