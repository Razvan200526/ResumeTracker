import { ErrorFallback } from '@common/components/ErrorFallback';
import { HeroPage } from '@frontend/hero/HeroPage';
import { CoverLettersPage } from '@frontend/resources/cover-letter/CoverLettersPage';
import { CoverLetterInspectPage } from '@frontend/resources/cover-letter/CoverletterInspectPage';
import { PortfolioPage } from '@frontend/resources/portfolio/PortfolioPage';
import { ResourceLayout } from '@frontend/resources/ResourceLayout';
import { ResumePage } from '@frontend/resources/resumes/ResumePage';
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
                path: 'coverletter',
                element: <CoverLettersPage />,
              },
              {
                path: 'coverletters/:id',
                element: <CoverLetterInspectPage />,
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
