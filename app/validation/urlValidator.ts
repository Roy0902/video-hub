import { z } from 'zod';

// YouTube URL validation schema
export const youtubeUrlSchema = z.string()
  .min(1, 'URL is required')
  .url('Please enter a valid URL')
  .refine((url) => {
    const youtubePatterns = [
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/youtu\.be\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/v\/[a-zA-Z0-9_-]+/,
      /^https?:\/\/(www\.)?youtube\.com\/shorts\/[a-zA-Z0-9_-]+/
    ];
    
    return youtubePatterns.some(pattern => pattern.test(url));
  }, {
    message: 'Please enter a valid YouTube URL'
  })
  .refine((url) => {
    // Check for valid video ID length (11 characters for YouTube)
    const videoIdMatch = url.match(/(?:v=|embed\/|youtu\.be\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch && videoIdMatch[1].length === 11;
  }, {
    message: 'Invalid YouTube video ID'
  });

// Type inference
export type YouTubeUrl = z.infer<typeof youtubeUrlSchema>;

// Validation function
export const validateYouTubeUrl = (url: string) => {
  try {
    const result = youtubeUrlSchema.parse(url);
    return { isValid: true, url: result, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, url: null, error: error.errors[0].message };
    }
    return { isValid: false, url: null, error: 'URL validation failed' };
  }
};

// Extract video ID from YouTube URL
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:v=|embed\/|youtu\.be\/|v\/|shorts\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

// Generate different YouTube URL formats
export const generateYouTubeUrls = (videoId: string) => {
  return {
    watch: `https://www.youtube.com/watch?v=${videoId}`,
    embed: `https://www.youtube.com/embed/${videoId}`,
    short: `https://youtu.be/${videoId}`,
    shorts: `https://www.youtube.com/shorts/${videoId}`
  };
};

// Check if URL is a YouTube Shorts
export const isYouTubeShorts = (url: string): boolean => {
  return /youtube\.com\/shorts\//.test(url) || /youtu\.be\//.test(url);
};

// Check if URL is a YouTube embed
export const isYouTubeEmbed = (url: string): boolean => {
  return /youtube\.com\/embed\//.test(url);
}; 