// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/hooks/use-toast"
// import {
//   Loader2,
//   CheckCircle,
//   AlertCircle,
//   DollarSign,
//   Users,
//   Zap,
//   Shield,
//   Smartphone,
//   Globe,
//   Database,
// } from "lucide-react"

// const formSchema = z.object({
//   // Basic Information
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   company: z.string().optional(),
//   phone: z.string().optional(),

//   // Project Details
//   projectTitle: z.string().min(5, "Project title must be at least 5 characters"),
//   projectType: z.enum(["web-app", "mobile-app", "desktop-app", "api", "security-audit", "consultation"]),
//   description: z.string().min(50, "Please provide a detailed description (minimum 50 characters)"),

//   // Requirements
//   features: z.array(z.string()).min(1, "Please select at least one feature"),
//   technologies: z.array(z.string()).optional(),
//   platforms: z.array(z.string()).optional(),

//   // Timeline & Budget
//   timeline: z.enum(["1-2-weeks", "1-month", "2-3-months", "3-6-months", "6-months-plus"]),
//   budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus", "discuss"]),
//   priority: z.enum(["low", "medium", "high", "urgent"]),

//   // Additional Information
//   hasDesigns: z.boolean().default(false),
//   hasContent: z.boolean().default(false),
//   needsHosting: z.boolean().default(false),
//   needsMaintenance: z.boolean().default(false),
//   additionalNotes: z.string().optional(),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function ProjectRequestPage() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
//   const [currentStep, setCurrentStep] = useState(1)

//   const { useEffect } = require("react")

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       features: [],
//       technologies: [],
//       platforms: [],
//       hasDesigns: false,
//       hasContent: false,
//       needsHosting: false,
//       needsMaintenance: false,
//     },
//   })

//   const projectTypes = [
//     { value: "web-app", label: "Web Application", icon: <Globe className="w-5 h-5" /> },
//     { value: "mobile-app", label: "Mobile App", icon: <Smartphone className="w-5 h-5" /> },
//     { value: "desktop-app", label: "Desktop Application", icon: <Zap className="w-5 h-5" /> },
//     { value: "api", label: "API Development", icon: <Database className="w-5 h-5" /> },
//     { value: "security-audit", label: "Security Audit", icon: <Shield className="w-5 h-5" /> },
//     { value: "consultation", label: "Technical Consultation", icon: <Users className="w-5 h-5" /> },
//   ]

//   const features = [
//     "User Authentication",
//     "Payment Integration",
//     "Real-time Chat",
//     "File Upload",
//     "Email Notifications",
//     "Admin Dashboard",
//     "API Integration",
//     "Search Functionality",
//     "Social Media Login",
//     "Multi-language Support",
//     "Analytics Dashboard",
//     "Push Notifications",
//     "Data Visualization",
//     "Third-party Integrations",
//     "Custom CMS",
//     "E-commerce Features",
//   ]

//   const technologies = [
//     "React",
//     "Next.js",
//     "Vue.js",
//     "Angular",
//     "Node.js",
//     "Python",
//     "Django",
//     "Express.js",
//     "MongoDB",
//     "PostgreSQL",
//     "MySQL",
//     "Redis",
//     "AWS",
//     "Vercel",
//     "Docker",
//     "TypeScript",
//     "GraphQL",
//     "REST API",
//     "WebSocket",
//     "Stripe",
//   ]

//   const platforms = ["Web Browser", "iOS", "Android", "Windows", "macOS", "Linux", "PWA"]

//   async function onSubmit(data: FormValues) {
//     setIsSubmitting(true)
//     setSubmitStatus("idle")

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       setSubmitStatus("success")
//       toast({
//         title: "Project request submitted! 🚀",
//         description: "I'll review your requirements and get back to you within 24 hours.",
//       })
//       form.reset()
//       setCurrentStep(1)
//     } catch (error) {
//       setSubmitStatus("error")
//       toast({
//         title: "Failed to submit request ❌",
//         description: "Please try again or contact me directly.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const nextStep = () => {
//     setCurrentStep((prev) => Math.min(prev + 1, 4))
//   }

