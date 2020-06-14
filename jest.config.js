module.exports = {
    preset: "jest-puppeteer",
    globals: {
        URL: "http://localhost:8000",
        VALID_USERNAME: 'username',
        VALID_EMAIL: 'email',
        VALID_PASSWORD: 'password',
    },
    testMatch: [
        "**/test/**/*.test.js"
    ],
    verbose: true
};
