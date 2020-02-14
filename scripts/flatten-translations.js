const path = require('path');
const fs = require('fs');
const flat = require('flat');

const directoryPath = path.join(__dirname, '..', 'src', 'i18n', 'data');
console.log(directoryPath);
fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function(file) {
    const filePath = path.join(directoryPath, file);
    const translationsFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    fs.writeFileSync(filePath, JSON.stringify(flat(translationsFile), null, 2), { encoding: 'utf8', flag: 'w' });
    console.log(file + ' flattened');
  });
});
