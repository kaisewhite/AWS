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

Project Structure

| File/Folder                     | Description                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| `modules/{AWSService}/index.ts` | Used to define the individual stacks for each AWS service to be created                     |
| `parameters/index.ts`           | This file will define all parameters for each AWS service                                   |
| `env.ts`                        | Stores global variables to be called throughout the project                                 |
| `buildspec.yaml`                | This file is needed if we want to run this project inside of Pipeline using AWS Codebuild   |
| `cdk.json`                      | Tells the CDK Toolkit how to execute your app and defines any additional plugins to be used |
