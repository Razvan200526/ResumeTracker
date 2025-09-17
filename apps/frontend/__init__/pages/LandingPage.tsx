'use client'

import { Navbar } from '../../components/shared/Navbar'
import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  CTASection
} from '../../components/landing'
import { ScrollShadow } from '@heroui/react'

export const LandingPage = () => {
  return (
    <div className="h-[calc(100dvh)] bg-background">
        <Navbar/>

      <HeroSection />

      <FeaturesSection />

      <StatsSection />

      <CTASection />
    </div>
  )
}
