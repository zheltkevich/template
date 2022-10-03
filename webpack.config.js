// Modules/Plugins
const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const devMode = process.env.NODE_ENV !== "production";

// DevMode
const devMode = false;
const mode = devMode ? 'development' : 'production';
const CSS = devMode ? '[name].css' : '[contenthash].css';
const JS = devMode ? '[name].js' : '[contenthash].js'; // [fullhash] or [chunkhash] or [contenthash]

console.log(devMode ? '** Development mode **\n' : '|| Production mode ||\n');
module.exports = {
    mode: mode,
    entry: {
        index: './src/index.js',
    },
    devtool: devMode ? 'inline-source-map' : false,
    devServer: {
        static: './dist',
    },
    resolve: {
        alias: {
            '@css': path.resolve(__dirname, 'src/styles/css/'),
            '@scss': path.resolve(__dirname, 'src/styles/scss/'),
            '@docs': path.resolve(__dirname, 'src/assets/docs/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@modules': path.resolve(__dirname, 'src/js/modules/'),
            '@utils': path.resolve(__dirname, 'src/js/utils/'),
        },
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Stream',
        }),
        new MiniCssExtractPlugin({
            filename: CSS,
            chunkFilename: CSS,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: '// Additional data is working!!!',
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ],
    },
    output: {
        filename: JS,
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
