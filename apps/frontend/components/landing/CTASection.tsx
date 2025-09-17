'use client'

import { Button, Card, CardBody } from '@heroui/react'

export const CTASection = () => {
  return (
    <div className="bg-background py-4">
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Card className="bg-gradient-to-br from-background-100 to-background border border-border">
            <CardBody className="p-12">
              <h2 className="text-2xl font-bold tracking-tight text-light-900 sm:text-4xl font-primary mb-6">
                Ready to transform your resume?
              </h2>
              <p className="mx-auto max-w-xl text-lg leading-8 text-secondary-text font-primary mb-5">
                Get instant AI-powered feedback and start tracking your applications today.
                Join the thousands who have already improved their job search success.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size='md'
                  className="bg-primary text-light font-semibold font-primary px-8 py-3"
                >
                  Get started for free
                </Button>
                <Button
                  variant="bordered"
                  size='md'
                  className="border-primary-300 text-primary-600 font-semibold font-primary px-8 py-3"
                >
                  Learn more →
                </Button>
              </div>

              {/* Additional trust indicators */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-primary">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary-text rounded-full"></div>
                    <span className="font-primary">Free 7-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary-text rounded-full"></div>
                    <span className="font-primary">No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary-text rounded-full"></div>
                    <span className="font-primary">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
