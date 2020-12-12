import { env } from "../env";

export let cwSyntheticCanaries = [
  {
    name: "content-service-live",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-content-service-live.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/content-service-live`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "content-service-ready",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-content-service-ready.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/content-service-ready`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "content-service-sum",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-content-service-sum.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/content-service-sum`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "download-service",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-download-service.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/download-service`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "pdftron-server",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-pdftron-server.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/pdftron-server`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "share-service",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-share-service.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/share-service`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
  {
    name: "token-service",
    code: {
      handler: "apiCanaryBlueprint.handler", // Name of the export handler in the canary script
      s3Bucket: "csbs-mgmt-alfresco-cw-syn-canaries", // Location of the zipfile (Note the S3 Bucket has to be created before hand)
      s3Key: `csbs-alfresco-token-service.zip`,
    },
    executionRoleArn: `arn:aws:iam::${env.accountID}:role/CloudWatchSyntheticsRole`,
    schedule: {
      expression: "rate(5 minutes)",
      durationInSeconds: "0",
    },
    runConfig: {
      timeoutInSeconds: 300,
      memoryInMb: 1000,
      activeTracing: false,
    },
    successRetentionPeriod: 31,
    failureRetentionPeriod: 31,
    artifactS3Location: `s3://cw-syn-results-${env.accountID}-${env.region}/canary/token-service`,
    runtimeVersion: "syn-nodejs-2.2",
    vpcConfig: {
      vpcId: "vpc-0845cc5232f7b37ed", //This will only accept a string
      subnetIds: ["subnet-062c110ab35d1d77f", "subnet-04dd2f7d9ed7eefa5"], //This will accept a string or an array of strings
      securityGroupIds: ["sg-00646352d2685d1bc"], //This will accept a string or an array of strings
    },
    startCanaryAfterCreation: true,
  },
];

export let cloudWatchAlarms = [
  {
    alarmName: "content-service-live",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "content-service-ready",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "content-service-sum",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "download-service",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "share-service",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "token-service",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
  {
    alarmName: "pdftron-server",
    alarmDescription: "Synthetics alarm metric: SuccessPercent  LessThanThreshold 90",
    actionsEnabled: true,
    metricName: "SuccessPercent",
    namespace: "CloudWatchSynthetics",
    statistic: "Average",
    period: 300,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 90,
    comparisonOperator: "LessThanThreshold",
    treatMissingData: "breaching",
  },
];
