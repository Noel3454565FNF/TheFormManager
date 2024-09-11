const { chromium } = require('playwright'); // Import Playwright

(async () => {
    // Specify the path to your custom user data directory
    const userDataDir = '/path/to/your/user/data';

    // Launch the browser with the custom user data directory
    const browser = await chromium.launch({
        headless: false, // Set to false to see the browser UI
    });

    const page = await browser.newPage();

    // Navigate to the desired URL
    await page.goto('https://users.roblox.com/v1/users/authenticated');

    // Wait for the page to load
    await page.waitForTimeout(5000); // Adjust the timeout as needed

    // Capture and log network responses
    page.on('response', response => {
        console.log('URL:', response.url());
        console.log('Status:', response.status());
        response.text().then(text => console.log('Response:', text));
    });

    // Perform other actions as needed
    
    // Close the browser
    await browser.close();
})();
