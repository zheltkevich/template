const path = require('path');
const process = require('process');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const mode = () => process.env.NODE_ENV;
const isDevMode = mode === 'development';

const entry = () => ({
    index: path.resolve(__dirname, 'src/index.js'),
});

const resolve = () => {
    const options = {
        alias: {
            '@css': path.resolve(__dirname, 'src/styles/css/'),
            '@scss': path.resolve(__dirname, 'src/styles/scss/'),
            '@docs': path.resolve(__dirname, 'src/assets/docs/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@modules': path.resolve(__dirname, 'src/js/modules/'),
            '@utils': path.resolve(__dirname, 'src/js/utils/'),
        },
    };

    return options;
};

const optimization = () => {
    const options = {
        runtimeChunk: 'single',
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            '...',
            new CssMinimizerPlugin(),
        ],
    };

    return options;
};

const output = () => {
    const options = {
        filename: isDevMode ? '[contenthash].js' : '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: './',
    };

    return options;
};

module.exports = {
    mode: mode(),
    entry: entry(),
    resolve: resolve(),
    optimization: optimization(),
    output: output(),
};
