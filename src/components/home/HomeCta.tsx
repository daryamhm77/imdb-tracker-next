import AuthActions from '@/components/marketing/AuthActions';
import CtaBanner from '@/components/templates/CtaBanner';

export default function HomeCta() {
  return (
    <CtaBanner
      title="Ready to roll the credits on forgetfulness?"
      description="Join thousands of film fans who never lose track of a great movie again."
      actions={
        <AuthActions signedOutLabel="Get Started — It's Free" signedInLabel="Open Your Dashboard" />
      }
    />
  );
}
