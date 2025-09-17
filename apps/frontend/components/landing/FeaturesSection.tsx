'use client'

import { Card, CardBody, CardHeader } from '@heroui/react'
import { Sparkles, BarChart3, Eye } from 'lucide-react'

const features = [
  {
    name: 'AI-Powered Analysis',
    description: 'Advanced AI reviews your resume for content, formatting, and ATS compatibility with instant feedback.',
    icon: Sparkles,
  },
  {
    name: 'Real-time Tracking',
    description: 'Track your job applications and get insights on your application status with detailed analytics.',
    icon: BarChart3,
  },
  {
    name: 'Expert Reviews',
    description: 'Get detailed feedback from industry experts and hiring managers to improve your chances.',
    icon: Eye,
  },
]

export const FeaturesSection = () => {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:max-w-none lg:max-w-none lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl font-primary">
            Comprehensive Resume Enhancement
          </p>
          <p className="mt-6 text-lg leading-8 text-secondary-text font-primary">
            Our AI-powered platform provides end-to-end resume optimization and job application tracking
            to maximize your chances of landing interviews.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.name}
                className="bg-dark-100 border border-border transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-x-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <feature.icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-primary font-primary">
                      {feature.name}
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-base leading-7 text-muted font-primary">
                    {feature.description}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
