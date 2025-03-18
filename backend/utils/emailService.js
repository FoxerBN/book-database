import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.API_SENDGRID);

/**
 * @param {string} toEmail 
 * @param {string} roomId 
 */
export async function sendRoomCreationEmail(toEmail, roomId) {
  const link = `http://localhost:5173/profile/support/?roomId=${roomId}`;

  const msg = {
    to: toEmail,
    from: "foxerbn@outlook.com",
    subject: "New Support Room",
    text: `Join the new support room: ${link}`,
    html: `<p>Join the new support room: <a href="${link}">${link}</a></p>`,
  };

  await sgMail.send(msg);
}
