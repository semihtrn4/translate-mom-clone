
import { SubtitleStyle } from './styleConfigService';

/**
 * Creates a custom SRT file with styling information embedded in the filename
 * @param subtitles The subtitle segments
 * @param videoName The name of the video
 * @param style The subtitle style configuration
 * @returns The filename of the downloaded SRT file
 */
export const downloadStyledSRT = (subtitles: any[], videoName: string, style: SubtitleStyle): string => {
  // SRT format doesn't support styling, but we can include style info in filename
  let content = '';
  
  subtitles.forEach((subtitle, index) => {
    // Format timestamp for SRT
    const formatTime = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const milliseconds = ms % 1000;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds.toString().padStart(3, '0')}`;
    };
    
    // Add subtitle entry
    content += `${index + 1}\n`;
    content += `${formatTime(subtitle.start)} --> ${formatTime(subtitle.end)}\n`;
    content += `${subtitle.text}\n\n`;
  });
  
  // Create downloadable file
  const blob = new Blob([content], { type: 'text/srt' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  // Add style info to filename
  const styleInfo = `_${style.fontSize}px_${style.fontFamily.replace(/\s+/g, '-')}`;
  const fileName = `${videoName.replace(/\.[^/.]+$/, '')}_subtitles${styleInfo}.srt`;
  
  a.href = url;
  a.download = fileName;
  a.click();
  
  URL.revokeObjectURL(url);
  return fileName;
};

/**
 * Creates an ASS subtitle file content with full styling support
 * @param subtitles The subtitle segments
 * @param videoName The name of the video
 * @param style The subtitle style configuration
 * @returns The filename and content of the ASS file
 */
export const createStyledASS = (subtitles: any[], videoName: string, style: SubtitleStyle): { fileName: string, content: string } => {
  // ASS format header
  let content = '[Script Info]\n';
  content += 'Title: ' + videoName + ' subtitles\n';
  content += 'ScriptType: v4.00+\n';
  content += 'WrapStyle: 0\n';
  content += 'ScaledBorderAndShadow: yes\n';
  content += 'YCbCr Matrix: None\n\n';
  
  // Styles section
  content += '[V4+ Styles]\n';
  content += 'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n';
  
  // Convert RGB color to ASS format (AABBGGRR)
  const convertColor = (cssColor: string): string => {
    // Handle rgba format
    if (cssColor.startsWith('rgba')) {
      const rgba = cssColor.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
      if (rgba) {
        const [, r, g, b, a] = rgba;
        const alpha = Math.round(parseFloat(a) * 255).toString(16).padStart(2, '0');
        return '&H' + alpha + b.padStart(2, '0') + g.padStart(2, '0') + r.padStart(2, '0');
      }
    }
    
    // Handle hex format
    if (cssColor.startsWith('#')) {
      const hex = cssColor.slice(1);
      const r = hex.slice(0, 2);
      const g = hex.slice(2, 4);
      const b = hex.slice(4, 6);
      return '&H00' + b + g + r;
    }
    
    // Default if format not recognized
    return '&H00FFFFFF';
  };
  
  // Determine alignment based on position
  const getAlignment = (position: string): number => {
    switch (position) {
      case 'top': return 8;
      case 'middle': return 5;
      case 'bottom': return 2;
      default: return 2;
    }
  };
  
  // Add style definition
  const textColor = convertColor(style.textColor);
  const bgColor = convertColor(style.backgroundColor);
  const outlineColor = style.outline ? convertColor(style.outlineColor || '#000000') : '&H00000000';
  const alignment = getAlignment(style.position);
  
  content += `Style: Default,${style.fontFamily},${style.fontSize},${textColor},${textColor},${outlineColor},${bgColor},0,0,0,0,100,100,0,0,1,${style.outline ? 1 : 0},0,${alignment},10,10,10,1\n\n`;
  
  // Events section
  content += '[Events]\n';
  content += 'Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n';
  
  // Format time for ASS (h:mm:ss.cc)
  const formatTime = (ms: number) => {
    const totalSeconds = ms / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((ms % 1000) / 10);
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };
  
  // Add dialogue entries
  subtitles.forEach(subtitle => {
    content += `Dialogue: 0,${formatTime(subtitle.start)},${formatTime(subtitle.end)},Default,,0,0,0,,${subtitle.text}\n`;
  });
  
  const fileName = `${videoName.replace(/\.[^/.]+$/, '')}_subtitles.ass`;
  
  return { fileName, content };
};

/**
 * Creates and downloads an ASS subtitle file with full styling support
 * @param subtitles The subtitle segments
 * @param videoName The name of the video
 * @param style The subtitle style configuration
 * @returns The filename of the downloaded ASS file
 */
export const downloadStyledASS = (subtitles: any[], videoName: string, style: SubtitleStyle): string => {
  const { fileName, content } = createStyledASS(subtitles, videoName, style);
  
  // Create downloadable file
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = fileName;
  a.click();
  
  URL.revokeObjectURL(url);
  return fileName;
};

/**
 * Stores subtitle data temporarily in localStorage for further processing
 * @param subtitles The subtitle segments
 * @param videoName The name of the video
 * @param style The subtitle style configuration
 * @returns The key under which the subtitles are stored
 */
export const storeSubtitlesTemporarily = (subtitles: any[], videoName: string, style: SubtitleStyle): string => {
  const storageKey = `temp_subtitles_${Date.now()}`;
  const subtitleData = {
    subtitles,
    videoName,
    style,
    timestamp: Date.now()
  };
  
  localStorage.setItem(storageKey, JSON.stringify(subtitleData));
  return storageKey;
};
