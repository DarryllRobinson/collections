const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8081;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'fonebook'
});

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(__dirname + '/public'));

// enable all CORS requests
app.use(cors());

// log HTTP requests
//app.use(morgan('combined'));

// connect to database
mc.connect();

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
});

//var upload = multer({ storage: storage }).array('file');

var upload = multer({ //multer settings
  storage: storage,
  fileFilter : function(req, file, callback) { //file filter
      if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
  }
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
  let exceltojson = '';
  upload(req,res,function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      /** Multer gives us file info in req.file object */
      if(!req.file){
          res.json({error_code:1,err_desc:"No file passed"});
          return;
      }
      /** Check the extension of the incoming file and
       *  use the appropriate module
       */
      if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
          exceltojson = xlsxtojson;
      } else {
          exceltojson = xlstojson;
      }
      //console.log(req.file);
      try {
        exceltojson({
              input: req.file.path,
              output: req.file.destination + '/output/' + Date.now() + '-output.json', //since we don't need output.json
              lowerCaseHeaders: false
          }, function(err,result){
              if(err) {
                console.log('err: ', err);
                return res.json({error_code:1,err_desc:err, data: null});
              }
              //console.log('result: ', result);
              /*result.map(element => {
                let cols = [];
                //cols = [...element.keys()];
                let vals = [];
                for (let [key, value] of Object.entries(element)) {
                  cols.push(key);
                  vals.push(value);
                };
                let allVals = [];
                allVals.push(vals);
                //console.log('allVals: ', allVals);
                insertSql(cols, allVals);
                //console.log('cols: ', cols);
                //console.log('vals: ', vals);
              });*/
              bulkInsert(mc, 'cases', result, (error, response) => {
                if (error) {
                  console.log('bulkInsert error: ', error);
                  res.send(error);
                }
                console.log('Successful insert!');
                //res.json(response);
              });
              console.log('Successful upload!');
              res.json({error_code:0,err_desc:null, data: result});
          })
      } catch (e){
        console.log('caught mistake');
          return res.json({error_code:1,err_desc:"Corupted excel file"});
      }
  })

});

function bulkInsert(connection, table, objectArray, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = objectArray.map( obj => keys.map( key => obj[key]));

  // replace 'NULL' with NULL
  values.map(outside => {
    outside.forEach(function(e, i) {
      if (e === 'NULL') {
        outside[i] = null;
      }
    });
  });

  let sql = 'INSERT INTO ' + table + ' (' + keys.join(', ') + ') VALUES ?';
  mc.query(sql, [values], function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
}

function insertSql(columns, values) {
  const sql = `INSERT INTO cases ${columns} VALUES ?`;
  mc.query(sql, [values], (err, results, fields) => {
    if(err) {
      return console.error(err.message);
    }
    console.log('Row inserted: ', results.affectedRows);
  });
}

app.post('/xxxupload',function(req, res) {

    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(port);

console.log('API server started on: ' + port);

const routes = require('./app/routes/appRoutes'); //importing Routes
routes(app); //register the route
