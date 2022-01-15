async function getRecords( endpoint ) {
    return ( await fetch( `https://dns.google/resolve?name=${ endpoint }&type=TXT` ) ).json();
}

function formatRecordsToHTML( { Answer } ) {
    let HTMLObject = {};

    Answer.map( entry => entry.data )
          .filter( entry => entry.match( /PIG_(\d+):(.*)/ ) )
          .forEach( entry => {
              entry.substring( 4 )
                   .split( /:(.+)/ )
                   .reduce( ( id, value ) => {
                       HTMLObject[ id ] = value;
                   } );
          } );

    return Object.values( HTMLObject ).join( '' );
}

function setDOM( payload ) {
    document.body.innerHTML = payload;
}

const endpoint = 'pig.test.3.vow.systems';

getRecords( endpoint ).then( records => {
    let html = formatRecordsToHTML( records );

    setDOM( html );
} ).catch( error => setDOM( `<pre>${ error.stack }</pre>` ) );
