const path = require("path");

const home = (req, res) => {
  console.log('path: ', path.join(`${__dirname}/../views/index.html`));
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
};

module.exports = {
  getHome: home
};
