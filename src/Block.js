import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const Block = ({ type, id, position, onMoveBlock, isTemplate, properties, onClick, onDelete }) => {
    const ref = useRef(null);

    const handleDeleteClick = (e) => {
        e.stopPropagation();  // To prevent any other click handlers from firing
        onDelete();
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: (monitor) => {
            if (ref.current) {
                return {
                    id: id,
                    type: type,
                    initialLeft: ref.current.getBoundingClientRect().left,
                    initialTop: ref.current.getBoundingClientRect().top,
                    initialPosition: position
                };
            }
            return {};
        },
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
        borderRadius: '5px',
        backgroundColor: '#f0f0f0',
        cursor: 'grab',
        width: 'fit-content',
        position: position ? 'absolute' : 'static', // Default to 'static' if no position is provided
        left: position ? position.left : 'auto',
        top: position ? position.top : 'auto'
    };

    drag(ref);


    if (isTemplate) {
        return (
            <div ref={ref} style={{ ...blockStyle, opacity: isDragging ? 0.5 : 1 }}>
                {type}
            </div>
        );
    }

    return (
        <div ref={ref}
            style={{ ...blockStyle, opacity: isDragging ? 0.5 : 1 }}>
            {type} 
            {properties.neurons ? `(Neurons: ${properties.neurons})` : null} 
            {properties.features ? `(Features: ${properties.features})` : null}
            {properties.activation ? `(Activation: ${properties.activation})` : null}
            {properties.filters ? `(Filters: ${properties.filters})` : null}
            {properties.kernelSize ? `(Kernel Size: ${properties.kernelSize})` : null}
            {properties.poolSize ? `(Pool Size: ${properties.poolSize})` : null}
            {properties.strides ? `(Strides: ${properties.strides})` : null}
            <button onClick={(e) => { e.stopPropagation(); onClick(); }}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
};

export default Block;
