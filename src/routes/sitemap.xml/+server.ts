import type { RequestHandler } from "@sveltejs/kit";

import { fetchArticles } from "$lib/services/article.service";

export const GET: RequestHandler = async ({ request }) => {
    const baseURL = request.headers.get('host')
    const articles = await fetchArticles()

    console.log(articles)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseURL}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>

        ${articles.map(article => `
            <url>
                <loc>${baseURL}/${article.slug}</loc>
                <lastmod>${new Date(article.updatedAt).toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.8</priority>
            </url>
        `).join('')}

        <url>
            <loc>${baseURL}/article-review</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
        </url>

        <url>
            <loc>${baseURL}/privacy-notice</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>yearly</changefreq>
            <priority>0.3</priority>
        </url>
    </urlset>`

    return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}
