## AWS

### Overview

AWS's API documentation can sometimes be like peeling an onion so here are a few code snippets of how to access different resources in AWS using languages like JavaScript, TypeScript, NodeJS, Python, etc....

| AWS Resource           | Description / URL                                                                                                           | Langauge     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Security Token Service | [Using STS to access your AWS AccountID](https://github.com/kaisewhite/AWS/tree/master/SecurityTokenService)                | `NodeJS`     |
| Parameter Store        | [Accessing SSM Parameters in NodeJS](https://github.com/kaisewhite/AWS/tree/master/SystemsManagerParameterStore)            | `NodeJS`     |
| Cloud Development Kit  | [How to create nested stacks using AWS Cloud Development kit](https://github.com/kaisewhite/AWS/tree/master/CDKNestedStack) | `TypeScript` |
| Athena                 | [How to insert AWS Athena results into a MySQL database]()                                                                  | `Python`     |
| CodeBuild              | [This folder contains different buildspec.yaml files for codebuild projects]()                                              | `yaml`       |

## Resources

- [This package provides a simple method for pushing and pulling from AWS CodeCommit](https://github.com/aws/git-remote-codecommit)
- [A credential helper for the Docker daemon that makes it easier to use Amazon Elastic Container Registry](https://github.com/awslabs/amazon-ecr-credential-helper)

## How to easily clone CodeCommit Repos

Install [AWS git-remote-commit](https://github.com/aws/git-remote-codecommit)

After the installation you can use the following command to clone any repo:

```
git clone codecommit://${PROFILE}@${REPOISTORY_NAMEE}
```

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
