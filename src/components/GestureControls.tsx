// Create: src/components/GestureControls.tsx
import React, { useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';

const GestureControls = ({ children, onSwipeLeft, onSwipeRight, onPinch }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
    config: { tension: 300, friction: 30 }
  }));

  const bind = useGesture({
    // Drag gesture
    onDrag: ({ offset: [x, y], active }) => {
      api.start({ x, y, immediate: active });
    },
    
    // Pinch gesture (zoom)
    onPinch: ({ offset: [scale, rotation], active }) => {
      api.start({ scale, rotation, immediate: active });
      if (onPinch) onPinch(scale);
    },
    
    // Wheel/scroll gesture
    onWheel: ({ offset: [, y] }) => {
      api.start({ y: y * 0.1 });
    },

    // Swipe gestures
    onDragEnd: ({ velocity: [vx], direction: [dx], distance, cancel }) => {
      const isSwipe = distance > 50 && Math.abs(vx) > 0.5;
      
      if (isSwipe) {
        if (dx > 0 && onSwipeRight) {
          onSwipeRight();
          // Reset position after swipe
          setTimeout(() => api.start({ x: 0, y: 0 }), 200);
        } else if (dx < 0 && onSwipeLeft) {
          onSwipeLeft();
          // Reset position after swipe
          setTimeout(() => api.start({ x: 0, y: 0 }), 200);
        }
      } else {
        // Snap back to original position
        api.start({ x: 0, y: 0 });
      }
    }
  });

  return (
    <animated.div
      {...bind()}
      style={{
        ...springs,
        touchAction: 'none',
        userSelect: 'none',
      }}
      className="w-full h-full"
    >
      {children}
    </animated.div>
  );
};

export default GestureControls;