//   const prevStep = () => {
//     setCurrentStep((prev) => Math.max(prev - 1, 1))
//   }

//   const getStepTitle = (step: number) => {
//     switch (step) {
//       case 1:
//         return "Basic Information"
//       case 2:
//         return "Project Details"
//       case 3:
//         return "Requirements & Features"
//       case 4:
//         return "Timeline & Budget"
//       default:
//         return "Project Request"
//     }
//   }

//   return (
//     // <div className="min-h-screen flex flex-col">
//     //   <Navbar />

//     //   <main className="flex-grow container mx-auto py-16 px-4">
//     //     <motion.div
//     //       className="max-w-4xl mx-auto"
//     //       initial={{ opacity: 0, y: 20 }}
//     //       animate={isVisible ? { opacity: 1, y: 0 } : {}}
//     //       transition={{ duration: 0.6 }}
//     //     >
//     //       <div className="text-center mb-12">
//     //         <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Project</h1>
//     //         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//     //           Let's bring your ideas to life! Fill out this detailed form to help me understand your project
//     //           requirements and provide you with an accurate proposal.
//     //         </p>
//     //       </div>

//     //       {/* Progress Indicator */}
//     //       <div className="mb-8">
//     //         <div className="flex items-center justify-between mb-4">
//     //           {[1, 2, 3, 4].map((step) => (
//     //             <div key={step} className={`flex items-center ${step < 4 ? "flex-1" : ""}`}>
//     //               <div
//     //                 className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
//     //                   step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
//     //                 }`}
//     //               >
//     //                 {step}
//     //               </div>
//     //               {step < 4 && <div className={`flex-1 h-1 mx-4 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
//     //             </div>
//     //           ))}
//     //         </div>
//     //         <div className="text-center">
//     //           <h2 className="text-xl font-semibold">{getStepTitle(currentStep)}</h2>
//     //         </div>
//     //       </div>

//     //       <Form {...form}>
//     //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//     //           {/* Step 1: Basic Information */}
//     //           {currentStep === 1 && (
//     //             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//     //               <Card>
//     //                 <CardHeader>
//     //                   <CardTitle>Tell me about yourself</CardTitle>
//     //                   <CardDescription>Basic contact information to get started</CardDescription>
//     //                 </CardHeader>
//     //                 <CardContent className="space-y-4">
//     //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //                     <FormField
//     //                       control={form.control}
//     //                       name="name"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Full Name *</FormLabel>
//     //                           <FormControl>
//     //                             <Input placeholder="Your full name" {...field} />
//     //                           </FormControl>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="email"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Email Address *</FormLabel>
//     //                           <FormControl>
//     //                             <Input placeholder="your.email@example.com" type="email" {...field} />
//     //                           </FormControl>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />
//     //                   </div>

//     //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     //                     <FormField
//     //                       control={form.control}
//     //                       name="company"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Company/Organization</FormLabel>
//     //                           <FormControl>
//     //                             <Input placeholder="Your company name (optional)" {...field} />
//     //                           </FormControl>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="phone"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Phone Number</FormLabel>
//     //                           <FormControl>
//     //                             <Input placeholder="+1 (555) 123-4567 (optional)" {...field} />
//     //                           </FormControl>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />
//     //                   </div>
//     //                 </CardContent>
//     //               </Card>
//     //             </motion.div>
//     //           )}

