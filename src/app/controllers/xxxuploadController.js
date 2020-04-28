'use strict';

const Upload = require('../models/uploadModel.js');

exports.upload_a_file = function(req, res) {
  Upload.uploadFile(function(err, file) {
    let upload = multer({
      storage: storage
    }).single('customer_file');

    upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select a file to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this file: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
  });
};

exports.get_a_file = function(req, res) {
  Upload.getAFile(function(err, file) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', file);
    res.send(file);
  });
};
