import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import { generateId } from "../helpers/tokens.js";
import { registerEmail } from '../helpers/emails.js';
import moment from 'moment'; 

// Formulario de login
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        autenticado: true,
        page: "Ingresa a la Plataforma"
    });
};




// Formulario de registro
const formularioRegister = (request, response) => {
    response.render('auth/register', {
        page: "Crea una Nueva Cuenta...",
        csrfToken: request.csrfToken()
    });
};


// Crear un nuevo usuario
const createNewUser = async (req, res) => {
    // Validación de los campos que se reciben del formulario
    await check('name').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('correo_usuario')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('El correo electrónico no tiene el formato correcto')
        .run(req);
    await check('pass_usuario')
        .notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('El Password debe ser de al menos 8 caracteres')
        .run(req);
    await check('pass2_usuario')
        .equals(req.body.pass_usuario).withMessage('La contraseña debe coincidir con la anterior')
        .run(req);

    // Validación de la fecha de nacimiento
    await check('fecha_nacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
        .custom((value) => {
            const age = moment().diff(moment(value, 'YYYY-MM-DD'), 'years');
            if (age < 18) {
                throw new Error('Debes ser mayor de 18 años para registrarte');
            }
            return true;
        })
        .run(req);

    let resultado = validationResult(req);

    // Verificamos que el resultado esté vacío
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: resultado.array(),
            User: {
                name: req.body.name,
                email: req.body.correo_usuario,
                fecha_nacimiento: req.body.fecha_nacimiento // Mantener la fecha de nacimiento
            }
        });
    }

    // Obtener datos del formulario
    const { name, correo_usuario: email, pass_usuario: password, fecha_nacimiento } = req.body;

    // Usar moment.js para formatear la fecha en el formato dd-mm-yyyy
    const formattedDate = moment(fecha_nacimiento).format('DD-MM-YYYY');

    // Verificamos que el usuario no existe previamente en la BD
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El usuario ya está registrado' }],
            User: {
                name: req.body.name,
                email: req.body.correo_usuario,
                fecha_nacimiento: req.body.fecha_nacimiento // Mantener la fecha de nacimiento
            }
        });
    }

    // Registramos los datos en la BD, incluyendo la fecha de nacimiento formateada
    const newUser = await User.create({
        name,
        email,
        password,
        token: generateId(),
        fecha_nacimiento: formattedDate  // Guardar la fecha de nacimiento como string formateada
    });

    // Enviar un email de confirmación
    registerEmail({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token
    });

    // Mostrar mensaje de confirmación
    res.render('templates/message', {
        page: 'Cuenta Creada Correctamente',
        msg: `Hemos Enviado un Email de Confirmación a ${email}, presione en el enlace`
    });
};

// Confirmar cuenta de usuario
const confirm = async (req, res) => {
    const { token } = req.params;

    // Verificamos si el token es válido
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/confirmAccount', {
            page: 'Error al confirmar tu cuenta...',
            msg: 'Hubo un error al confirmar tu cuenta, intenta de nuevo..',
            error: true
        });
    }

    // Confirmar Cuenta
    user.token = null;
    user.confirmed = true;
    await user.save();

    res.render('auth/confirmAccount', {
        page: 'Cuenta Confirmada',
        msg: 'La cuenta se ha confirmado Correctamente ',
        error: false
    });
};


// Formulario de recuperación de contraseña
const formularioPasswordRecovery = (request, response) => {
    response.render('auth/passwordRecovery', {
        page: "Recuperación de Contraseña",
        csrfToken: request.csrfToken()
    });
};

// Reset de contraseña
const resetPassword = async (req, res) => {
    await check('correo_usuario')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('El correo electrónico no tiene el formato correcto')
        .run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        return res.render('auth/passwordRecovery', {
            page: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errors: resultado.array()
        });
    }

    const { correo_usuario } = req.body;

    // Buscar el usuario
    const user = await User.findOne({ where: { email: correo_usuario } });
    if (!user) {
        return res.render('auth/passwordRecovery', {
            page: 'Recupera tu acceso a Bienes Raices',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'UPSSS, El Correo no Pertenece a ningún usuario' }]
        });
    }

    //Generar un token y enviar un email
    user.token = generateId();
    await user.save();

    //Enviar un Email
    passwordRecoveryEmail({
        email: user.email,
        name: user.name,
        token: user.token
    });

    //Renderizar un mensaje 
    res.render('templates/message', {
        page: 'Restablece tu Contraseña',
        msg: `Hemos Enviado un Email con las instrucciones para Reestablecer su contraseña`
    });
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;
    const usuario = await User.findOne({ where: { token } })
    if (!usuario) {
        return res.render('auth/confirmAccount', {
            page: 'Restablece tu password',
            msg: 'Hubo un error al validar tu información, intenta de nuevo',
            error: true
        })
    }

    //mostrar formulario para modificar el password
    res.render('auth/reset-password', {
        page: 'Restablece tu password',
        csrfToken: req.csrfToken()
    })

}

const nuevoPassword = async (req, res) => {
    //validar el password
    await check('password').isLength({ min: 8 }).withMessage('El password debe ser de almenos 6 caracteres').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado este vacio
    if (!resultado.isEmpty()) {
        return res.render('auth/reset-password', {
            page: 'Restablece tu password',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }

    const { token } = req.params
    const { password } = req.body;

    //identificar quien hace el cambio
    const usuario = await User.findOne({ where: { token } })

    usuario.password = password;
    await usuario.save();

    res.render('auth/confirmAccount', {
        page: 'Password Restablecido',
        msg: 'El password se guardo correctamente'
    })


}


export {
    formularioLogin,
    formularioRegister,
    formularioPasswordRecovery,
    createNewUser,
    confirm,
    resetPassword,
    comprobarToken,
    nuevoPassword
};