
    module.exports = {
        preset: "jest-puppeteer",
        globals: {
            URL: "http://localhost:8000"
        },
        testMatch: [
            "**/test/**/*.test.js"
        ],
        verbose: true
    }