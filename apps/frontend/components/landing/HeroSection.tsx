'use client'

import { ChevronRightIcon } from 'lucide-react'
import { Button, Card, CardBody, Avatar, AvatarGroup } from '@heroui/react'

export const HeroSection = () => {
  return (
    <div className="relative isolate overflow-hidden min-h-[90vh] flex items-center">

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0">

              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl font-primary">
                AI-Powered Resume Review That Gets You
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-600 block sm:inline sm:ml-2">
                  Hired
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-muted font-primary max-w-xl">
                Transform your resume with intelligent AI analysis, real-time application tracking, and expert feedback.
                Get past ATS systems and land your dream job faster than ever before.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  variant='solid'
                  size="md"
                  color='primary'
                  className="text-light font-semibold font-primary w-full sm:w-auto"
                >
                  Analyze My Resume
                </Button>
                <Button
                  variant='light'
                  size="md"
                  className="text-primary font-semibold font-primary group w-full sm:w-auto"
                >
                  Watch demo
                  <ChevronRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <AvatarGroup max={4} className="justify-start">
                  <Avatar
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="ring-2 ring-background"
                    size="sm"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="ring-2 ring-background"
                    size="sm"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                    className="ring-2 ring-background"
                    size="sm"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="ring-2 ring-background"
                    size="sm"
                  />
                </AvatarGroup>
                <div className="text-sm font-primary">
                  <span className="font-semibold text-secondary-text">2,000+</span>{' '}
                  <span className="text-muted">professionals already improved their resumes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <div className="relative">
              <Card className="bg-background-25 border border-border backdrop-blur-sm">
                <CardBody className="p-0">
                  <img
                    src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                    alt="ResAI App Screenshot"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </CardBody>
              </Card>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300 rounded-full opacity-15 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
