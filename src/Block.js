import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ type }) => {
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: (monitor) => ({
            type: type,
            initialLeft: ref.current.getBoundingClientRect().left,
            initialTop: ref.current.getBoundingClientRect().top
        }),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
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
