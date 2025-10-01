import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { storageValidator } from '@common/validators/envValidator';

export class StorageService {
  constructor(
    private readonly accessKey: string,
    private readonly secretKey: string,
    private readonly endpoint: string,
    private bucketName: string,
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

  setBucket(bucket: string) {
    this.bucketName = bucket;
  }
  // getImageBucket() {
  //   return 'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev/';
  // } TODO : Implement image uploading as well

  getResumeBucket() {
    return 'https://pub-6182cabd0dc4482a88462c9d6bd62c4f.r2.dev/';
  }
  getAvatarBucket() {
    return 'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev/';
  }
  async uploadAvatar(file: File): Promise<string> {
    const s3 = this.getS3Client();
    const key = `${Date.now()}-${file.name}`;
    this.setBucket('avatars');

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

  async uploadResume(file: File): Promise<string> {
    const s3 = this.getS3Client();
    const key = `${Date.now()}-${file.name}`;
    this.setBucket('resumes');

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: new Uint8Array(await file.arrayBuffer()),
      ContentType: file.type,
    });

    await s3.send(command);
    const bucketUrl = this.getResumeBucket();
    return `${bucketUrl}${key}`;
  }
}

export const storageService = new StorageService(
  storageValidator.vars.R2_ACCESS_KEY,
  storageValidator.vars.R2_SECRET_ACCESS_KEY,
  storageValidator.vars.R2_ENDPOINT,
  storageValidator.vars.R2_BUCKET_NAME,
);
