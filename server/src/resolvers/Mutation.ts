import { AuthMutations } from "./AuthMutations";
import * as ObjectiveMutations from "./ObjectiveMutations";

module.exports = {
  ...AuthMutations,
  ...ObjectiveMutations,
};
