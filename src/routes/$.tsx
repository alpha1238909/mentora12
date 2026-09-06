import { createFileRoute } from "@tanstack/react-router";
import { App } from "./index";

/**
 * The product uses a lightweight client-side path switcher inside App.
 * This catch-all keeps direct links and PWA launches from falling into the
 * framework's 404 page before that switcher can render the requested screen.
 */
export const Route = createFileRoute("/$")({
  component: App,
});
