export class StorageValidator {
  public vars: Record<string, string> = {};
  constructor() {
    this.validateEnv();
  }

  private validateEnv() {
    const requiredEnvVars = [
      'R2_ACCESS_KEY',
      'R2_SECRET_ACCESS_KEY',
      'R2_ENDPOINT',
      'R2_BUCKET_NAME',
    ];

    requiredEnvVars.forEach((envVar) => {
      if (!Bun.env[envVar]) {
        throw new Error(`Missing environment variable: ${envVar}`);
      }
      this.vars[envVar] = Bun.env[envVar];
    });
  }
}

export const storageValidator = new StorageValidator();
