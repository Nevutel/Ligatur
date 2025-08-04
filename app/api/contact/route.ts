import { type NextRequest, NextResponse } from "next/server"

// Check if we have Resend API key
const hasResendKey = !!process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    if (!hasResendKey) {
      // In development/preview mode without Resend, just log the message
      console.log("Contact form submission (demo mode):", {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: "Message received (demo mode)",
      })
    }

    // Only import and use Resend if we have the API key
    const { Resend } = await import("resend")
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email to nevutel@proton.me
    const { data, error } = await resend.emails.send({
      from: "Ligatur Contact Form <onboarding@resend.dev>",
      to: ["nevutel@proton.me"],
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">From Ligatur Website</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h2>
              <p style="margin: 8px 0; color: #475569;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; color: #475569;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Message</h2>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #f97316;">
                <p style="margin: 0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Reply to:</strong> ${email}
              </p>
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Ligatur <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Ligatur",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
            <p style="color: white; margin: 5px 0 0 0; opacity: 0.9;">Ligatur - Crypto Real Estate</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px;">
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <p style="color: #334155; line-height: 1.6; margin: 0 0 15px 0;">Hi ${name},</p>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 15px 0;">
                Thanks for your feedback and questions. We'll contact you soon.
              </p>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 15px 0;">
                We've received your message about: <strong>"${subject}"</strong>
              </p>
              
              <p style="color: #334155; line-height: 1.6; margin: 0 0 20px 0;">
                Our team will review your inquiry and get back to you within 24-48 hours.
              </p>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                  <strong>Need immediate assistance?</strong><br>
                  You can also reach us directly at nevutel@proton.me
                </p>
              </div>
            </div>
            
            <div style="text-center; margin-top: 20px;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Best regards,<br>
                <strong>The Ligatur Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    })

    console.log("Contact form email sent successfully:", data)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message: "Failed to send message" }, { status: 500 })
  }
}
