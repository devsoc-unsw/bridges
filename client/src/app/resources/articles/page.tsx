"use client"

import { Calendar, Download, Facebook, Filter, Instagram, Search, SortAsc,Twitter,X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo,useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border bg-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={resource.image || "/placeholder.svg"}
            alt={resource.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-card text-primary border border-border">
              {resource.category.name}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 text-foreground">
          {resource.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{resource.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {resource.date}
          </div>
          <div className="flex items-center gap-1">
            <Download className="w-3 h-3" />
            {resource.downloads}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/articles/${resource.slug}`} className="w-full">
          <Button className="w-full group-hover:bg-primary/90 transition-colors">Read Article</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date-desc")

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(resources.map((r) => r.category.name)))
    return uniqueCategories
  }, [])

  // Filter and sort resources
  const filteredAndSortedResources = useMemo(() => {
    const filtered = resources.filter((r) => {
      const q = query.toLowerCase()
      const matchesSearch =
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.category.name.toLowerCase().includes(q)

      const matchesCategory = selectedCategory === "all" || r.category.name === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort resources
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "downloads-desc":
          return b.downloads - a.downloads
        case "downloads-asc":
          return a.downloads - b.downloads
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return filtered
  }, [query, selectedCategory, sortBy])

  const clearFilters = () => {
    setQuery("")
    setSelectedCategory("all")
    setSortBy("date-desc")
  }

  const hasActiveFilters = query !== "" || selectedCategory !== "all" || sortBy !== "date-desc"

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
      <div className="container px-4 mx-auto max-w-7xl my-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Resource Library</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive guides, templates, and tools to help you succeed in sponsorship and partnerships.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles, guides, templates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="bg-card text-foreground">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <SortAsc className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Sort:</span>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="date-desc" className="bg-card text-foreground">Newest First</SelectItem>
                  <SelectItem value="date-asc" className="bg-card text-foreground">Oldest First</SelectItem>
                  <SelectItem value="downloads-desc" className="bg-card text-foreground">Most Downloaded</SelectItem>
                  <SelectItem value="downloads-asc" className="bg-card text-foreground">Least Downloaded</SelectItem>
                  <SelectItem value="title-asc" className="bg-card text-foreground">Title A-Z</SelectItem>
                  <SelectItem value="title-desc" className="bg-card text-foreground">Title Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2 bg-background border-border">
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {query && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-card text-primary border border-border">
                  Search: &quot;{query}&quot;
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setQuery("")} />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1 bg-card text-primary border border-border">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedResources.length} of {resources.length} articles
          </p>
        </div>

        {/* Articles Grid */}
        {filteredAndSortedResources.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn&apos;t find any articles matching your search criteria. Try adjusting your filters or search terms.
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline" className="border-border bg-background">
                Clear all filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
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
