// Modules/Plugins
const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { mode, entry, resolve, optimization, output } = require('./webpack.config.js');


console.log('######################\n** Development mode **\n######################\n'); // eslint-disable-line no-console
module.exports = {
    mode,
    entry,
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        client: {
            logging: 'none',
            overlay: false,
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
                    from: 'public/**/*',
                    to: '.',
                    globOptions: {
                        ignore: ['index.html'],
                    },
                },
            ],
        }),
        new StylelintPlugin({
            fix: true,
        }),
        new ESLintPlugin({
            fix: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
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
