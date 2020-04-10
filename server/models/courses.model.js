const mongoose = require('mongoose');
const { Schema } = mongoose;

let schemaOptions = {
     timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at' 
     }
 };

 const courseSchema = new Schema({
     strCourseTitle: {
         type: String,
         required: [true, 'Favor de insertar el nombre del curso']
     },
     coursePrice: {
         type: Number,
         required: [true, 'Favor de insertar el precio']
     },

     courseImg: {
         type: String,
         required: [true, 'Favor de insertar la ruta de la imagen']
     },

     blnActive:{
        type: Boolean,
        default:true
    }
     }, { collection: "course" }, schemaOptions);
 
 module.exports = mongoose.model('Course', courseSchema);