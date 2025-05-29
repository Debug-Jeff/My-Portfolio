"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, Check, Info, Settings, Mail } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function EmailSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(step)
    toast({
      title: "Copied to clipboard!",
      description: "The code has been copied to your clipboard.",
    })
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const envVariables = `# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here`

  const emailTemplate = `Hello {{to_name}},

You have received a new message from your portfolio contact form:

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to this email to respond to {{from_name}}.`

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">EmailJS Setup Guide</h1>
        <p className="text-muted-foreground">
          Follow these steps to enable email functionality in your portfolio contact form
        </p>
      </div>

      <div className="grid gap-6">
        {/* Step 1: Create EmailJS Account */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 1</Badge>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Create EmailJS Account
              </CardTitle>
            </div>
            <CardDescription>Sign up for a free EmailJS account to send emails from your frontend</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Button asChild>
                <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Go to EmailJS
                </a>
              </Button>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2 ml-4">
              <li>• Click "Sign Up" and create your account</li>
              <li>• Verify your email address</li>
              <li>• Log in to your EmailJS dashboard</li>
            </ul>
          </CardContent>
        </Card>

        {/* Step 2: Configure Email Service */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 2</Badge>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configure Email Service
              </CardTitle>
            </div>
            <CardDescription>Connect your email provider (Gmail, Outlook, etc.)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">In your EmailJS dashboard:</h4>
              <ol className="text-sm space-y-2 ml-4">
                <li>1. Go to "Email Services"</li>
                <li>2. Click "Add New Service"</li>
                <li>3. Choose your email provider (Gmail recommended)</li>
                <li>4. Follow the authentication steps</li>
                <li>
                  5. Copy your <strong>Service ID</strong>
                </li>
              </ol>
            </div>
            <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-200">
                For Gmail: You'll need to enable 2-factor authentication and create an app password
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Create Email Template */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 3</Badge>
              <CardTitle>Create Email Template</CardTitle>
            </div>
            <CardDescription>Set up the email template that will be sent when someone contacts you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">In your EmailJS dashboard:</h4>
              <ol className="text-sm space-y-2 ml-4">
                <li>1. Go to "Email Templates"</li>
                <li>2. Click "Create New Template"</li>
                <li>3. Set up your template with the content below</li>
                <li>
                  4. Copy your <strong>Template ID</strong>
                </li>
              </ol>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Template Content:</h4>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(emailTemplate, 3)}>
                  {copiedStep === 3 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy Template
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">{emailTemplate}</pre>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Important:</strong> Make sure to set the "To Email" field in your template to your email address
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Get Public Key */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 4</Badge>
              <CardTitle>Get Public Key</CardTitle>
            </div>
            <CardDescription>Retrieve your public key for frontend integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <ol className="text-sm space-y-2 ml-4">
                <li>1. In EmailJS dashboard, go to "Account" → "General"</li>
                <li>
                  2. Find your <strong>Public Key</strong>
                </li>
                <li>3. Copy this key for the next step</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Environment Variables */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 5</Badge>
              <CardTitle>Set Environment Variables</CardTitle>
            </div>
            <CardDescription>Add your EmailJS credentials to your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Add to your .env.local file:</h4>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(envVariables, 5)}>
                  {copiedStep === 5 ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copy Variables
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">{envVariables}</pre>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Security Note:</strong> Never commit your .env.local file to version control. Add it to your
                .gitignore file.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Deploy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Step 6</Badge>
              <CardTitle>Deploy & Test</CardTitle>
            </div>
            <CardDescription>Deploy your site and test the contact form</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">For Vercel deployment:</h4>
              <ol className="text-sm space-y-2 ml-4">
                <li>1. Add environment variables in Vercel dashboard</li>
                <li>2. Go to Project Settings → Environment Variables</li>
                <li>3. Add each NEXT_PUBLIC_EMAILJS_* variable</li>
                <li>4. Redeploy your application</li>
                <li>5. Test the contact form</li>
              </ol>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Success!</strong> Your contact form should now send real emails. Test it by filling out the form
                on your contact page.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="mb-4">
              {isExpanded ? "Hide" : "Show"} Common Issues
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium">Form not sending emails?</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Check that all environment variables are set correctly</li>
                      <li>• Verify your EmailJS service is active</li>
                      <li>• Check browser console for error messages</li>
                      <li>• Ensure your email template variables match the form fields</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium">Emails going to spam?</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Add your domain to EmailJS allowed origins</li>
                      <li>• Use a professional email template</li>
                      <li>• Consider upgrading to EmailJS Pro for better deliverability</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium">Rate limiting issues?</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• EmailJS free plan allows 200 emails/month</li>
                      <li>• Implement client-side rate limiting</li>
                      <li>• Consider upgrading for higher limits</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
