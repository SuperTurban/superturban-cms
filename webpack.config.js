module.exports = {
    entry: [
            __dirname + '/admin/front/index.js',
            'webpack/hot/dev-server',
        ],
    output: {
        path: __dirname + '/public/admin',
        filename: "bundle.js"
    },
    devServer:{
        hot:true,
        inline:true,
        contentBase : __dirname + '/public/admin',
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.html$/, 
                loader: "html-loader" 
            },
            {
                test: /\.vue$/, // a regex for matching all files that end in `.vue`
                loader: 'vue'   // loader to use for matched files
            },
            {
                test: /\.jpg$/, // a regex for matching all files that end in `.vue`
                loader: 'file-loader'   // loader to use for matched files
            },
            {
                test: /\.png$/, // a regex for matching all files that end in `.vue`
                loader: 'file-loader'   // loader to use for matched files
            },
            {
                test: /\.gif$/, // a regex for matching all files that end in `.vue`
                loader: 'file-loader'   // loader to use for matched files
            },

        ]
    }
};