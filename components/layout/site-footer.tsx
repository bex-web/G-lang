import { profile } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border" aria-label="Footer">
      <div className="mx-auto w-full px-6 lg:px-12 xl:px-20 py-16">
        <div className="flex flex-col gap-3 border-t border-border pt-8 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="flex items-center gap-2">
            <span className="animate-rec inline-block h-1.5 w-1.5 rounded-full bg-status" />
            Available for collaboration
          </span>
        </div>
      </div>
    </footer>
  )
}
