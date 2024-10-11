import React, { useState } from 'react';

const DraggableBoxes = ({ numberOfBoxes }) => {
  // Set initial positions so boxes appear in a row
  const initialPositions = Array.from({ length: numberOfBoxes }, (_, index) => ({
    x: 100 + index * 120, // 100px gap between boxes
    y: 100,               // All boxes in the same row
  }));

  const [positions, setPositions] = useState(initialPositions);
  const [isDragging, setIsDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (index, e) => {
    setIsDragging(index);
    setOffset({ x: e.clientX - positions[index].x, y: e.clientY - positions[index].y });
  };

  const handleMouseMove = (e) => {
    if (isDragging !== null) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      setPositions((prevPositions) =>
        prevPositions.map((pos, index) =>
          index === isDragging ? { x: newX, y: newY } : pos
        )
      );
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Function to handle saving or logging positions
  const savePositions = () => {
    console.log('Current positions of boxes:', positions);
  };

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <button onClick={savePositions}>Save</button>
      {positions.map((position, index) => (
        <div
          key={index}
          className="draggable-box"
          style={{
            position: 'absolute',
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: '100px',
            height: '100px',
            backgroundColor: 'lightblue',
            cursor: isDragging === index ? 'grabbing' : 'grab',
            border: '2px solid black',
          }}
          onMouseDown={(e) => handleMouseDown(index, e)}
        >
          {index}
        </div>
      ))}
    </div>
  );
};

export default DraggableBoxes;
