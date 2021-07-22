import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/User";
import app from "./server";

// (function () {
//   var childProcess = require("child_process");
//   var oldSpawn = childProcess.spawn;
//   function mySpawn() {
//     console.log("spawn called");
//     console.log(arguments);
//     var result = oldSpawn.apply(this, arguments);
//     return result;
//   }
//   childProcess.spawn = mySpawn;
// })();

const PORT = process.env.PORT || 5000;

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);
//const newTab = await driver.getAllWindowHandles();

// setInterval(() => {
//   console.log(`connections currently open`);
//   console.log(chromeDriverCounter);
// }, 1000);

app.listen(PORT, handleListening);
