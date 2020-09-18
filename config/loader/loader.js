const path = require("path");
module.exports = {
    rules: [
        { 
            test: /\.css$/,
            include: path.resolve(__dirname, '../../src'),
            use:[
              'style-loader',
              'css-loader'
            ]
        },
        { 
            test: /\.(scss|sass)$/,
            use:[
               "style-loader",
                "css-loader",
                "sass-loader"
            ]
        },
        { test: /\.(png|jpg|jpeg|gif|svg|eot|woff|ttf)$/,  loader: "file-loader"}
    ]
}