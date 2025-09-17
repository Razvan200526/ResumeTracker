'use client'

import { Card, CardBody } from '@heroui/react'

const stats = [
  { name: 'Resumes Reviewed', value: '10,000+' },
  { name: 'Success Rate', value: '85%' },
  { name: 'Average Score Improvement', value: '+40%' },
  { name: 'Time Saved', value: '15hrs / week' },
]

export const StatsSection = () => {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-primary">
              Trusted by job seekers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-secondary-text font-primary">
              Join thousands of professionals who have successfully improved their resumes and landed their dream jobs.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card
                key={stat.name}
                className="bg-background border border-border hover:border-border-hover transition-all duration-300"
              >
                <CardBody className="text-center p-8">
                  <div className="order-first text-3xl font-bold tracking-tight text-primary font-number mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold leading-6 text-secondary-text font-primary">
                    {stat.name}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
