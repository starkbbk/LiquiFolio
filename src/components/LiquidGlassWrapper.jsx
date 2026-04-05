import React from 'react';

/**
 * LiquidGlassWrapper
 * 
 * Renders a frosted glass card using pure CSS backdrop-filter.
 * This replaces the liquid-glass-react library wrapper which generated
 * buggy outer shimmer spans and white border artifacts.
 */
const LiquidGlassWrapper = ({ children, glassProps = {} }) => {
  const {
    padding = '40px 48px',
    intensity = 0.3,
    blur = 10,
    style = {},
  } = glassProps;

  const {
    display = 'flex',
    flexDirection,
    justifyContent,
    alignItems = 'center',
    gap = '24px',
    width,
    height,
    borderRadius = '28px',
    border,
    textAlign,
    maxWidth,
    margin,
    ...restStyles
  } = style;

  const glassStyle = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    maxWidth: maxWidth,
    margin: margin,
    boxSizing: 'border-box',
    padding,
    borderRadius,
    border: border || '1px solid rgba(255, 255, 255, 0.15)',
    backdropFilter: `blur(${blur * 3 + 12}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blur * 3 + 12}px) saturate(180%)`,
    background: `rgba(255, 255, 255, ${intensity * 0.08})`,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05)
    `,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    textAlign,
    ...restStyles,
  };

  return (
    <div style={glassStyle}>
      {children}
    </div>
  );
};

export default LiquidGlassWrapper;
