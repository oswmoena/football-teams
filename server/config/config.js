//====================
//PUERTO
//====================
process.env.PORT = process.env.PORT || 3000

//====================
//ENTORNO
//====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================
//BASE DE DATOS
//====================
let urlDB;

// if( process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/central'
// } else {
urlDB = 'mongodb+srv://omoena:4i6gk6vQdlxb0teh@cluster0.9mafw.mongodb.net/football-teams';
// }
process.env.URLDB = urlDB;