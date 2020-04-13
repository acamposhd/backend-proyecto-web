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

//|---------------Api CHANGE status Usercurso  -------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que cambia el estado de un Usercurso                |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/userCourses/active/id         |

app.put("/active/:_id", (req, res) => {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
        message: "Course content can not be empty"
    });
}
// Find and update course active
UserCourse.findByIdAndUpdate(req.params._id, {
    blnActive: req.body.blnActive
}, {new: true})
.then(userCourse => {
    if(!userCourse) {
        return res.status(404).send({
            message: "Relation not found with id " + req.params._id
        });
    }
    res.send(userCourse);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Relation not found with id " + req.params._id
        });                
    }
    return res.status(500).send({
        message: "Something wrong updating note with id " + req.params._id
    });
});
});

//|---------------Api DELETE Elimina Usuariocurso  ---------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que Elimina un Usuariocurso en de la base de datos  |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/userCourses/eliminar/id |

app.delete("/eliminar/:_id", (req, res) => {
  UserCourse.findByIdAndRemove(req.params._id)
    .then(userCourse => {
        if(!userCourse) {
            return res.status(404).send({
                message: "Realtion not found with id " + req.params._id
            });
        }
        res.send({message: "Relation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Realation not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete relation with id " + req.params._id
        });
    });
  }); 

module.exports = app;
