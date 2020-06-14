const validLogin = async () => {
    jest.setTimeout(20000);
    await page.goto(URL + '/login', {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('form');
    await page.type('#username', VALID_USERNAME);
    await page.type('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
};

const validLogout = async () => {
    await page.goto(URL+'/logout', {waitUntil: 'domcontentloaded'});
};

module.exports = {
    validLogin,
    validLogout,
};