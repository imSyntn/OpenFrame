"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface LensProps {
  show?: boolean;
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: Position;
  defaultPosition?: Position;
  isStatic?: boolean;
  duration?: number;
  lensColor?: string;
  ariaLabel?: string;
}

export function Lens({
  children,
  show = true,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = "black",
  ariaLabel = "Zoom Area",
}: LensProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>(position);
  const containerRef = useRef<HTMLDivElement>(null);

  if (zoomFactor < 1) {
    throw new Error("zoomFactor must be greater than or equal to 1");
  }

  if (lensSize <= 0) {
    throw new Error("lensSize must be greater than 0");
  }

  if (!show) {
    return <>{children}</>;
  }

  const currentPosition = useMemo(() => {
    if (isStatic) return position;
    if (defaultPosition && !isHovering) return defaultPosition;
    return mousePosition;
  }, [isStatic, position, defaultPosition, isHovering, mousePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsHovering(false);
    }
  }, []);

  const maskImage = useMemo(() => {
    const radius = lensSize / 2;
    const { x, y } = currentPosition;

    return `radial-gradient(circle ${radius}px at ${x}px ${y}px, ${lensColor} 100%, transparent 100%)`;
  }, [lensSize, currentPosition, lensColor]);

  const shouldShowLens = isStatic || !!defaultPosition || isHovering;

  const lensContent = useMemo(() => {
    const { x, y } = currentPosition;

    return (
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          zIndex: 50,
          opacity: shouldShowLens ? 1 : 0,
          transform: shouldShowLens ? "scale(1)" : "scale(0.8)",
          transformOrigin: `${x}px ${y}px`,
          transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoomFactor})`,
            transformOrigin: `${x}px ${y}px`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }, [
    currentPosition,
    maskImage,
    shouldShowLens,
    duration,
    zoomFactor,
    children,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl w-full h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {lensContent}
    </div>
  );
}
