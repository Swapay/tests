const utils = require('./utils.js');


const getItems = () => {
    let data = [];
    let elements = document.querySelectorAll('[data-test-item-id]');
    for (var element of elements)
        data.push(element.dataset.testItemId);
    return data;
};

const getSwaps = () => {
    let data = [];
    let elements = document.querySelectorAll('[data-test-swap-id]');
    for (var element of elements)
        data.push(element.dataset.testSwapId);
    return data;
};

describe('user-items', () => {
    beforeAll(utils.validLogin);

    let itemId;

    it("Add new item and delete it", async () => {
        await page.goto(URL + '/profile/items', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('button[data-test-item-id]');
        let oldItems = await page.evaluate(getItems);

        await page.click('span[data-test-id="add-item"]');
        await page.waitForResponse(URL + '/gql/');
        await page.waitFor(1000);

        let newItems = await page.evaluate(getItems);

        itemId = newItems.filter(x => !oldItems.includes(x))[0];

        await expect(oldItems.length).toBe(newItems.length - 1);
        await page.click('button[data-test-item-id="' + itemId + '"]');
        await page.waitForSelector('button[data-test-id="delete"]');
        await page.click('button[data-test-id="delete"]');

        await page.waitForResponse(URL + '/gql/');
        await page.waitFor(1000);

        let itemsAfterDelete = await page.evaluate(getItems);

        await expect(newItems.length).toBe(itemsAfterDelete.length + 1);
    });

    it("Open swap", async () => {
        await page.goto(URL + '/profile/swaps', {waitUntil: 'domcontentloaded'});
        await page.waitForSelector('button[data-test-swap-id]');
        let firstSwapId = (await page.evaluate(getSwaps))[0];
        if(firstSwapId){
            await page.click('button[data-test-swap-id="'+firstSwapId+'"]');
            expect(page.url()).toMatch(URL+'/profile/swap/'+firstSwapId);
        }
    }, 15000);
});


