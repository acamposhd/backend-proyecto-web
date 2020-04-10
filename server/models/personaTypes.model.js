const mongoose = require('mongoose');
const { Schema } = mongoose;

let schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
};

const userTypeSchema = new Schema({
    userType: {
        type: String,
        required: [true, 'Favor de insertar el nombre']
    }
}, { collection: "userTypes" }, schemaOptions);

module.exports = mongoose.model('UserTypes', userTypeSchema);