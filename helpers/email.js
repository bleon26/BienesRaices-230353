import nodemailer from 'nodemailer';

const registerEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.Email_HOST,
        port: process.env.Email_PORT,
        auth: {
            user: process.env.Email_USER,
            pass: process.env.Email_PASS,
        },
    });

    const { email, name, token } = data;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices_230499',
        to: email,
        subject: 'Confirma tu cuenta...',
        text: `Estimado ${name}, es necesario que confirme su cuenta para poder acceder a BienesRaices_230499.`,
        html: `
            <header style="font-family: bold; text-align: center; line-height: 0.5;">
                <h2>Bienes Raices</h2>
                <h3>Confirmación de correo</h3>
            </header>
            <div style="font-family: bold, sans-serif; text-align: justify; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 25px; border: 10px solid #ddd; border-radius: 5px;">
                <h2 style="color: #50c878;">¡Hola, <span style="color: #50c878;">${name}</span>!</h2>
                <div style="padding: 35px; border: dashed #50c878; border-radius: 30px;">
                    <p style="font-size: 18px;">
                        ¡Gracias por registrarte en <strong>BienesRaices_230499</strong>! Para completar el proceso de confirmación de tu cuenta y acceder a todos nuestros servicios, necesitamos la confirmación de tu correo electrónico.
                    </p>
                    <div style="text-align: center; background: #F1FBFA; border: 1px solid #000000; padding: 15px;">
                        <p style="font-size: 20px;">
                            Haz clic en el botón de abajo para confirmar tu cuenta:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}" 
                               style="background-color: #50c878; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                               Confirmar Cuenta
                            </a>
                        </div>
                    </div>
                    <p style="font-size: 18px; color: #666;">
                        Si no reconoces esta solicitud o no creaste la cuenta, puedes ignorar este mensaje. ¡Gracias por elegirnos! Estamos emocionados por poder ayudarte a encontrar la propiedad deseada.
                    </p>
                    <div style="text-align: center; line-height: 1.6;">
                        <p style="font-size: 20px; color: #666;">
                            Atentamente, <br>
                            <strong>Angel de Jesus Rufino Mendoza</strong>
                        </p>
                         <div style="margin-bottom: 15px;">
                            <img src="https://lh3.googleusercontent.com/pw/AP1GczOqyY_KoRU97oqOrExRcinNI02hEyNxTdEwMA2pK5v4ByWLP6_fn7gGIKYpznPMssC9ki95Gz_V6kiudDpLMJHHtrevK6ZhignoLDgguI3zgGNleBR3gtzxqik0xotsBZMESPUkFO3VvhztfCUSm7X_=w214-h98-s-no-gm?authuser=0" alt="Firma" style="max-width: 150px; border-radius: 5px;">
                        </div>
                    </div>
                </div>
            </div>
            <footer style="text-align: center;">
                @Todos los derechos reservados de BienesRaices_230499
            </footer>
        `,
    });
}    

const passwordRecoveryEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.Email_HOST,
        port: process.env.Email_PORT,
        auth: {
            user: process.env.Email_USER,
            pass: process.env.Email_PASS,
        },
    });

    const { email, name, token } = data;
    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices_230499',
        to: email,
        subject: 'Reestablece tu contraseña...',
        text: `Estimado ${name}, haz solicitado el cambio de contraseña de tu cuenta en BienesRaices_230499.`,
        html: `
            <header style="font-family: bold; text-align: center; line-height: 0.5;">
                <h2>Bienes Raices</h2>
                <h3>Recuperación de contraseña</h3>
            </header>
            <div style="font-family: bold, sans-serif; text-align: justify; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 25px; border: 10px solid #ddd; border-radius: 5px;">
                <h2 style="color: #50c878;">¡Hola, <span style="color: #50c878;">${name}</span>!</h2>
                <div style="padding: 35px; border: dashed #50c878; border-radius: 30px;">
                    <p style="font-size: 18px;">
                        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>BienesRaices_230499</strong>.
                    </p>
                    <div style="text-align: center; background: #F1FBFA; border: 1px solid #000000; padding: 15px;">
                        <p style="font-size: 20px;">
                            Haz clic en el botón de abajo para restablecer tu contraseña:
                        </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/reset-password/${token}" 
                               style="background-color: #50c878; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                               Restablecer Contraseña
                            </a>
                        </div>
                    </div>
                    <p style="font-size: 18px; color: #666;">
                        Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta seguirá siendo segura.
                    </p>
                    <div style="text-align: center; line-height: 1.6;">
                        <p style="font-size: 20px; color: #666;">
                            Atentamente, <br>
                            <strong>Angel de Jesus Rufino Mendoza</strong>
                        </p>
                         <div style="margin-bottom: 15px;">
                            <img src="https://lh3.googleusercontent.com/pw/AP1GczOqyY_KoRU97oqOrExRcinNI02hEyNxTdEwMA2pK5v4ByWLP6_fn7gGIKYpznPMssC9ki95Gz_V6kiudDpLMJHHtrevK6ZhignoLDgguI3zgGNleBR3gtzxqik0xotsBZMESPUkFO3VvhztfCUSm7X_=w214-h98-s-no-gm?authuser=0" alt="Firma" style="max-width: 150px; border-radius: 5px;">
                        </div>
                    </div>
                </div>
            </div>
            <footer style="text-align: center;">
                @Todos los derechos reservados de BienesRaices_230499
            </footer>
        `,
    });
}
export { registerEmail, passwordRecoveryEmail };