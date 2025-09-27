import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export class StorageService {
  constructor(
    private readonly accessKey: string,
    private readonly secretKey: string,
    private readonly endpoint: string,
    private readonly bucketName: string,
  ) {}

  private getS3Client() {
    return new S3Client({
      region: 'EEUR',
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey,
      },
    });
  }

  getImageBucket() {
    return 'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev/images/';
  }

  getAvatarBucket() {
    return 'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev/';
  }
  async uploadAvatar(file: File): Promise<string> {
    const s3 = this.getS3Client();
    const key = `${Date.now()}-${file.name}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3.send(command);
    const bucketUrl = this.getAvatarBucket();
    return `${bucketUrl}${key}`;
  }
}