//     //           {/* Step 2: Project Details */}
//     //           {currentStep === 2 && (
//     //             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//     //               <Card>
//     //                 <CardHeader>
//     //                   <CardTitle>Project Overview</CardTitle>
//     //                   <CardDescription>What type of project are you looking to build?</CardDescription>
//     //                 </CardHeader>
//     //                 <CardContent className="space-y-6">
//     //                   <FormField
//     //                     control={form.control}
//     //                     name="projectTitle"
//     //                     render={({ field }) => (
//     //                       <FormItem>
//     //                         <FormLabel>Project Title *</FormLabel>
//     //                         <FormControl>
//     //                           <Input placeholder="Give your project a name" {...field} />
//     //                         </FormControl>
//     //                         <FormMessage />
//     //                       </FormItem>
//     //                     )}
//     //                   />

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="projectType"
//     //                     render={({ field }) => (
//     //                       <FormItem>
//     //                         <FormLabel>Project Type *</FormLabel>
//     //                         <FormControl>
//     //                           <RadioGroup
//     //                             onValueChange={field.onChange}
//     //                             defaultValue={field.value}
//     //                             className="grid grid-cols-1 md:grid-cols-2 gap-4"
//     //                           >
//     //                             {projectTypes.map((type) => (
//     //                               <div key={type.value} className="flex items-center space-x-2">
//     //                                 <RadioGroupItem value={type.value} id={type.value} />
//     //                                 <label htmlFor={type.value} className="flex items-center gap-2 cursor-pointer">
//     //                                   {type.icon}
//     //                                   {type.label}
//     //                                 </label>
//     //                               </div>
//     //                             ))}
//     //                           </RadioGroup>
//     //                         </FormControl>
//     //                         <FormMessage />
//     //                       </FormItem>
//     //                     )}
//     //                   />

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="description"
//     //                     render={({ field }) => (
//     //                       <FormItem>
//     //                         <FormLabel>Project Description *</FormLabel>
//     //                         <FormControl>
//     //                           <Textarea
//     //                             placeholder="Describe your project in detail. What problem does it solve? Who is your target audience? What are your main goals?"
//     //                             className="min-h-[120px]"
//     //                             {...field}
//     //                           />
//     //                         </FormControl>
//     //                         <FormDescription>Minimum 50 characters. Be as detailed as possible.</FormDescription>
//     //                         <FormMessage />
//     //                       </FormItem>
//     //                     )}
//     //                   />
//     //                 </CardContent>
//     //               </Card>
//     //             </motion.div>
//     //           )}

//     //           {/* Step 3: Requirements & Features */}
//     //           {currentStep === 3 && (
//     //             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//     //               <Card>
//     //                 <CardHeader>
//     //                   <CardTitle>Features & Technologies</CardTitle>
//     //                   <CardDescription>What features and technologies do you need?</CardDescription>
//     //                 </CardHeader>
//     //                 <CardContent className="space-y-6">
//     //                   <FormField
//     //                     control={form.control}
//     //                     name="features"
//     //                     render={() => (
//     //                       <FormItem>
//     //                         <FormLabel>Required Features *</FormLabel>
//     //                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//     //                           {features.map((feature) => (
//     //                             <FormField
//     //                               key={feature}
//     //                               control={form.control}
//     //                               name="features"
//     //                               render={({ field }) => (
//     //                                 <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                                   <FormControl>
//     //                                     <Checkbox
//     //                                       checked={field.value?.includes(feature)}
//     //                                       onCheckedChange={(checked) => {
//     //                                         return checked
//     //                                           ? field.onChange([...field.value, feature])
//     //                                           : field.onChange(field.value?.filter((value) => value !== feature))
//     //                                       }}
//     //                                     />
//     //                                   </FormControl>
//     //                                   <FormLabel className="text-sm font-normal">{feature}</FormLabel>
//     //                                 </FormItem>
//     //                               )}
//     //                             />
//     //                           ))}
//     //                         </div>
//     //                         <FormMessage />
//     //                       </FormItem>
//     //                     )}
//     //                   />

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="technologies"
//     //                     render={() => (
//     //                       <FormItem>
//     //                         <FormLabel>Preferred Technologies</FormLabel>
//     //                         <FormDescription>
//     //                           Select any specific technologies you'd like to use (optional)
//     //                         </FormDescription>
//     //                         <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
//     //                           {technologies.map((tech) => (
//     //                             <FormField
//     //                               key={tech}
//     //                               control={form.control}
//     //                               name="technologies"
//     //                               render={({ field }) => (
//     //                                 <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                                   <FormControl>
//     //                                     <Checkbox
//     //                                       checked={field.value?.includes(tech)}
//     //                                       onCheckedChange={(checked) => {
//     //                                         return checked
//     //                                           ? field.onChange([...(field.value || []), tech])
//     //                                           : field.onChange(field.value?.filter((value) => value !== tech))
//     //                                       }}
//     //                                     />
//     //                                   </FormControl>
//     //                                   <FormLabel className="text-sm font-normal">{tech}</FormLabel>
//     //                                 </FormItem>
//     //                               )}
//     //                             />
//     //                           ))}
//     //                         </div>
//     //                       </FormItem>
//     //                     )}
//     //                   />

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="platforms"
//     //                     render={() => (
//     //                       <FormItem>
//     //                         <FormLabel>Target Platforms</FormLabel>
//     //                         <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
//     //                           {platforms.map((platform) => (
//     //                             <FormField
//     //                               key={platform}
//     //                               control={form.control}
//     //                               name="platforms"
//     //                               render={({ field }) => (
//     //                                 <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                                   <FormControl>
//     //                                     <Checkbox
//     //                                       checked={field.value?.includes(platform)}
//     //                                       onCheckedChange={(checked) => {
//     //                                         return checked
//     //                                           ? field.onChange([...(field.value || []), platform])
//     //                                           : field.onChange(field.value?.filter((value) => value !== platform))
//     //                                       }}
//     //                                     />
//     //                                   </FormControl>
//     //                                   <FormLabel className="text-sm font-normal">{platform}</FormLabel>
//     //                                 </FormItem>
//     //                               )}
//     //                             />
//     //                           ))}
//     //                         </div>
//     //                       </FormItem>
//     //                     )}
//     //                   />
//     //                 </CardContent>
//     //               </Card>
//     //             </motion.div>
//     //           )}

