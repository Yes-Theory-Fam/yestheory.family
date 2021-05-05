import path from "path";
import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
import { theme as mockTheme } from ".";
import preactSerializer from "jest-preset-preact/src/serializer";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useTheme: () => mockTheme,
}));

initStoryshots({
  framework: "preact",
  configPath: path.join(__dirname, "..", ".storybook"),
  integrityOptions: { cwd: path.join(__dirname, "src", "stories") },
  test: multiSnapshotWithOptions(),
  snapshotSerializers: [preactSerializer],
});
