import { parentPort } from "worker_threads";
parentPort.on("message", (message) => {
  console.log("worker received message: %o", message);
});
// parentPort.postMessage("hello");

// const autoLogin = async (lb, setId, setPw, id, pw) => {
//   setId = "csdefrag";
//   setPw = "captain1121!";
//   await new Promise((r) => setTimeout(r, 1000));
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   const idInput = await driver.findElement(By.css(id));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setId);
//   await idInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   const pwInput = await driver.findElement(By.css(pw));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setPw);
//   await pwInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await driver
//     .switchTo()
//     .alert()
//     .then(function (alert) {
//       alert.accept();
//     })
//     .catch(function (error) {});
// };
// const autoLoginIframe = async (lb, setId, setPw, id, pw) => {
//   setId = "defrag_";
//   setPw = "jogakmoum00";
//   await driver.switchTo().frame(0);
//   await new Promise((r) => setTimeout(r, 1000));
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   const idInput = await driver.findElement(By.css(id));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setId);
//   await idInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   const pwInput = await driver.findElement(By.css(pw));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setPw);
//   await pwInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await driver
//     .switchTo()
//     .alert()
//     .then(function (alert) {
//       alert.accept();
//     })
//     .catch(function (error) {});
// };
// const autoLoginE = async (lb, setId, setPw, id, pw) => {
//   setId = "csdefrag@defrag.kr";
//   setPw = "captain1121!";
//   await new Promise((r) => setTimeout(r, 500));
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   const idInput = await driver.findElement(By.css(id));
//   clipboardy.write(setId);
//   await idInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   const pwInput = await driver.findElement(By.css(pw));
//   clipboardy.write(setPw);
//   await pwInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await driver.actions().keyUp(Key.RETURN).keyDown(Key.RETURN).perform();
// };
// const naverAutoLogin2 = async (lb, nlb, setId, setPw, id, pw) => {
//   setId = "defrag_";
//   setPw = "jogakmoum00";
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   const naverLoginBtn = await driver.findElement(By.css(nlb));
//   await naverLoginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   const handlePromise = driver.getAllWindowHandles();
//   handlePromise.then(function (handles) {
//     const popUpWindow = handles[1];
//     driver.switchTo().window(popUpWindow);
//   });
//   await new Promise((r) => setTimeout(r, 500));
//   const inputId = await driver.findElement(By.css(id));
//   await inputId.click();
//   await clipboardy.write(setId);
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   const inputPw = await driver.findElement(By.css(pw));
//   await inputPw.click();
//   await clipboardy.write(setPw);
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await new Promise((r) => setTimeout(r, 3000));
//   await driver.switchTo().alert().accept();
// };
// const naverAutoLogin = async (lb, nlb, setId, setPw, id, pw) => {
//   setId = "defrag_";
//   setPw = "jogakmoum00";
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   const naverLoginBtn = await driver.findElement(By.css(nlb));
//   await naverLoginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   const inputId = await driver.findElement(By.css(id));
//   await inputId.click();
//   await clipboardy.write(setId);
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   const inputPw = await driver.findElement(By.css(pw));
//   await inputPw.click();
//   await clipboardy.write(setPw);
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await new Promise((r) => setTimeout(r, 3000));
//   await driver.switchTo().alert().accept();
// };
// const autoLoginI = async (menu, menu2, lb, setId, setPw, id, pw) => {
//   let menuBtn = await driver.findElement(By.css(menu));
//   await menuBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   menuBtn = await driver.findElement(By.css(menu2));
//   await menuBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   autoLoginE(lb, setId, setPw, id, pw);
// };
// const autoLoginREVU = async (menu, lb, nlb, setId, setPw, id, pw) => {
//   let menuBtn = await driver.findElement(By.css(menu));
//   await menuBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   naverAutoLogin(lb, nlb, setId, setPw, id, pw);
// };
// const autoLoginCHVU = async (menu, lb, setId, setPw, id, pw) => {
//   setId = "csdefrag";
//   setPw = "captain1121!";
//   const loginBtn = await driver.findElement(By.css(lb));
//   await loginBtn.click();
//   await new Promise((r) => setTimeout(r, 500));
//   let menuBtn = await driver.findElement(By.css(menu));
//   await menuBtn.click();
//   const idInput = await driver.findElement(By.css(id));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setId);
//   await idInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   const pwInput = await driver.findElement(By.css(pw));
//   await new Promise((r) => setTimeout(r, 500));
//   clipboardy.write(setPw);
//   await pwInput.click();
//   await driver.actions().keyDown(Key.COMMAND).sendKeys("v").perform();
//   await new Promise((r) => setTimeout(r, 500));
//   await driver.actions().keyUp(Key.COMMAND).keyDown(Key.RETURN).perform();
//   await driver
//     .switchTo()
//     .alert()
//     .then(function (alert) {
//       alert.accept();
//     })
//     .catch(function (error) {});
// };
