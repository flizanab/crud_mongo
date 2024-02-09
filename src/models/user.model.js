const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String, 
    age: Number,
    email: String,
    password: String,
    status: { 
        type: String,
        enum: ['active', 'inactive'],
        require: true,
        default: 'active'
    },
    rol: {
        type: String,
        enum: ['admin', 'tutor','user'],
        require: true,
        default: 'user'
    },
    subjects: [
        {
            type: String,
            enuma: ['Matemáticas','Tecnología','Idiomas', 'Historia', 'Recursos','Economía','habilidades','Creatividad','Otras']
        }
    ],
    description: String,
    calendar: {
        type: Map,
        of: String,
    profileImage: {
        type: String, 
    },
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;