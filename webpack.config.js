import { path as configPath, version } from './dist/config.js';
import miniSvgDataUri from 'mini-svg-data-uri';
import path from 'node:path';
import webpack from 'webpack';

import EslintWebpackPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';
import TerserWebpackPlugin from 'terser-webpack-plugin';

export default function config(environment, argv) {
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
    let outputPath = path.resolve(import.meta.dirname, 'dist', 'dev');
    let publicPath = '/';

    if (argv.mode === 'production') {
        development = false;
        outputPath = path.resolve(import.meta.dirname, 'dist', version);
        publicPath = configPath;
    }

    const plugins = [
        new webpack.BannerPlugin({
            banner: `${publicPath}docs/[name]/`,
        }),
        new EslintWebpackPlugin({
            configType: 'flat',
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

    for (const name of entries) {
        entry[name] = `./src/${name}.js`;

        plugins.push(new HtmlWebpackPlugin({
            inject: false,
            filename: `docs/${name}/index.html`,
            template: `src/pug/docs/${name}.pug`,
            version,
        }));
    }

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
                                sassOptions: {
                                    silenceDeprecations: ['mixed-decls'],
                                },
                            },
                        },
                    ],
                },

                {
                    test: /\.svg$/,
                    loader: 'svgo-loader',
                    type: 'asset/inline',
                    generator: {
                        dataUrl: (content) => miniSvgDataUri(
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
