const fs = require("fs");

var fileToArray = (path) => {
  let arrayData = fs.readFileSync(path).toString().split("\n");
  return arrayData;
};

var removeEmptyString = (arrayData) => {
  let arrFiltered = arrayData.filter((el) => {
    return el != null && el != "";
  });
  return arrFiltered;
};

var imageToBase64 = (path) => {

  let buff = fs.readFileSync(path);
  let base64data = buff.toString("base64");

  return base64data
};


module.exports = {
  fileToArray,
  removeEmptyString,
  imageToBase64
};
