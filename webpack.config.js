const path = require("path");
module.exports = {
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "javascripts/bundle.js"
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env', 'stage-3']
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.json', '.js', '.jsx']
    },
    watch: true
};