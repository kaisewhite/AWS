## AWS

### Overview

AWS's API documentation can sometimes be like peeling an onion so here are a few code snippets of how to access different resources in AWS using languages like JavaScript, TypeScript, NodeJS, Python, etc....

| Description / URL                                                                                                                     | AWS Resource                  | Langauge       |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | -------------- |
| [Several buildspec.yaml files for different codebuild projects](https://github.com/kaisewhite/BuildSpec)                              | BuildSpec Files               | `yaml`         |
| [How to build CloudWatch Synthetic Canaries using CDK & TypeScript](https://github.com/kaisewhite/CloudWatch-Synthetic-Canaries)      | CloudWatch Synthetic Canaries | `TypeScript`   |
| [CDK Examples and Code Snippets](https://github.com/kaisewhite/AWS-CDK-Examples)                                                      | Cloud Development Kit         | `Python`       |
| [How to build nested stacks with CDK](https://github.com/kaisewhite/CDK-Nested-Stacks)                                                | Cloud Development Kit         | `TypeScript`   |
| [How to easily clone CodeCommit Repos](https://github.com/kaisewhite/Easily-Clone-CodeCommit-Repos)                                   | CodeCommit                    | `Command-Line` |
| [Authentication for ReactJS using AWS Cognito](https://github.com/kaisewhite/Cognito-Authentication-With-ReactJS)                     | Cognito                       | `JavaScript`   |
| [AWS Cognito Post Authentication Lambda - Insert data to MSSQL](https://github.com/kaisewhite/AWS-Cognito-Post-Authentication-Lambda) | Cognito                       | `NodeJS`       |
| [Insert AWS Athena Query Results into RDS MySQL using AWS Lambda](https://github.com/kaisewhite/Upload-Athena-Query-Results-To-RDS)   | Athena / RDS / Lambda         | `Python`       |

## Resources

- [This package provides a simple method for pushing and pulling from AWS CodeCommit](https://github.com/aws/git-remote-codecommit)
- [A credential helper for the Docker daemon that makes it easier to use Amazon Elastic Container Registry](https://github.com/awslabs/amazon-ecr-credential-helper)

## How to build/pull/push ECR images using different accounts

Install [amazon-ecr-credential-helper](https://github.com/awslabs/amazon-ecr-credential-helper)

1. Generate Auth Credentials

```
aws ecr get-login-password --region ${REGION} --profile ${PROFILE} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
```

2. Build the image

```
docker build -f ./Dockerfile --build-arg ${ARGUMENT} -t ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${REPOSITORYNAME}:${IMAGETAG} .
```

3. Push the image to ECR

```
   AWS_PROFILE=${PROFILE} docker push ${ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/${REPOSITORYNAME}:${IMAGETAG}
```

Sample ~ ./docker/config.json

```
{
  "experimental" : "enabled",
  "HttpHeaders" : {
    "User-Agent" : "Docker-Client/19.03.13-beta2 (darwin)"
  },
  "auths" : {
    "xxxx.dkr.ecr.us-east-1.amazonaws.com" : {
    },
    "xxxx2.dkr.ecr.us-east-2.amazonaws.com" : {
    },
    "https://index.docker.io/v1/" : {
    }
  },
  "stackOrchestrator" : "kubernetes",
  "credsStore" : "desktop",
  "credHelpers": {
    "xxxx.dkr.ecr.us-east-1.amazonaws.com": "ecr-login",
    "xxxx2.dkr.ecr.us-east-2.amazonaws.com": "ecr-login",
    "https://index.docker.io/v1/": "desktop",

  }
}
```
