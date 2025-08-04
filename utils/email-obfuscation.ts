export function obfuscateEmail(email: string): string {
  if (!email || !email.includes("@")) {
    return "Contact for email"
  }

  const [localPart, domain] = email.split("@")

  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`
  }

  if (localPart.length <= 4) {
    return `${localPart.slice(0, 2)}***@${domain}`
  }

  // For longer emails, show first 2 and last 1 characters of local part
  return `${localPart.slice(0, 2)}***${localPart.slice(-1)}@${domain}`
}

// Remove phone obfuscation - show full phone number since it's optional
export function formatPhone(phone: string): string {
  return phone || ""
}
