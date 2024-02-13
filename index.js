const express = require("express");
const httpProxy = require("http-proxy");
const app = express();

const proxy = httpProxy.createProxyServer();

app.post("/proxy", (req, res) => {
    const Url = "Your API server's URL";

    proxy.web(req, res, { target: Url });
    proxy.on("proxyReq", (proxyRes) => {
        console.log(proxyRes);
    });
});

proxy.on("error", (err, req, res) => {
    console.error("proxy Error:", err);
    res.status(500).json({ error: "proxy Server Error" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});