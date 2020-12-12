import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";

import { iamManagedPolicyParameters as iamPolicies } from "../../parameters/iam-index";
import { iamRoleParameters as iamRoles } from "../../parameters/iam-index";

export class IAMPolicyStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    /**
     *
     */

    const policy = iamPolicies.forEach((item) => {
      const IAMManagedPolicy = new iam.CfnManagedPolicy(this, `${item.managedPolicyName}-IAMManagedPolicy`, {
        managedPolicyName: item.managedPolicyName,
        path: item.path,
        policyDocument: item.policyDocument,
      });
    });
  }
}

export class IAMRoleStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    iamRoles.forEach((item) => {
      const IAMRole = new iam.CfnRole(this, `${item.roleName}-IAMRole`, {
        path: item.path,
        roleName: item.roleName,
        assumeRolePolicyDocument: item.assumeRolePolicyDocument,
        maxSessionDuration: item.maxSessionDuration,
        managedPolicyArns: item.managedPolicyArns,
        description: item.description,
      });
    });
  }
}
