import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import { env } from "../../env";
import { vpcParameters as params } from "../../parameters/index";

export class VPCStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    params.forEach((item) => {
      const EC2VPC = new ec2.CfnVPC(this, item.vpcName, {
        cidrBlock: item.cidrBlock,
        enableDnsSupport: item.enableDnsSupport,
        enableDnsHostnames: item.enableDnsHostnames,
        instanceTenancy: item.instanceTenancy,
        tags: item.tags,
      });
    });
  }
}

const app = new cdk.App();
new VPCStack(app, "VPCStack", { env: { region: env.region } });
app.synth();
