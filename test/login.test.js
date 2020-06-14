const puppeteer = "puppeteer";

describe('Login page', () => {
  beforeAll(async () => {
      await page.goto(URL+'/login', {waitUntil: 'domcontentloaded'});
  });
  const USERNAME = 'username';
  const PASSWORD = 'password';

  it('Should log in', async () => {
    await page.waitForSelector('form');
    await page.type('#username', USERNAME);
    await page.type('#password', PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    expect(page.url()).toMatch(URL+'/profile/swaps');
  }, 10000);

  it("Add new item", async () => {
    await page.goto(URL + '/profile/items', {waitUntil: 'domcontentloaded'});
    await page.waitForNavigation();

    let oldItems = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('MuiPaper-root');
      for (var element of elements)
        data.push(element.textContent);
      return data;
    });

    await page.evaluate(() => document.querySelector("#add-item").click());

    let newItems = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('MuiCard-root');
      for (var element of elements)
        data.push(element.textContent);
      return data;
    });

    await expect(oldItems.length).toMatch(newItems.length - 1);
  }, 30000);
});
