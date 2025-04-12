// src/app/page.tsx
import Hero from "@/components/common/Hero"
import FeatureHighlights from "@/components/common/FeatureHighlights"
import FeaturedListings from "@/components/common/FeaturedListings"
import FAQAccordion from "@/components/common/FAQAccordion"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureHighlights />
      <FeaturedListings />
      <FAQAccordion />
    </>
  )
}
