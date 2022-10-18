// Modules/Plugins
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const { mode, entry, resolve, optimization, output } = require('./webpack.config.js');

console.log('=====================\n|| Production mode ||\n=====================\n'); // eslint-disable-line no-console
module.exports = {
    mode,
    entry,
    devtool: false,
    devServer: {
        client: {
            logging: 'none',
        },
    },
    stats: 'minimal',
    resolve,
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/',
                    to: '.',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            cleanupOutdatedCaches: true,
            skipWaiting: true,
            clientsClaim: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            chunkFilename: '[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
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
    optimization,
    output,
};
