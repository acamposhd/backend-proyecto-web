/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;



const userSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Favor de insertar el nombre']
    },
    strPrimerApellido: {
        type: String,
        required: [true, 'Favor de insertar el apellido']
    },
    strSegundoApellido: String,
    strCurp: {
        type: String,
        required: [true, 'Favor de insertar la CURP']
    },
    strCorreo: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/.test(v);
            },
            message: props => `${props.value} no es un correo valido`
        },
        required: [true, 'Favor de insertar el Correo']
    },
    strPassword: String,
    strCalle: {
        type: String,
        required: [true, 'Favor de insertar la calle']
    },
    strColonia: {
        type: String,
        required: [true, 'Favor de insertar la colonia']
    },
    nmbCodigoPostal: {
        type: Number,
        required: [true, 'Favor de insertar el numero de la vivienda']
    },
    strSexo: {
        type: String,
        required: [true, 'Favor de insertar el sexo']
    },
    dteFechaNacimiento: {
        type: Date,
        required: [true, 'Favor de insertar la fecha de nacimiento']
    },
    blnTrabajo: Boolean,
    strEmpresa: {
        type: String,
        default: null
    },
    idNacionalidad: {
        type: Schema.Types.ObjectId,
        ref: 'Nacionalidad',
        required: [true, 'Favor de insertar la nacionalidad']
    },
    idEmpresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    idModalidadSecundaria: {
        type: Schema.Types.ObjectId,
        ref: 'ModalidadSecundaria',
        required: [true, 'Favor de insertar la modalidad de secundaria']
    },
    idEdoCivil: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoCivil',
        required: [true, 'Favor de insertar el estado civil']
    },
    strTelefono: String,
    idMunicipioResidencia: {
        type: Schema.Types.ObjectId,
        ref: 'Estado.aJsnMunicipio',
        required: [true, 'Favor de insertar el municipio']
    },
    idMunicipioNacimiento: {
        type: Schema.Types.ObjectId,
        ref: 'Estado.aJsnMunicipio'
    },
    idModalidadPrepa: {
        type: Schema.Types.ObjectId,
        ref: 'ModalidadPrepa',
        required: [true, 'Favor de insertar la modalidad que se va a recursar']
    },
    nmbTiempoSinEstudiarMeses: Number,
    idEstatusAcademico: {
        type: Schema.Types.ObjectId,
        ref: 'EstatusAcademicos',
        required: [true, 'Favor de insertar el estatus']
    },
    strMatricula: String,
    blnActivo: {
        type: Boolean,
        default: true
    }
}, { collection: "persona" });

module.exports = mongoose.model('Usuario', userSchema);