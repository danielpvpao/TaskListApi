import { parse } from 'csv-parse';
import fs from 'node:fs';
import fetch from 'node-fetch';

const csvData = [];
const url = 'http://localhost:3333/tasks';

 fs.createReadStream('./Tasks.csv')
  .pipe(
    parse({
      delimiter: ';',
      columns: true
    })
  )
  .on('data', (row) => {
    csvData.push(row);
  })
  .on('end', async () => {
    console.log(csvData);
    await runReader();
  });

async function runReader() {
  for (const row of csvData){
    const {title, description} = row;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description}),
    });
  }

}