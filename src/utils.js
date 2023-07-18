import { redirect } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './api';

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  let unsub;

  const authStatePromise = new Promise((resolve) => {
    unsub = onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  const user = await authStatePromise;
  unsub();

  if (!user) {
    const response = redirect(`/login?message=You must log in first&redirectTo=${pathname}`);
    throw response;
  }

  return null;
}