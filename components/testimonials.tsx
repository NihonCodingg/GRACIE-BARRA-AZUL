import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { TestimonialsReview } from '@/components/testimonials-review'
import { Magnetic } from '@/components/motion/magnetic'
import { whatsappLink, googleReviewsLink } from '@/lib/site'

export function Testimonials() {
  return (
    <section id="depoimentos" className="border-t border-border py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem treina, sabe a diferença."
          description="Alguns relatos de quem já faz parte da nossa comunidade no tatame."
          align="center"
          animateTitle
        />

        <div className="mt-14">
          <TestimonialsReview />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic className="inline-block">
            <CtaButton href={whatsappLink('Olá! Quero fazer parte da Gracie Barra Pirituba.')}>
              Quero fazer parte
            </CtaButton>
          </Magnetic>
          <Magnetic className="inline-block">
            <CtaButton variant="outline" href={googleReviewsLink()}>
              Ver mais avaliações no Google
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
