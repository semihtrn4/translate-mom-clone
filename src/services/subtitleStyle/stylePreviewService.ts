
import React from 'react';
import { SubtitleStyle } from './styleConfigService';

/**
 * Applies styling to the subtitle text in SRT format
 * Note: SRT doesn't support styling directly, this is used for the preview
 * @param text The original SRT text
 * @param style The subtitle style configuration
 * @returns The styled SRT text for preview
 */
export const applySubtitleStyle = (text: string, style: SubtitleStyle): string => {
  // For true SRT files, styling would be handled by the video player
  // This function is mainly for the preview rendering
  return text;
};

/**
 * Generates CSS for the subtitle preview based on the style configuration
 * @param style The subtitle style configuration
 * @returns CSS styles object for react components
 */
export const generateSubtitlePreviewStyle = (style: SubtitleStyle): React.CSSProperties => {
  return {
    color: style.textColor,
    backgroundColor: style.backgroundColor,
    fontSize: `${style.fontSize}px`,
    fontFamily: style.fontFamily,
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    textAlign: 'center',
    maxWidth: '80%',
    margin: '0 auto',
    textShadow: style.outline ? `0 0 2px ${style.outlineColor || '#000000'}` : 'none',
    whiteSpace: 'pre-wrap'
  };
};
