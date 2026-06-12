export function ProductsJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Epic Legends Products',
    description:
      'Premium spices and agricultural products catalog from Epic Legends',
    url: 'https://epiclegends.com/products',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'Product',
          position: 1,
          name: 'Turmeric Powder',
          description: 'Pure organic turmeric powder from Telangana',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '5',
            highPrice: '8',
          },
        },
        {
          '@type': 'Product',
          position: 2,
          name: 'Black Pepper',
          description: 'Grade A black pepper from Kerala',
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '8',
            highPrice: '12',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Epic Legends',
    description: 'Global spice and agricultural product exporter from India',
    url: 'https://epiclegends.com',
    logo: 'https://epiclegends.com/logo.png',
    sameAs: [
      'https://www.facebook.com/epiclegends',
      'https://twitter.com/epiclegends',
      'https://www.linkedin.com/company/epiclegends',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      email: 'sales@epiclegends.com',
    },
    areaServed: 'Worldwide',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Epic Legends',
    image: 'https://epiclegends.com/logo.png',
    description: 'Premium spices and agricultural product exporter',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
    email: 'contact@epiclegends.com',
    areaServed: 'Worldwide',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
