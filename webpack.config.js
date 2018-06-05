const CleanWebpackPlugin = require('clean-webpack-plugin');
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
        plugins.push(new CleanWebpackPlugin('dist'));
    }

    return {
        devServer: {},

        devtool: devtool,

        entry: {
            bgsu_template: './src/bgsu_template.js',
            bgsu_common: './src/bgsu_common.js',
            flickity: './src/flickity.js',
            tippy: './src/tippy.js',
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
                                minimize: true,
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
                                minimize: true,
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
