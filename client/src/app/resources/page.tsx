import { ChevronRight, Download, Facebook, FileText, Instagram, Mail, Search, Target, TrendingUp, Twitter, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"

interface Resource {
  id: number
  title: string
  slug: string
  excerpt: string
  image: string
  date: string
  category: { name: string; slug: string }
  downloads: number
}

interface Category {
  id: number
  name: string
  slug: string
  icon: React.ComponentType<{ className?: string }>
}

interface ResourceCardProps {
  resource: Resource
}

// Sample data for resources
const resources: Resource[] = [
    {
      id: 1,
      title: "Sponsorship Proposal Template",
      slug: "sponsorship-proposal-template",
      excerpt: "A comprehensive template for creating compelling sponsorship proposals with all essential sections.",
      image: "/placeholder.gif",
      date: "Jun 2, 2023",
      category: { name: "Proposal Templates", slug: "proposal-templates" },
      downloads: 245,
    },
    {
      id: 2,
      title: "Media Kit Template",
      slug: "media-kit-template",
      excerpt: "Professional media kit template to showcase your society's reach and engagement metrics.",
      image: "/placeholder.gif",
      date: "May 25, 2023",
      category: { name: "Media Kits", slug: "media-kits" },
      downloads: 189,
    },
    {
      id: 3,
      title: "Cold Email Outreach Guide",
      slug: "cold-email-outreach-guide",
      excerpt: "Step-by-step guide for crafting effective cold emails to potential sponsors.",
      image: "/placeholder.gif",
      date: "May 18, 2023",
      category: { name: "Outreach Tips", slug: "outreach-tips" },
      downloads: 312,
    },
    {
      id: 4,
      title: "Sponsorship Tiers Calculator",
      slug: "sponsorship-tiers-calculator",
      excerpt: "Excel template to help calculate and structure different sponsorship package tiers.",
      image: "/placeholder.gif",
      date: "May 12, 2023",
      category: { name: "Proposal Templates", slug: "proposal-templates" },
      downloads: 156,
    },
    {
      id: 5,
      title: "Event Sponsorship Case Study",
      slug: "event-sponsorship-case-study",
      excerpt: "Real example of a successful sponsorship partnership with detailed breakdown.",
      image: "/placeholder.gif",
      date: "May 5, 2023",
      category: { name: "Case Studies", slug: "case-studies" },
      downloads: 203,
    },
    {
      id: 6,
      title: "Social Media Sponsorship Guide",
      slug: "social-media-sponsorship-guide",
      excerpt: "How to leverage social media presence to attract and retain sponsors.",
      image: "/placeholder.gif",
      date: "Apr 28, 2023",
      category: { name: "Outreach Tips", slug: "outreach-tips" },
      downloads: 178,
    },
]
  
  const categories: Category[] = [
    { id: 1, name: "Proposal Templates", slug: "proposal-templates", icon: FileText },
    { id: 2, name: "Media Kits", slug: "media-kits", icon: Download },
    { id: 3, name: "Outreach Tips", slug: "outreach-tips", icon: Mail },
    { id: 4, name: "Case Studies", slug: "case-studies", icon: Users },
    { id: 5, name: "ROI Calculators", slug: "roi-calculators", icon: Target },
    { id: 6, name: "Success Stories", slug: "success-stories", icon: TrendingUp },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">Bridges</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <Link href="/resources" className="text-muted-foreground hover:text-primary">
              Resources
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button className="hidden md:inline-flex">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="container px-4 py-8 mx-auto md:px-6 md:py-12">
        <section className="mb-12">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            <div className="relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-auto md:h-full">
              <Image
                src="/placeholder.gif"
                alt="Featured resource"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-2 text-sm font-medium text-primary">Featured Resource</div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Complete Sponsorship Proposal Template
              </h1>
              <p className="mb-6 text-muted-foreground">
                A comprehensive template that helps societies create compelling sponsorship proposals. Includes sections for 
                executive summary, event details, sponsorship tiers, and ROI projections.
              </p>
              <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
                <span>Updated May 28, 2023</span>
                <span>•</span>
                <span>Free Download</span>
                <span>•</span>
                <Link href="/category/proposal-templates" className="font-medium text-primary hover:text-primary/80">
                  Proposal Templates
                </Link>
              </div>
              <Button className="w-fit">
                Download Template
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Latest Resources</h2>
            <Link
              href="/resources/articles"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <section className="p-8 mb-12 rounded-lg bg-card border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Contribute Your Resources</h2>
            <p className="mb-6 text-muted-foreground">
              Share your successful sponsorship templates, media kits, and outreach strategies with the community. 
              Help other societies succeed in their sponsorship efforts.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button>Submit Resource</Button>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Resource Categories</h2>
            <Link
              href="/categories"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
                              <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex flex-col items-center p-4 text-center rounded-lg bg-card border border-border hover:bg-primary duration-200 hover:text-white"
                >
                  <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-primary">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
            ))}
          </div>
        </section>
      </main>
      <footer className="py-8 border-t bg-card border-border">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-primary">Bridges</h3>
              <p className="text-muted-foreground">
                Connecting UNSW societies with potential sponsors through comprehensive resources and tools.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-foreground">Resource Types</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/category/proposal-templates" className="hover:text-primary">
                    Proposal Templates
                  </Link>
                </li>
                <li>
                  <Link href="/category/media-kits" className="hover:text-primary">
                    Media Kits
                  </Link>
                </li>
                <li>
                  <Link href="/category/outreach-tips" className="hover:text-primary">
                    Outreach Tips
                  </Link>
                </li>
                <li>
                  <Link href="/category/case-studies" className="hover:text-primary">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase text-foreground">Follow Us</h3>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center text-muted-foreground border-t border-border">
            © {new Date().getFullYear()} Bridges. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="overflow-hidden bg-card rounded-lg shadow-sm hover:scale-[1.03] duration-200 hover:shadow-lg border border-border">
      <Link href={`/resource/${resource.slug}`}>
        <div className="relative aspect-[16/9]">
          <Image src={resource.image || "/placeholder.gif"} alt={resource.title} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/category/${resource.category.slug}`}>
          <span className="inline-block mb-2 text-xs font-medium text-primary">{resource.category.name}</span>
        </Link>
        <Link href={`/resource/${resource.slug}`}>
          <h3 className="mb-2 text-xl font-bold leading-tight text-foreground">{resource.title}</h3>
        </Link>
        <p className="mb-4 text-sm text-muted-foreground">{resource.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{resource.date}</span>
        </div>
      </div>
    </article>
  )
}

