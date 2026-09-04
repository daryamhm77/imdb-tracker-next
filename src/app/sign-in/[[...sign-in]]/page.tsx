import { SignIn } from '@clerk/nextjs';
import AuthPage from '@/components/templates/AuthPage';

export default function Page() {
  return (
    <AuthPage>
      <SignIn />
    </AuthPage>
  );
}
