'use client';

import React, { useEffect, useState } from 'react';
import { API_URL } from '@/api/config';

export default function Home() {
  const [message, setMessage] = useState('Loading');

  useEffect(() => {
    fetch(`${API_URL}/home`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return <div>{message}</div>;
}
