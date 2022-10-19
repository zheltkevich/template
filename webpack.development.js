// Modules/Plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    devtool: 'source-map',
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
};
