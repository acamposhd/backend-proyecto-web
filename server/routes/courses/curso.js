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
//| Ruta: http://localhost:3000/api/curso/obtener        |
//|------------------------------------------------------|

app.get("/obtener", (req, res) => {
  console.log('entra')
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
//| Ruta: http://localhost:3000/api/curso/obtener/strCourseTitle|
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
//| Ruta: http://localhost:3000/api/curso/registrar      |
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

   //|------------------Api PUT Actualiza Curso ---------------|
//| Creada por:                                               |
//| Fecha: 10/03/2020                                         |
//| Api que Actualiza un Curso    de la base de datos         |
//| modificada por:                                           |
//| Fecha de modificacion:                                    |
//| cambios:                                                  |
//| Ruta: http://localhost:3000/api/curso/actualizar/id       |

app.put("/actualizar/:_id", (req, res) => {
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "Course can not be empty"
      });
  }

  // Find and update course with the request body
  Course.findByIdAndUpdate(req.params._id, {
      blnActive: req.body.blnActive, 
      strCourseTitle: req.body.strCourseTitle || "No course title", 
      coursePrice: req.body.coursePrice || "No course price"
      //courseImg: req.body.courseImg || "No course img",
  }, {new: true})
  .then(course => {
      if(!course) {
          return res.status(404).send({
              message: "Course not found with id " + req.params._id
          });
      }
      res.send(course);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Course not found with id " + req.params._id
          });                
      }
      return res.status(500).send({
          message: "Something wrong updating note with id " + req.params._id
      });
  });
});

//|---------------Api CHANGE status curso  -----------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que cambia el estado de un curso                    |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/curso/active/id         |

app.put("/active/:_id", (req, res) => {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
        message: "Course content can not be empty"
    });
}
// Find and update course active
Course.findByIdAndUpdate(req.params._id, {
    blnActive: req.body.blnActive
}, {new: true})
.then(course => {
    if(!course) {
        return res.status(404).send({
            message: "Course not found with id " + req.params._id
        });
    }
    res.send(course);
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Course not found with id " + req.params._id
        });                
    }
    return res.status(500).send({
        message: "Something wrong updating note with id " + req.params._id
    });
});
});

//|---------------Api DELETE Elimina curso   ---------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que Elimina un curso en de la base de datos         |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/curso/eliminar/id       |

app.delete("/eliminar/:_id", (req, res) => {
Course.findByIdAndRemove(req.params._id)
  .then(course => {
      if(!course) {
          return res.status(404).send({
              message: "Course not found with id " + req.params._id
          });
      }
      res.send({message: "Course deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Course not found with id " + req.params._id
          });
      }
      return res.status(500).send({
          message: "Could not delete course with id " + req.params._id
      });
  });
}); 

module.exports = app;
