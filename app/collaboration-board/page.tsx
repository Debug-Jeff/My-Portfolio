import CollaborationBoard from "@/components/collaboration-board"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CollaborationBoardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <CollaborationBoard />
      </main>
      <Footer />
    </div>
  )
}
