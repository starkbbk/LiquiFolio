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

    // Apple Liquid Glass style - highly transparent
    background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)`,
    
    // Lower blur so we can see the background image shapes clearly through it
    backdropFilter: `blur(12px) saturate(120%)`,
    WebkitBackdropFilter: `blur(12px) saturate(120%)`,

    // Soft drop shadow + inner bevel ring shadow
    boxShadow: `
      0 10px 30px 0 rgba(0, 0, 0, 0.15),
      inset 0 0 0 1px rgba(255, 255, 255, 0.15)
    `,

    // Asymmetric border for lighting effect (common in Apple style)
    border: border || '1px solid rgba(255, 255, 255, 0.1)',
    borderTop: '1px solid rgba(255, 255, 255, 0.4)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.3)',

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

    ...restStyles,
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
