import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/dashboard',
                '/settings',
                '/profile',
                '/api',
                '/login',
                '/register',
                '/password-reset',
                '/account',
                '/orders',
                '/cart',
                '/checkout',
                '/thank-you',
                '/404',
                '/500',
                
            ]
        },
        sitemap: 'https://almaysaroh.com/sitemap.xml',
    };
}
