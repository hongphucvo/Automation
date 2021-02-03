const puppeteer = require("puppeteer");


const MAJOR = "BA";
const COURSE = "IM3001";
const username = "phuc.vo_khmt2019";
const password = "daylamatkhau";

(async () => {
  try {
    console.log("Script starts running...");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    const navigationPromise = page.waitForNavigation();

    /* LOAD PAGE & LOGIN PRESSED */
    await page.setViewport({ width: 1200, height: 1000 });
    await page.goto("https://mybk.hcmut.edu.vn/my/index.action");
    await page.click("body > div.breadcrumbs_wapper > div > div > div.col-md-3 > div > a:nth-child(1)");//link login
    await navigationPromise;

    /* LOGIN DATA */
    await page.waitFor("#username");
    await page.waitFor("#password");
    await page.type("#username", username, { delay: 100 });
    await page.type("#password", password, { delay: 100 });
    //await page.click("#fm1 > div.row.btn-row > input.btn-submit")
    await page.keyboard.press("Enter");
    await navigationPromise;

    /*LOAD ENROLL PAGE*/
    const MyBkEnroll = 'body > div.content_wapper.padding > div > div > div.col-md-12 > div:nth-child(2) > div > div.box-body > div > div:nth-child(1) > div > div > span:nth-child(1) > a';
    await page.waitFor(MyBkEnroll);
    await page.click(MyBkEnroll);

    await page.goto("https://mybk.hcmut.edu.vn/dkmh/home.action");

    const Notebook = 'body > div > div > div > section.content > div > section > div > div.box-body.no-padding > div > div > a > img';
    await page.waitFor(Notebook);
    await page.click(Notebook);


    /*CHOOSE INFORMATION*/
    const season = '#div-DanhSachHocKy > div > div.box-body.no-padding > table > tbody > tr:nth-child(2) > td:nth-child(3)';
    await page.waitFor(season);
    await page.click(season);
    //Chon button Hieu chinh
    const editButton = '#div-KetQuaDKViewResponse > div:nth-child(6) > button:nth-child(2) > table > tbody > tr > td';
    await page.waitFor(editButton);
    await page.click(editButton);
    await page.waitForNavigation();
    //Chon he dang ki chinh quy
    await page.click("#dotDKId445 > td:nth-child(2) > b");
    await page.waitForNavigation();

    /*SEARCH COURSE*/
    const searchBar = '#txtMSMHSearch';
    await page.click(searchBar);
    await page.type(COURSE);
    await page.keyboard.press("Enter");
    await page.waitForNavigation();

    /*CHOOSE COURSE*/
    const childCourse = '#monHoc15130 > td:nth-child(1)';
    await page.waitFor(childCourse);
    await page.click(childCourse);

    /*ADD THIS COURSE */
    const choose = '#tkbLT15130 > tbody > tr:nth-child(8) > td:nth-child(9) > button';
    await page.waitFor(choose);
    await page.click(choose);




    await page.screenshot({
      path: `./${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.jpg`,
      //type: "jpeg",
      //fullPage: true,
    });
    await browser.close();
    console.log("Successfully choosing course!!!");
  } catch (e) {
    console.log(`ERROR: ${JSON.stringify(e, null, 2)}`);
  }
})();