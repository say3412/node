import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  BlobSASPermissions,
  BlobServiceClient,
  ContainerClient,
  generateAccountSASQueryParameters,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class AzureBlobService implements OnModuleInit {
  private blobServiceClient: BlobServiceClient;
  // product-images 컨테이너 접근을 위한 변수
  private publicContainer: ContainerClient;

  onModuleInit() {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
      throw new Error(`.env AZURE_STORAGE_CONNECTION_STRING 를 확인해주세요.`);
    }

    // 업로드 클라이언트
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    const publicName = process.env.AZURE_PUBLIC_CONTAINER ?? 'product-images';

    // 컨테이너 연결
    this.publicContainer =
      this.blobServiceClient.getContainerClient(publicName);
  }

  // 저장용 고유 파일명
  makeBlobName(originName: string) {
    const ext = extname(originName).toLowerCase();
    return `${randomUUID()}${ext}}`;
  }

  async uploadPublic(
    file: Express.Multer.File,
    folder = 'products-sl',
  ): Promise<{ blobName: string; url: string }> {
    // azure에 file 저장하는 로직
    const blobName = `${folder}/${this.makeBlobName(file.originalname)}`;
    const blockBlob = this.publicContainer.getBlockBlobClient(blobName);

    await blockBlob.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return { blobName: blobName, url: blockBlob.url };
  }
}
