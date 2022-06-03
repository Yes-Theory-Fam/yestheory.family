import path from "path";
import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
import { theme as mockTheme } from "./src";

// const mockBreakpointPatchedTheme = {
//   ...mockTheme,
//   __breakpoints: mockTheme.breakpoints,
// };
//
// jest.mock("@chakra-ui/system", () => ({
//   ...jest.requireActual("@chakra-ui/system"),
//   useTheme: () => mockBreakpointPatchedTheme,
// }));

initStoryshots({
  framework: "react",
  configPath: path.join(__dirname, ".storybook"),
  integrityOptions: { cwd: __dirname },
  test: multiSnapshotWithOptions(),
  // TODO check if this needs a serializer
});
