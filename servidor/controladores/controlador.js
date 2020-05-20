//se importa una referencia a la conexión.
var connection = require('../lib/conexionbd');

//funcion que me devuleve todas las peliculas
function mostrarPeliculas(req, res) {
    //consulta (let) que obtiene todas las películas de la base de datos:
    let sql = 'SELECT * from pelicula';
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let anio = req.query.anio;
    let columna_orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let pagina = Number(req.query.pagina);
    let cantidad = Number(req.query.cantidad);
    let total;
    let paginacion = (pagina - 1) * cantidad;
    console.log(paginacion);
    //filtro titulo genero anio

    if (titulo || genero || anio) {
        sql += ` WHERE`;

        if (titulo) {
            sql += ` titulo LIKE '%${titulo}%' and `;
        };

        if (genero) {
            sql += ` genero_id = ${genero} and `;
        };
        if (anio) {
            sql += ` anio = ${anio} and `;
        };

        sql = sql.slice(0, -4);
    };
    // ORDER BY
    sql += ` order by ${columna_orden} ${tipo_orden}`;
    console.log(sql);


    connection.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(404).send("hubo un error en la consulta");
        } else {
            total = results.length;

            sql += ` limit  ${cantidad} offset ${paginacion}`;
            console.log(sql);
            connection.query(sql, (error, results, fields) => {
                //se crea el objeto response con las peliculas encontradas
                var response = {
                    'peliculas': results,
                    'total': total
                };
                //envía el resultado (respuesta) al front-end:
                res.send(JSON.stringify(response));

            })
        }


    });

};

function mostrarGeneros(req, res) {
    //consulta (const) que obtiene todas los generos de la base de datos:
    const sql = 'select * from genero';
    connection.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(404).send("hubo un error en la consulta");
        }
        //se crea el objeto response con los generos encontradas
        var response = {
            'generos': results
        };

        //envía el resultado (respuesta) al front-end:
        res.send(response);
    })
};


function mostrarDetalles(req, res) {
    //consulta (const) que obtiene todas los generos de la base de datos:
    let id = req.params.id;
    const sql = `select 
                    pelicula.id,
                    pelicula.poster,
                    pelicula.titulo,
                    pelicula.anio,
                    pelicula.trama,
                    pelicula.fecha_lanzamiento,
                    pelicula.director,
                    pelicula.duracion,
                    pelicula.puntuacion,
                    actor.nombre as actorName,
                    genero.nombre 
                FROM pelicula  
                JOIN actor_pelicula ON pelicula.id = actor_pelicula.pelicula_id
                JOIN actor ON actor.id = actor_pelicula.actor_id
                JOIN genero ON genero.id = pelicula.genero_id   
                WHERE pelicula.id = ${id}`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(404).send("hubo un error en la consulta");
        }
        if (results.length == 0) {
            return res.status(404).send("no se encontro ninguna pelicula con ese id");

        } else {
            //se crea el objeto response con los generos encontradas
            var response = {
                'pelicula': results[0],
                'actores': results,
                'genero': results[0].nombre
            };

            //envía el resultado (respuesta) al front-end:
            res.send(response);
        }
    })
};

function recomendarPeli(req, res) {

    let genero = req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    let sql = 'select pelicula.id, pelicula.poster, pelicula.trama, pelicula.titulo, genero.nombre from pelicula  inner join genero  on pelicula.genero_id= genero.id';
    //'select * from pelicula JOIN genero on pelicula.genero_id = genero.id'
    console.log ("principio",sql);
   // if (genero || anio_inicio || puntuacion) {
       // sql += " WHERE "
     

        if (genero) {
            //sql +=  "genero.nombre = '" + genero + "' ";
            sql += ` where genero.nombre = '${genero}' `;
         
        }

        if (anio_inicio) {
            if (genero) {
                sql += "AND pelicula.anio BETWEEN "  + anio_inicio + " AND " + anio_fin ;
                
            }
            //sql += "WHERE anio BETWEEN " + anio_inicio + " AND " + anio_fin;

        }

        if (puntuacion) {
            if (genero || anio_inicio) {
                sql += "AND  pelicula.puntuacion = " + puntuacion;
               
            }
            sql += " WHERE pelicula.puntuacion = " + puntuacion;
        };
console.log("fin ",sql);
    

    connection.query(sql, (error, results, fields) => {
        if (error) {
            return res.status(404).send("hubo un error en la consulta");
        }
        //se crea el objeto response con las peliculas encontradas
        var response = {
            'peliculas': results
        };

        //envía el resultado (respuesta) al front-end:
        res.send(response);
    })
};


module.exports = {
    mostrarPeliculas, mostrarGeneros, mostrarDetalles, recomendarPeli
};