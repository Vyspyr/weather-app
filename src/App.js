import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <header className="text-3xl font-bold mb-4">Welcome to My Website</header>
      <p className="text-lg">This is a simple website using React and HTML.</p>
      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Click Me
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);

