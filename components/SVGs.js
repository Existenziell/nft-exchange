import { motion } from 'framer-motion'

const SVGs = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.1
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      }
    },
  }

  return (
    <div>
      <motion.svg
        width='100%'
        height='100%'
        viewBox='0 0 520 180'
        initial='hidden'
        animate='visible'
      >

        <motion.circle
          cx='60'
          cy='108'
          r='30'
          stroke='var(--color-brand)'
          strokeWidth='3'
          strokeLinecap='round'
          fill='transparent'
          variants={draw}
          custom={0}
        />
        <motion.circle
          cx='36'
          cy='85'
          r='20'
          stroke='var(--color-highlight)'
          strokeWidth='3'
          strokeLinecap='round'
          fill='transparent'
          variants={draw}
          custom={2}
        />
        <motion.rect
          width='100'
          height='100'
          x='10'
          y='60'
          rx='20'
          stroke='var(--color-brand)'
          strokeLinecap='round'
          fill='transparent'
          strokeWidth='6'
          variants={draw}
          custom={1}
        />

        {/* N */}
        <motion.line
          x1='150'
          y1='170'
          x2='150'
          y2='30'
          stroke='var(--color-brand)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={2.5}
        />
        <motion.line
          x1='150'
          y1='30'
          x2='270'
          y2='170'
          stroke='var(--color-highlight)'
          strokeLinecap='round'
          strokeWidth='10'
          variants={draw}
          custom={3}
        />
        <motion.line
          x1='270'
          y1='30'
          x2='270'
          y2='170'
          stroke='var(--color-brand)'
          strokeLinecap='round'
          strokeWidth='10'
          variants={draw}
          custom={3.5}
        />

        {/* F */}
        <motion.line
          x1='300'
          y1='170'
          x2='300'
          y2='30'
          stroke='var(--color-highlight)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={3.5}
        />
        <motion.line
          x1='300'
          y1='30'
          x2='390'
          y2='30'
          stroke='var(--color-brand)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={4}
        />
        <motion.line
          x1='300'
          y1='100'
          x2='370'
          y2='100'
          stroke='var(--color-brand)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={4.5}
        />

        {/* T */}
        <motion.line
          x1='460'
          y1='170'
          x2='460'
          y2='30'
          stroke='var(--color-brand)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={5}
        />
        <motion.line
          x1='410'
          y1='30'
          x2='510'
          y2='30'
          stroke='var(--color-highlight)'
          strokeWidth='10'
          strokeLinecap='round'
          variants={draw}
          custom={5.5}
        />
      </motion.svg>
    </div>
  )
}

export default SVGs
