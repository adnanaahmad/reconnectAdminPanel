const serverUrl = 'https://narsunprojects.com:5001';
const clientUrl = 'https://reconnect-narsun.web.app';

export const environment = {
  production: true,
  apiUrl: `${serverUrl}/api`,
  serverUrl: `${serverUrl}`,
  clientUrl: `${clientUrl}`,
  s3BucketName: 'reconnect-s3',
  s3Bucket: {
    accessKeyId: 'AKIAYFXOPQIA7O6AHXFJ',
    secretAccessKey: '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',
    region: 'us-east-2'
  }
};
