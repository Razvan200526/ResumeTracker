import * as ReactDOM from "react-dom/client";
import { Component } from "./Component";

const elem = document.getElementById("root");
if (!elem) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(elem);
root.render(<Component message="Sup!" />);
