# Deployment

This project is a Next.js application with API routes and middleware, so it should be deployed as a Node.js server, not as static files.

## Current State

The app can be deployed without an external backend. Current frontend requests use local Next.js API routes such as `/api/auth/login`, `/api/user`, and `/api/notifications`.

When the external backend is ready, keep browser requests pointed at `/api/...` and proxy from Next.js API routes to `BACKEND_URL`.

## Docker

Build the production image:

```bash
docker build -t vegvision .
```

Run it locally:

```bash
docker run --rm -p 8080:8080 --env-file .env.example vegvision
```

Open:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/api/health
```

## Yandex Cloud

Recommended target: Yandex Serverless Containers.

1. Create a Container Registry.
2. Build and push the Docker image to the registry.
3. Create a Serverless Container from the pushed image.
4. Set container port to `8080`.
5. Enable public access if the site should be available from the internet.
6. Add environment variables when needed:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.ru
BACKEND_URL=https://api.your-domain.ru
```

`BACKEND_URL` is not required while mocked API routes are used.

## API Gateway

Use `gateway.example.yaml` as the safe template for Yandex API Gateway.

Create a local `gateway.yaml` from it and replace:

```yaml
container_id: your-container-id
service_account_id: your-service-account-id
```

The local `gateway.yaml` is ignored by git because it contains real cloud resource ids.

Create the gateway:

```bash
yc serverless api-gateway create --name vegvision-gateway --spec gateway.yaml
```

Update it after changes:

```bash
yc serverless api-gateway update vegvision-gateway --spec gateway.yaml
```

## Cloud Functions

Cloud Functions are not required for the current architecture. The Next.js app already contains API routes and middleware, so splitting them into separate functions would add complexity without benefit at this stage.
