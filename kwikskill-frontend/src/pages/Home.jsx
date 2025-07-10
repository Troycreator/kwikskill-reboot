import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://127.0.0.1:8000/protected', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || JSON.stringify(data)))
      .catch(err => setMessage('Error fetching protected data'));
  }, []);

  return <h2>{message}</h2>;
}
