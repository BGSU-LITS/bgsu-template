/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const EsLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniSvgDataUri = require('mini-svg-data-uri');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = function config(environment, argv) {
    const entries = [
        'addremove',
        'chart',
        'common',
        // 'facets',
        'flatpickr',
        // 'flickity',
        'libcal',
        'libchat',
        // 'tablist',
        'template',
        'tippy',
        'toggle',
    ];

    let development = true;
    let outputPath = path.resolve(__dirname, 'dist', 'dev');
    let publicPath = '/';
    const version = process.env.npm_package_version;

    if (argv.mode === 'production') {
        development = false;
        outputPath = path.resolve(__dirname, 'dist', version);
        publicPath = `https://lib.bgsu.edu/template/${version}/`;
    }

    const plugins = [
        new webpack.BannerPlugin({
            banner: `${publicPath}docs/[name]/`,
        }),
        new EsLintWebpackPlugin({
            files: 'src/',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/pug/index.pug',
            version,
        }),
        new StylelintWebpackPlugin({
            context: 'src/scss/',
        }),
    ];

    const entry = {};

    entries.forEach((name) => {
        entry[name] = `./src/${name}.js`;

        plugins.push(new HtmlWebpackPlugin({
            inject: false,
            filename: `docs/${name}/index.html`,
            template: `src/pug/docs/${name}.pug`,
            version,
        }));
    });

    return {
        devServer: {},

        devtool: 'source-map',

        entry,

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    exportLocalsConvention: 'as-is',
                                    namedExport: false,
                                },
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
                    test: /\.s[ac]ss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    exportLocalsConvention: 'as-is',
                                    localIdentName:
                                        'bgsu_[local]_[hash:base64:5]',
                                    namedExport: false,
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
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: development,
                            },
                        },
                    ],
                },

                {
                    test: /\.svg$/,
                    loader: 'svgo-loader',
                    type: 'asset/inline',
                    generator: {
                        dataUrl: (content) => MiniSvgDataUri(
                            content.toString(),
                        ),
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
                            passes: 3,
                        },
                    },
                }),
            ],
        },

        output: {
            assetModuleFilename: '[base]',
            devtoolNamespace: 'bgsu-template',
            library: 'bgsu_[name]',
            path: outputPath,
            publicPath,
        },

        plugins,
    };
};
