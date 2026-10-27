import { brand, services } from "@/lib/brand";

export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand.name,
      url: brand.url,
      logo: `${brand.url}/icon.svg`,
      email: brand.email,
      telephone: brand.phone,
      address: { "@type": "PostalAddress", streetAddress: brand.address },
      sameAs: brand.socials.map((s) => s.href),
    },
    ...services.map((s) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      description: s.long,
      provider: { "@type": "Organization", name: brand.name },
      serviceType: s.title,
      url: `${brand.url}/services#${s.id}`,
    })),
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
