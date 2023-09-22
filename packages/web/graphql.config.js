const { readFile, writeFile } = require("fs/promises");
const { format } = require("prettier");

const formatFile = async (path) => {
  const content = await readFile(path, "utf-8");
  const formatted = format(content, { parser: "typescript" });
  await writeFile(path, formatted, "utf-8");
};

/** @type {import('graphql-config').IGraphQLConfig} */
const config = {
  projects: {
    client: {
      schema: [
        {
          "http://localhost:5000/graphql": {
            headers: {
              Cookie: "ytf-cookie-consent=0;",
            },
          },
        },
      ],
      documents: "./**/*.client.graphql",
      extensions: {
        codegen: {
          hooks: {
            afterAllFileWrite: async (...filePaths) => {
              await Promise.all(filePaths.map(formatFile));
            },
          },
          generates: {
            "src/__generated__/graphql.ts": {
              plugins: ["@atmina/only-enum-types"],
              config: {
                scalars: {
                  DateTime: "string",
                },
                enumsAsTypes: true,
                preResolveTypes: true,
              },
            },
            "src/": {
              preset: "near-operation-file-preset",
              presetConfig: {
                extension: ".generated.ts",
                baseTypesPath: "__generated__/graphql.ts",
              },
              plugins: [
                "@atmina/local-typescript-operations",
                "typescript-urql",
              ],
              config: {
                inlineFragmentTypes: "combine",
                urqlImportFrom: "@urql/next",
                gqlImport: "@urql/next#gql",
              },
            },
          },
        },
      },
    },

    server: {
      schema: [
        {
          "http://localhost:5000/graphql": {
            headers: {
              Cookie: "ytf-cookie-consent=0;",
            },
          },
        },
      ],
      documents: "./**/*.server.graphql",
      extensions: {
        codegen: {
          hooks: {
            afterAllFileWrite: async (...filePaths) => {
              await Promise.all(filePaths.map(formatFile));
            },
          },
          generates: {
            "src/": {
              preset: "near-operation-file-preset",
              presetConfig: {
                extension: ".generated.ts",
                baseTypesPath: "__generated__/graphql.ts",
              },
              plugins: [
                "@atmina/local-typescript-operations",
                "typescript-urql",
              ],
              config: {
                withHooks: false,
                inlineFragmentTypes: "combine",
                urqlImportFrom: "@urql/core",
                gqlImport: "@urql/core#gql",
              },
            },
          },
        },
      },
    },
  },
};

module.exports = config;
