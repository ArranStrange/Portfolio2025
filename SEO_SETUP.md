# SEO Setup Documentation

## Overview

This portfolio site has been optimized for search engines with comprehensive SEO implementation using react-helmet-async.

## Features Implemented

### 1. Meta Tags & Open Graph

- Dynamic title and description for each page
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URLs
- Language and locale settings

### 2. Structured Data (JSON-LD)

- Person schema for author information
- WebSite schema for site metadata
- Article schema for blog posts
- CreativeWork schema for projects

### 3. Technical SEO

- Sitemap.xml for search engine indexing
- Robots.txt for crawling instructions
- Web app manifest for PWA capabilities
- Browser configuration for Windows tiles

### 4. Performance Optimization

- Critical resource preloading
- Performance monitoring
- Lazy loading utilities
- Analytics tracking

## Files Added/Modified

### New Files

- `src/components/SEO.tsx` - Main SEO component
- `src/components/Analytics.tsx` - Analytics tracking
- `src/components/OGImage.tsx` - Social media image generator
- `src/utils/seo.ts` - SEO utilities and performance monitoring
- `public/sitemap.xml` - Search engine sitemap
- `public/robots.txt` - Crawling instructions
- `public/site.webmanifest` - PWA manifest
- `public/browserconfig.xml` - Windows tile configuration

### Modified Files

- `src/App.tsx` - Added HelmetProvider and Analytics
- `src/main.tsx` - Added performance monitoring
- `src/pages/*.tsx` - Added SEO components to all pages
- `index.html` - Updated favicon and basic meta tags

## Usage

### Basic SEO Component

```tsx
import SEO from "../components/SEO";

<SEO
  title="Page Title"
  description="Page description"
  keywords="relevant, keywords"
  type="website"
/>;
```

### Analytics Tracking

The Analytics component automatically tracks page views. For custom events:

```tsx
import { trackEvent } from "../utils/seo";

trackEvent("button_click", { button_name: "contact" });
```

## Configuration

### Update Site URL

In `src/components/SEO.tsx`, update the `defaultSEO.url` to your actual domain.

### Analytics Setup

1. For Google Analytics: Add your GA4 measurement ID to `src/utils/seo.ts`
2. For Plausible: Add the Plausible script to `index.html`

### Social Media Images

Generate OG images using the OGImage component and save them to `/public/` as:

- `og-image.png` (1200x630px)
- `apple-touch-icon.png` (180x180px)
- `favicon-32x32.png` (32x32px)
- `favicon-16x16.png` (16x16px)

## Performance Monitoring

The site includes automatic performance monitoring that tracks:

- Page load times
- DOM content loaded times
- Total page load duration

Performance metrics are logged to console and can be sent to analytics services.

## Next Steps

1. **Generate OG Images**: Create social media preview images using the OGImage component
2. **Set up Analytics**: Configure Google Analytics or Plausible
3. **Update URLs**: Replace placeholder URLs with actual domain
4. **Test SEO**: Use tools like Google Search Console and Lighthouse
5. **Monitor Performance**: Check Core Web Vitals in Google Search Console

## SEO Checklist

- [x] Meta tags for all pages
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Structured data (JSON-LD)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Favicon and app icons
- [x] Web app manifest
- [x] Performance monitoring
- [x] Analytics tracking
- [ ] OG images (TODO: generate)
- [ ] Analytics configuration (TODO: add IDs)
- [ ] Domain configuration (TODO: update URLs)
