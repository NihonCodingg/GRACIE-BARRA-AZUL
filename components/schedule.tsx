import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { CtaButton } from '@/components/cta-button'
import { ScheduleGrid } from '@/components/schedule-grid'
import { Magnetic } from '@/components/motion/magnetic'
import { whatsappLink } from '@/lib/site'

export function Schedule() {
  return (
    <section id="horarios" className="border-t border-border bg-card/40 py-20 max-sm:py-14 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Turmas e horários"
          title="Encontre o horário ideal para você."
          description="Confira nossas turmas e encontre o melhor momento para começar sua jornada no Jiu-Jitsu."
        />

        <div className="mt-12">
          <ScheduleGrid />
        </div>

        <div className="mt-10 flex justify-center">
          <Magnetic className="inline-block">
            <CtaButton href={whatsappLink('Olá! Gostaria de consultar os horários das turmas da Gracie Barra Pirituba.')}>
              Consultar horários
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </CtaButton>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
