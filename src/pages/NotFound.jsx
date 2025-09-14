import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center glass rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 rounded-md border border-primary/30 hover:bg-primary/10 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;