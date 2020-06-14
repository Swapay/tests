describe('catalog', () => {

    it("Can change swap types", async () => {
        await page.goto(URL + '/uk/catalog/rent/', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('a[data-test-id="main-catalog"]');
        await page.hover('a[data-test-id="main-catalog"]');
        await page.click('a[data-test-id="sell-catalog"]', {waitUntil: 'domcontentloaded'});
        expect(page.url()).toMatch(URL + '/uk/catalog/sell/');

        await page.waitForSelector('a[data-test-id="main-catalog"]');
        await page.hover('a[data-test-id="main-catalog"]');
        await page.click('a[data-test-id="exchange-catalog"]', {waitUntil: 'domcontentloaded'});
        expect(page.url()).toMatch(URL + '/uk/catalog/exchange/');

        await page.waitForSelector('a[data-test-id="main-catalog"]');
        await page.hover('a[data-test-id="main-catalog"]');
        await page.click('a[data-test-id="rent-catalog"]', {waitUntil: 'domcontentloaded'});
        expect(page.url()).toMatch(URL + '/uk/catalog/rent/');

    }, 50000);

    it("Can navigate to game page", async () => {
        await page.goto(URL + '/uk/catalog/rent/', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('.game-card');
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));

        const id = await page.evaluate(() => {
            let element = document.getElementsByClassName('game-card')[0];
            element.click();
            return element.getAttribute('data-game-id');
        });

        const newPage = await newPagePromise;
        expect(newPage.url()).toMatch(URL + '/uk/game/' + id + '/');

    }, 50000);
});
