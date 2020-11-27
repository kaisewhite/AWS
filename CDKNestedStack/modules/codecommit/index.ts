import { env } from "../../env";
import { codeCommitParameters as params } from "../../parameters/index";

import * as cdk from "@aws-cdk/core";
import * as codecommit from "@aws-cdk/aws-codecommit";

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

//const app = new cdk.App();
//new CodeCommitStack(app, "codecommit", { env: { region: env.region } });
//app.synth();
