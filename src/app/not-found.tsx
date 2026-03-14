import { Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 text-center">
      {/* Large 404 */}
      <h1 className="text-[8rem] sm:text-[12rem] font-bold font-display leading-none tracking-tighter text-[var(--border)]">
        404
      </h1>

      {/* Message */}
      <p className="mt-4 text-heading-md font-semibold text-[var(--text-primary)] font-display">
        Page not found
      </p>
      <p className="mt-2 text-body-md text-[var(--text-secondary)] max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>

      {/* Back to home */}
      <div className="mt-8">
        <Button href="/" variant="primary" size="lg">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </section>
  );
}
