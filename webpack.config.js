const path = require("path")
const webpack = require("webpack")
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin")

const minChunks = function(module) {
    return module.context && module.context.indexOf("vendor") !== -1;
}

module.exports = function(env) {
    return {
        entry: {
            "site": "./src/site",
            "admin": "./src/admin"
        },
        output: {
            filename: "[chunkhash]/[name].js",
            publicPath: "/dist/",
            path: path.resolve(__dirname, "dist")
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                chunks: ["site", "admin"]
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common-vendor",
                chunks: ["common"],
                minChunks
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "site-vendor",
                chunks: ["site"],
                minChunks
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "admin-vendor",
                chunks: ["admin"],
                minChunks
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                minChunks: Infinity
            })
        ]
    }
}