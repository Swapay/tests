const puppeteer = "puppeteer";

describe('Login page', () => {
  beforeAll(async () => {
      await page.goto(URL+'/login', {waitUntil: 'domcontentloaded'});
  });
  const USERNAME = 'valid_username';
  const PASSWORD = 'valid_password';

  it('Should log in', async () => {
    await page.waitForSelector('form');
    await page.type('#username', USERNAME);
    await page.type('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toMatch(URL+'/profile/swaps');
  }, 5000);
});
