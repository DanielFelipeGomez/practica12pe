import express from 'express';
import {ResponseType} from './response_type.js'
import { MenuFunko } from './handler/menuFunko.js';
import { TipoFunko } from './enumerables/tipo_funko_enum.js';
import { GeneroFunko } from './enumerables/genero_funko_enum.js';
import { MongoClient } from 'mongodb';
import { Funko } from './entities/funko.js';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funko-app';

interface FunkoInterface {
    id: number,
    funko: Funko
}


/**
 * Creamos una instancia de Express
 */
const app = express();


/**
 * Definimos para la misma ruta distintos métodos HTTP
 * para que el cliente pueda realizar distintas acciones
 * sobre la misma ruta.
 * GET: Listar todos los Funkos o un Funko en particular
 * POST: Agregar un Funko
 * DELETE: Eliminar un Funko
 * PATCH: Actualizar un Funko
 */
app.route('/funkos')
    .get((req, res) => { 
        if (req.query.nombreUsuario && !req.query.id) {
            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
                return db.collection<FunkoInterface>(req.query.nombreUsuario as string).find().toArray();
              }).then((result) => {
                const response: ResponseType = {
                    type: 'read',
                    success: true,
                    funkoData: result,
                    };
                    res.send({
                        response
                    })
              }).catch((error) => {
                res.status(500)
                const response: ResponseType = {
                type: 'read',
                success: false,
                funkoData: error,

                };
                res.send({
                    response
                })
              });
        }else if (!req.query.nombreUsuario || !req.query.id) {
            res.status(400);
            res.send({
            error: 'Debe ingresar un nombre de usuario y un id, para un Funko en particular o solo un nombre de usuario para listar todos los Funkos',
            });
        } else {
            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
              
                return db.collection<FunkoInterface>(req.query.nombreUsuario as string).findOne({
                  id: Number(req.query.id as string)
                });
              }).then((result) => {
                const response: ResponseType = {
                    type: 'read',
                    success: true,
                    funkoData: result,
                    };
                    res.send({
                        response
                    })
              }).catch((error) => {
                res.status(500)
                const response: ResponseType = {
                type: 'read',
                success: false,
                funkoData: error,

                };
                res.send({
                    response
                })
              });
            
        }
    })
    .post((req, res) => {
        
        if (!req.query.nombreUsuario || !req.query.id || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numero || !req.query.caracteristica_especial || !req.query.valor_mercado) {
            res.status(400);
            res.send({
            error: 'Debe ingresar todos los datos del Funko, los cuales son: nombreUsuario, id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial y valor_mercado',
            });
        } else {
            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
                const funko = new Funko( Number(req.query.id as string), req.query.nombre as string,
                        req.query.descripcion as string, req.query.tipo as string as TipoFunko, req.query.genero as string as GeneroFunko, req.query.franquicia as string,
                         Number(req.query.numero as string), req.query.exclusivo as unknown as boolean, req.query.caracteristica_especial as string,
                         Number(req.query.valor_mercado as string));
                
                return db.collection<FunkoInterface>(req.query.nombreUsuario as string).insertOne({
                    id: Number(req.query.id as string),
                    funko: funko
                });
            }).then((result) => {
                const response: ResponseType = {
                    type: 'add',
                    success: true,
                    funkoData: result,
                    };
                    res.send({
                        response
                    })
            }).catch((error) => {
                res.status(500)
                    const response: ResponseType = {
                    type: 'add',
                    success: false,
                    funkoData: error,

                    };
                    res.send({
                        response
                    })
            });
            
        }
    })
    .delete((req, res) => {
        if (!req.query.nombreUsuario || !req.query.id) {
            res.status(400);
            res.send({
            error: 'Debe ingresar un nombre de usuario y un id',
            });
        } else {

            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
            
                return db.collection<FunkoInterface>(req.query.nombreUsuario as string).deleteOne({
                    id: Number(req.query.id as string),
                });
            }).then((result) => {
                const response: ResponseType = {
                    type: 'delete',
                    success: true,
                    funkoData: result,
                    };
                    res.send({
                        response
                    })
            }).catch((error) => {
                res.status(500)
                const response: ResponseType = {
                type: 'delete',
                success: false,
                funkoData: error,
                };
                res.send({
                    response
                })
            });
            
        }
        
    })
    .patch((req, res) => {
        if (!req.query.nombreUsuario || !req.query.id || !req.query.nombre || !req.query.descripcion || !req.query.tipo || !req.query.genero || !req.query.franquicia || !req.query.numero || !req.query.caracteristica_especial || !req.query.valor_mercado) {
            res.status(400);
            res.send({
            error: 'Debe ingresar todos los datos del Funko, los cuales son: nombreUsuario, id, nombre, descripcion, tipo, genero, franquicia, numero, exclusivo, caracteristica_especial y valor_mercado',
            });
        } else {
            MongoClient.connect(dbURL).then((client) => {
                const db = client.db(dbName);
                const funkoNuevo = new Funko(Number(req.query.id as string), req.query.nombre as string,
                req.query.descripcion as string, req.query.tipo as string as TipoFunko, req.query.genero as string as GeneroFunko, req.query.franquicia as string,
                Number(req.query.numero as string), req.query.exclusivo as unknown as boolean, req.query.caracteristica_especial as string,
                Number(req.query.valor_mercado as string))
                return db.collection<FunkoInterface>(req.query.nombreUsuario as string).updateOne({
                  id: Number(req.query.id as string),
                }, {
                  $set: {
                    funko: funkoNuevo
                  },
                });
              }).then((result) => {
                const response: ResponseType = {
                    type: 'update',
                    success: true,
                    funkoData: result,
                    };
                    res.send({
                        response
                    })
              }).catch((error) => {
                res.status(500)
                    const response: ResponseType = {
                    type: 'update',
                    success: false,
                    funkoData: error,

                    };
                    res.send({
                        response
                    })
              });
            
        }
    });

/**
 * Definimos una ruta por defecto, en caso de ingresarse una ruta que no existe
 * se retorna un error 404
 */
app.get('*', (req, res) => {
  res.status(404)
  res.send()
})

/**
 * Definimos el puerto 3000 para escuchar las peticiones
 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
