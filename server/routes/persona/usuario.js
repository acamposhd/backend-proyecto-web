/*jshint esversion: 8*/
const Persona = require("../../models/persona.model");
const UserType = require("../../models/personaTypes.model");
const express = require("express");
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
app.get("/obtener", (req, res) => {
  Persona.find()
    .populate("idUserType")
    .then(resp => {
      if (resp.length === 0) {
        res.status(404).send({
          estatus: "404",
          err: true,
          msg: "Error: No se encontraron usuarios en la base de datos.",
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
        msg: "Error: Error al obtener a los usuarios.",
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
//| Ruta: http://localhost:3000/api/persona/obtener/strMail|
//|--------------------------------------------------------|
app.get("/obtener/:strMail", (req, res) => {
  if (process.log) {
    console.log(req.params);
  }
  const { strMail } = req.params;

  Persona.findOne({ strMail: strMail })
    .then(resp => {
      if (resp === null) {
        res.status(404).send({
          estatus: "404",
          err: true,
          msg: "Error: No se encontro el usuario en la base de datos.",
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
        msg: "Error: Error al obtener el usuario.",
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
app.post("/registrar", (req, res) => {
  const user = new Persona(req.body);

//Validar si esta vacio 404 0 400
  user
    .save()
    .then(resp => {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Success: Usuario creado correctamente.",
        cont: {
          resp
        }
      });
    })
    .catch(err => {
      res.status(500).send({
        estatus: "500",
        err: true,
        msg: "Error: Error al crear el usuario.",
        cont: {
          err
        }
      });
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
//app.put("/actualizar/:strCorreo", (req, res) => {}); // Pendiente hasta saber como se van a manejar los roles en el sistema

app.put("/actualizar/:_id", (req, res) => {
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "User content can not be empty"
      });
  }

  // Find and update user with the request body
  Persona.findByIdAndUpdate(req.params._id, {
      blnActive: req.body.blnActive, 
      strFirstname: req.body.strFirstname || "No first name", 
      strMiddleName: req.body.strMiddleName || "No middle name", 
      strLastName: req.body.strLastName || "No last name",
      strMail: req.body.strMail || "No mail",
      strPassword: req.body.strPassword
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params._id
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params._id
          });                
      }
      return res.status(500).send({
          message: "Something wrong updating note with id " + req.params._id
      });
  });
});

//|---------------Api CHANGE status usuario  ---------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que cambia el estado de un usuario                  |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/persona/active/id       |

app.put("/active/:_id", (req, res) => {
    // Validate Request
    if(!req.body) {
      return res.status(400).send({
          message: "User content can not be empty"
      });
  }
  // Find and update user active
  Persona.findByIdAndUpdate(req.params._id, {
      blnActive: req.body.blnActive
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params._id
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params._id
          });                
      }
      return res.status(500).send({
          message: "Something wrong updating note with id " + req.params._id
      });
  });
});

//|---------------Api DELETE Elimina usuario ---------------|
//| Creada por:                                             |
//| Fecha: 10/03/2020                                       |
//| Api que Elimina un usuario en de la base de datos       |
//| modificada por:                                         |
//| Fecha de modificacion:                                  |
//| cambios:                                                |
//| Ruta: http://localhost:3000/api/persona/eliminar/id     |
//app.delete("/eliminar/:_id", (req, res) => {});

app.delete("/eliminar/:_id", (req, res) => {
  Persona.findByIdAndRemove(req.params._id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params._id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params._id
        });
    });
});

module.exports = app;
