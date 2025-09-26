import { ToastProvider } from '@common/components/toast';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { queryClient } from '../shared/QueryClient';
import { router } from './routes';
import '@fontsource/rammetto-one/400.css';
import '@fontsource/montserrat/100.css';
import '@fontsource/montserrat/200.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/saira-stencil-one';
const elem = document.getElementById('root');
if (!elem) {
  throw new Error('Root element not found');
}
const root = ReactDOM.createRoot(elem);
try {
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
} catch (error) {
  console.error(error);
}
