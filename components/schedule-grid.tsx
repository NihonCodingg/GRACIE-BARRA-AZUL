'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { RevealGroup, RevealItem } from '@/components/motion/reveal-group'
import { ExpandableCard } from '@/components/motion/expandable-card'
import StaggerChars from '@/components/ui/stagger-chars'
import { cn } from '@/lib/utils'

// Grade real de turmas fornecida pela academia. Sábado tem horários
// próprios (09:30/10:30) em vez de seguir a linha canônica de
// segunda-a-sexta — por isso cada célula carrega seu próprio rótulo em
// vez de forçar um horário incorreto.
const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const
type Day = (typeof days)[number]
type Row = { time: string; cells: Record<Day, string | null> }

const rows: Row[] = [
  {
    time: '07:00',
    cells: {
      Segunda: 'GB1 e GB2',
      Terça: 'GB1 e GB2',
      Quarta: 'GB1 e GB2',
      Quinta: 'GB1 e GB2',
      Sexta: 'GB1 e GB2 (No-Gi)',
      Sábado: '09:30 · GBK',
    },
  },
  {
    time: '10:00',
    cells: {
      Segunda: 'GBK',
      Terça: 'GBK',
      Quarta: 'GBK',
      Quinta: 'GBK',
      Sexta: 'GBK (No-Gi)',
      Sábado: '10:30 · Treino Aberto (GB1, GB2, GB3)',
    },
  },
  {
    time: '17:00',
    cells: { Segunda: 'Yoga', Terça: null, Quarta: null, Quinta: null, Sexta: null, Sábado: null },
  },
  {
    time: '18:00',
    cells: {
      Segunda: 'GBK',
      Terça: 'GBK',
      Quarta: 'GBK',
      Quinta: 'GBK',
      Sexta: 'GBK (No-Gi)',
      Sábado: null,
    },
  },
  {
    time: '19:00',
    cells: { Segunda: 'GB1', Terça: 'GBF', Quarta: 'GB1', Quinta: 'GBF', Sexta: 'GB1 (No-Gi)', Sábado: null },
  },
  {
    time: '20:00',
    cells: { Segunda: 'GB3', Terça: 'GB2', Quarta: 'GB3', Quinta: 'GB2', Sexta: 'GB3 (No-Gi)', Sábado: null },
  },
]

export function ScheduleGrid() {
  const tableRef = useRef<HTMLTableElement>(null)
  const reducedMotion = useReducedMotion()

  // Reveal em lote das células da tabela (desktop). A lista de cards por
  // dia (mobile) usa Motion/whileInView à parte — são subárvores
  // separadas (uma delas sempre display:none conforme o breakpoint), não
  // os mesmos elementos animados duas vezes.
  useGSAP(
    () => {
      if (reducedMotion || !tableRef.current) return
      const cells = gsap.utils.toArray<HTMLElement>('.schedule-cell', tableRef.current)
      gsap.set(cells, { opacity: 0, y: 12 })
      ScrollTrigger.batch(cells, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.04,
            overwrite: true,
          }),
      })
    },
    { scope: tableRef, dependencies: [reducedMotion] },
  )

  return (
    <div>
      {/* Desktop: tabela 7 colunas (horário + 6 dias) */}
      <div className="hidden overflow-hidden rounded-sm border border-border bg-card lg:block">
        <table ref={tableRef} className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="w-24 p-4 text-left font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Horário
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="p-4 text-left font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.time}
                className="border-b border-border transition-colors last:border-b-0 hover:bg-background/50"
              >
                <td className="schedule-cell p-4 font-display text-base font-semibold text-primary">
                  {row.time}
                </td>
                {days.map((day) => (
                  <td
                    key={day}
                    className={cn(
                      'schedule-cell p-4 align-top text-sm leading-relaxed',
                      row.cells[day] ? 'text-foreground' : 'text-muted-foreground/40',
                    )}
                  >
                    {row.cells[day] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards por dia, expansíveis, listando só os horários preenchidos */}
      <RevealGroup stagger={0.06} className="grid gap-4 lg:hidden">
        {days.map((day, i) => {
          const entries = rows
            .map((row) => ({ time: row.time, activity: row.cells[day] }))
            .filter((entry): entry is { time: string; activity: string } => Boolean(entry.activity))

          if (entries.length === 0) return null

          return (
            <RevealItem key={day}>
              <ExpandableCard
                defaultOpen={i === 0}
                header={
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                      <StaggerChars text={day} duration={0.4} delay={0.02} className="text-inherit" />
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {entries.length} {entries.length === 1 ? 'turma' : 'turmas'}
                    </span>
                  </div>
                }
              >
                <ul className="divide-y divide-border border-t border-border">
                  {entries.map((entry) => (
                    <li key={entry.time} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="text-sm text-foreground">{entry.activity}</span>
                      <span className="font-display text-sm font-semibold text-muted-foreground">
                        {entry.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </ExpandableCard>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        GB1 · GB2 · GB3 — turmas adulto por nível de graduação · GBK — Gracie Barra Kids ·
        GBF — Gracie Barra Feminino · No-Gi — treino sem kimono · Treino Aberto — turma mista
        de sábado
      </p>
    </div>
  )
}
