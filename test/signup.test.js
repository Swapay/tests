describe('signup-page', () => {
  beforeEach(async () => {
      await page.goto(URL+'/signup', {waitUntil: 'domcontentloaded'});
  });

  afterEach(async  () => {
    await page.goto(URL+'/logout', {waitUntil: 'domcontentloaded'});
  });

  it('Should signup and log in', async () => {
    await page.waitForSelector('form');
    await page.type('input[name="username"]', 'valid_username' + new Date().getTime().toString());
    await page.type('input[name="email"]', 'valid'+ new Date().getTime().toString() + '@example.com');
    await page.type('input[name="password1"]', 'new_valid_password5912');
    await page.type('input[name="password2"]', 'new_valid_password5912');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toMatch(URL+'/profile/items');
  }, 15000);

});
