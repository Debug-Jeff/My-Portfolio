"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import emailjs from "@emailjs/browser"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import SocialLinks from "@/components/social-links"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormValues = z.infer<typeof formSchema>

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id"
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id"
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  \
  const [submitStatus, setSubmitStatus<'idle' | 'success' | 'error'>('idle'
  )

  const { useEffect } = require("react")

  useEffect(() => {
    setIsVisible(true)

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: "Jeff Mutugi",
        reply_to: data.email,
      }

      // Send email using EmailJS
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)

      if (response.status === 200) {
        setSubmitStatus("success")
        toast({
          title: "Message sent successfully! ✅",
          description: "Thank you for your message. I'll get back to you within 24 hours.",
        })
        form.reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      setSubmitStatus("error")
      toast({
        title: "Failed to send message ❌",
        description: "There was an error sending your message. Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h1>

        <motion.p
          className="text-lg text-center max-w-2xl mx-auto mb-12 text-muted-foreground"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back
          to you as soon as possible.
        </motion.p>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" type="email" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this about?" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project, ideas, or just say hello!"
                            className="min-h-[150px]"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Message Sent!
                      </>
                    ) : submitStatus === "error" ? (
                      <>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Try Again
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <p className="text-green-800 dark:text-green-200 text-sm">
                      Your message has been sent successfully! I'll respond within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      Failed to send message. Please try again or contact me directly at jeff.mutugi@example.com
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-card border rounded-lg p-6 shadow-sm h-full">
              <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>

              <p className="text-muted-foreground mb-8">
                I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. Whether
                you're looking for a developer, cybersecurity consultant, or just want to chat about tech, feel free to
                reach out!
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Social Links</h3>
                  <SocialLinks />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground w-16">Email:</span>
                      <a href="mailto:jeff.mutugi@example.com" className="text-primary hover:underline">
                        jeff.mutugi@example.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground w-16">Location:</span>
                      <span>Nairobi, Kenya</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground w-16">Timezone:</span>
                      <span>EAT (UTC+3)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to messages within 24 hours during weekdays. For urgent matters, feel free to
                    reach out via LinkedIn or Twitter.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">What I Can Help With</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Web Development (React, Next.js, Full-stack)</li>
                    <li>• Cybersecurity Consulting & Penetration Testing</li>
                    <li>• Code Reviews & Security Audits</li>
                    <li>• Technical Mentoring & Collaboration</li>
                    <li>• Speaking Engagements & Workshops</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
