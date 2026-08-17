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
