import { test, expect } from "@playwright/test";


test.describe("To-Do App Page Tests", () => {

    test.beforeEach(async({page}) => {
        // Go to the page and login before testing the to-do app page
        await page.goto("https://66a9ec8074b09f79538678e3--unique-cat-d2a455.netlify.app/");
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');
        
        // Enter valid email and name
        await nameInput.fill("test name");
        await emailInput.fill("test@mail.com");

        await page.locator("button", "Submit").click();
    });

    test("Add new item to the list", async({page}) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
        const addButton = await page.locator("button", {hasText:"Add"});

        // Enter an item as input and add to the list
        await itemInput.fill("test item");
        await addButton.click();

        // Verify the item is added to the list
        await expect(page.locator(".p-1")).toBeVisible();
    });

    test("Remove item from list", async({page}) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
        const addButton = await page.locator("button", {hasText:"Add"});

        const itemList = ["item1", "item2", "item3", "item4", "item5"];

        // Enter an item as input and add to the list
        for (const item of itemList) {
            await itemInput.fill(item);
            await addButton.click();
        }
        
        // Remove the 3rd item from the list
        const removeButton = await page.locator("button", {hasText:"-"});
        await removeButton.nth(2).click();

        // Expect the 3rd item to be removed from the list
        await expect(page.locator("mb-2").nth(0)).toHaveText("item1");

        // Verify the correct items remain
        await expect(page.locator(".mb-2").nth(2)).toHaveText("item4");

    });


    test("Add a HTML tag to the list", async({page}) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
        const addButton = await page.locator("button", {hasText:"Add"})

        // Enter an item as input and add to the list
        await itemInput.fill("<button class=\"text-red-500 hover:text-red-700\">-</button>");
        await addButton.click();

        // Verify that the HTML tag is not added to the list
        await expect(page.locator(".p-1")).toBeVisible(false);

        // Expect an alert message
        const alert = page.locator(".alert-message");
        await expect(alert).toHaveText("HTML tagleri girilmesi uygun değildir.");
    });


    test("Keep logged in after reload the page", async({page}) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
        const addButton = await page.locator("button", {hasText:"Add"})

        // Refresh the page
        await page.reload();

        // Expect to be in the to-do app page
        await expect(itemInput).toBeVisible();
        await expect(addButton).toBeVisible();
        
    });

    test("Trim the whitespaces", async({page}) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
        const addButton = await page.locator("button", {hasText:"Add"})

        // Add item with whitespace
        await itemInput.fill("                  test item         ");
        await addButton.click();

        // Expect to see the item without whitespaces
        await expect(page.locator(".whitespace-nowrap")).toHaveText("test item");

    });


    test("Enter key does not add item", async ({ page }) => {
        // Define the elements
        const itemInput = await page.getByPlaceholder("Plan");
    
        // Enter an item as input and press Enter
        await itemInput.fill("test item");
        await itemInput.press("Enter");
    
        // Verify the item is not added to the list
        await expect(page.locator(".p-1", { hasText: "test enter item" })).toHaveCount(0);
      });


});