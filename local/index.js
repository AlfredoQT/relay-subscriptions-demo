const express = require("express");

const app = express();

app.use("/", express.static("dist"));

const port = 4001;

app.listen(port, () => console.log(`Local server listening on port ${port}`));
