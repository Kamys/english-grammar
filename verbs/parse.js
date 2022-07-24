const csv = require('csv-parser');
const fs = require('fs');

const result = fs.createWriteStream('./result.json', {
    flags: 'w',
    encoding: 'utf8',
})

const chunks = [];
fs.createReadStream('./sourceVerbs.csv', { encoding: 'utf8' })
    .pipe(csv())
    .on('data', (row) => {
        chunks.push(row)
    })
    .on('end', () => {
        result.write(JSON.stringify(chunks))
    });