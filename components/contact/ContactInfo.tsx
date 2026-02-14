"use client"
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Handshake, MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

function ContactFormContent() {
  const searchParams = useSearchParams()
  const [formType, setFormType] = useState<"partner" | "consult">("consult")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const type = searchParams.get("type")
    if (type === "partner") {
      setFormType("partner")
    } else {
      setFormType("consult")
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form would submit to appropriate email based on formType
    // partner → partner@consultkes.com
    // consult → consult@consultkes.com
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: "Our Office",
      content: siteConfig.contact.address,
      link: null
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      content: siteConfig.contact.phones.join(" | "),
      link: `tel:${siteConfig.contact.phones[0]}`
    },
    {
      icon: Mail,
      title: "Email Address",
      content: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Sunday - Friday: 9:00 AM - 6:00 PM",
      link: null
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
                  href={`mailto:${siteConfig.contact.partnerEmail}`}
                  className="flex items-center gap-3 text-slate-600 hover:text-yellow-600 transition-colors"
                >
                  <Handshake className="w-5 h-5" />
                  <span>Partnership Inquiries: <strong>{siteConfig.contact.partnerEmail}</strong></span>
                </a>
                <a 
                  href={`mailto:${siteConfig.contact.consultEmail}`}
                  className="flex items-center gap-3 text-slate-600 hover:text-yellow-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Consultation Requests: <strong>{siteConfig.contact.consultEmail}</strong></span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a 
                  href={siteConfig.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-900 hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors" />
                </a>
                <a 
                  href={siteConfig.social.facebook} 
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
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600">We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="formType" value={formType} />
                <input 
                  type="hidden" 
                  name="toEmail" 
                  value={formType === "partner" ? siteConfig.contact.partnerEmail : siteConfig.contact.consultEmail} 
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30 flex items-center justify-center gap-2"
                >
                  {formType === "partner" ? (
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
