# Welcome to your CDK TypeScript project!

This is a base template for TypeScript development with CDK.

## Prerequisites:

install the AWS CDK Toolkit. The toolkit is a command-line utility which allows you to work with CDK apps.

Open a terminal session and run the following command:

```
npm install -g aws-cdk
```

### References

- https://cdkworkshop.com/

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
- `cdk deploy --profile nonprod` deploy to a specific profile

Project Structure

| File/Folder                     | Description                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `modules/{Service}/index.ts`    | Used to define the individual stacks for each AWS service to be created                     |
| `parameters/{Service}-index.ts` | This file will define all parameters for each AWS service                                   |
| `env.ts`                        | Stores global variables to be called throughout the project                                 |
| `buildspec.yaml`                | This file is needed if we want to run this project inside of Pipeline using AWS Codebuild   |
| `cdk.json`                      | Tells the CDK Toolkit how to execute your app and defines any additional plugins to be used |

## CloudWatch Synthetic Canaries

The zip files to be deployed are all stored in an S3 bucket in MGMT called [csbs-mgmt-alfresco-cw-syn-canaries](https://s3.console.aws.amazon.com/s3/buckets/csbs-mgmt-alfresco-cw-syn-canaries?region=us-east-1&tab=objects#)

[CodeCommitLibrary](https://console.aws.amazon.com/codesuite/codecommit/repositories/dev-alfresco-cdk-synthethics-canary/browse?region=us-east-1)

Each zip file contains the lambda code to hit a specific endpoint URL. There is no way to update the code through this stack because the class `CfnCanary` will only accept a zip file.

To workaround that there are functions in each script used to help deletermine what environment the canary is in so that it used the right environment variables.

In the example below we are calling SSM to retrieve the account number and based on the account number provided, that will deletermine which variable to feed into the strings/URL's

Async function to retrieve the AWS accountID by calling STS

```
const getAccountID = async function () {
  var sts = new AWS.STS();
  const data = await sts.getCallerIdentity({}).promise();
  return JSON.stringify(data.Account);
};
```

Calls function above to retrieve the account number and then uses the ternary operator to update the variable

```
var env =
    JSON.parse(awsAccountID) == "699********"
      ? "dev"
      : JSON.parse(awsAccountID) == "407********"
      ? "sandbox4"
      : JSON.parse(awsAccountID) == "318********"
      ? "stage"
      : JSON.parse(awsAccountID) == "305********"
      ? "prod"
      : "UNKNOWN";
  const adminPassword = await getParameter(`/cft/ses/${env}-alfresco-alfresco_password`);
  const url = `https://alfresco-ses-${env}-internal.srrcsbs.org/alfresco/s/enterprise/admin/admin-systemsummary`;
```
