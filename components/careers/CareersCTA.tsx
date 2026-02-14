"use client"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"

export default function CareersCTA() {
  return (
    <section id="apply" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">
              READY TO JOIN?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
              Let&apos;s Build Your
              <span className="text-yellow-500"> Future Together</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Send us your CV and cover letter. We&apos;re always looking for talented 
              individuals who share our passion for engineering excellence and sustainable development.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email your application to</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-white font-semibold hover:text-yellow-500 transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Call us for inquiries</p>
                  <a href={`tel:${siteConfig.contact.phones[0]}`} className="text-white font-semibold hover:text-yellow-500 transition-colors">
                    {siteConfig.contact.phones[0]}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Visit our office</p>
                  <p className="text-white font-semibold">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Application Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Application</h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+977-XXXXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Position Applying For *
                </label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Select a position</option>
                  <option value="hydropower-engineer">Hydropower Design Engineer</option>
                  <option value="geotechnical-engineer">Engineering Geologist / Geotechnical Engineer</option>
                  <option value="solar-engineer">Solar Energy Systems Engineer</option>
                  <option value="graduate-trainee">Graduate Engineer Trainee</option>
                  <option value="internship">Internship</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cover Letter / Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself and why you want to join..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload CV/Resume
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="cv-upload" accept=".pdf,.doc,.docx" />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <div className="text-slate-400">
                      <p className="font-medium">Click to upload or drag and drop</p>
                      <p className="text-sm">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
              >
                <Send className="w-5 h-5" />
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
