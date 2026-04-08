import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { EventsList } from "@/components/events"
import { EventHero } from "@/components/events/EventHero"

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <EventHero/>
        <EventsList />
      </main>
      <Footer />
    </>
  )
}