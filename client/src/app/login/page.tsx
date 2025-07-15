import { auth, signIn, signOut } from '../../auth';

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit" className="cursor-pointer rounded bg-blue-400 px-6 py-3 text-white shadow">
          Sign out :(
        </button>
      </form>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/protected' });
        }}
      >
        <button type="submit" className="cursor-pointer rounded bg-blue-400 px-6 py-3 text-white shadow">
          Sign in with Google!
        </button>
      </form>
    </div>
  );
}
