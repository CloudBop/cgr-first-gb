const autoprefixer = require("autoprefixer");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = (env, argv) => {
    function isDevelopment() {
        return argv.mode === "development";
    }
    var config = {
        entry: { editor: "./src/editor.js", script: "./src/script.js" },
        output: {
            filename: "[name].bundle.js"
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false,
                            annotation: true
                        }
                    }
                })
            ]
        },
        plugins: [
            new CleanPlugin(),
            new MiniCSSExtractPlugin({
                chunkFilename: "[id].css",
                filename: chunkData => {
                    return chunkData.chunk.name === "script"
                        ? "style.bundle.css"
                        : "[name].bundle.css";
                }
            })
        ],
        devtool: isDevelopment() ? "cheap-module-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                plugins: [
                                    "@babel/plugin-proposal-class-properties"
                                ],
                                presets: [
                                    "@babel/preset-env",
                                    [
                                        "@babel/preset-react",
                                        {
                                            //
                                            // "pragma": "React.createElement",
                                            // "pragmaFrag": "React.Fragment",
                                            // "development": isDevelopment()
                                            //

                                            // using wordpress.react global src
                                            pragma: "wp.element.createElement",
                                            pragmaFrag: "wp.element.Fragment",
                                            development: isDevelopment()
                                        }
                                    ]
                                ]
                            }
                        },
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [autoprefixer()]
                            }
                        },
                        "sass-loader"
                    ]
                }
            ]
        },
        // don't bundle with webpack, use WP version
        externals: {
            jquery: "jQuery",
            "@wordpress/blocks": ["wp", "blocks"],
            "@wordpress/i18n": ["wp", "i18n"],
            "@wordpress/editor": ["wp", "editor"],
            "@wordpress/components": ["wp", "components"],
            "@wordpress/element": ["wp", "element"]
        }
    };
    return config;
};
