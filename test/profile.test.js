const utils = require('./utils.js');

describe('user-items', () => {
    beforeAll(utils.validLogin);
    afterAll(utils.validLogout);

    it("Add new item", async () => {
        await page.goto(URL + '/profile/items', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('div[data-test-id="item-card"]');
        let oldItems = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('MuiPaper-root');
            for (var element of elements)
                data.push(element.textContent);
            return data;
        });

        await page.click('span[data-test-id="add-item"]');
        await page.waitForResponse(URL + '/gql/');
        await page.waitFor(1000);

        let newItems = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('MuiCard-root');
            for (var element of elements)
                data.push(element.textContent);
            return data;
        });

        await expect(oldItems.length).toBe(newItems.length - 1);
    }, 30000);
});
