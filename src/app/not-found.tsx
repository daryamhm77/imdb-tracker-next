import StatusPage from '@/components/templates/StatusPage';

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="404"
      title="Page not found"
      description="The page you are looking for doesn't exist or has been moved."
    />
  );
}
