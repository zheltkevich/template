// Modules/Plugins
const path = require('path');
const json5 = require('json5');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// eslint-disable-next-line no-console
console.log('=====================\n|| Production mode ||\n=====================\n');
module.exports = {
    mode: 'production',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },
    devtool: false,
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
                'public/manifest.json',
                {
                    from: 'public/icons',
                    to: './icons/',
                },
                {
                    from: 'public/favicon.ico',
                    to: './',
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
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            '...',
            new CssMinimizerPlugin(),
        ],
    },
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: './',
    },
};
