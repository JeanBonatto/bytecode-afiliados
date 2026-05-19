export const uploadConfig = {
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ],
  
  // Onde salvar (local, s3, cloudinary, etc)
  storage: process.env.UPLOAD_STORAGE || 'local',
  
  // Pasta local
  localPath: process.env.UPLOAD_PATH || './uploads',
} as const;

export type UploadConfig = typeof uploadConfig;