import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://drwskincarebanyuwangi.vercel.app';
  
  // Static pages
  const staticPages = [
    '',
    '/product',
    '/treatment',
  ];

  // Get product slugs dynamically
  const productSlugs: string[] = [];
  try {
    const response = await fetch(`${baseUrl}/api/products`);
    const result = await response.json();
    if (result.success) {
      result.data.forEach((product: any) => {
        if (product.slug) {
          productSlugs.push(`/product/${product.slug}`);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  const allPages = [...staticPages, ...productSlugs];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages
  .map((page) => {
    const priority = page === '' ? '1.0' : page.includes('/product/') ? '0.8' : '0.9';
    const changefreq = page === '' ? 'daily' : page.includes('/product/') ? 'weekly' : 'weekly';
    
    return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}