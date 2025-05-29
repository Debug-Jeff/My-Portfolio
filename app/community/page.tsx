import CommunityContributions from "@/components/community-contributions"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <CommunityContributions />
      </main>
      <Footer />
    </div>
  )
}
