'use client';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  name: string;
  handle: string;
  review: string;
  avatar: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  cardClassName?: string;
  avatarClassName?: string;
}

interface KineticTestimonialProps {
  testimonials?: Testimonial[];
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  speed?: number;
  title?: string;
  subtitle?: string;
}

interface TestimonialWithId extends Testimonial {
  uniqueId: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = React.memo(
  ({ testimonial, index, cardClassName = '', avatarClassName = '' }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    // Recolorido para a identidade Gracie Barra: só variações do vermelho
    // da marca sobre preto, no lugar do arco-íris roxo/rosa/azul original.
    const gradients = [
      'from-primary via-primary/70 to-background',
      'from-background via-primary/60 to-primary',
      'from-primary/90 via-background to-primary/40',
    ];

    const gradientClass = gradients[index % gradients.length];

    return (
      <div
        className='w-full mb-4 shrink-0'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className={`transition-all duration-300 pointer-events-none relative overflow-hidden ${
            isHovered ? 'text-white shadow-2xl border-transparent' : ''
          } ${cardClassName}`}
        >
          {isHovered && (
            <div
              className={`absolute inset-0 bg-linear-to-b ${gradientClass} z-0`}
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent 40%, black 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 40%, black 100%)',
              }}
            />
          )}

          <CardContent className='p-4 md:p-6 relative z-10'>
            <p className='text-sm md:text-base mb-4 leading-relaxed transition-colors duration-300 text-neutral-800 dark:text-neutral-200'>
              "{testimonial.review}"
            </p>

            <div className='flex items-center space-x-3'>
              <Avatar className={`w-8 md:w-10 h-8 md:h-10 ${avatarClassName}`}>
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>
                  {testimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0'>
                <p
                  className={`font-semibold text-xs md:text-sm ${
                    isHovered ? 'text-white' : ''
                  }`}
                >
                  {testimonial.name}
                </p>
                <p
                  className={`text-xs ${
                    isHovered ? 'text-white/80' : 'text-muted-foreground'
                  }`}
                >
                  {testimonial.handle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);

TestimonialCard.displayName = 'TestimonialCard';

const KineticTestimonial: React.FC<KineticTestimonialProps> = ({
  testimonials = [],
  className = '',
  cardClassName = '',
  avatarClassName = '',
  desktopColumns = 6,
  tabletColumns = 3,
  mobileColumns = 2,
  speed = 1,
  title,
  subtitle,
}) => {
  const [actualMobileColumns, setActualMobileColumns] = useState(mobileColumns);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setActualMobileColumns(1);
      } else {
        setActualMobileColumns(mobileColumns);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [mobileColumns]);

  const createColumns = useCallback(
    (numColumns: number) => {
      if (!testimonials || testimonials.length === 0) {
        return [];
      }

      const columns: TestimonialWithId[][] = [];
      // Reduzido de 10 pra 5: com só 3 avaliações reais coletadas, 10 por
      // coluna só multiplicava nós de DOM repetidos sem ganho visual.
      const testimonialsPerColumn = 5;

      for (let i = 0; i < numColumns; i++) {
        const columnTestimonials: TestimonialWithId[] = [];

        for (let j = 0; j < testimonialsPerColumn; j++) {
          const testimonialIndex = (i * 11 + j * 3) % testimonials.length;
          columnTestimonials.push({
            ...testimonials[testimonialIndex],
            uniqueId: `${i}-${j}-${testimonialIndex}`,
          });
        }

        columns.push([...columnTestimonials, ...columnTestimonials]);
      }

      return columns;
    },
    [testimonials],
  );

  const desktopColumnsData = useMemo(
    () => createColumns(desktopColumns),
    [createColumns, desktopColumns],
  );
  const fiveColumnsData = useMemo(() => createColumns(5), [createColumns]);
  const fourColumnsData = useMemo(() => createColumns(4), [createColumns]);
  const tabletColumnsData = useMemo(
    () => createColumns(tabletColumns),
    [createColumns, tabletColumns],
  );
  const mobileColumnsData = useMemo(
    () => createColumns(actualMobileColumns),
    [createColumns, actualMobileColumns],
  );

  const renderColumn = useCallback(
    (
      columnTestimonials: TestimonialWithId[],
      colIndex: number,
      prefix: string,
      containerHeight: number,
    ) => {
      const moveUp = colIndex % 2 === 0;
      const animationDuration = (40 + colIndex * 3) / speed;

      return (
        <div
          key={`${prefix}-${colIndex}`}
          className='flex-1 overflow-hidden relative testimonial-column'
          style={{ height: `${containerHeight}px` }}
        >
          <div
            className={`flex flex-col ${
              moveUp ? 'animate-scroll-up' : 'animate-scroll-down'
            }`}
            style={{
              animationDuration: `${animationDuration}s`,
            }}
          >
            {columnTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${prefix}-${colIndex}-${testimonial.uniqueId}-${index}`}
                testimonial={testimonial}
                index={colIndex * 3 + index}
                cardClassName={cardClassName}
                avatarClassName={avatarClassName}
              />
            ))}
          </div>
        </div>
      );
    },
    [speed, cardClassName, avatarClassName],
  );

  return (
    <div className={`transition-colors duration-300 ${className}`}>
      <div className='relative flex w-full flex-col items-center overflow-hidden px-4 py-8 text-foreground md:px-6 md:py-12'>
        {title && (
          <h2 className='mb-4 text-center font-display text-2xl font-bold uppercase tracking-wide text-foreground md:text-4xl'>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className='mb-8 w-full max-w-2xl px-4 text-center text-sm text-muted-foreground md:mb-12'>
            {subtitle}
          </p>
        )}

        {testimonials && testimonials.length > 0 && (
          <>
            <div className='hidden xl:flex gap-4 w-full max-w-7xl overflow-hidden relative mx-4'>
              <div className='absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none'></div>
              <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-10 pointer-events-none'></div>

              {desktopColumnsData.map((columnTestimonials, colIndex) =>
                renderColumn(columnTestimonials, colIndex, 'desktop', 800),
              )}
            </div>

            <div className='hidden lg:flex xl:hidden gap-4 w-full max-w-6xl overflow-hidden relative mx-4'>
              <div className='absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none'></div>
              <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-10 pointer-events-none'></div>

              {createColumns(Math.max(desktopColumns - 1, 3)).map(
                (columnTestimonials, colIndex) =>
                  renderColumn(columnTestimonials, colIndex, 'five', 800),
              )}
            </div>

            <div className='hidden md:flex lg:hidden gap-4 w-full max-w-5xl overflow-hidden relative mx-4'>
              <div className='absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none'></div>
              <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-10 pointer-events-none'></div>

              {createColumns(Math.max(desktopColumns - 2, 2)).map(
                (columnTestimonials, colIndex) =>
                  renderColumn(columnTestimonials, colIndex, 'four', 800),
              )}
            </div>

            <div className='hidden sm:flex md:hidden gap-4 w-full max-w-4xl overflow-hidden relative mx-4'>
              <div className='absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none'></div>
              <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-10 pointer-events-none'></div>

              {tabletColumnsData.map((columnTestimonials, colIndex) =>
                renderColumn(columnTestimonials, colIndex, 'tablet', 800),
              )}
            </div>

            <div className='sm:hidden flex gap-3 w-full overflow-hidden relative px-4'>
              <div className='absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-background to-transparent z-10 pointer-events-none'></div>
              <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-background to-transparent z-10 pointer-events-none'></div>

              {mobileColumnsData.map((columnTestimonials, colIndex) =>
                renderColumn(columnTestimonials, colIndex, 'mobile', 600),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KineticTestimonial;
