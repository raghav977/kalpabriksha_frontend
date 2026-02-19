"use client"
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Handshake, MessageCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense, useMemo } from "react"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"

// Fallback contact info
const fallbackContact = {
  address: "Putalisadak, Kathmandu, Nepal",
  phones: ["+977-9851328965", "+977-9851444045"] as string[],
  email: "nexus@consultkes.com",
  partnerEmail: "partnerwithkes@connectkes.com",
  consultEmail: "nexus@consultkes.com"
};

const fallbackSocial = {
  linkedin: "#",
  facebook: "#"
};

function ContactFormContent() {
  const searchParams = useSearchParams()
  const [formType, setFormType] = useState<"partner" | "consult">("consult")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    subject: "",
    message: ""
  })
  
  // Fetch site config from API
  const { data: configData = [] } = usePublicSiteConfig();
  
  // Parse config data into usable format
  const contact = useMemo((): typeof fallbackContact => {
    if (!configData || configData.length === 0) return fallbackContact;
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    let phones: string[] = fallbackContact.phones;
    if (configMap['contact_phones']) {
      try {
        phones = JSON.parse(configMap['contact_phones']);
      } catch {
        phones = fallbackContact.phones;
      }
    }
    
    return {
      address: configMap['contact_address'] || fallbackContact.address,
      phones,
      email: configMap['contact_email'] || fallbackContact.email,
      partnerEmail: configMap['contact_partner_email'] || fallbackContact.partnerEmail,
      consultEmail: configMap['contact_consult_email'] || fallbackContact.consultEmail
    };
  }, [configData]);
  
  const social = useMemo((): typeof fallbackSocial => {
    if (!configData || configData.length === 0) return fallbackSocial;
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    return {
      linkedin: configMap['social_linkedin'] || fallbackSocial.linkedin,
      facebook: configMap['social_facebook'] || fallbackSocial.facebook
    };
  }, [configData]);

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "partner") {
      setFormType("partner")
    } else {
      setFormType("consult")
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: `${formType === "partner" ? "Partnership" : "Consultation"}: ${formData.subject}`,
          message: formData.message,
          type: formType === "partner" ? "partnership" : "consultation"
        })
      });
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", organization: "", subject: "", message: "" })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Failed to submit form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Office",
      content: contact.address,
      link: null as string | null
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      content: contact.phones.join(" | "),
      link: `tel:${contact.phones[0]}`
    },
    {
      icon: Mail,
      title: "Email Address",
      content: contact.email,
      link: `mailto:${contact.email}`
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Sunday - Friday: 9:00 AM - 6:00 PM",
      link: null as string | null
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div>
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
              Connect With Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Whether you&apos;re looking for expert consultancy in hydropower, solar energy, 
              or infrastructure development, our team is ready to assist you with tailored solutions.
            </p>

            <div className="space-y-6">
              {contactDetails.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-slate-600 hover:text-yellow-600 transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-slate-600">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Emails */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Direct Contact</h3>
              <div className="space-y-3">
                <a 
                  href={`mailto:${contact.partnerEmail}`}
                  className="flex items-center gap-3 text-slate-600 hover:text-yellow-600 transition-colors"
                >
                  <Handshake className="w-5 h-5" />
                  <span>Partnership Inquiries: <strong>{contact.partnerEmail}</strong></span>
                </a>
                <a 
                  href={`mailto:${contact.consultEmail}`}
                  className="flex items-center gap-3 text-slate-600 hover:text-yellow-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Consultation Requests: <strong>{contact.consultEmail}</strong></span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-900 hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors" />
                </a>
                <a 
                  href={social.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-900 hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
            {/* Form Type Selector */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                onClick={() => setFormType("partner")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  formType === "partner" 
                    ? "bg-yellow-400 text-slate-900" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Handshake className="w-5 h-5" />
                Partner With Us
              </button>
              <button
                type="button"
                onClick={() => setFormType("consult")}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  formType === "consult" 
                    ? "bg-yellow-400 text-slate-900" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                Consult With Us
              </button>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {formType === "partner" ? "Partnership Inquiry" : "Consultation Request"}
            </h3>
            <p className="text-slate-600 mb-8">
              {formType === "partner" 
                ? "Interested in partnering with us? Let's explore collaboration opportunities."
                : "Need expert engineering consultancy? Share your project details with us."
              }
            </p>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {formType === "partner" ? "Organization" : "Phone Number"}
                    </label>
                    <input
                      type={formType === "partner" ? "text" : "tel"}
                      name={formType === "partner" ? "organization" : "phone"}
                      value={formType === "partner" ? formData.organization : formData.phone}
                      onChange={handleInputChange}
                      placeholder={formType === "partner" ? "Your Company/Organization" : "+977-98XXXXXXXX"}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {formType === "partner" ? "Partnership Type *" : "Service Required *"}
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                      required
                    >
                      <option value="">Select an option</option>
                      {formType === "partner" ? (
                        <>
                          <option value="joint-venture">Joint Venture</option>
                          <option value="research-collaboration">Research Collaboration</option>
                          <option value="technical-partnership">Technical Partnership</option>
                          <option value="investment">Investment Opportunity</option>
                          <option value="other">Other</option>
                        </>
                      ) : (
                        <>
                          <option value="hydropower">Hydropower Consultancy</option>
                          <option value="solar">Solar Energy Projects</option>
                          <option value="geology">Geology & Geotechnical</option>
                          <option value="gis">GIS & Spatial Analysis</option>
                          <option value="cfd">CFD & Simulation</option>
                          <option value="survey">Survey Services</option>
                          <option value="other">Other Inquiry</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder={
                      formType === "partner" 
                        ? "Tell us about your organization and partnership interests..."
                        : "Tell us about your project or inquiry..."
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : formType === "partner" ? (
                    <>
                      <Handshake className="w-5 h-5" />
                      Submit Partnership Inquiry
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Request Consultation
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContactInfo() {
  return (
    <Suspense fallback={<div className="py-20 bg-slate-50 animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-96 bg-slate-200 rounded-2xl" /></div></div>}>
      <ContactFormContent />
    </Suspense>
  )
}
