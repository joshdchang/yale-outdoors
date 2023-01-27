import { useAuth } from 'solid-firebase';
import { Match, Switch } from 'solid-js';

import { auth } from '../firebase';
import SignIn from '../pages/SignIn';

export default function Auth(props: { children: any }) {
  const authState = useAuth(auth);

  return (
    <Switch fallback={props.children}>
      <Match when={authState.loading}>
        <div class="flex justify-center items-center h-screen" role="status">
          <div class='w-10 h-10 rounded-full border-blue-500 border-b-2 border-r-2 animate-spin'></div>
        </div>
      </Match>
      <Match when={authState.error}>
        <p>Error</p>
      </Match>
      <Match when={!authState.data}>
        <SignIn />
      </Match>
    </Switch>
  );
}
