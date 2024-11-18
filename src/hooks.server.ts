import type { Handle } from '@sveltejs/kit';

function generateNonce() {
    return crypto.randomUUID();
}

export const handle: Handle = async ({ event, resolve }) => {
    const nonce = generateNonce();
    event.locals.nonce = nonce;

    const cspDirectives = {
        'default-src': ["'self'"],
        'script-src': [
            "'self'",
            `'nonce-${nonce}'`,
            "https://www.googletagmanager.com",
            "https://www.google-analytics.com"
        ],
        'img-src': [
            "'self'",
            "https://www.google-analytics.com"
        ],
        'connect-src': [
            "'self'",
            "https://www.google-analytics.com"
        ],
    };

    const cspString = Object.entries(cspDirectives)
        .map(([key, values]) => `${key} ${values.join(' ')}`)
        .join('; ');

    const response = await resolve(event);
    response.headers.set('Content-Security-Policy', cspString);
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
};
