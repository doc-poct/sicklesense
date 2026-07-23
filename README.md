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
