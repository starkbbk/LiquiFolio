import React from 'react';

/**
 * LiquidGlassWrapper — True liquid glassmorphism card
 * Uses layered inset gradients + backdrop-filter for a premium glass look
 */
const LiquidGlassWrapper = ({ children, glassProps = {} }) => {
  const {
    padding = '40px 48px',
    intensity = 0.3,
    blur = 10,
    style = {},
    cornerRadius,
  } = glassProps;

  const {
    display = 'flex',
    flexDirection,
    justifyContent,
    alignItems = 'center',
    gap = '24px',
    width,
    height,
    borderRadius,
    border,
    textAlign,
    maxWidth,
    margin,
    ...restStyles
  } = style;

  const radius = cornerRadius
    ? `${cornerRadius}px`
    : borderRadius || '28px';

  // Extract custom scoped section className from props if passed
  const { glassClassName = '' } = glassProps;

  // True liquid glass style base frame
  const glassStyle = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    maxWidth,
    margin,
    boxSizing: 'border-box',
    padding,
    borderRadius: radius,
    
    // Layout
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    textAlign,
    overflow: 'hidden',

    // Smooth interactive feel
    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
    ...restStyles, // Restore restStyles mapping
  };

  return (
    <div style={glassStyle} className={`liquid-glass-card ${glassClassName}`}>


      {/* Content rendered above glass layers */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display, flexDirection, justifyContent, alignItems, gap, textAlign, height: height || 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default LiquidGlassWrapper;
