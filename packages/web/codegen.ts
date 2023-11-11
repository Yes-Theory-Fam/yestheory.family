import { CodegenConfig } from "@graphql-codegen/cli";
import { readFile, writeFile } from "fs/promises";
import { format } from "prettier";

const formatFile = async (path: string) => {
  const content = await readFile(path, "utf-8");
  const formatted = format(content, { parser: "typescript" });
  await writeFile(path, formatted, "utf-8");
};

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "http://localhost:5000/graphql": {
      headers: {
        Cookie: "ytf-cookie-consent=0;",
      },
    },
  },
  documents: "./**/*.graphql",
  hooks: {
    afterAllFileWrite: async (...filePaths: string[]) => {
      await Promise.all(filePaths.map(formatFile));
    },
  },
  generates: {
    "src/__generated__/graphql.ts": {
      plugins: [
        "@atmina/only-enum-types",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        scalars: {
          DateTime: "string",
        },
        enumsAsTypes: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;
