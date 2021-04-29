/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = function(env, argv) {
    var entries = [
        'addremove',
        'common',
        'facets',
        'flatpickr',
        'flickity',
        'libcal',
        'libraryh3lp',
        'libraryh3lp_ask',
        'tablist',
        'template',
        'tippy',
        'toggle'
    ];

    var development = true;
    var outputPath = path.resolve(__dirname, 'dist', 'dev');
    var publicPath = './';
    var version = process.env.npm_package_version;

    if (argv.mode === 'production') {
        development = false;
        outputPath = path.resolve(__dirname, 'dist', version);
        publicPath = 'https://lib.bgsu.edu/template/' + version + '/';
    }

    var plugins = [
        new webpack.BannerPlugin({
            banner: publicPath + 'docs/[name]/',
        }),
        new ESLintWebpackPlugin({
            files: 'src/',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/pug/index.pug',
            version: version,
        }),
    ];

    var entry = {};

    for (const name of entries) {
        entry[name] = './src/' + name + '.js';

        plugins.push(new HtmlWebpackPlugin({
            inject: false,
            filename: 'docs/' + name + '/index.html',
            template: 'src/pug/docs/' + name + '.pug',
            version: version,
        }));
    }

    return {
        devServer: {},

        devtool: 'source-map',

        entry: entry,

        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName:
                                        'bgsu_[local]_[hash:base64:5]',
                                },
                                sourceMap: development,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: development,
                            },
                        },
                    ],
                },

                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: development,
                            },
                        },
                    ],
                },

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },

                {
                    test: /\.pug$/,
                    loader: 'pug3-loader',
                },

                {
                    test: /\.svg$/,
                    use: [
                        'svg-url-loader',
                        'svgo-loader',
                    ],
                },

                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },
            ],
        },

        optimization: {
            minimize: !development,
            minimizer: [
                new TerserWebpackPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            passes: 2,
                        },
                    },
                })
            ],
        },

        output: {
            devtoolNamespace: 'bgsu-template',
            library: 'bgsu_[name]',
            path: outputPath,
            publicPath: publicPath,
        },

        plugins: plugins,

        resolve: {
            fallback: {
                path: false,
            },
        },
    };
};
