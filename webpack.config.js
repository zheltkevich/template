const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const devMode = process.env.NODE_ENV !== "production";
const devMode = true;
console.log(`Development mode: ${devMode}`);

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Stream',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
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
                    "sass-loader",
                ],
                // test: /\.css$/i,
                // use: [MiniCssExtractPlugin.loader, 'css-loader'],
                // use: ['style-loader', 'css-loader'],
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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
};

// const path = require('path');

// module.exports = (env) => {
//   // Use env.<YOUR VARIABLE> here:
//   console.log('Goal: ', env.goal); // 'local'
//   console.log('Production: ', env.production); // true

//   return {
//     entry: './src/app.js',
//     output: {
//       filename: 'bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//   };
// };