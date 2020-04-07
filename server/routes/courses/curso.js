/*jshint esversion: 8*/
const Course = require("../../models/courses.model");
const express = require("express");
const app = express();

//|-------------Api GET Listado de Cursos -------------|
//| Creada por: JACR                                     |
//| Fecha: 10/03/2020                                    |
//| Api que retorna un listado de Personas               |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/courses/obtener      |
//|------------------------------------------------------|

app.get("/obtener", (req, res) => {
     Course.find()
      // .populate("idUserType")
       .then(resp => {
         if (resp.length === 0) {
           res.status(404).send({
             estatus: "404",
             err: true,
             msg: "Error: No se encontraron cursos en la base de datos.",
             cont: {
               resp
             }
           });
         } else {
           res.status(200).send({
             estatus: "200",
             err: false,
             msg: "Success: Informacion obtenida correctamente.",
             cont: {
               resp
             }
           });
         }
       })
       .catch(err => {
         res.status(500).send({
           estatus: "500",
           err: true,
           msg: "Error: Error al obtener los cursos.",
           cont: {
             err
           }
         });
       });
   });

   //|-------------Api GET Curso especifico ----------------|
//| Creada por:                                            |
//| Fecha: 10/03/2020                                      |
//| Api que retorna una Persona en especifico              |
//| modificada por:                                        |
//| Fecha de modificacion:                                 |
//| cambios:                                               |
//| Ruta: http://localhost:3000/api/courses/obtener/a@a.com|
//|--------------------------------------------------------|

app.get("/obtener/:strCourseTitle", (req, res) => {
     if (process.log) {
       console.log(req.params);
     }
     const { strCourseTitle } = req.params;
   
     Course.findOne({ strCourseTitle: strCourseTitle })
       .then(resp => {
         if (resp === null) {
           res.status(404).send({
             estatus: "404",
             err: true,
             msg: "Error: No se encontro el curso en la base de datos.",
             cont: {
               resp
             }
           });
         } else {
           res.status(200).send({
             estatus: "200",
             err: false,
             msg: "Success: Informacion obtenida correctamente.",
             cont: {
               resp
             }
           });
         }
       })
       .catch(err => {
         res.status(500).send({
           estatus: "500",
           err: true,
           msg: "Error: Error al obtener el curso.",
           cont: {
             err
           }
         });
       });
   });

//|---------------Api POST Nuevo Curso ------------------|
//| Creada por:                                          |
//| Fecha: 10/03/2020                                    |
//| Api que Inserta un usuario en la base de datos       |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/course/registrar     |
//|------------------------------------------------------|

app.post("/registrar", (req, res) => {
     const course = new Course(req.body);
   
   //Validar si esta vacio 404 0 400
     course
       .save()
       .then(resp => {
         res.status(200).send({
           estatus: "200",
           err: false,
           msg: "Success: Curso creado correctamente.",
           cont: {
             resp
           }
         });
       })
       .catch(err => {
         res.status(500).send({
           estatus: "500",
           err: true,
           msg: "Error: Error al crear el curso.",
           cont: {
             err
           }
         });
       });
   });

//|------------------Api PUT Actualiza Curso -----------------|
//| Creada por:                                               |
//| Fecha: 10/03/2020                                         |
//| Api que Actualiza una Persona de la base de datos         |
//| modificada por:                                           |
//| Fecha de modificacion:                                    |
//| cambios:                                                  |
//| Ruta: http://localhost:3000/api/course/actualizar/a@a.com|
app.put("/actualizar/:coursePrice", (req, res) => {}); // Pendiente hasta saber como se van a manejar los roles en el sistema

//|---------------Api DELETE Elimina Curso-- ---------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que Elimina un usuario en de la base de datos       |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/course/eliminar/a@a.com|
app.delete("/eliminar/:coursePrice", (req, res) => {});

module.exports = app;
