import { AuthScreenShell } from '@/components/screens/auth/auth-screen-shell';

import { LoginScreenForm } from './login-screen-form';

export function LoginScreen() {
  return (
    <AuthScreenShell>
      <LoginScreenForm />
    </AuthScreenShell>
  );
}
