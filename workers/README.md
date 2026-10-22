# Per-Store Cloudflare Workers

Each worker acts as an edge proxy for a store:
- `/api/*` requests return store-specific JSON
- All other requests are forwarded to the main Sufi Pages URL

## Deploy

```bash
# Install wrangler if needed
npm install -g wrangler

# Deploy each store
wrangler deploy workers/grocery.js --name freshmart-store
wrangler deploy workers/electronics.js --name techhub-store
wrangler deploy workers/fashion.js --name styleco-store
```

After deploy, your stores will be available at:
- https://freshmart-store.<your-subdomain>.workers.dev
- https://techhub-store.<your-subdomain>.workers.dev
- https://styleco-store.<your-subdomain>.workers.dev

Update `ORIGIN` in each worker file if your main Pages URL changes.