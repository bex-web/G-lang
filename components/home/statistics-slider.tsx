'use client'

import { motion } from 'framer-motion'
import ImageAutoSlider from '@/components/ui/image-auto-slider'

export function StatisticsSlider() {
  return (
    <section
      className="relative border-t border-border py-16 md:py-20 overflow-hidden"
      aria-label="Visual showcase"
    >
      {/* Container with no horizontal padding for edge-to-edge slider */}
      <div className="w-full">
        {/* Slider with integrated logo overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <ImageAutoSlider />
        </motion.div>
      </div>
    </section>
  )
}
