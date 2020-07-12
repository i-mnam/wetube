const path = require("path"); // import path from "path"
const autoprefixer = require("autoprefixer");
const ExtractCss = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");
const config = {
    mode: MODE,
    entry: ENTRY_FILE,
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: ExtractCss.extract([
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugin() {
                                return [
                                    autoprefixer({ browsers: "cover 99.5%" }),
                                ];
                            },
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ]),
            },
        ],
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js",
    },
    plugins: [new ExtractCss("style.css")]
};

module.exports = config;