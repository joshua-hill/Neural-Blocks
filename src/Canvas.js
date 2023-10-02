import React from 'react';
import { useDrop } from 'react-dnd';

const Canvas = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'BLOCK',
        drop: (item) => onDrop(item.type),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} style={{ width: '100%', height: '100%', backgroundColor: isOver ? '#eaeaea' : 'white' }}>
            
            {children}  {/* Render blocks here */}
        </div>
    );
};

export default Canvas;

