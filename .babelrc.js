plugins: [
  [
    "import",
    {
      libraryName: "@arco-design/mobile-react",
      libraryDirectory: "esm", // 注意如果是 SSR 环境，这里需使用 `cjs`
      style: (path) => `${path}/style`,
    },
    "@arco-design/mobile-react",
  ],
  [
    "import",
    {
      libraryName: "@arco-design/mobile-react/esm/icon", // 注意如果是 SSR 环境，这里需将 `esm` 替换为 `cjs`
      libraryDirectory: "",
      camel2DashComponentName: false,
    },
    "@arco-design/mobile-react/esm/icon",
  ],
];
