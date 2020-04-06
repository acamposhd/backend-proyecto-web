/*jshint esversion: 8*/
const Persona = require('../../models/persona.model');
const UserType = require('../../models/personaTypes.model');
const express = require('express');
const app = express();


//|-------------Api GET Listado de Personas -------------|
//| Creada por: JACR                                     |
//| Fecha: 10/03/2020                                    |
//| Api que retorna un listado de Personas               |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/persona/obtener      |
//|------------------------------------------------------|
app.get('/obtener', (req, res) => {
    Persona.find().populate('userTypes').then((resp) => {

        if (resp.length === 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontraron usuarios en la base de datos.',
                cont: {
                    resp
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Success: Informacion obtenida correctamente.',
                cont: {
                    resp
                }
            });
        }
    }).catch((err) => {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al obtener a los usuarios.',
            cont: {
                err
            }
        });
    });
});

//|-------------Api GET Persona especifico ----------------|
//| Creada por:                                            |
//| Fecha: 10/03/2020                                      |
//| Api que retorna una Persona en especifico              |
//| modificada por:                                        |
//| Fecha de modificacion:                                 |
//| cambios:                                               |
//| Ruta: http://localhost:3000/api/persona/obtener/a@a.com|      
//|--------------------------------------------------------| 
app.get('/obtener/:strCorreo', (req, res) => {

    if (process.log) { console.log(req.params); }
    const { strCorreo } = req.params;

    Persona.findOne({ 'strCorreo': strCorreo }).then((resp) => {

        if (resp === null) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro el usuario en la base de datos.',
                cont: {
                    resp
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Success: Informacion obtenida correctamente.',
                cont: {
                    resp
                }
            });
        }
    }).catch((err) => {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al obtener el usuario.',
            cont: {
                err
            }
        });
    });
});

//|---------------Api POST Nuevo usuario ----------------|
//| Creada por:                                          |
//| Fecha: 10/03/2020                                    |
//| Api que Inserta un usuario en la base de datos       |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/persona/registrar    |
//|------------------------------------------------------|
app.post('/registrar', (req, res) => {


    const user = new Persona(req.body);

    console.log(user);
    
    user.save().then((resp) => {
        console.log(resp);
    })
    .catch((err) => {
        console.log(err);
    });
});
//|------------------Api PUT Actualiza Persona ---------------|
//| Creada por:                                               |
//| Fecha: 10/03/2020                                         |
//| Api que Actualiza una Persona de la base de datos         |
//| modificada por:                                           |
//| Fecha de modificacion:                                    |
//| cambios:                                                  |
//| Ruta: http://localhost:3000/api/persona/actualizar/a@a.com| 
app.put('/actualizar/:strCorreo', (req, res) => {}); // Pendiente hasta saber como se van a manejar los roles en el sistema

//|---------------Api DELETE Elimina usuario ---------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que Elimina un usuario en de la base de datos       |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/persona/eliminar/a@a.com| 
app.delete('/eliminar/:strCorreo', (req, res) => {

});

module.exports = app;