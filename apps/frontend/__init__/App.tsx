import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";
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

const elem = document.querySelector("#root");
if (!elem) {
	throw Error("Root elem not found");
}

const root = createRoot(elem);
export const App = root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
