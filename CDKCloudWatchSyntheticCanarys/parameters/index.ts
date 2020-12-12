import { env } from "../env";
/**
 * To add a new repo, please create a new object within the below array and replicate the existing
 * object properties. Each object should is setup as an array. Each array will contain multiple objects with the same properties
 * in order to create multiple instances of the same resource
 */
export let vpcParameters = [
  {
    vpcName: `${env.environment}-vpc`,
    cidrBlock: "10.1.0.0/16",
    enableDnsSupport: true,
    enableDnsHostnames: true,
    instanceTenancy: "default",
    tags: [
      {
        key: "Application",
        value: env.application,
      },
    ],
  },
];

export let codeCommitParameters = [
  { repositoryName: "cybereval-auth", repositoryDescription: "Cyber Eval Auth Server" },
  //{ repositoryName: "cybereval-web", repositoryDescription: "Cyber Eval Web Server" },
  //{ repositoryName: "cybereval-api", repositoryDescription: "Cyber Eval API Server" },
];
