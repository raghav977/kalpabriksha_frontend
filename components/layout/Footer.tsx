'use client';

import Link from "next/link"
import { siteConfig } from "@/config/siteConfig"
import { Mail, Phone, MapPin } from "lucide-react"
import { useServices } from "@/hooks/api/useServices"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"
import { useMemo } from "react"

// Static nav links (rarely change)
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Research", href: "/research" },
  { name: "Careers", href: "/careers" },
  { name: "Connect", href: "/contact" },
  { name: "Global Vision", href: "/vision" }
];

// Fallback contact info
const fallbackContact = {
  address: "Putalisadak, Kathmandu, Nepal",
  phones: ["+977-9851328965", "+977-9851444045"] as string[],
  email: "nexus@consultkes.com"
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  // Fetch services from API
  const { data: services = [] } = useServices(true);
  
  // Fetch site config from API
  const { data: configData = [] } = usePublicSiteConfig();
  
  // Parse config data into usable format
  const contact = useMemo((): { address: string; phones: string[]; email: string } => {
    if (!configData || configData.length === 0) return fallbackContact;
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    return {
      address: configMap['contact_address'] || fallbackContact.address,
      phones: configMap['contact_phones'] 
        ? JSON.parse(configMap['contact_phones']) 
        : fallbackContact.phones,
      email: configMap['contact_email'] || fallbackContact.email
    };
  }, [configData]);

  // Use top 5 services
  const topServices = services.slice(0, 5);

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Company Info */}
          <div>
            <h3 className="text-foreground font-bold text-xl mb-4">
              {siteConfig.shortName}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="text-primary font-medium text-sm italic">
              "{siteConfig.motto}"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {topServices.length > 0 ? (
                topServices.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services#${service.slug || service.id}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback loading state
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
                ))
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {contact.address}
                </span>
              </li>

              {contact.phones.map((phone, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`tel:${phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center sm:text-left">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-slate-500 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-500 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}
