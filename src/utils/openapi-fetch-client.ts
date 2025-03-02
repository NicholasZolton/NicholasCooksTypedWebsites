import createClient, { Middleware, Client } from "openapi-fetch";
import type { paths } from "./.openapi";
import { createImmutableHook, createInfiniteHook, createMutateHook, createQueryHook } from "swr-openapi";
import { isMatch } from "lodash";

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;
export const client = buildClient();
export const useQuery = createQueryHook(client, API_SERVER_URL);
export const useImmutable = createImmutableHook(client, API_SERVER_URL);
export const useInfinite = createInfiniteHook(client, API_SERVER_URL);
export const useMutate = createMutateHook(client, API_SERVER_URL, isMatch);

function buildClient(): Client<paths> {
    let clientToBuild: Client<paths> = createClient<paths>({ baseUrl: API_SERVER_URL });
    let cloneResponseMiddleware: Middleware = {
        async onRequest({ request, options }) {
            return request.clone();
        },
    }
    clientToBuild.use(cloneResponseMiddleware);
    return buildClient as unknown as Client<paths>;
}

export function addAuthMiddleware(token: string) {
    let myMiddleware: Middleware = {
        async onRequest({ request, options }) {
            request.headers.set("Authorization", "Bearer " + token);
            return request;
        },
    }
    client.use(myMiddleware);
};


