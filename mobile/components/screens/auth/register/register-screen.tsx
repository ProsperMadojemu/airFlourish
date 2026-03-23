import { AuthScreenShell } from '@/components/screens/auth/auth-screen-shell';

import { RegisterScreenForm } from './register-screen-form';

export function RegisterScreen() {
  return (
    <AuthScreenShell>
      <RegisterScreenForm />
    </AuthScreenShell>
  );
}
