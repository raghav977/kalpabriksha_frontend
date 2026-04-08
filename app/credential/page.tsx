import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CredentialHero, GovernanceCredentials, QualityStandards, ClosingStatement } from '@/components/credential'

export default function CredentialPage() {
  return (
    <>
      <Header />
      <main>
        <CredentialHero />
        <GovernanceCredentials />
        <QualityStandards />
        <ClosingStatement />
      </main>
      <Footer />
    </>
  )
}