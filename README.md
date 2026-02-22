This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Run frontend + json-server in development:

```bash
npm run dev
```

Frontend: [http://localhost:3000](http://localhost:3000)  
API (json-server): [http://localhost:3001](http://localhost:3001)

## Production / Deploy

In production app and `json-server` run in one process and one port.

```bash
npm run build
npm start
```

`npm start` launches `server.mjs`, which:
- serves Next.js pages
- proxies `/api/*` to internal `json-server` (from `db.json5`)
- uses `PORT` from environment (required by most hosting providers)

Optional env vars:
- `PORT` (default `3000`)
- `HOST` (default `0.0.0.0`)
- `JSON_DB_FILE` (default `db.json5`)

## Deploy on Render (single service)

Project is ready for Render Blueprint deploy with one web service:
- Next.js UI
- internal `json-server` under `/api/*`
- one external port (`PORT`, provided by Render)

Steps:
1. Push this repo to GitHub.
2. In Render create a new **Blueprint** and select this repo.
3. Render will read `render.yaml` automatically.
4. Deploy.

Main settings already declared in `render.yaml`:
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Node: `22.12.0`

After deploy:
- app: `https://<your-service>.onrender.com`
- api: `https://<your-service>.onrender.com/api/videos`

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
