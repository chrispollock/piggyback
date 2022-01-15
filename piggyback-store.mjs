import fs from 'fs'
import path from 'path'

let demo = fs.readFileSync(
    path.resolve( './', './demo.html' ),
    'utf8'
);

const createRecords = string => string.match( /.{1,10}/g );

const formatRecords = records => records.map(
    ( record, index ) => `PIG_${ index }:${ record }`
);

let records = createRecords( demo );

records = formatRecords( records );

console.log( records );
