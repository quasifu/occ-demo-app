var axios = require("axios");
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = {
  getStatus: (req, res) => {
    res.json({ status: true });
  },
  doSomething: (req, res) => {
    // const getPrinters = async () => {
    //   try {
    //     const result = await axios.get(
    //       process.env.URL,
    //       { headers: { Authorization: `Bearer ${process.env.TOKEN}` } },
    //       []
    //     );
    //     res.send(result.data);
    //   } catch (e) {
    //     res.send(500);
    //   }
    // };
    // getPrinters();
    console.log(process.env.SAMPLEDATA);
    let sample = JSON.parse(process.env.SAMPLEDATA);
    res.send(sample);
  },
  listContainer: async (req, res) => {
    const account = process.env.ACCOUNT;
    const sas = process.env.SAS_TOKEN;
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net${sas}`
    );
    const containerClient = blobServiceClient.getContainerClient(
      req.params.containerName
    );
    let iter = await containerClient.listBlobsFlat();
    let blobItem = await iter.next();
    let containers = [];
    while (!blobItem.done) {
      containers.push(blobItem);
      blobItem = await iter.next();
    }
    res.send(containers);
  },
  getItem: async (req, res) => {
    const account = process.env.ACCOUNT;
    const sas = process.env.SAS_TOKEN;
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net${sas}`
    );
    const containerClient = blobServiceClient.getContainerClient(
      req.params.containerName
    );
    const blobClient = containerClient.getBlobClient(req.params.blobName);
    const downloadBlockBlobResponse = await blobClient.download();
    // [Node.js only] A helper method used to read a Node.js readable stream into string
    async function streamToString(readableStream) {
      return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
          chunks.push(data.toString());
        });
        readableStream.on("end", () => {
          resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
      });
    }
    const downloaded = await streamToString(
      downloadBlockBlobResponse.readableStreamBody
    );
    res.send(downloaded);
  },
};
