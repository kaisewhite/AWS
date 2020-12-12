#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkStack } from "../lib/cdk-stack";

import { env } from "../env";

let nonprod = { accountID: "699678132176", environment: "nonprod" };
let sandbox4 = { accountID: "407747792847", environment: "sandbox4" };

const app = new cdk.App();
new CdkStack(app, "CdkStack", {
  env: {
    account: "699678132176",
  },
});
