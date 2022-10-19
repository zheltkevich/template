// Modules/Plugins
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    devtool: false,
    devServer: {
        client: {
            logging: 'none',
        },
    },
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
        new GenerateSW({
            cleanupOutdatedCaches: true,
            skipWaiting: true,
            clientsClaim: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            chunkFilename: '[contenthash].css',
        }),
    ],
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
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
