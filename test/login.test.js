const puppeteer = "puppeteer";


describe('Login page', () => {
  beforeAll(async () => {
      //browser = await puppeteer.launch({ devtools: true });
      //page = await browser.newPage();
      await page.goto(URL+'/login', {waitUntil: 'domcontentloaded'});
  });

  it('should be logged in', async () => {
    await page.waitForSelector('form');
    await page.$eval('#username', el => el.value = 'misha');
    await page.$eval('#password', el => el.value = 'lovedasha');
    await page.click('button[type="submit"]');
    //await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()]);
    await page.waitFor(5000);
    expect(page.mainFrame().url()).toMatch(URL+'/profile/swaps');
  }, 30000);
});
