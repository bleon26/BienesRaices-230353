import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const registerEmail = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, name, token } = newUserData;

    await transport.sendMail({
        from: 'BienesRaices_230353.com',
        to: email,
        subject: 'Bienvenido/a al BienesRaices_230353',
        text: 'Ya puedes usar nuestra plataforma, solo falta...',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #0033cc; text-align: center;">¡Bienvenido/a a BienesRaices_230353!</h2>
            <p style="font-size: 16px; text-align: justify; line-height: 1.6;">
                Hola, <span style="color: blue;">${name}</span>,<br><br>
                Te damos la más cordial bienvenida a nuestra plataforma <strong>BienesRaices_230353</strong>, el sitio seguro y confiable donde podrás buscar, comprar y vender propiedades sin complicaciones.<br><br>
                Ya solo falta un pequeño paso para completar tu registro. Te hemos enviado un enlace de confirmación para verificar que fuiste tú quien creó la cuenta. Haz clic en el siguiente botón para activar tu cuenta:
            </p>
            <div style="text-align: center; margin-top: 20px;">
            <br>
            <br>
                <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT ?? 3000}/auth/confirm/${token}" 
                    style="background-color: #00B2CA; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold;">
                    Confirmar Cuenta
                </a>
            </div>
            <br>
            <br>
            <p style="font-size: 16px; margin-top: 20px; text-align: justify;">
                Si no has creado una cuenta con nosotros, por favor ignora este mensaje. Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.
            </p>
            <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 16px; font-weight: bold; color: #0033cc;">Atentamente,</p>
                <p style="font-size: 16px; font-weight: bold;">Brandon León Cabrera</p>

                <img src="https://lh3.googleusercontent.com/pw/AP1GczMwxuB5EmG04f9BvJEtxbLuZlYJMBwo2j0ypLZTO7g4PeXPy19iWOd3hLu7HuZrEYcmJJCX-m16Iz2QOPJPg08UyHvoWfxRL4_TCnyd9YuM5m4Zr9S4iqt3mj-c5lgBxvKoWR9x3Hw5oGLoPK1im2f8=w172-h71-s-no-gm?authuser=0">
            </div>
        </div>
        `,
    });
};

const passwordRecoveryEmail = async (newUserData) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const { email, name, token } = newUserData;

    await transport.sendMail({
        from: 'BienesRaices_230353.com',
        to: email,
        subject: 'Bienvenido/a al BienesRaices_230353',
        text: 'Quieres cambiar tu contraseña?....',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
            <h2 style="color: #0033cc; text-align: center;">¡Bienvenido/a a BienesRaices_230353!</h2>
            <p style="font-size: 16px; text-align: justify; line-height: 1.6;">
                Hola, <span style="color: blue;">${name}</span>,<br><br>
                Hemos registrado un intento de cambio de contraseña, estamos aqui para ayudarte con ese proceso...
            </p>
            <div style="text-align: center; margin-top: 20px;">
            <br>
            <br>
                <a href="${process.env.BACKEND_DOMAIN}:${process.env.BACKEND_PORT ?? 3000}/auth/passwordRecovery/${token}" 
                    style="background-color: #00B2CA; color: white; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-size: 18px; font-weight: bold;">
                    Modificar contraseña
                </a>
            </div>
            <br>
            <br>
            <p style="font-size: 16px; margin-top: 20px; text-align: justify;">
                Si no has creado una cuenta con nosotros, por favor ignora este mensaje. Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.
            </p>
            <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 16px; font-weight: bold; color: #0033cc;">Atentamente,</p>
                <p style="font-size: 16px; font-weight: bold;">Brandon León Cabrera</p>

                <img src="https://lh3.googleusercontent.com/pw/AP1GczMwxuB5EmG04f9BvJEtxbLuZlYJMBwo2j0ypLZTO7g4PeXPy19iWOd3hLu7HuZrEYcmJJCX-m16Iz2QOPJPg08UyHvoWfxRL4_TCnyd9YuM5m4Zr9S4iqt3mj-c5lgBxvKoWR9x3Hw5oGLoPK1im2f8=w172-h71-s-no-gm?authuser=0">
            </div>
        </div>
        `,
    });
};

export { registerEmail, passwordRecoveryEmail };
