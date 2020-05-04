const array1 = ['a', 'b', 'c'];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}

var arr = ["one","two","three"];

arr.forEach(function(part, index) {
  arr[index] = "four";
});

alert(arr);


console.log(Object.keys(object1));

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

var arr = ['a', , 'c'];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});

function bulkInsert(connection, table, objectArray, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = objectArray.map( obj => keys.map( key => obj[key]));
  let sql = 'INSERT INTO ' + table + ' (' + keys.join(',') + ') VALUES ?';
  connection.query(sql, [values], function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
}

bulkInsert(connection, 'my_table_of_objects', objectArray, (error, response) => {
  if (error) res.send(error);
  res.json(response);
});
