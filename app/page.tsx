import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Benefits } from '@/components/benefits'
import { ForWho } from '@/components/for-who'
import { Methodology } from '@/components/methodology'
import { Instructors } from '@/components/instructors'
import { Structure } from '@/components/structure'
import { Schedule } from '@/components/schedule'
import { Testimonials } from '@/components/testimonials'
import { Instagram } from '@/components/instagram'
import { Location } from '@/components/location'
import { Faq } from '@/components/faq'
import { FinalCta } from '@/components/final-cta'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { StructuredData } from '@/components/structured-data'

export default function Page() {
  return (
    <>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <About />
        <Benefits />
        <ForWho />
        <Methodology />
        <Instructors />
        <Structure />
        <Schedule />
        <Testimonials />
        <Instagram />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
