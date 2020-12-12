/**
 * Please define all environment varaibles in this file.
 * The export statement is used when creating JavaScript modules to export live bindings to functions, objects,
 * or primitive values from the module so they can be used by other programs with the import statement
 */

let nonprod = { accountID: "699678132176", environment: "nonprod" };
let sandbox4 = { accountID: "407747792847", environment: "sandbox4" };

export let env = {
  environment: "nonprod",
  region: "us-east-1",
  application: "applicationName",
  accountID: nonprod.accountID,
};
