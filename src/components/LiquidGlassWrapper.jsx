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

  // True liquid glass style — very transparent, heavy blur, layered reflections
  const glassStyle = {
    position: 'relative',
    width: width || '100%',
    height: height || 'auto',
    maxWidth,
    margin,
    boxSizing: 'border-box',
    padding,
    borderRadius: radius,
    ...restStyles, // apply restStyles before overrides to guarantee overrides win

    // Unified Target Consistency Styles
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',

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
  };

  return (
    <div style={glassStyle} className="liquid-glass-card">


      {/* Content rendered above glass layers */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display, flexDirection, justifyContent, alignItems, gap, textAlign, height: height || 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default LiquidGlassWrapper;
