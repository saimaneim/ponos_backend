import {
	createTransport,
	type SendMailOptions,
	type Transporter,
} from "nodemailer";

interface ICreateTransporter {
	user: string;
	pass: string;
}

interface ISendEmail {
	to: string;
	subject: string;
	text: string;
	user: string;
	transporter: Transporter;
}
/**
 * Envía un correo electrónico utilizando el transporter proporcionado.
 * @param {string} to - Correo electrónico del destinatario.
 * @param {string} subject - Asunto del correo.
 * @param {string} text - Contenido del correo.
 * @param {string} user - Correo electrónico del remitente.
 * @param {Transporter} transporter - Transporter configurado para enviar emails.
 * @returns {Promise<void>}
 */
async function createTransporter({
	user,
	pass,
}: ICreateTransporter): Promise<Transporter> {
	const transporter = createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user,
			pass,
		},
	});

	return transporter;
}

async function sendEmail({
	to,
	subject,
	text,
	user,
	transporter,
}: ISendEmail): Promise<void> {
	const mailOptions: SendMailOptions = {
		from: user,
		to,
		subject,
		text,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
}

export { createTransporter, sendEmail };
