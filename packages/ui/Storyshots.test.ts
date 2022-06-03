import { toCSSVar as mockToCSSVar } from "@chakra-ui/react";
import path from "path";
import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
import { theme as mockTheme } from "./src";

jest.mock("@chakra-ui/system", () => ({
  ...jest.requireActual("@chakra-ui/system"),
  useTheme: () => mockToCSSVar(mockTheme),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useTheme: () => mockTheme,
}));

initStoryshots({
  framework: "react",
  configPath: path.join(__dirname, ".storybook"),
  integrityOptions: { cwd: __dirname },
  test: multiSnapshotWithOptions(),
  // TODO check if this needs a serializer
});
