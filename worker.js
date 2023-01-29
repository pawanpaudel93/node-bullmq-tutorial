const { Worker } = require("bullmq");

const { processUploadedImages } = require("./utils");

const workerOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

const workerHandler = (job) => {
  console.log("Starting job:", job.name);
  processUploadedImages(job.data);
  console.log("Finished job:", job.name);
  return;
};

const worker = new Worker("imageJobQueue", workerHandler, workerOptions);
console.log("Worker started!");
