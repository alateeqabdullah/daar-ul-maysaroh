// src/lib/email.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "MadrasahPro <noreply@madrasahpro.com>",
      to: email,
      subject: "Welcome to MadrasahPro - Account Created",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Welcome to MadrasahPro!</h1>
            <p style="opacity: 0.9; margin-top: 10px;">Islamic Education Platform</p>
          </div>
          
          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Assalamu Alaikum <strong>${name}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Welcome to MadrasahPro! Your account has been created successfully and is currently pending admin approval.
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                <strong>Account Details:</strong><br>
                Email: ${email}<br>
                Status: Pending Approval
              </p>
            </div>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              You will receive another email once your account is approved by our administration team. 
              This process typically takes 24-48 hours.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${
                process.env.NEXTAUTH_URL
              }/login" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Go to Login
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
              If you have any questions, please contact our support team at support@madrasahpro.com
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p>&copy; ${new Date().getFullYear()} MadrasahPro. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Welcome email sent to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
}

export async function sendApprovalEmail(
  email: string,
  name: string,
  approved: boolean,
  reason?: string
) {
  try {
    const subject = approved
      ? "Your MadrasahPro Account Has Been Approved!"
      : "Your MadrasahPro Account Application Status";

    await resend.emails.send({
      from: process.env.EMAIL_FROM || "MadrasahPro <noreply@madrasahpro.com>",
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: ${
            approved
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
          }; padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">
              ${approved ? "Account Approved!" : "Application Update"}
            </h1>
          </div>
          
          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Assalamu Alaikum <strong>${name}</strong>,
            </p>
            
            ${
              approved
                ? `
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Great news! Your MadrasahPro account has been approved by our administration team.
              </p>
              
              <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
                <p style="margin: 0; color: #065f46; font-size: 18px; font-weight: bold;">
                  🎉 Welcome to MadrasahPro! 🎉
                </p>
                <p style="margin: 10px 0 0 0; color: #065f46;">
                  You can now log in and access all features of our platform.
                </p>
              </div>
            `
                : `
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for your interest in MadrasahPro. After reviewing your application, we regret to inform you that it was not approved at this time.
              </p>
              
              ${
                reason
                  ? `
                <div style="background: #fee2e2; padding: 20px; border-radius: 8px; margin: 25px 0;">
                  <p style="margin: 0; color: #991b1b;">
                    <strong>Reason:</strong> ${reason}
                  </p>
                </div>
              `
                  : ""
              }
              
              <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                If you believe this is an error or would like to appeal this decision, please contact our support team.
              </p>
            `
            }
            
            ${
              approved
                ? `
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXTAUTH_URL}/login" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Login to Your Account
                </a>
              </div>
            `
                : ""
            }
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
              If you have any questions, please contact our support team at support@madrasahpro.com
            </p>
          </div>
        </div>
      `,
    });

    console.log("Approval email sent to:", email, "Approved:", approved);
  } catch (error) {
    console.error("Error sending approval email:", error);
  }
}

export async function sendPaymentReceipt(
  email: string,
  name: string,
  paymentDetails: any
) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "MadrasahPro <noreply@madrasahpro.com>",
      to: email,
      subject: "Payment Receipt - MadrasahPro",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Payment Receipt</h1>
          </div>
          
          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Assalamu Alaikum <strong>${name}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for your payment. Here are your payment details:
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Invoice Number:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">${
                    paymentDetails.invoiceNumber
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Amount:</td>
                  <td style="padding: 8px 0; text-align: right; font-weight: bold;">$${
                    paymentDetails.amount
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Description:</td>
                  <td style="padding: 8px 0; text-align: right;">${
                    paymentDetails.description
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Date:</td>
                  <td style="padding: 8px 0; text-align: right;">${new Date(
                    paymentDetails.date
                  ).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280;">Status:</td>
                  <td style="padding: 8px 0; text-align: right; color: #10b981; font-weight: bold;">${
                    paymentDetails.status
                  }</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
              This email serves as your official receipt. Please keep it for your records.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Payment receipt sent to:", email);
  } catch (error) {
    console.error("Error sending payment receipt:", error);
  }
}

export async function sendClassNotification(
  email: string,
  name: string,
  classDetails: any
) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "MadrasahPro <noreply@madrasahpro.com>",
      to: email,
      subject: `New Class: ${classDetails.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">New Class Scheduled</h1>
          </div>
          
          <div style="padding: 30px; background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Assalamu Alaikum <strong>${name}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              A new class has been scheduled that you are enrolled in:
            </p>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
              <h3 style="margin: 0 0 10px 0; color: #1e40af;">${
                classDetails.name
              }</h3>
              <p style="margin: 5px 0; color: #4b5563;">
                <strong>Teacher:</strong> ${classDetails.teacher}
              </p>
              <p style="margin: 5px 0; color: #4b5563;">
                <strong>Date & Time:</strong> ${new Date(
                  classDetails.dateTime
                ).toLocaleString()}
              </p>
              <p style="margin: 5px 0; color: #4b5563;">
                <strong>Duration:</strong> ${classDetails.duration} minutes
              </p>
              ${
                classDetails.zoomLink
                  ? `
                <p style="margin: 5px 0; color: #4b5563;">
                  <strong>Join Link:</strong> 
                  <a href="${classDetails.zoomLink}" style="color: #3b82f6; text-decoration: none;">
                    Click here to join
                  </a>
                </p>
              `
                  : ""
              }
            </div>
            
            ${
              classDetails.zoomLink
                ? `
              <div style="text-align: center; margin-top: 30px;">
                <a href="${classDetails.zoomLink}" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Join Class
                </a>
              </div>
            `
                : ""
            }
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px; text-align: center;">
              Please make sure to join the class on time. If you have any questions, contact your teacher.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Class notification sent to:", email);
  } catch (error) {
    console.error("Error sending class notification:", error);
  }
}
