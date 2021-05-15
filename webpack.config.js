const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const serverConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/server/server.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.server.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()]
};

const clientConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.client.json',
                    getCustomTransformers: () => ({
                        before: [ReactRefreshTypeScript()],
                    }),
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    target: 'web',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        proxy: {
            '/api': 'http://localhost:3000',
        },
        hot: true,
        open: true,
        liveReload: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js'),
    }
};

module.exports = [serverConfig, clientConfig];