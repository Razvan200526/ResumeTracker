import { ErrorFallback } from '@common/components/ErrorFallback';
import { HeroPage } from '@frontend/hero/HeroPage';
import { CoverLettersPage } from '@frontend/resumes/cover-letter/CoverLettersPage';
import { PortfolioPage } from '@frontend/resumes/portfolio/PortfolioPage';
import { ResourceLayout } from '@frontend/resumes/ResumeLayout';
import { ResumePage } from '@frontend/resumes/resumes/ResumePage';
import { AuthLayout } from '@frontend/shared/components/layout/AuthLayout';
import { SigninPage } from '@frontend/signin/SignInPage';
import { SignupPage } from '@frontend/signup/SignUpPage';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, Outlet } from 'react-router';
export const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Outlet />
  </ErrorBoundary>
);

export const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: '/',
        element: <HeroPage />,
      },
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/home',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <p>Lorem Ipsum</p>,
          },
          {
            path: 'resources',
            element: <ResourceLayout />,
            children: [
              {
                index: true,
                element: <ResumePage />,
              },
              {
                path: 'cover-letter',
                element: <CoverLettersPage />,
              },
              {
                path: 'portfolio',
                element: <PortfolioPage />,
              },
            ],
          },

          {
            path: 'settings',
            element: <h1>Settings</h1>,
          },
          {
            path: 'applications',
            element: <h1>Applications</h1>,
          },
        ],
      },
    ],
  },
  {
    path: '/*',
    element: <h1>Page Not Found</h1>,
  },
]);
