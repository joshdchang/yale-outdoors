import { browserSessionPersistence, GithubAuthProvider, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { createSignal, Show } from 'solid-js';
import { auth } from '../firebase';
import { IconBrandGithub, IconBrandGoogle, IconLock } from '@tabler/icons-solidjs';

export default function SignIn() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [error, setError] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [rememberMe, setRememberMe] = createSignal(true);

  function handleError(error: any) {
    if (error.code === 'auth/wrong-password') {
      setError('Wrong password');
    } else if (error.code === 'auth/user-not-found') {
      setError('User not found');
    } else if (error.code === 'auth/invalid-email') {
      setError('Invalid email');
    } else if (error.code === 'auth/too-many-requests') {
      setError('Too many requests');
    } else if (error.code === 'auth/network-request-failed') {
      setError('Network request failed');
    } else if (error.code === 'auth/user-disabled') {
      setError('User disabled');
    } else if (error.code === 'auth/account-exists-with-different-credential') {
      setError('Account exists with different credential');
    } else {
      setError('An error occurred');
    }
  }

  async function signIn(signInResult: () => Promise<any>) {
    setError('');
    setLoading(true);
    if (!rememberMe()) {
      await setPersistence(auth, browserSessionPersistence);
    }
    try {
      await signInResult();
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    signIn(() => signInWithEmailAndPassword(auth, email(), password()));
  }

  async function handleGoogleSignIn() {
    signIn(() => signInWithPopup(auth, new GoogleAuthProvider()));
  }

  async function handleGithubSignIn() {
    signIn(() => signInWithPopup(auth, new GithubAuthProvider()));
  }

  return (
    <main class="flex justify-center h-screen items-center p-10">
      <div class="w-full max-w-md grid gap-10">
        <div class="grid justify-items-center">
          <IconLock class="h-12 w-auto text-blue-600" />
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="/" class="font-medium text-blue-600 hover:text-blue-500 ml-1">
              return to Yale Outdoors
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} class="grid gap-6 px-10 py-8 rounded-lg shadow bg-white">
          <input type="hidden" name="remember" value="true" />
          <label class="grid gap-1">
            <span class="font-medium text-sm text-slate-600">Email address</span>
            <input type="email" required autocomplete="email" onInput={(e) => setEmail(e.currentTarget.value)} value={email()} class="px-3 py-2 rounded-md text-sm border border-slate-300 shadow-sm transition-all outline-none appearance-none" />
          </label>
          <label class="grid gap-1">
            <span class="font-medium text-sm text-slate-600">Password</span>
            <div class='relative flex'>
              <input
                type="password"
                required
                autocomplete="current-password"
                onInput={(e) => setPassword(e.currentTarget.value)}
                value={password()}
                class="w-full appearance-none px-3 py-2 rounded-md text-sm border border-slate-300 shadow-sm transition-all outline-none text-slate-800 tracking-widest"
              />
            </div>
          </label>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe()}
                onInput={(e) => setRememberMe(e.currentTarget.checked)}
                class="appearance-none h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all"
              />
              <label for="remember-me" class="ml-2 block text-sm text-slate-800">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <button type="submit" disabled={loading()} class="rounded-md bg-blue-600 hover:bg-blue-500 transition-colors active:bg-blue-400 text-white text-sm p-2.5 flex items-center justify-center relative disabled:bg-blue-400">
            <Show when={loading()}>
              <div class="w-4 h-4 rounded-full border-blue-200 border-b-2 border-r-2 animate-spin absolute left-3"></div>
            </Show>
            Sign in
          </button>
          <Show when={error()}>
            <p class="text-red-500 text-sm">{error()}</p>
          </Show>
          <div class="flex items-center">
            <hr class="flex-grow border-slate-300" />
            <span class="mx-2 text-slate-500 text-sm">Or continue with</span>
            <hr class="flex-grow border-slate-300" />
          </div>
          <div class="flex gap-3">
            <button type="button" onClick={handleGoogleSignIn} class="flex items-center justify-center w-full rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-600 hover:bg-slate-100 active:bg-slate-200">
              <IconBrandGoogle class="w-5 h-5 mr-2" />
              Google
            </button>
            <button type="button" onClick={handleGithubSignIn} class="flex items-center justify-center w-full rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-slate-600 hover:bg-slate-100 active:bg-slate-200">
              <IconBrandGithub class="w-5 h-5 mr-2" />
              Github
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
