module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "http://localhost:8000",
        VALID_USERNAME: 'username',
        VALID_PASSWORD: 'password',
    },
    testMatch: [
        "**/test/**/*.test.js"
    ],
    verbose: true
};
