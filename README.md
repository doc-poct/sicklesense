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

The **Phone Results** entry only launches the locally installed signed Windows
bridge through `sicklesense://results` and discovers its MSI from immutable
`bridge-vMAJOR.MINOR.PATCH` releases. Clinical data and the results portal never
pass through or execute on GitHub Pages.
