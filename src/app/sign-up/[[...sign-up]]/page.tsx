import { SignUp } from '@clerk/nextjs';
import AuthPage from '@/components/templates/AuthPage';

export default function Page() {
  return (
    <AuthPage>
      <SignUp />
    </AuthPage>
  );
}
