const mongoose = require('mongoose');
const { Schema } = mongoose;
const userModel = require('./persona.model');
const courseModel = require('./courses.model');

let schemaOptions = {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
};

const userCourseSchema = new Schema({
    blnActive:{
        type: Boolean,
        default:true
    },
    idUser:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Favor de insertar el cliente']
    },
    idCourse:{
         type: Schema.Types.ObjectId,
         ref: 'Courses',
         required: [true, 'Favor de insertar el curso']
     }
     }, { collection: "userCourses" }, schemaOptions);

module.exports = mongoose.model('UserCourses', userCourseSchema);

