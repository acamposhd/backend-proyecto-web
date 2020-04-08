/*jshint esversion: 8*/
const UserCourse = require("../../models/userCourses.model");
const User = require("../../models/persona.model");
const Course = require("../../models/courses.model");
const express = require("express");
const app = express();

//|-------------Api GET Listado de UserCursos -----------|
//| Creada por: JACR                                     |
//| Fecha: 10/03/2020                                    |
//| Api que retorna un listado de Personas               |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/userCourses/obtener  |
//|------------------------------------------------------|

app.get("/obtener", (req, res) => {
     UserCourse.find()
     .populate("idUser")
       .then(resp => {
         if (resp.length === 0) {
           res.status(404).send({
             estatus: "404",
             err: true,
             msg: "Error: No se encontraron cursos relacionados con el cliente en la base de datos.",
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
           msg: "Error: Error al obtener los cursos de los usuarios.",
           cont: {
             err
           }
         });
       });
   });

//|-------------Api GET Cursos del Cliente especifico------|
//| Creada por:                                            |
//| Fecha: 10/03/2020                                      |
//| Api que retorna una Persona en especifico              |
//| modificada por:                                        |
//| Fecha de modificacion:                                 |
//| cambios:                                               |
//| Ruta: http://localhost:3000/api/userCourses/obtener/idUser|
//|--------------------------------------------------------|

app.get("/obtener/:idUser", (req, res) => {
     if (process.log) {
       console.log(req.params);
     }
     const { idUser } = req.params;
   
     UserCourse.findOne({ idUser: idUser })
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

//|---------------Api POST Nuevo Curso al cliente -------|
//| Creada por:                                          |
//| Fecha: 10/03/2020                                    |
//| Api que Inserta un usuario en la base de datos       |
//| modificada por:                                      |
//| Fecha de modificacion:                               |
//| cambios:                                             |
//| Ruta: http://localhost:3000/api/userCourses/registrar     |
//|------------------------------------------------------|

app.post("/registrar", (req, res) => {
     const userCourse = new UserCourse(req.body);
   
   //Validar si esta vacio 404 0 400
     userCourse
       .save()
       .then(resp => {
         res.status(200).send({
           estatus: "200",
           err: false,
           msg: "Success: Curso creado correctamente al usuario.",
           cont: {
             resp
           }
         });
       })
       .catch(err => {
         res.status(500).send({
           estatus: "500",
           err: true,
           msg: "Error: Error al crear el curso al usuario.",
           cont: {
             err
           }
         });
       });
   });

module.exports = app;
