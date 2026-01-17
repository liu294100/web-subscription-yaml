export function isAuthenticated(req: Request): boolean {
  const serverPassword = process.env.PASSWORD;
  if (!serverPassword) return true; // If no password configured, allow access

  // Check Authorization header
  const authHeader = req.headers.get('Authorization');
  if (authHeader === `Bearer ${serverPassword}`) return true;
  
  // Check query parameter
  const url = new URL(req.url);
  const pwdParam = url.searchParams.get('pwd');
  if (pwdParam === serverPassword) return true;

  return false;
}
