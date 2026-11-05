import type { Instrumentation } from "next";

// Server-side error monitoring hook: every unhandled request error lands here.
// Logs structured JSON (no PII). To use Sentry/Datadog instead, forward `err` to their SDK here.
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  const e = err as Error & { digest?: string };
  console.error(
    JSON.stringify({
      level: "error",
      time: new Date().toISOString(),
      message: e.message,
      digest: e.digest,
      path: request.path,
      method: request.method,
      routeType: context.routeType,
    }),
  );
};
