import InteractiveCV from "@/components/interactive-cv"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function InteractiveCVPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <InteractiveCV />
      </main>
      <Footer />
    </div>
  )
}
