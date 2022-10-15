// Modules/Plugins
const path = require('path');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// eslint-disable-next-line no-console
console.log('######################\n** Development mode **\n######################\n');
module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    devtool: 'inline-source-map',
    devServer: {
        client: {
            logging: 'none',
        },

    },
    stats: 'minimal',
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
            template: './public/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/favicon.ico',
                    to: '.',
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
};
