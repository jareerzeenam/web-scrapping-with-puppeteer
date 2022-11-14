const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com/');

  // Takes Screenshot of the web page and saves as a PNG file (files/example.png)
  //   await page.screenshot({ path: 'files/example.png', fullPage: true });

  // Takes Screenshot of the web page and saves as a PDF file in A4 format (files/example.pdf)
  //   await page.pdf({ path: 'files/example.pdf', format: 'A4' });

  // Get entire HTML of the page
  //   const html = await page.content();
  //   console.log(html);

  // Get the Web page Title
  //   const title = await page.evaluate(() => document.title);
  //   console.log(title);

  // Get all the text on the web page
  //   const text = await page.evaluate(() => document.body.innerText);
  //   console.log(text);

  // Get all the links on the web page
  //   const links = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll('a'), (e) => e.href)
  //   );
  //   console.log(links);

  // Get all the courses in the web page (METHOD 1)
  // const courses = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll('#courses .card'), (e) => ({
  //     // Gets all course titles
  //     title: e.querySelector('.card-body h3').innerText,
  //     // Gets all course levels
  //     level: e.querySelector('.card-body .level').innerText,
  //     // Gets all course links
  //     url: e.querySelector('.card-footer a').href,
  //     // Gets all course promo codes
  //     promo: e.querySelector('.card-footer .promo-code .promo').innerText,
  //   }))
  // );

  // console.log(courses);

  // Get all the courses in the web page (METHOD 2)
  const courses = await page.$$eval('#courses .card', (elements) =>
    elements.map((e) => ({
      // Gets all course titles
      title: e.querySelector('.card-body h3').innerText,
      // Gets all course levels
      level: e.querySelector('.card-body .level').innerText,
      // Gets all course links
      url: e.querySelector('.card-footer a').href,
      // Gets all course promo codes
      promo: e.querySelector('.card-footer .promo-code .promo').innerText,
    }))
  );

  console.log(courses);

  // Save data to a JSON file
  fs.writeFile('files/courses.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File Saved!');
  });

  await browser.close();
}

run();
