'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };

  return (
    <div className="min-h-screen items-center justify-center flex">
      <button onClick={handleClick} className="cursor-pointer rounded bg-blue-400 px-6 py-3 text-white shadow">
        Sign in with Google!
      </button>
    </div>
  );
}
