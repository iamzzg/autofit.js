const path = require("path");

module.exports = [
  {
    mode: "production",
    entry: "./autofit.js",
    output: {
      filename: "autofit.umd.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        type: "umd",
        name: "Autofit",
      },
    },
  },
  {
    mode: "production",
    entry: "./autofit.js",
    experiments: {
      outputModule: true,
    },
    output: {
      filename: "autofit.esm.js",
      path: path.resolve(__dirname, "dist"),
      library: {
        type: "module",
      },
    },
  },
];
