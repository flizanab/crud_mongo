const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../services/generar-jwt");


const crearUser = async (req, res) => { 

    const { name, age, email, password, description, rol, subjects} = req.body; 
  
    if (!name || !age || !email || !password) { 
      return res.status(404).json({
        msg: "Todos los campos son requeridos",
        status: 404,
      });
    }
    try {
     
      const salt = bcrypt.genSaltSync(); 
     
     await User.create({ 
        name: name,
        age: age,
        email: email,
        password: bcrypt.hashSync(password, salt),
        description: description,
        rol: rol,
        subjects:subjects,
      });
      
      res.status(201).json({ 
        msg: "Usuario creado correctamente",
        status: 201,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al crear el usuario",
        status: 500,
      });
    }
  };

  
  const loginUser = async (req, res) => { 
    const { email, password } = req.body; 
    if ((!email, !password)) {
      return res.status(404).json({
        msg: "Todos los campos son requeridos",
        status: 404,
      });
    }
  
    try {
      const findUser = await User.findOne({ email: email });
      
      
      if (!findUser) { 
          return res.status(404).json({
          msg: `Usuario con email ${email} no encontrado`,
          status: 404,
        });
      }
  
      if (findUser.status !== "active") {
        return res.status(404).json({
          msg: `Usuario con email ${email} no está activo en el sistema`,
          status: 404,
        });
      }
  


      const passVerify = bcrypt.compareSync(password, findUser.password);
  
      if (!passVerify) { 
        return res.status(404).json({
          msg: `Contraseña incorrecta`,
          status: 404,
        });
      }
      
      const token = await generarJWT(findUser._id);
  
      res.status(200).json({ 
        msg: `Usuario con email ${email} logueado correctamente`,
        status: 200,
        data: {
          id: findUser._id,
          name: findUser.name,
          age: findUser.age,
          email: findUser.email,
        },
        token: token
      });
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        msg: "Error al loguear el usuario",
        status: 500,
      });
    }
  };
 
  const getUserByEmail = async (req, res) => {
    const { email } = req.params;
  
    if (!email) {
      return res.status(404).json({
        msg: "Email de usuario es requerido",
        status: 404,
      });
    }
  
    try {
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({
          msg: `Usuario con email ${email} no encontrado`,
          status: 404,
        });
      }
  
      res.status(200).json({
        msg: "Usuario encontrado exitosamente",
        data: {
          name: user.name,
          age: user.age,
          email: user.email,
          password: user.password,
          rol: user.rol,
          subjects: user.subjects,
          description: user.description,
          calendar: user.calendar,
        },
        status: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al buscar el usuario por email",
        status: 500,
      });
    }
  };
  
 
  const getUserById = async (req, res) => { 
    const { iduser } = req.params; 
  
    
    if (!iduser) { 
      return res.status(404).json({
        msg: "Id de usuario es requerido",
        status: 404,
      });
    }
  
    if (iduser.length !== 24) {
      return res.status(404).json({
        msg: "Id de usuario no válido",
        status: 404,
      });
    }
  
    try {
      const user = await User.findOne({ _id: iduser }); 
  
      if (!user) { 
        return res.status(404).json({
          msg: "Usuario no encontrado",
          status: 404,
        });
      }
  
      res.status(200).json({
        msg: "Usuario encontrado exitosamente",
        data: {
          name: user.name,
          age: user.age,
          email: user.email,
          password: user.password,
          rol: user.rol,
          subjects: user.subjects,
          description: user.description,
          calendar: user.calendar,

        },
        status: 200,
      });
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        msg: "Error al buscar el usuario",
        status: 500,
      });
    }
  };

 
  const updateStatusUserById = async (req, res) => {
    const { iduser } = req.params; 
  
    if (!iduser) {  
      return res.status(404).json({
        msg: "Id de usuario es requerido",
        status: 404,
      });
    }
  
    if (iduser.length !== 24) { 
      return res.status(404).json({
        msg: "Id de usuario no válido",
        status: 404,
      });
    }
  
    try { 
      const changes = {
        status: "inactive",
      };
  
      const user = await User.findByIdAndUpdate(iduser, changes); 
  
      if (!user) { 
        return res.status(404).json({
          msg: "Usuario no encontrado",
          status: 404,
        });
      }
  
      res.status(200).json({ 
        msg: "Usuario actualizado exitosamente",
        status: 200,
      });
    } catch (error) { 
      console.log(error);
      res.status(500).json({
        msg: "Error al buscar el usuario",
        status: 500,
      });
    }
  };
 
  const getTutores = async (req, res) => {
    try {
      const tutores = await User.find({ rol: 'tutor' });
      res.status(200).json({
        msg: 'Lista de tutores obtenida exitosamente',
        data: tutores,
        status: 200,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Error al obtener la lista de tutores',
        status: 500,
      });
    }
  }
 
  const updateUserById = async (req, res)=>{
    const { iduser } = req.params; 
    const { name, age, email } = req.body; 
  
    if (!iduser) { 
      return res.status(404).json({
        msg: "Id de usuario es requerido",
        status: 404,
      });
    }
  
    if (iduser.length !== 24) { 
      return res.status(404).json({
        msg: "Id de usuario no válido",
        status: 404,
      });
    }
  
    const userChanges = {
      name: name, 
      age: age,
      email: email
    }
  
    await User.findByIdAndUpdate(iduser, userChanges) 
    res.status(200).json({
      msg: "Usuario actualizado correctamente",
      status:200
    })
  }
  const updateCalendarById = async (req, res) => {
    const { iduser } = req.params;
    const { calendarData } = req.body;
  
    try {
      
      const user = await User.findByIdAndUpdate(
        iduser,
        { calendar: calendarData },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          msg: "Usuario no encontrado",
          status: 404,
        });
      }
  
      res.status(200).json({
        msg: "Calendario actualizado exitosamente",
        status: 200,
        data: {
          name: user.name,
          age: user.age,
          email: user.email,
         
          calendar: user.calendar,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al actualizar el calendario del usuario",
        status: 500,
      });
    }
  };
  
  
  module.exports = {
    crearUser,
    loginUser,
    getUserById,
    updateStatusUserById,
    updateUserById,
    updateCalendarById,
    getUserByEmail,
    getTutores,

  };