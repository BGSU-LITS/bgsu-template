const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, argv) {
    var entries = [
        'addremove',
        'common',
        'facets',
        'flatpickr',
        'flickity',
        'libraryh3lp',
        'tablist',
        'template',
        'tippy',
        'toggle'
    ];

    var devtool = 'eval-source-map';
    var sourceMap = true;
    var outputPath = path.resolve(__dirname, 'dist');
    var publicPath = '';
    var version = process.env.npm_package_version;

    if (argv.mode === 'production') {
        devtool = 'source-map';
        sourceMap = false;
        outputPath = path.resolve(outputPath, version);
        publicPath = 'https://lib.bgsu.edu/template/' + version + '/';
    }

    var plugins = [
        new webpack.BannerPlugin({
            banner: publicPath + 'docs/[name]/',
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

        devtool: devtool,

        entry: entry,

        module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: sourceMap,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                localIdentName: 'bgsu_[local]_[hash:base64:5]',
                                modules: true,
                                sourceMap: sourceMap,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: sourceMap,
                            },
                        },
                    ],
                },

                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                sourceMap: sourceMap,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: sourceMap,
                            },
                        },
                    ],
                },

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'eslint-loader',
                    ],
                },

                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                },

                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    },
                },

                {
                    test: /\.(gif|jpg|png|svg)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ],
        },

        output: {
            library: 'bgsu_[name]',
            path: outputPath,
            publicPath: publicPath,
        },

        plugins: plugins,
    };
};
