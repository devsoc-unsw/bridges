'use client';

import React, { useEffect, useState } from 'react';

import { API_URL } from '@/api/config';

export default function Home() {
  const [text, setText] = useState('Loading');
  const [message, setMessage] = useState('Loading v2');

  useEffect(() => {
    fetch(`${API_URL}/bridge`)
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        setText(text);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/devsoc`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return <div>{text + '\n' + message}</div>;
}
