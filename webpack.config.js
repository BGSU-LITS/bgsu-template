const HtmlWebpackPlugin = require('html-webpack-plugin');
const Path = require('path');

module.exports = function(env, argv) {
    var devtool = 'eval-source-map';
    var sourceMap = true;
    var path = Path.resolve(__dirname, 'dist');
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
        path = Path.resolve(path, process.env.npm_package_version);
        publicPath = 'https://lib.bgsu.edu/template/' + process.env.npm_package_version;
    }

    return {
        devServer: {},

        devtool: devtool,

        entry: {
            addremove: './src/addremove.js',
            common: './src/common.js',
            facets: './src/facets.js',
            flatpickr: './src/flatpickr.js',
            flickity: './src/flickity.js',
            libraryh3lp: './src/libraryh3lp.js',
            tablist: './src/tablist.js',
            template: './src/template.js',
            tippy: './src/tippy.js',
            toggle: './src/toggle.js',
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
            library: 'bgsu_[name]',
            path: path,
            publicPath: publicPath,
        },

        plugins: plugins,
    };
};
