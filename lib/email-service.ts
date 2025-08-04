// Custom email service using Resend (already integrated)
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendCustomEmail({
  to,
  subject,
  html,
  from = "Ligatur <noreply@ligatur.com>", // Custom sender
}: {
  to: string[]
  subject: string
  html: string
  from?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    if (error) {
      console.error("Email error:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

// Custom auth emails
export async function sendWelcomeEmail(userEmail: string, userName: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Ligatur!</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">The Future of Crypto Real Estate</p>
      </div>
      
      <div style="padding: 30px; background: #f8fafc;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0;">Hi ${userName}! 👋</h2>
        
        <p style="color: #475569; line-height: 1.6; margin: 0 0 20px 0;">
          Welcome to Ligatur, where cryptocurrency meets real estate! You're now part of a revolutionary platform that's changing how properties are bought, sold, and rented.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e293b; margin: 0 0 15px 0;">What you can do now:</h3>
          <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Browse crypto-friendly property listings</li>
            <li>List your own properties for crypto payments</li>
            <li>Connect directly with property owners</li>
            <li>Save your favorite listings</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://ligatur.com/listings" 
             style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Start Browsing Properties
          </a>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin: 20px 0 0 0;">
          Questions? Reply to this email or contact us at support@ligatur.com
        </p>
      </div>
    </div>
  `

  return sendCustomEmail({
    to: [userEmail],
    subject: "Welcome to Ligatur - Your Crypto Real Estate Journey Begins! 🏠₿",
    html,
  })
}
