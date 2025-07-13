import { getRequiredEnv } from "@/utils/getEnv";
import { Resend } from "resend";

const resend = new Resend(getRequiredEnv("RESEND_API_KEY"));

/**
 * Send an email using the transporter provided.
 * @param {string} to - Email of the recipient.
 * @param {string} subject - Subject of the email.
 * @param {string} text - Content of the email.
 * @param {string} user - Email of the sender.
 * @returns {Promise<void>}
 */
export async function sendEmail({
	to,
	subject,
	text,
	user,
}: {
	to: string;
	subject: string;
	text: string;
	user: string;
}): Promise<void> {
	await resend.emails.send({
		from: user,
		to,
		subject,
		text,
	});
}
