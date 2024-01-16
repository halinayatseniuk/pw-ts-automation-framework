// import { test } from '@playwright/test';


// interface TestParams {
//     firstName: string;
//     lastName: string;
//   }

// exports.parametrizedTest = test.extend(
//     {
//       fixtures: Fixtures<{
//             firstName: "Value",
//             lastName: ""
//         }>
//     }
// )

import { test as base } from '@playwright/test';

export type TestOptions = {
    firstName: string;
    lastName: string;
};

export const parametrizedTest = base.extend<TestOptions>({
  firstName: "",
  lastName: "g"
});