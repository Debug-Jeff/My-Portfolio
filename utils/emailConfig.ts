export const validateEmailConfig = () => {
  const config = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    autoReplyTemplateId: process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  }

  const missingVars = Object.entries(config)
    .filter(([_, value]) => !value || value.startsWith('your_'))
    .map(([key, _]) => key)

  if (missingVars.length > 0) {
    throw new Error(`Missing EmailJS configuration: ${missingVars.join(', ')}`)
  }

  return config
}