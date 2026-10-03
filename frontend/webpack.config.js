import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default (env, argv) => ({
    entry: "./src/main.js",
    output: {
        path: path.resolve(import.meta.dirname, "dist"),
        filename: "bundle.[contenthash].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            favicon: "./images/favicon.svg",
        }),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css",
        }),
    ],
    devtool: argv.mode === "development" ? "source-map" : false,
});
