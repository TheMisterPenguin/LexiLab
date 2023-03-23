import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
