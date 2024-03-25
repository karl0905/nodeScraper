const puppeteer = require('puppeteer');

async function getEvents() {
  try {
    // Launch browser
    const browser = await puppeteer.launch();

    // Open tab
    const page = await browser.newPage();

    // Goto page and wait for page to fully load
    await page.goto('https://www.dokk1.dk/arrangementer-0', { waitUntil: 'networkidle2' })

    // Interact with DOM and collect titles
    const titles = await page.evaluate(() => {
      // Select all elements with specific class
      const titleElements = document.querySelectorAll('a h5');
      // Convert NodeList to array and extract text content
      return Array.from(titleElements).map(el => el.textContent);
    });

    // Close browser to clean up ram
    await browser.close();

    // Print results
    titles.forEach(title => console.log(`- ${title}`))
  } catch (error) {
    console.log(error)
  }
};

getEvents();
