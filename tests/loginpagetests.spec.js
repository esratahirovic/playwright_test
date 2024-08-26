import { test, expect } from "@playwright/test";

test.describe("Login Page Tests", () => {
    
    test.beforeEach(async ({ page }) => {
        // Go to the page before each test
        await page.goto("https://66a9ec8074b09f79538678e3--unique-cat-d2a455.netlify.app/");
    });

    test("Missing name and e-mail", async ({ page }) => {
        // Define the input areas as constants
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');

        // Clear the input fields to make sure they are empty
        await nameInput.fill("");
        await emailInput.fill("");

        // Click the Login button
        await page.locator('button', { hasText: 'Login' }).click();

        // Expect to see the alert message
        const alert = page.locator('.alert-message');
        await expect(alert).toHaveText('Tüm alanları doldurmanız gerekmektedir.');
    });

    test("Missing name and valid e-mail", async ({ page }) => {
        // Define the input areas as constants
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');

        // Clear the name input field and set the email
        await nameInput.fill("");
        await emailInput.fill("test@mail.com");

        // Click the Login button
        await page.locator('button', { hasText: 'Login' }).click();

        // Expect to see the alert message
        const alert = page.locator('.alert-message');
        await expect(alert).toHaveText('İsim alanını doldurmanız gerekmektedir.');
    });

    test("Valid name and missing e-mail", async ({ page }) => {
        // Define the input areas as constants
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');

        // Clear the email field and set the name field
        await nameInput.fill("test name");
        await emailInput.fill("");

        // Click the Login button
        await page.locator('button', { hasText: 'Login' }).click();

        // Expect to see the alert message
        const alert = page.locator('.alert-message');
        await expect(alert).toHaveText('E-mail alanını doldurmanız gerekmektedir.');
    });

    test("Image Detection", async ({ page }) => {
        // Get the image
        const image = page.locator(".mb-12");

        // Check the image visibility
        await expect(image).toBeVisible();

        // Image's natural size
        const naturalWidth = await image.evaluate((img) => img.naturalWidth);
        const naturalHeight = await image.evaluate((img) => img.naturalHeight);

        // Check the image size
        expect(naturalWidth).toBeGreaterThan(0);
        expect(naturalHeight).toBeGreaterThan(0);
        expect(naturalWidth).toEqual(naturalHeight);
    });

    test("Access to To-Do App Page Successfully", async ({ page }) => {
        // Define the input areas as constants
        const nameInput = page.locator('input[name="name"]');
        const emailInput = page.locator('input[name="email"]');

        // Enter valid email and name
        await nameInput.fill("test name");
        await emailInput.fill("test@mail.com");

        // Click the Login button
        await page.locator('button', { hasText: 'Login' }).click();

        // Expect to reach the to-do app page
        await expect(page).toHaveURL("https://66a9ec8074b09f79538678e3--unique-cat-d2a455.netlify.app/"); 
    });

    test("Responsive UI", async ({ page }) => {
        // Define screen sizes in list
        const screenSizes = [
            { width: 320, height: 400 },
            { width: 768, height: 1024 },
            { width: 1280, height: 1080 },
        ];

        // Set the screen sizes
        for (const size of screenSizes) {
            await page.setViewportSize({ width: size.width, height: size.height });

            await page.reload();

            // Define the elements which will be tested
            const pTag = page.locator(".text-sm");
            const loginButton = page.locator(".rounded-md");

            // Make sure that elements are visible
            await expect(pTag).toBeVisible();
            await expect(loginButton).toBeVisible();
        }
    });
});
