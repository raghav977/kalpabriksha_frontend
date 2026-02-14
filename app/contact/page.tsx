import { ContactHero, ContactInfo, ContactMap } from "@/components/contact"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactInfo />
        <ContactMap />
      </main>
      <Footer />
    </>
  )
}
