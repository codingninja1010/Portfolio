import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// Robust mount that avoids a silent blank page on early errors
function renderApp() {
	const container = document.getElementById('root');
	if (!container) {
		// In case the script executes before DOM is ready
		window.addEventListener('DOMContentLoaded', renderApp, { once: true });
		return;
	}

	try {
		createRoot(container).render(
			<React.StrictMode>
				<ErrorBoundary>
					<App />
				</ErrorBoundary>
			</React.StrictMode>
		);
	} catch (err) {
		// If React fails to mount, show a minimal fallback so the page isn't blank
		console.error('Failed to mount React app:', err);
		container.innerHTML = `
			<div style="padding:16px;font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial;">
				<h1 style="margin:0 0 8px;font-size:18px;">App failed to load</h1>
				<pre style="white-space:pre-wrap;background:#111827;color:#e5e7eb;padding:12px;border-radius:8px;overflow:auto">${String(err?.stack || err)}</pre>
			</div>
		`;
	}
}

renderApp();