//     //           {/* Step 4: Timeline & Budget */}
//     //           {currentStep === 4 && (
//     //             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
//     //               <Card>
//     //                 <CardHeader>
//     //                   <CardTitle>Timeline & Budget</CardTitle>
//     //                   <CardDescription>Help me understand your timeline and budget expectations</CardDescription>
//     //                 </CardHeader>
//     //                 <CardContent className="space-y-6">
//     //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     //                     <FormField
//     //                       control={form.control}
//     //                       name="timeline"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Project Timeline *</FormLabel>
//     //                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//     //                             <FormControl>
//     //                               <SelectTrigger>
//     //                                 <SelectValue placeholder="Select timeline" />
//     //                               </SelectTrigger>
//     //                             </FormControl>
//     //                             <SelectContent>
//     //                               <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
//     //                               <SelectItem value="1-month">1 month</SelectItem>
//     //                               <SelectItem value="2-3-months">2-3 months</SelectItem>
//     //                               <SelectItem value="3-6-months">3-6 months</SelectItem>
//     //                               <SelectItem value="6-months-plus">6+ months</SelectItem>
//     //                             </SelectContent>
//     //                           </Select>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="budget"
//     //                       render={({ field }) => (
//     //                         <FormItem>
//     //                           <FormLabel>Budget Range *</FormLabel>
//     //                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//     //                             <FormControl>
//     //                               <SelectTrigger>
//     //                                 <SelectValue placeholder="Select budget range" />
//     //                               </SelectTrigger>
//     //                             </FormControl>
//     //                             <SelectContent>
//     //                               <SelectItem value="under-5k">Under $5,000</SelectItem>
//     //                               <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
//     //                               <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
//     //                               <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
//     //                               <SelectItem value="50k-plus">$50,000+</SelectItem>
//     //                               <SelectItem value="discuss">Let's discuss</SelectItem>
//     //                             </SelectContent>
//     //                           </Select>
//     //                           <FormMessage />
//     //                         </FormItem>
//     //                       )}
//     //                     />
//     //                   </div>

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="priority"
//     //                     render={({ field }) => (
//     //                       <FormItem>
//     //                         <FormLabel>Project Priority *</FormLabel>
//     //                         <FormControl>
//     //                           <RadioGroup
//     //                             onValueChange={field.onChange}
//     //                             defaultValue={field.value}
//     //                             className="flex flex-wrap gap-6"
//     //                           >
//     //                             <div className="flex items-center space-x-2">
//     //                               <RadioGroupItem value="low" id="low" />
//     //                               <label htmlFor="low">Low - No rush</label>
//     //                             </div>
//     //                             <div className="flex items-center space-x-2">
//     //                               <RadioGroupItem value="medium" id="medium" />
//     //                               <label htmlFor="medium">Medium - Standard timeline</label>
//     //                             </div>
//     //                             <div className="flex items-center space-x-2">
//     //                               <RadioGroupItem value="high" id="high" />
//     //                               <label htmlFor="high">High - Important project</label>
//     //                             </div>
//     //                             <div className="flex items-center space-x-2">
//     //                               <RadioGroupItem value="urgent" id="urgent" />
//     //                               <label htmlFor="urgent">Urgent - ASAP</label>
//     //                             </div>
//     //                           </RadioGroup>
//     //                         </FormControl>
//     //                         <FormMessage />
//     //                       </FormItem>
//     //                     )}
//     //                   />

