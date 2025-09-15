import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log for developers
    console.error("App crashed:", error, info);
    this.setState({ info });
  }

  handleReload() {
    // Do not clear state here; in real apps a reload would replace the page.
    // Trigger a navigation; in jsdom this may throw (not implemented), so guard it.
    try {
      if (typeof window.location.assign === 'function') {
        window.location.assign(window.location.href);
      } else {
        // eslint-disable-next-line no-self-assign
        window.location.href = window.location.href;
      }
    } catch (e) {
      // Swallow navigation errors in test environments.
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full glass rounded-xl p-6">
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-sm text-muted-foreground mb-4">
              The app encountered an error and couldn’t render. See the console for details.
            </p>
            {this.state.error && (
              <pre className="text-xs overflow-auto p-3 rounded bg-black/30 border border-white/10 mb-4">
                {String(this.state.error?.stack || this.state.error)}
              </pre>
            )}
            <button onClick={this.handleReload} className="px-3 py-2 rounded bg-primary text-primary-foreground">
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
