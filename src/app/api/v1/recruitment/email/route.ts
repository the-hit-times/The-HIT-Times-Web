import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic"; // defaults to force-static

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_APP_PASS = process.env.EMAIL_APP_PASS;

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

export async function POST(request: NextRequest) {
  // get applicationEmail & name from the request
  const { applicantEmail, applicantName } = await request.json();

  if (!applicantEmail || !applicantName) {
    return NextResponse.json(
      {
        success: false,
        msg: "Please provide both Email and Applicant Name",
      },
      { status: 400 }
    );
  }

  try {
    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: applicantEmail,
      subject: "Response recorded for THT Recruitment Drive 2k25",
      html: `
      <p>Greetings, Dear ${applicantName}!</p><br />
<b>Your Recruitment Form 2k25 application for The HIT Times has been received.</b>

<p>Thank you for taking the time to complete and successfully submit the Recruitment Form for our 2025 intake.</p><br />

<p>We are thoroughly reviewing each entry to ensure that we select candidates who align with our values and vision.</p> <br />

<p><b>As we move through the Recruitment Drive, we strongly advise you to stay connected by regularly checking your email and ensuring that the contact number you provided remains reachable for any follow-up communications.</b><br />
<p>We appreciate your interest and wish you the very best in the recruitment process. Stay tuned for updates!</p>

<p>Sincerely,<br/>
The HIT Times.</p>
      `,
      text: `Greetings, Dear ${applicantName}!

Your Recruitment Form 2k25 application for The HIT Times has been received.

Thank you for taking the time to complete and successfully submit the Recruitment Form for our 2025 intake.

We are thoroughly reviewing each entry to ensure that we select candidates who align with our values and vision.

As we move through the Recruitment Drive, we strongly advise you to stay connected by regularly checking your email and ensuring that the contact number you provided remains reachable for any follow-up communications.

We appreciate your interest and wish you the very best in the recruitment process. Stay tuned for updates!

Sincerely,
The HIT Times.`,
    });

    return NextResponse.json({
      success: true,
      msg: "Email sent successfully",
      info,
    });
  } catch (error: any) {
    const myBlob = {
      success: false,
      msg: error.message,
    };
    const myOptions = { status: 400 };
    return Response.json(myBlob, myOptions);
  }
}
