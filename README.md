## Getting Started

First, run the development server:

```bash
bun run dev
```

Then, make sure you're listening to stripe webhook locally:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

Go to http://localhost:3000

## Deployment on Vercel
