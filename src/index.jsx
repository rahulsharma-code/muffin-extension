import React, {StrictMode} from "react";
import App from './app.jsx';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App></App>
	</StrictMode>
);
