---
name: TanStack Start publishing
description: Deployment constraints for this TanStack Start application on Replit
---

TanStack Start must be published as a server-rendered Node/Bun application, not as a static site: the build emits `.output/server` and does not create a root `index.html` in `.output/public`.

**Why:** The project’s Vite wrapper defaults Nitro to the Cloudflare preset, while Replit static publishing expects a valid static directory. That combination caused publishing to fail first on a missing `dist` directory and then on the absence of a static entry page.

**How to apply:** Keep Nitro on the `node-server` preset and use an autoscale publication that runs the built server with Bun; verify the production entry responds before asking the user to publish.