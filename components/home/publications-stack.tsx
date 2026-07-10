'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { BookShelf, type BookItem } from '@/components/ui/book'
import { publications } from '@/content/projects'

export function PublicationsStack() {
  // Show 4 publications for 4x1 grid
  const displayPubs: BookItem[] = publications.slice(0, 4).map((pub) => ({
    slug: pub.slug,
    index: pub.index,
    title: pub.title,
    authors: pub.authors,
    venue: pub.venue,
    year: pub.year,
    type: pub.type,
    serial: pub.serial,
    link: pub.link,
    abstract: pub.abstract,
    tags: pub.tags,
    thumbnail: pub.thumbnail,
  }))

  return (
    <section
      id="publications"
      className="relative border-t border-border py-24 md:py-32"
      aria-label="Publications"
    >
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <SectionHeading
          code="06 · D-Archive"
          title="Publications"
          description="Peer-reviewed and open research output. Click any book to read the abstract and access the full publication."
          inverse
          magnetic
          hoverText="RESEARCH"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-14"
        >
          <BookShelf items={displayPubs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/publications"
            className="group inline-flex items-center gap-2 rounded-[2px] border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
          >
            View all writing
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
