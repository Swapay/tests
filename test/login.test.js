describe('login-page', () => {
  beforeEach(async () => {
      await page.goto(URL+'/login', {waitUntil: 'domcontentloaded'});
  });

  afterEach(async  () => {
    await page.goto(URL+'/logout', {waitUntil: 'domcontentloaded'});
  });

  it('Should log in', async () => {
    await page.waitForSelector('form');
    await page.type('#username', VALID_USERNAME);
    await page.type('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toMatch(URL+'/profile/swaps');
  }, 10000);

  it('Should not log in', async () => {
    await page.waitForSelector('form');
    await page.type('#username', 'invalid_username');
    await page.type('#password', 'invalid_password');
    await page.click('button[type="submit"]');
    await page.waitForSelector('div[data-test-id="snackbar"]', 5000);
    const passwordInput = await page.$("#password");
    const text = await page.evaluate(element => element.textContent, passwordInput);
    expect(text).toMatch('');
  }, 10000);

});
