'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Carousel.module.scss'

const slides: number[] = [0, 1, 2, 3]

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = (): void => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollTo = (index: number): void => emblaApi?.scrollTo(index)
  const scrollPrev = (): void => emblaApi?.scrollPrev()
  const scrollNext = (): void => emblaApi?.scrollNext()

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {slides.map((_, i) => (
            <div className={styles.slideWrapper} key={i}>
              <div
                className={styles.slide}
                style={{ background: `hsl(${i * 70}, 70%, 60%)` }}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={`${styles.btn} ${styles.prev}`} onClick={scrollPrev}>
        <Image src="/icons/arrow-left.svg" alt='arrow prev' width={38} height={62}/>
      </button>
      <button className={`${styles.btn} ${styles.next}`} onClick={scrollNext}>
        <Image src="icons/arrow-right.svg" alt='arrow next' width={38} height={62}/>
      </button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`${styles.dot} ${
              i === selectedIndex ? styles.active : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}