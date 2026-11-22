# Nytrix website

Public website, documentation, privacy notice and terms for the independent Nytrix launcher.

- Live on Cloudflare: https://nytrix.fangiodehullu.workers.dev
- GitHub Pages mirror: https://fangioproyt.github.io/nytrix-website/
- Launcher and corresponding source: https://github.com/FangioproYT/nytrix-website/releases/tag/launcher-v0.1.0

The native Cloudflare repository connection is enabled for `main`. A production
build and deployment from this GitHub repository completed successfully.

## Development

Requires Node.js 22 or newer. There are no third-party runtime or build dependencies.

```text
npm run build
npm test
npm run dev
```

Preview: `http://127.0.0.1:4178`.

Edit content in `src/content.mjs`, presentation in `scripts/build.mjs` and
`public/assets/style.css`, and project/contact/domain settings in `site.config.json`.

## Publishing

- GitHub Pages builds `main` using `.github/workflows/pages.yml`.
- Cloudflare serves the same generated pages through the small ES module
  `dist/worker.mjs`, without a database, account backend or external fonts.
- Native Cloudflare Workers Builds should connect this repository's `main` branch,
  run `npm run build && npm test`, then `npm run deploy:cloudflare`.
- The deploy script reads `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from
  the Cloudflare build environment. Never commit API tokens.
- Configuration and privacy pages disclose sampled Cloudflare diagnostics;
  query-string redaction is enabled.

Downloads point to the GitHub release `launcher-v0.1.0`, with both the installer
and its complete corresponding source archive. Updating the launcher requires
updating the artifact, source, version and SHA-256 together.

## Domain and contact

Update `canonicalUrl` and `contactEmail` when the project domain and a working
public mailbox are available. Do not invent a mailbox or publish an account's
private email address. The project owner chose the public project name Nytrix.

The privacy text describes the current implementation. Revisit it when adding
analytics, forms, accounts, telemetry, new hosting services or new mod behavior.
Mandatory consumer and privacy rights and the component licenses remain applicable.

Nytrix is not an official Minecraft product and is not associated with Mojang,
Microsoft or Meteor Development. The illustration and Nytrix artwork are original
project assets. See LICENSE for the website code.
