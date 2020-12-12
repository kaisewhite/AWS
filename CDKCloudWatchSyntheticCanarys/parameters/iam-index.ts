import { env } from "../env";
export let iamManagedPolicyParameters = [
  {
    managedPolicyName: "CloudWatchSyntheticsPolicy",
    path: "/",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Action: "cloudwatch:PutMetricData",
          Resource: "*",
          Condition: {
            StringEquals: {
              "cloudwatch:namespace": "CloudWatchSynthetics",
            },
          },
        },
        {
          Effect: "Allow",
          Action: ["s3:PutObject", "logs:CreateLogStream", "logs:CreateLogGroup", "logs:PutLogEvents", "s3:GetBucketLocation"],
          Resource: [
            `arn:aws:logs:${env.region}:${env.accountID}:log-group:/aws/lambda/cwsyn-*`,
            `arn:aws:s3:::cw-syn-results-${env.accountID}-${env.region}/canary/*`,
          ],
        },
        {
          Effect: "Allow",
          Action: ["ec2:CreateNetworkInterface", "s3:ListAllMyBuckets", "ec2:DescribeNetworkInterfaces", "ec2:DeleteNetworkInterface", "xray:*"],
          Resource: "*",
        },
      ],
    },
  },
  {
    managedPolicyName: "AllowSSM",
    path: "/",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "VisualEditor0",
          Effect: "Allow",
          Action: ["ssm:DescribeParameters", "ssm:GetParameters", "ssm:GetParameter"],
          Resource: "*",
        },
      ],
    },
  },
];

export let iamRoleParameters = [
  {
    path: "/",
    roleName: "CloudWatchSyntheticsRole",
    assumeRolePolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Effect: "Allow", Principal: { Service: "lambda.amazonaws.com" }, Action: "sts:AssumeRole" }],
    },
    maxSessionDuration: 3600,
    managedPolicyArns: [`arn:aws:iam::${env.accountID}:policy/AllowSSM`, `arn:aws:iam::${env.accountID}:policy/CloudWatchSyntheticsPolicy`],
    description: "Allows Lambda functions to call AWS services on your behalf.",
  },
];
