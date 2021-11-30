import { config } from 'dotenv';
import path from 'path';

const envResult = config({
    path: path.resolve(__dirname, '../.env'),
});

if (envResult.error) {
    console.error(`[ERROR] env failed to load:${envResult.error}`);
}

export function requireFromEnv(key, alt) {
    if (!process.env[key] && typeof alt === 'undefined') {
        console.error(`[APP ERROR] Missing env variable:${key}`);

        return process.exit(1);
    }

    return process.env[key] ?? alt;
}

export const env = {
    API_ADDRESS: requireFromEnv('STATION_API', 'http://backend:8000/api'),
};
