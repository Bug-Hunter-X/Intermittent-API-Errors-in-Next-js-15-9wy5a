```javascript
// pages/api/data.js
export default async function handler(req, res) {
  // Simulate an API call that might sometimes fail
  const success = Math.random() < 0.8; // 80% chance of success

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
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (err) {
        setError(err);
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