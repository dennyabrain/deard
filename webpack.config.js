module.exports = {
    entry: 'static/js/entry.jsx',
    output: {
        publicPath: 'http://localhost:5000/',
        filename: 'static/bundle.js'
    },
    //devtool: 'eval',
    module: {
        preLoaders: [
        ],
        loaders: [
            {
                test: /(\.jsx|\.js)?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'babel?presets=react'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']//,
        // alias: {
        //     jQuery: './third-party/jquery.min.js',
        //     react: './third-party/react.min.js',
        //     ReactDOM: './third-party/react-dom.js',
        //     ReactRouter: './third-party/ReactRouter.min.js',
        //     History: 'static/js/third-party/history.min.js'
        // }
    }
};
