const { crearUser, loginUser, getUserById, updateStatusUserById, updateUserById, getUserByEmail, updateCalendarById, getTutores } = require('../controllers/user.controller');
const router = require('express').Router();
// crear un usuario
router.post('/crear', crearUser); 

// hacer login
router.post('/login', loginUser) 

// obtener un usuario por su id
router.get('/getbyid/:iduser', getUserById) 

// actualizar el status del usuario
router.put('/update-status/:iduser', updateStatusUserById)

// actualizar datos (email) del usuario
router.put('/update/:iduser', updateUserById)

//actualizar calendario
router.put('/calendar/:iduser', updateCalendarById);

//buscar por email
router.get('/getbyemail/:email', getUserByEmail);

// buscar tutores 
router.get('/tutores', getTutores);






module.exports = router;