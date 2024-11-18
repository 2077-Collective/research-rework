declare let darkMode: boolean;

/**
 * SvelteKit App namespace augmentation
 */
declare namespace App {
    /**
     * Server-side locals interface
     * @property nonce - Cryptographic nonce used for Content Security Policy.
     *                   Required for securing inline scripts (e.g., Google Analytics).
     */
    interface Locals {
        nonce: string;
    }
}
