# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## How do add/update environment variables

1. All environment varibales are stored in the file **./env.ts**
2. When you add a new property and value it should look like this:

```
export let env = {
  environment: "dev",
  region: "us-gov-west-1",
  application: "Cyber Eval",
};

```

The export statement is used when creating JavaScript modules to export live bindings to functions, objects, or primitive values from the module so they can be used by other programs with the import statement

## How to add new resources to this project

1.  Open the folder **Parameters** and open the file **Ex: "index.ts"**.
2.  Create and export an object with the name of the AWS resource that takes in an array of objects. The property of each object will be the required properties of the AWS resource that you want to create like the example below. By doing so we allow ourselves to create multiple instances of the same resource by feeding an array of strings into forEach loop located in **Modules/codecommit/index.ts**

**./Parameters/index.ts**

```
export let codeCommitParameters = [
  { repositoryName: "cyberEvalAuthServer", repositoryDescription: "Cyber Eval Auth API Server" },
  { repositoryName: "cyberEvalWebServer", repositoryDescription: "Cyber Eval Auth API Server" },
  { repositoryName: "cyberEvalAPIServer", repositoryDescription: "Cyber Eval Auth API Server" },
];
```

3.  Create a new folder under **"Modules"**. You should name this folder with the name of the AWS resource you want to create. **Ex: Modules/CodeCommit**
4.  Within **Modules/CodeCommit**, create a new file and name it **index.ts**. In the **index.ts** file this is where you will define the CDK stack so your code should look similar to this.

```
import { env } from "../../env"; //Import the general environment variables
import { parameters as params } from "../../parameters/index"; //Import the parameters we created earlier
import * as cdk from "@aws-cdk/core";
import * as codecommit from "@aws-cdk/aws-codecommit"; //Import the module of the resource we want to create

export class CodeCommitStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * The forEach() method executes a provided function once for each array element.
     */
    params.forEach((item) => {
      const CodeCommitRepository = new codecommit.CfnRepository(this, `${item.repositoryName}-CodeCommitRepository`, {
        repositoryDescription: item.repositoryDescription,
        repositoryName: item.repositoryName,
      });
    });
  }
}

const app = new cdk.App();
new CodeCommitStack(app, "codecommit", { env: { region: env.region } });
app.synth();
```

5. Now lets go to the folder **/lib** and open the file **cdk-stack.ts**
6. We need to import the class from **./modules/codecommit/index.ts**, and call the stack name by adding in the following line:

```
import { CodeCommitStack } from "../modules/codecommit";
...
...
...
...
new CodeCommitStack(app, "codeCommitStack"); //instaniate a new instance of the stack

```

7. So your code should now look similar to this:

```
import * as cdk from "@aws-cdk/core";
import { CodeCommitStack } from "../modules/codecommit";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const app = new cdk.App();
    new CodeCommitStack(app, "CodeCommitStack");
  }
}

```

8. If we want nested stacks then you'll need to modify your code to look like this instead:
   **./lib/cdk-stack.ts**

```
export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new CodeCommitStack(this, "CodeCommit");
  }
}

const app = new cdk.App();
new CdkStack(app, "CdkStack");
app.synth();
```

Above you can see that we changed the scope of the nestedstack to the parent stack using the keyword **'this'**

In **./modules/codecommit/index.ts** we need to change 'stack' to 'NestedStack'. See Below.

```
export class CodeCommitStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    /**
     * The forEach() method executes a provided function once for each array element.
     */
    params.forEach((item) => {
      const CodeCommitRepository = new codecommit.CfnRepository(this, `${item.repositoryName}-CodeCommitRepository`, {
        repositoryDescription: item.repositoryDescription,
        repositoryName: item.repositoryName,
      });
    });
  }
}
```

## Naming Conventions

```
IAM Managed Policies:
    cybereval-stag-codebuild-policy

IAM Roles:
    cybereval-stag-codepipeline-role

VPC:
    cybereval-vpc (10.1.0.0/16)

Route Table:
    cybereval-public-rt
    cybereval-private-rt

Subnets:
    cybereval-public-1a - 10.1.1.0/24 - (associated with ALB's)
    cybereval-private-1a - 10.1.2.0/24 - (containers go here)
    cybereval-public-1b -  10.1.3.0/24 - (associated with ALB's)
    cybereval-private-1b - 10.1.4.0/24 - (containers go here)

Security Groups:
    cybereval-dev-sg
    cybereval-stag-sg
    cybereval-prod-sg

Load Balancers:
    cybereval-dev-alb
    cybereval-stag-alb
    cybereval-prod-alb

Target Groups (6x)
    cybereval-dev-web-tg
    cybereval-dev-api-tg
    cybereval-stag-web-tg
    cybereval-stag-api-tg
    cybereval-prod-web-tg
    cybereval-prod-api-tg

Database

ECR
    cybereval (different tags: dev, stag, prod)

ECS Task Definition
    cybereval-dev-web-td or cybereval-web-td
    cybereval-dev-api-td

ECS Service:
    cybereval-dev-web-service
    cybereval-stag-web-service
    cybereval-prod-web-service
    cybereval-dev-api-service
    cybereval-stag-api-service
    cybereval-prod-api-service

ECS Cluster:
    cybereval-dev-cluster
    cybereval-stag-cluster
    cybereval-prod-cluster

CodeCommit
    cybereval-web
    cybereval-api

CodeBuild:
    cybereval-dev-web-cbp
    cybereval-dev-api-cbp
    cybereval-stag-web-cbp
    cybereval-stag-api-cbp
    cybereval-prod-web-cbp
    cybereval-prod-api-cbp

CodePipeline:
    cybereval-dev-web
    cybereval-dev-api
    cybereval-stag-web
    cybereval-stag-api
    cybereval-prod-web
    cybereval-prod-api
```
