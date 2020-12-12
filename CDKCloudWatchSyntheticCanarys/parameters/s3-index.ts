import { env } from "../env";

export let s3BucketParameters = [
  {
    bucketName: `cw-syn-results-${env.accountID}-${env.region}`,
    bucketEncryption: {
      serverSideEncryptionConfiguration: [
        {
          serverSideEncryptionByDefault: {
            sseAlgorithm: "AES256",
          },
        },
      ],
    },
  },
];

export let s3BucketPolicyParameters = [
  {
    bucket: `cw-syn-results-${env.accountID}-${env.region}`,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: {
            AWS: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
          },
          Action: "s3:*",
          Resource: `arn:aws:s3:::cw-syn-results-${env.accountID}-${env.region}/*`,
        },
      ],
    },
  },
];
