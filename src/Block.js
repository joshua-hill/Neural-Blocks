import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ type , id, position, onMoveBlock}) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: (monitor) => ({
            id: id,
            type: type,
            initialLeft: ref.current.getBoundingClientRect().left,
            initialTop: ref.current.getBoundingClientRect().top,
            initialPosition: position
        }),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        end: (item, monitor) => {
            if (position) { // This means the block is within the canvas
                const delta = monitor.getDifferenceFromInitialOffset();
                if (delta) {
                    const newLeft = item.position.left + delta.x;
                    const newTop = item.position.top + delta.y;
                    onMoveBlock(item.id, { left: newLeft, top: newTop });  // Callback to update block position in App's state
                }
            }
        },
        
        
    });

    const blockStyle = {
        padding: '10px',
        border: '1px solid black',
        margin: '10px',
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        cursor: 'grab'
    };

    return (
        <div ref={node => {
            drag(node);
            ref.current = node;
        }} style={{ ...blockStyle, opacity: isDragging ? 0.5 : 1 }}>
            {type}
        </div>
    );
};

export default Block;
