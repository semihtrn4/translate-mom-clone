
/**
 * Subtitle style configuration interface
 */
export interface SubtitleStyle {
  textColor: string;
  backgroundColor: string;
  fontSize: number;
  fontFamily: string;
  position: 'bottom' | 'top' | 'middle';
  outline: boolean;
  outlineColor?: string;
  preferredFormat?: 'srt' | 'ass';
  // Additional properties for ffmpeg
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  bold?: boolean;
  italic?: boolean;
}

/**
 * Default subtitle style configuration
 */
export const defaultSubtitleStyle: SubtitleStyle = {
  textColor: '#FFFFFF',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  fontSize: 16,
  fontFamily: 'Arial',
  position: 'bottom',
  outline: true,
  outlineColor: '#000000',
  preferredFormat: 'srt',
  // Default ffmpeg specific properties
  color: '#FFFFFF',
  strokeColor: '#000000',
  strokeWidth: 2,
  bold: false,
  italic: false
};

/**
 * Available font families for subtitles
 */
export const availableFontFamilies = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' }
];
