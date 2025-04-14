// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = 'style-loader';

const config = {
    devtool: 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: process.env.PORT || 8080,
        server: 'https'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new webpack.DefinePlugin({
            'stocksDemoConfig': {
                OTEL_EXPORTER_OTLP_ENDPOINT: JSON.stringify(process.env.OTEL_EXPORTER_OTLP_ENDPOINT),
                OTEL_EXPORTER_OTLP_HEADERS: JSON.stringify(process.env.OTEL_EXPORTER_OTLP_HEADERS),
                OTEL_RESOURCE_ATTRIBUTES: JSON.stringify(process.env.OTEL_RESOURCE_ATTRIBUTES),
                STOCKSDEMOAPI_URL: JSON.stringify(process.env.services__apiservice__https__0)
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        },
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    mode: isProduction ? 'production' : 'development',
};

module.exports = () => {
    return config;
};
