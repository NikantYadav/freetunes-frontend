
import { useLocation } from "react-router-dom";
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
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center glass-dark p-10 rounded-lg shadow-neon-sm max-w-md mx-auto">
        <h1 className="text-7xl font-bold mb-4 neon-text">404</h1>
        <p className="text-xl text-gray-300 mb-6">Signal lost in the digital void</p>
        <div className="w-32 h-1 bg-neon mx-auto mb-6"></div>
        <a 
          href="/" 
          className="text-neon border border-neon px-6 py-3 rounded-lg hover:bg-neon hover:bg-opacity-10 transition-all"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
