dev:
	bun dev

api:
	node_modules/.bin/openapi-typescript ${VITE_API_SERVER_URL}/openapi.json --output src/utils/.openapi.ts
