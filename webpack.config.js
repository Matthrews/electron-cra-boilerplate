const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {
        hot: true,
        compress: true,
        https: true,
    },
    entry: {
        bundle: ["./src/index.tsx"],
        electron: ["./electron.tsx"],
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/build",
    },

    devtool: "cheap-source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },

    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader?cacheDirectory=true",
                    // 也可以在.babelrc文件里面配置options
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react", {runtime: "classic"}],
                            ["@babel/preset-typescript"],
                        ],
                        "plugins": [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-transform-runtime"
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',

                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'svg-loader',
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2 * 10 ** 6
                        }
                    },
                ]
            },
        ],
    },

    plugins: [
        new SpeedMeasurePlugin(),  // 用于测试打包性能
    ],

    target: "electron-renderer", // 指定打包应用类型
};
