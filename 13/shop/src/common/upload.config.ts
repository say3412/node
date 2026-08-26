// npm i @nestjs/serve-static@5
// npm i -D @types/multer

import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';

export const UPLOAD_DIR = 'upload';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
const ALLOWED_MINE = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// FileInterCeptor 에 그래도 넘길 옵션 (멀터)
export const imageUploadOptions = {
  // storage: diskStorage({
  //   destination: UPLOAD_DIR,
  //   filename: (_req, file, callback) => {
  //     // 파일명 무작위
  //     const unique = randomUUID();
  //     const ext = extname(file.originalname).toLowerCase();
  //     callback(null, `${unique}${ext}`);
  //   },
  // }),
  storage: memoryStorage(),
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_MINE.includes(file.mimetype)) {
      callback(new BadRequestException(`이미지 파일만 올 수 있습니다.`));
      return;
    }
    callback(null, true);
  },
  limit: { fileSize: MAX_FILE_SIZE },
};
