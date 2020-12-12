import { env } from "../env";
import * as cdk from "@aws-cdk/core";
import { IAMPolicyStack, IAMRoleStack } from "../modules/iam/index";
import { s3BucketPolicies, s3Bucket, s3BucketImportGrantAccess } from "../modules/s3/index";
import { CloudWatchSyntheticsCanaryStack, CloudWatchAlarmsStack } from "../modules/cloudwatch/index";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    /**
     * NESTED STACKS
     */
    //new CodeCommitStack(this, "CodeCommit");
    /**
     * The IAM role and policies might need to be created prior to running the stack.
     */
    const stack1 = new IAMPolicyStack(this, "IAMPolicyStack"); // Creates IAM Policies
    const stack2 = new IAMRoleStack(this, "IAMRoleStack"); // Creates IAM Roles
    const stack3 = new s3Bucket(this, "s3Bucket"); // Creates s3 Buckets
    const stack4 = new s3BucketPolicies(this, "s3BucketPolicies"); // Creates S3 Bucket Policies
    //const stack5 = new s3BucketImportGrantAccess(this, "s3BucketImportGrantAccess"); // Imports an existing bucket and grants an IAM role access
    const stack6 = new CloudWatchSyntheticsCanaryStack(this, "CloudWatchSyntheticsCanaryStack"); // Creates Canaries

    stack2.addDependency(stack1);
    stack3.addDependency(stack2);
    stack4.addDependency(stack3);
    //stack5.addDependency(stack4);
    stack6.addDependency(stack4);

    //new CloudWatchStack(this, "CloudWatchStack");

    /**
     * SINGLE STACKS
     */
    //new VPCStack(this, "VPCStack", { env: { region: env.region } }); //non nested
  }
}

const app = new cdk.App();
new CdkStack(app, "CdkStack", { env: { region: env.region } });
app.synth();
