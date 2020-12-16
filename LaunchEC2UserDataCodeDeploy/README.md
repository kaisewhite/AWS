# How to configure an Amazon EC2 instance to work with CodeDeploy using CDK

### Step 1: Create an IAM instance profile

Create a const called `userData`. You'll need to wrap your user data in use `cdk.Fn.base64` otherwise you'll build fails with "Invalid BASE64 encoding of user data" error. The relevant YAML output looks like
You can just paste in the powershell commands in `powershell.ps`. I left them out to keep the example clean

```
const userData = cdk.Fn.base64(`COPY AND PASTE IN POWERSHELL COMMANDS`);
```

### Step 2: Verify that the profile has the correct access permissions

We need to create an IAM role and an instance profile.

```
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
```

Create the IAM instance profile and reference the role we just created.

```
    const CodeDeployIAMInstanceProfile = new iam.CfnInstanceProfile(this, "CodeDeployIAMInstanceProfile", {
      path: "/",
      instanceProfileName: CodeDeployEC2IAMRole.ref,
      roles: [CodeDeployEC2IAMRole.ref],
    });

```

### Step 3: Attach the IAM instance

## Resources

[How can I use launch configurations to automatically install the AWS CodeDeploy agent on an Amazon EC2 Windows instance?](https://aws.amazon.com/premiumsupport/knowledge-center/codedeploy-launch-config-windows/)

[Configure an Amazon EC2 instance to work with CodeDeploy](https://docs.aws.amazon.com/codedeploy/latest/userguide/instances-ec2-configure.html)

```

```
