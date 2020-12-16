import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as iam from "@aws-cdk/aws-iam";

/**
 * *********** Constants ****************
 */

const userData = cdk.Fn.base64(`<powershell>
Set-ExecutionPolicy RemoteSigned -Force
Import-Module AWSPowerShell
$REGION = (ConvertFrom-Json (Invoke-WebRequest -Uri http://169.254.169.254/latest/dynamic/instance-identity/document -UseBasicParsing).Content).region
New-Item -Path c:\temp -ItemType "directory" -Force
powershell.exe -Command Read-S3Object -BucketName aws-codedeploy-$REGION -Key latest/codedeploy-agent-updater.msi -File c:\temp\codedeploy-agent-updater.msi
// Start-Sleep -Seconds 30 *optional
c:\temp\codedeploy-agent-updater.msi /quiet /l c:\temp\host-agent-updater-log.txt
</powershell>`);
export class GasatraqStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * ******************* IAM **************************
     */
    const CodeDeployEC2IAMRole = new iam.CfnRole(this, "CodeDeployEC2IAMRole", {
      path: "/",
      roleName: "CodeDeployEC2Role",
      assumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "",
            Effect: "Allow",
            Principal: {
              Service: "ec2.amazonaws.com",
            },
            Action: "sts:AssumeRole",
          },
        ],
      },
      maxSessionDuration: 3600,
      managedPolicyArns: ["arn:aws-AWS::Region:iam::aws:policy/AmazonS3FullAccess", "arn:aws-AWS::Region:iam::aws:policy/CloudWatchAgentServerPolicy"],
      description: "Allows EC2 instances to call AWS services on your behalf. s3 and cloudwatch",
    });

    const CodeDeployIAMInstanceProfile = new iam.CfnInstanceProfile(this, "CodeDeployIAMInstanceProfile", {
      path: "/",
      instanceProfileName: CodeDeployEC2IAMRole.ref,
      roles: [CodeDeployEC2IAMRole.ref],
    });

    const EC2Instance = new ec2.CfnInstance(this, "EC2Instance", {
      imageId: "ami-0eb5d7d784da26c19", //FROM AN EXISTING IMAGE
      instanceType: "t2.medium",
      keyName: "INSERT KEY NAME (OPTIONAL)",
      availabilityZone: "us-gov-west-1b",
      tenancy: "default",
      subnetId: "REPLACE ME",
      ebsOptimized: false,
      securityGroupIds: ["REPLACE ME"],
      sourceDestCheck: true,
      blockDeviceMappings: [
        {
          deviceName: "/dev/sda1",
          ebs: {
            encrypted: true,
            volumeSize: 100,
            volumeType: "gp2",
            deleteOnTermination: true,
          },
        },
        {
          deviceName: "xvdb",
          ebs: {
            encrypted: true,
            volumeSize: 30,
            volumeType: "gp2",
            deleteOnTermination: true,
          },
        },
      ],
      iamInstanceProfile: CodeDeployEC2IAMRole.ref,
      userData: userData,
      tags: [
        {
          key: "Application",
          value: "REPLACE ME", // EX: SHAREPOINT
        },
        {
          key: "Version",
          value: "REPLACE ME", // EX: 2.3
        },
        {
          key: "Environment",
          value: "REPLACE ME", // EX: DEV, QA, STAG
        },
      ],
      hibernationOptions: {
        configured: false,
      },
    });
  }
}