//     //                   <div className="space-y-4">
//     //                     <h3 className="text-lg font-semibold">Additional Services</h3>

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="hasDesigns"
//     //                       render={({ field }) => (
//     //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                           <FormControl>
//     //                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//     //                           </FormControl>
//     //                           <div className="space-y-1 leading-none">
//     //                             <FormLabel>I have existing designs/mockups</FormLabel>
//     //                             <FormDescription>Check this if you already have UI/UX designs ready</FormDescription>
//     //                           </div>
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="hasContent"
//     //                       render={({ field }) => (
//     //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                           <FormControl>
//     //                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//     //                           </FormControl>
//     //                           <div className="space-y-1 leading-none">
//     //                             <FormLabel>I have all content ready</FormLabel>
//     //                             <FormDescription>Text, images, videos, and other content materials</FormDescription>
//     //                           </div>
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="needsHosting"
//     //                       render={({ field }) => (
//     //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                           <FormControl>
//     //                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//     //                           </FormControl>
//     //                           <div className="space-y-1 leading-none">
//     //                             <FormLabel>I need hosting setup</FormLabel>
//     //                             <FormDescription>Help with domain, hosting, and deployment</FormDescription>
//     //                           </div>
//     //                         </FormItem>
//     //                       )}
//     //                     />

//     //                     <FormField
//     //                       control={form.control}
//     //                       name="needsMaintenance"
//     //                       render={({ field }) => (
//     //                         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
//     //                           <FormControl>
//     //                             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//     //                           </FormControl>
//     //                           <div className="space-y-1 leading-none">
//     //                             <FormLabel>I need ongoing maintenance</FormLabel>
//     //                             <FormDescription>Regular updates, bug fixes, and support</FormDescription>
//     //                           </div>
//     //                         </FormItem>
//     //                       )}
//     //                     />
//     //                   </div>

//     //                   <FormField
//     //                     control={form.control}
//     //                     name="additionalNotes"
//     //                     render={({ field }) => (
//     //                       <FormItem>
//     //                         <FormLabel>Additional Notes</FormLabel>
//     //                         <FormControl>
//     //                           <Textarea
//     //                             placeholder="Any additional information, special requirements, or questions you'd like to share..."
//     //                             className="min-h-[100px]"
//     //                             {...field}
//     //                           />
//     //                         </FormControl>
//     //                         <FormDescription>Optional: Share any other details that might be helpful</FormDescription>
//     //                       </FormItem>
//     //                     )}
//     //                   />
//     //                 </CardContent>
//     //               </Card>
//     //             </motion.div>
//     //           )}

//     //           {/* Navigation Buttons */}
//     //           <div className="flex justify-between pt-6">
//     //             <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
//     //               Previous
//     //             </Button>

