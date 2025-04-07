// lib/sitemap.ts
import { format } from 'date-fns';

const DOMAIN = `${process.env.BASE_URL}`; // Replace with your domain

interface BlogPost {
  slug: string;
  updatedAt: string;
}

export const generateSitemap = (posts: BlogPost[]) => {
  const pages = posts
    .map((post) => {
      const url = `${DOMAIN}/${post.slug}`;
      const lastMod = format(new Date(post.updatedAt), 'yyyy-MM-dd');
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastMod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.5</priority>
        </url>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${process.env.BASE_URL}</loc>
          <lastmod>${format(new Date(), 'yyyy-MM-dd')}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1</priority>
        </url>
      ${pages}
    </urlset>`;
};
