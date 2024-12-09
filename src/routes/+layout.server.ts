import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const load = async ({ cookies, url, locals }) => {
  console.log('+layout.server.ts running for:', url.pathname);

  const accessToken = cookies.get('access_token');
  console.log('Access Token:', accessToken);

  // Define protected routes or route patterns
  const protectedRoutes = [/^\/asset/, /^\/person/, /^\/company/];

  // Check if the current path matches a protected route
  const isProtected = protectedRoutes.some((route) => route.test(url.pathname));
  console.log('Is Protected Route:', isProtected);

  if (isProtected) {
    console.log('Accessing a protected route:', url.pathname);

    if (!accessToken) {
      console.log('No access token found, redirecting to /login');
      throw redirect(307, '/login');
    }

    try {
      const decoded = jwt.verify(accessToken, import.meta.env.VITE_JWT_SECRET!);
      console.log('Access token verified:', decoded);

      // Attach user info to locals for downstream use
      locals.user = decoded;
    } catch (err) {
      console.error('Access token verification failed:', err);
      throw redirect(307, '/login');
    }
  }

  return {
    user: locals.user || null // Pass user data to child pages if authenticated
  };
};
