import * as cdk from "@aws-cdk/core";
import * as synthetics from "@aws-cdk/aws-synthetics";
import * as cloudwatch from "@aws-cdk/aws-cloudwatch";
import { cwSyntheticCanaries as cwSynths } from "../../parameters/cw-index";
import { cloudWatchAlarms as cwAlarms } from "../../parameters/cw-index";

export class CloudWatchSyntheticsCanaryStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    /**
     * The forEach() method executes a provided function once for each array element.
     */
    cwSynths.forEach((item) => {
      const SyntheticsCanary = new synthetics.CfnCanary(this, `${item.name}-cw-syn`, {
        name: item.name,
        code: item.code,
        executionRoleArn: item.executionRoleArn,
        schedule: item.schedule,
        runConfig: item.runConfig,
        successRetentionPeriod: item.successRetentionPeriod,
        failureRetentionPeriod: item.failureRetentionPeriod,
        artifactS3Location: item.artifactS3Location,
        runtimeVersion: item.runtimeVersion,
        vpcConfig: item.vpcConfig,
        startCanaryAfterCreation: item.startCanaryAfterCreation,
      });
    });
  }
}

export class CloudWatchAlarmsStack extends cdk.NestedStack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.NestedStackProps) {
    super(scope, id, props);

    cwAlarms.forEach((item) => {
      const CloudWatchAlarm = new cloudwatch.CfnAlarm(this, `CloudWatchAlarm${item.alarmName}`, {
        alarmName: item.alarmName,
        alarmDescription: item.alarmDescription,
        actionsEnabled: item.actionsEnabled,
        metricName: item.metricName,
        namespace: item.namespace,
        statistic: item.statistic,
        period: item.period,
        evaluationPeriods: item.evaluationPeriods,
        datapointsToAlarm: item.datapointsToAlarm,
        threshold: item.threshold,
        comparisonOperator: item.comparisonOperator,
        treatMissingData: item.treatMissingData,
      });
    });
  }
}