//     //             <div className="flex gap-4">
//     //               {currentStep < 4 ? (
//     //                 <Button type="button" onClick={nextStep}>
//     //                   Next Step
//     //                 </Button>
//     //               ) : (
//     //                 <Button type="submit" disabled={isSubmitting}>
//     //                   {isSubmitting ? (
//     //                     <>
//     //                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//     //                       Submitting...
//     //                     </>
//     //                   ) : submitStatus === "success" ? (
//     //                     <>
//     //                       <CheckCircle className="mr-2 h-4 w-4" />
//     //                       Submitted!
//     //                     </>
//     //                   ) : submitStatus === "error" ? (
//     //                     <>
//     //                       <AlertCircle className="mr-2 h-4 w-4" />
//     //                       Try Again
//     //                     </>
//     //                   ) : (
//     //                     "Submit Request"
//     //                   )}
//     //                 </Button>
//     //               )}
//     //             </div>
//     //           </div>
//     //         </form>
//     //       </Form>

//     //       {/* Success Message */}
//     //       {submitStatus === "success" && (
//     //         <motion.div
//     //           initial={{ opacity: 0, y: 20 }}
//     //           animate={{ opacity: 1, y: 0 }}
//     //           className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center"
//     //         >
//     //           <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400" />
//     //           <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
//     //             Request Submitted Successfully!
//     //           </h3>
//     //           <p className="text-green-700 dark:text-green-300">
//     //             Thank you for your detailed project request. I'll review everything and get back to you within 24 hours
//     //             with a proposal and next steps.
//     //           </p>
//     //         </motion.div>
//     //       )}

//     //       {/* Pricing Guide */}
//     //       <motion.div
//     //         initial={{ opacity: 0, y: 20 }}
//     //         animate={isVisible ? { opacity: 1, y: 0 } : {}}
//     //         transition={{ duration: 0.6, delay: 0.4 }}
//     //         className="mt-12"
//     //       >
//     //         <Card>
//     //           <CardHeader>
//     //             <CardTitle className="flex items-center gap-2">
//     //               <DollarSign className="w-5 h-5" />
//     //               Pricing Guide
//     //             </CardTitle>
//     //             <CardDescription>Rough estimates to help you plan your budget</CardDescription>
//     //           </CardHeader>
//     //           <CardContent>
//     //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     //               <div className="p-4 border rounded-lg">
//     //                 <h4 className="font-semibold mb-2">Simple Website</h4>
//     //                 <p className="text-2xl font-bold text-primary mb-2">$2K - $5K</p>
//     //                 <ul className="text-sm text-muted-foreground space-y-1">
//     //                   <li>• 5-10 pages</li>
//     //                   <li>• Basic functionality</li>
//     //                   <li>• Responsive design</li>
//     //                   <li>• 2-4 weeks</li>
//     //                 </ul>
//     //               </div>

//     //               <div className="p-4 border rounded-lg">
//     //                 <h4 className="font-semibold mb-2">Web Application</h4>
//     //                 <p className="text-2xl font-bold text-primary mb-2">$5K - $15K</p>
//     //                 <ul className="text-sm text-muted-foreground space-y-1">
//     //                   <li>• Custom features</li>
//     //                   <li>• User authentication</li>
//     //                   <li>• Database integration</li>
//     //                   <li>• 1-3 months</li>
//     //                 </ul>
//     //               </div>

//     //               <div className="p-4 border rounded-lg">
//     //                 <h4 className="font-semibold mb-2">Complex Platform</h4>
//     //                 <p className="text-2xl font-bold text-primary mb-2">$15K+</p>
//     //                 <ul className="text-sm text-muted-foreground space-y-1">
//     //                   <li>• Advanced features</li>
//     //                   <li>• Multiple integrations</li>
//     //                   <li>• Scalable architecture</li>
//     //                   <li>• 3+ months</li>
//     //                 </ul>
//     //               </div>
//     //             </div>

//     //             <div className="mt-6 p-4 bg-muted rounded-lg">
//     //               <p className="text-sm text-muted-foreground">
//     //                 <strong>Note:</strong> These are rough estimates. Final pricing depends on specific requirements,
//     //                 complexity, and timeline. Security audits and consultations are priced separately based on scope.
//     //               </p>
//     //             </div>
//     //           </CardContent>
//     //         </Card>
//     //       </motion.div>
//     //     </motion.div>
//     //   </main>

//     //   <Footer />
//     // </div>
//   )
// }
