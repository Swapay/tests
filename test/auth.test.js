describe('login-page', () => {
  beforeEach(async () => {
      await page.goto(URL+'/signup', {waitUntil: 'domcontentloaded'});
  });

  afterEach(async  () => {
    await page.goto(URL+'/logout', {waitUntil: 'domcontentloaded'});
  });

  it('Should log in', async () => {
    await page.waitForSelector('form');
    await page.type('input[name="username"]', VALID_USERNAME);
    await page.type('input[name="email"]', VALID_EMAIL);
    await page.type('input[name="password1"]', VALID_PASSWORD);
    await page.type('input[name="password2"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toMatch(URL+'/profile/items');
  }, 15000);

});
