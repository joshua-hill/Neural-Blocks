import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';



const Block = ({ type, id, position, onMoveBlock, isTemplate, properties, onClick, onDelete, getBlocksConnectedBelow, blocks}) => {
    useEffect(() => {
        console.log("Component (Canvas or Block) re-rendered");
    });
    const ref = useRef(null);

    const handleDeleteClick = (e) => {
        e.stopPropagation();  // To prevent any other click handlers from firing
        onDelete();
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'BLOCK',
        item: (monitor) => {
            console.log(`Block ${id} - Initial Position:`, ref.current.getBoundingClientRect());
            console.log("ref", ref.current)
            if (ref.current) {
                const initialLeft = ref.current.getBoundingClientRect().left;
                const initialTop = ref.current.getBoundingClientRect().top;
                console.log("Initial Left and Top:", initialLeft, initialTop);
                return {
                    id: id,
                    type: type,
                    initialLeft: initialLeft,
                    initialTop: initialTop,
                    initialPosition: position
                };
            }
            return {};
        },
        collect: (monitor) => ({
            
            isDragging: !!monitor.isDragging(),
        }),
        //end hook seems to be literally useless
        end: (item, monitor) => {
            console.log("position: ", position)
            if (position) { // This means the block is within the canvas
                const initialClientOffset = monitor.getInitialClientOffset();
                const finalClientOffset = monitor.getClientOffset();

                console.log("initial clientoffset: ", initialClientOffset)
                console.log("final clientoffset: ", finalClientOffset)
        
                if (initialClientOffset && finalClientOffset) {
                    const deltaX = finalClientOffset.x - initialClientOffset.x;
                    const deltaY = finalClientOffset.y - initialClientOffset.y;
        
                    const newLeft = item.initialPosition.left + deltaX;
                    const newTop = item.initialPosition.top + deltaY;
        
                    // Update the position of the dragged block
                    onMoveBlock(item.id, { left: newLeft, top: newTop });
        
                    // Get all blocks connected below the dragged block
                    const connectedBlocks = getBlocksConnectedBelow(item.id, blocks);
        
                    // Update the position of each connected block
                    connectedBlocks.forEach(block => {
                        const blockNewLeft = block.position.left + deltaX;
                        const blockNewTop = block.position.top + deltaY;
                        onMoveBlock(block.id, { left: blockNewLeft, top: blockNewTop });
                    });
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
