import { createBrowserRouter, Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@common/components/ErrorFallback";
import { HeroPage } from "@frontend/hero/HeroPage";
import { SigninPage } from "@frontend/signin/SignInPage";
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
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/signin",
        element: <SigninPage />,
      },
    ],
  },
]);
