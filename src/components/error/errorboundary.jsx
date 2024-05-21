import React from 'react';

const ErrorBoundary = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const resetError = () => setError(null);
    return resetError;
  }, []);

  const handleError = (error) => setError(error);

  return (
    <div>
      {error ? (
        // Display error message or fallback UI
        <p>Error: {error.message}</p>
      ) : (
        children(handleError) // Pass error handler down to children
      )}
    </div>
  );
};

export default ErrorBoundary;
