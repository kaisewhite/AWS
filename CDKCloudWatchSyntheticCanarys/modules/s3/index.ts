import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as iam from "@aws-cdk/aws-iam";
import { env } from "../../env";
import { s3BucketParameters as s3Buckets } from "../../parameters/s3-index";
import { s3BucketPolicyParameters as s3Policies } from "../../parameters/s3-index";

export class s3Bucket extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    s3Buckets.forEach((item) => {
      const S3Bucket = new s3.CfnBucket(this, `${item.bucketName}-S3Bucket`, {
        bucketName: item.bucketName,
        bucketEncryption: item.bucketEncryption,
      });
    });
  }
}

export class s3BucketPolicies extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    /**
     *
     */
    s3Policies.forEach((item) => {
      const S3BucketPolicy = new s3.CfnBucketPolicy(this, `${item.bucket}-S3BucketPolicy`, {
        bucket: item.bucket,
        policyDocument: item.policyDocument,
      });
    });
  }
}

export class s3BucketImportGrantAccess extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    /**
     * This will grant the iam role being created above access to the s3Bucket named 'csbs-mgmt-alfresco-cw-syn-canaries'
     * which is located in MGMT.
     */
    const bucket = s3.Bucket.fromBucketAttributes(this, "ImportedBucket", {
      bucketArn: "arn:aws:s3:::csbs-mgmt-alfresco-cw-syn-canaries",
    });
    const cwSynCanaryIamRole = iam.Role.fromRoleArn(this, "Role", `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`);
    bucket.grantReadWrite(cwSynCanaryIamRole);
  }
}
