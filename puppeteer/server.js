/*const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

app.get("/api", (req, res) => {
    console.log("Request received at /api"); // Added this line
    return res.json({ message: "This is from backend" });
});

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});*/

const express = require("express");
const cors = require('cors');
const puppeteer = require('puppeteer-core');
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON requests


async function searchGoogle(query) {
  const browser = await puppeteer.launch({
    executablePath: "c:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,  // Set headless to true to run the browser in the background
  });

  const page = await browser.newPage();

  await page.goto('https://www.google.com');

  const searchInputSelector = 'body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf';
  await page.waitForSelector(searchInputSelector);
  await page.type(searchInputSelector, query);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  const links = await page.$$eval('.tF2Cxc', links => links.map(link => link.querySelector('a').href));

  console.log("Total number of links: " + links.length);
  for (let i = 0; i < links.length; i++) {
    console.log(i + 1 + ". ", links[i]);
  }
  await browser.close();

  return links;
}

app.post("/api", async (req, res) => {
  const { topic } = req.body;
  console.log("Received topic:", topic);

  try {
    // Process the topic using searchGoogle function
    const result = await searchGoogle(topic);

    // Send the result as JSON response
    res.json({ result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8081, () => {
    console.log("Server listening on port 8081");
});
