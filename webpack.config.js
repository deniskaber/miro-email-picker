const path = require("path");

module.exports = {
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "dist"),
        library: "EmailsInput",
        libraryTarget: "var",
        libraryExport: "default",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".css"],
    },
};
