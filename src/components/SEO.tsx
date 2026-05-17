import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Ocean View Ryukyu Tower - 沖縄オーシャンビュー民泊 | 東海岸の激安一人旅に最適',
  description = '沖縄東海岸の絶景オーシャンビュー民泊。斎場御嶽近く、釣りスポットも充実。一人旅から家族旅行まで、激安価格でご提供。与那原町の快適な宿泊施設。',
  keywords = [
    '沖縄',
    'オーシャンビュー',
    '釣り',
    '東海岸',
    '斎場御嶽',
    '激安',
    '一人旅',
    '民泊',
    '与那原',
    '沖縄民泊',
    '沖縄宿泊',
    '沖縄旅行',
    '沖縄観光',
    '海が見える宿',
    '格安民泊',
    'バケーションレンタル',
    '沖縄南部',
    '絶景',
    'プライベート',
    'リゾート'
  ],
  image = 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=1200',
  url = 'https://okinawa-yonabal.com',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // タイトルの設定
    document.title = title;

    // メタタグの設定
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords.join(', ') },
      { name: 'author', content: 'Ocean View Ryukyu Tower' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      
      // Open Graph (Facebook, LinkedIn等)
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Ocean View Ryukyu Tower 沖縄民泊' },
      { property: 'og:locale', content: 'ja_JP' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // 地域情報
      { name: 'geo.region', content: 'JP-47' },
      { name: 'geo.placename', content: '沖縄県与那原町' },
      { name: 'geo.position', content: '26.1975;127.7575' },
      { name: 'ICBM', content: '26.1975, 127.7575' }
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;
      
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    // 構造化データ (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Ocean View Ryukyu Tower 沖縄オーシャンビュー民泊',
      description: description,
      image: image,
      url: url,
      telephone: '+81-6-6130-4050',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '東浜4-3',
        addressLocality: '与那原町',
        addressRegion: '沖縄県',
        postalCode: '901-1303',
        addressCountry: 'JP'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.1975,
        longitude: 127.7575
      },
      priceRange: '¥¥',
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'オーシャンビュー' },
        { '@type': 'LocationFeatureSpecification', name: '釣りスポット近く' },
        { '@type': 'LocationFeatureSpecification', name: '斎場御嶽アクセス良好' },
        { '@type': 'LocationFeatureSpecification', name: 'WiFi完備' },
        { '@type': 'LocationFeatureSpecification', name: '駐車場あり' }
      ],
      starRating: {
        '@type': 'Rating',
        ratingValue: '4.8',
        bestRating: '5'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127'
      }
    };

    let scriptElement = document.getElementById('structured-data') as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = 'structured-data';
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(structuredData);

    // Canonical URL
    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', url);

  }, [title, description, keywords, image, url, type]);

  return null;
}
