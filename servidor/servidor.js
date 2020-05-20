//paquetes necesarios para el proyecto
var express     = require('express');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var { mostrarPeliculas, mostrarGeneros, mostrarDetalles, recomendarPeli} = require ('../servidor/controladores/controlador');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// cuando se llama a esta ruta /recomendacion, se ejecuta las acciones de remoendar ...
app.get('/peliculas/recomendacion?', recomendarPeli);
//cuando se llama a la ruta /peliculas, se ejecuta la acción mostrarPeliculas...(trae TODAS las peliculas)
app.get('/peliculas', mostrarPeliculas);
//cuando se llama a la ruta /genero, se ejecuta la acción mostrarGenero...(trae las peliculas correspondientes al genero)
app.get('/generos', mostrarGeneros);
// cuando se llama a la ruta /peliculas/:id, se muestran los detalles de cada pelicula...
app.get('/peliculas/:id', mostrarDetalles);




//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`);
});

