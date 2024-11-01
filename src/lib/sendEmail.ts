import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER!;
const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS!;

if (!EMAIL_USER) {
  throw new Error(
    "Please define the EMAIL_USER environment variable inside .env.local"
  );
}

if (!EMAIL_APP_PASS) {
  throw new Error(
    "Please define the EMAIL_APP_PASS environment variable inside .env.local"
  );
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_APP_PASS,
  },
});

export async function sendEmail({
  emailTo,
  subject,
  text,
  html,
}: {
  emailTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const isVerified = await transporter.verify();
  if (!isVerified) {
    throw Error("Failed to validate email provider");
  }

  const info = await transporter.sendMail({
    from: EMAIL_USER,
    to: emailTo,
    subject: subject,
    text: text,
    html: html,
  });

  return info;
}

export const sendSubmissionEmail = async (email: string, name: string) => {
  const response = await fetch("/api/v1/recruitment/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      applicantEmail: email,
      applicantName: name,
    }),
  });
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};