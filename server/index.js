const express = require( 'express' )
const app = express()

app.use( function( req, res, next ) {
  res.setHeader( 'Access-Control-Allow-Origin', 'http://localhost:8100' );
  res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' );
  res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' );
  res.setHeader( 'Access-Control-Allow-Credentials', true );
  next();
} );

app.get( '/', ( req, res ) => res.send( 'Hello Vadim!' ) )

app.listen( 3000, () => console.log( 'API listening on port 3000!' ) )

const books = [ {
  id: 1,
  title: 'Мастер и Маргарита',
  author: 'Михаил Булгаков',
  year: 1937,
  type: 'Роман',
  cover: 'http://knijky.ru/sites/default/files/styles/264x390/public/31583.jpg?itok=rm1YiVJV'
}, {
  id: 2,
  title: 'Вий',
  author: 'Николай Гоголь',
  year: 1833,
  type: 'Сказка',
  cover: 'https://j.livelib.ru/boocover/1000780393/o/e752/Nikolaj_Gogol__Vij_sbornik.jpeg'
}, {
  id: 3,
  title: 'Мартин Иден',
  author: 'Джек Лондон',
  year: 1908,
  type: 'Роман',
  cover: 'https://android-ebook.ru/uploads/posts/2013-10/1381912094_dzhek-london-martin-iden.jpg'
} ];

app.get( '/books', ( req, res ) => {

  if ( Object.keys( req.query ).length ) {

    let filterBooks = books.filter( book => {

      Object.keys( req.query ).map( search => {
        if ( book && book[ search ].toString().indexOf( req.query[ search ] ) < 0 ) {
          book = false;
        }
      } )
      return book;

    } );
    res.status( 200 ).json( filterBooks );
  } else {
    res.status( 200 ).json( books );
  }

} );

app.get( '/books/:id', ( req, res ) => {

  let book = books.filter( book => book.id === +req.params.id );

  if ( book[ 0 ] ) {
    res.status( 200 ).json( book[ 0 ] )
  } else {
    res.status( 400 ).json( { message: 'Book is missing.' } )
  }

} )