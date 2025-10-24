import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'EasyRxCycle - Medical Waste Disposal Mail-Back Solutions',
  description = 'Safe, compliant medical waste disposal for sharps, biohazard, trace chemo, pharmaceutical, and medical waste. EPA, OSHA, and DOT compliant. Free shipping on orders over $50.',
  keywords = 'sharps disposal, medical waste, biohazard waste, pharmaceutical waste, trace chemotherapy, mail-back disposal, OSHA compliant, EPA compliant, DEA compliant',
  image = 'https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = 'https://easyrxcycle.com'
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ];

    metaTags.forEach(tag => {
      const key = tag.name || tag.property;
      const attr = tag.name ? 'name' : 'property';
      let element = document.querySelector(`meta[${attr}="${key}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key!);
        document.head.appendChild(element);
      }

      element.setAttribute('content', tag.content);
    });
  }, [title, description, keywords, image, url]);

  return null;
}
