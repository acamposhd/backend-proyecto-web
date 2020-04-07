/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const userTypeModel = require('./personaTypes.model');

let schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
};


const userSchema = new Schema({
    strFirstname: {
        type: String,
        required: [true, 'Favor de insertar el nombre']
    },
    strMiddleName: {
        type: String,
        required: [true, 'Favor de insertar el apellido']
    },
    strLastName: {
        type: String,
        required: [true, 'Favor de insertar el apellido']
    },
    strMail: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/.test(v);
            },
            message: props => `${props.value} no es un correo valido`
        },
        required: [true, 'Favor de insertar el Correo']
    },
    idUserType:{
        type: Schema.Types.ObjectId,
        ref: 'UserTypes',
        required: [true, 'Favor de insertar el tipo']
    }
}, { collection: "user" }, schemaOptions);


module.exports = mongoose.model('User', userSchema);