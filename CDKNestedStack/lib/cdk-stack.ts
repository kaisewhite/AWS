import { env } from "../env";
import * as cdk from "@aws-cdk/core";
import { CodeCommitStack } from "../modules/codecommit/index";
import { VPCStack } from "../modules/vpc/index";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    /**
     * NESTED STACKS
     */
    new CodeCommitStack(this, "CodeCommit");

    /**
     * SINGLE STACKS
     */
    new VPCStack(this, "VPCStack", { env: { region: env.region } }); //non nested
  }
}

const app = new cdk.App();
new CdkStack(app, "CdkStack", { env: { region: env.region } });
app.synth();
