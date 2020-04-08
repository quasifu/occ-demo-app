var axios = require("axios");

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
};
