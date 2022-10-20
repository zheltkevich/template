// Modules/Plugins
const path = require('path');
const json5 = require('json5');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Configuration utils
const getMode = () => process.env.NODE_ENV;
const isProductionMode = getMode() === 'production';
const isDevelopmentMode = getMode() === 'development';
const resolveSettings = () => {
    if (isProductionMode) return require('./webpack.production.js');
    else if (isDevelopmentMode) return require('./webpack.development.js');
};
const printMessage = () => {
    if (isProductionMode) return '=====================\n|| Production mode ||\n=====================\n';
    else if (isDevelopmentMode) return '######################\n** Development mode **\n######################\n';
};
const { devtool, devServer, plugins, optimization, output } = resolveSettings();

console.info(printMessage()); // eslint-disable-line no-console

// Settings
module.exports = {
    mode: getMode(),
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    devtool,
    devServer,
    stats: 'minimal',
    resolve: {
        alias: {
            '@css': path.resolve(__dirname, 'src/styles/css/'),
            '@scss': path.resolve(__dirname, 'src/styles/scss/'),
            '@docs': path.resolve(__dirname, 'src/assets/docs/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
            '@images': path.resolve(__dirname, 'public/images/'),
            '@modules': path.resolve(__dirname, 'src/js/modules/'),
            '@utils': path.resolve(__dirname, 'src/js/utils/'),
        },
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
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
