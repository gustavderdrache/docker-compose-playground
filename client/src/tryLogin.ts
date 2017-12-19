import Parse from './parse';

export default async function tryLogin(): Promise<Parse.User> {
  // Reuse cached credentials
  const currentUser = Parse.User.current();
  if (currentUser) {
    return currentUser;
  }

  // Or try logging in
  const loginPromise = Parse.User.logIn('user@localhost', 'password');
  try {
    // Use await here to trigger the catch block
    return await loginPromise;
  } catch {
    // Else just try signing up and see what happens
    const user = new Parse.User();
    user.setUsername('user@localhost');
    user.setEmail('user@localhost');
    user.setPassword('password');

    return user.signUp(null);
  }
}