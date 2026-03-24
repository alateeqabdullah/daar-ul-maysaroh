import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/dashboard',
               
               '/api',
                '/login',
                '/register',
                '/password-reset',
                '/thank-you',
                '/404',
                '/500',
                
            ]
        },
        sitemap: 'https://almaysaroh.com/sitemap.xml',
    };
}
