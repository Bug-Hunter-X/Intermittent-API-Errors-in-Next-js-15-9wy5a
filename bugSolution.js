```javascript
// pages/api/data.js
// (remains unchanged)
export default async function handler(req, res) {
  const success = Math.random() < 0.8; 
  if (success) {
    res.status(200).json({ data: 'Success!' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```
```javascript
// components/MyComponent.js
import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          // Handle HTTP errors appropriately
          const errorData = await res.json();
          const errorMessage = errorData.error || `HTTP error! status: ${res.status}`;
          throw new Error(errorMessage);
        }
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching data:', err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

export default MyComponent;
```