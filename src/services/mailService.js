require('dotenv').config();
const mailer = require("nodemailer");

const createTransporter = () => {
    return mailer.createTransport({
        host: process.env.REACT_APP_MAILTRAP_HOST,
        port: process.env.REACT_APP_MAILTRAP_PORT,
        secure: false, // Use false para STARTTLS
        auth: {
            user: process.env.REACT_APP_MAILTRAP_USER,
            pass: process.env.REACT_APP_MAILTRAP_PASS
        }
    });
};

const createMailOptions = (email, nome, mensagem, anexo) => {
    const mailOptions = {
        from: process.env.REACT_APP_MAILTRAP_FROM_USER,
        to: email,
        subject: `${nome} te enviou uma mensagem`,
        html: `<p>${mensagem}</p>`,
    };

    if (anexo) {
        mailOptions.attachments = [{
            filename: anexo.originalname,
            content: anexo.buffer
        }];
    }

    return mailOptions;
};

const sendEmail = (email, nome, mensagem, anexo) => {
    const smtpTransport = createTransporter();
    const mailOptions = createMailOptions(email, nome, mensagem, anexo);

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (error, response) => {
            smtpTransport.close();

            if (error) {
                console.error("Erro ao enviar email: ", error);
                return reject(error);
            } else {
                console.log("Email enviado com sucesso: ", JSON.stringify(response));
                if (response.accepted.length > 0) {
                    console.log(`Email aceito para: ${response.accepted}`);
                }
                if (response.rejected.length > 0) {
                    console.warn(`Email rejeitado para: ${response.rejected}`);
                }
                return resolve(response);
            }
        });
    });
};

module.exports = sendEmail;
