# JeevDristi POCT Website

Public marketing and download website for the IIT Bhilai JeevDristi point-of-care testing project.

## Development

```sh
bun install
bun run dev
```

## Checks

```sh
bun run lint
bun run build
```

## Deployment

Pushes to `main` build the Vite application and deploy `dist/` to GitHub Pages at
<https://doc-poct.github.io/sicklesense/>.

APK and device-image links point to the public [`poct_fw_app_releases`](https://github.com/doc-poct/poct_fw_app_releases/releases) repository.

The separate **Phone Results** dashboard is served at `/sicklesense/webportal/`
and uses WebUSB directly in supported HTTPS browsers. It provides the secure
phone connection, completed-result search, artifact preview, and verified ZIP
export workflow.
Clinical bytes remain in transient browser memory and travel only over the
approved encrypted USB session; they are never uploaded to GitHub Pages or
another server.

### Phone session lifecycle

- Exactly one portal tab per browser profile may own the connection. A second
  tab reports that the portal is already active instead of competing for USB.
- The operating system's exclusive USB-interface claim prevents another
  browser or application from using the phone at the same time.
- Refresh, tab close, browser exit, cable removal, phone lock/background, idle
  timeout, cancellation, and explicit disconnect terminate the ephemeral
  session. Browser USB permission may remain granted, but session keys and
  clinical data do not.
- Reconnection is always operator initiated and requires a new matching code
  and phone approval. The portal never silently resumes a previous session,
  but it reuses an attached, previously granted accessory without requiring a
  cable replug or another browser chooser.
