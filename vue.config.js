module.exports = {
    devServer: {
        proxy: process.env.VUE_APP_HARBOR_API_URL,
    },
};
