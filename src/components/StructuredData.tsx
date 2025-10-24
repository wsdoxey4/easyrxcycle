import { useEffect } from 'react';
import { Product } from '../types';

interface StructuredDataProps {
  products?: Product[];
}

export default function StructuredData({ products }: StructuredDataProps) {
  useEffect(() => {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'EasyRxCycle',
      url: 'https://easyrxcycle.com',
      logo: 'https://easyrxcycle.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-501-904-2929',
        contactType: 'Customer Service',
        email: 'info@easyrxcycle.com',
        areaServed: 'US',
        availableLanguage: 'English'
      },
      sameAs: []
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EasyRxCycle',
      url: 'https://easyrxcycle.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://easyrxcycle.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };

    const productSchemas = products?.map(product => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.short_description,
      image: product.image_urls,
      brand: {
        '@type': 'Brand',
        name: product.brand
      },
      gtin: product.gtin,
      mpn: product.mpn,
      sku: product.sku,
      offers: {
        '@type': 'Offer',
        url: `https://easyrxcycle.com/products/${product.slug}`,
        priceCurrency: 'USD',
        price: product.price,
        availability: product.inventory_quantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'EasyRxCycle'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127'
      }
    })) || [];

    const allSchemas = [organizationSchema, websiteSchema, ...productSchemas];

    let scriptElement = document.getElementById('structured-data');
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'structured-data';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(allSchemas);

    return () => {
      const element = document.getElementById('structured-data');
      if (element) {
        element.remove();
      }
    };
  }, [products]);

  return null;
}
