import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export default async function Protected() {
  const session = await auth();
  if (!session) return redirect('/login');
  return (
    <div>
      <h1>Hi!!! I LOVE BRIDGES</h1>
    </div>
  );
}
