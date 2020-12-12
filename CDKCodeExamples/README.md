# CDK Code Examples

Reading the AWS CDK documention can sometimes be similar to peeling an onion. I've had a difficult time finding examples in Python since CDK favors TS/JS. So here are some code snippest for launching different resources.

### S3

#### [aws_cdk.aws_s3.Bucket](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-s3.Bucket.html)

```
s3.Bucket(self,"BuildArtifactBucket",
        bucket_name=f'nmls-app-react-artifact-{branch}-{account}-{region}',
        versioned=True,
        block_public_access=s3.BlockPublicAccess(block_public_acls=True, block_public_policy=True, ignore_public_acls=True),
        encryption=s3.BucketEncryption.S3_MANAGED,
        removal_policy=core.RemovalPolicy.DESTROY)

```
