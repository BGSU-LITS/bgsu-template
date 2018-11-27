const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env, argv) {
    var devtool = 'eval-source-map';
    var sourceMap = true;
    var publicPath = '';

    var plugins = [
        new HtmlWebpackPlugin({
            inject: 'head',
            template: 'src/pug/index.pug',
        }),
    ];

    if (argv.mode === 'production') {
        devtool = 'source-map';
        sourceMap = false;
        publicPath = 'https://lib.bgsu.edu/template/';
    }

    return {
        devServer: {},

        devtool: devtool,

        entry: {
            bgsu_addremove: './src/addremove.js',
            bgsu_common: './src/common.js',
            bgsu_facets: './src/facets.js',
            bgsu_flatpickr: './src/flatpickr.js',
            bgsu_flickity: './src/flickity.js',
            bgsu_tablist: './src/tablist.js',
            bgsu_template: './src/template.js',
            bgsu_tippy: './src/tippy.js',
            bgsu_toggle: './src/toggle.js',
            libraryh3lp: './src/libraryh3lp.js',
        },

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
            library: '[name]',
            publicPath: publicPath,
        },

        plugins: plugins,
    };
};
