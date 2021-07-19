import { Worker } from "worker_threads";
const worker = new Worker("./worker.js");
worker.postMessage("hello");
