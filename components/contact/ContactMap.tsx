"use client"
import { MapPin } from "lucide-react"

export function ContactMap() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Our Location
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Find Us on the Map
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Visit our office in the heart of Kathmandu for in-person consultations.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          {/* Map Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.399486003494!2d85.3234593!3d27.7049494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198222ac83e3%3A0x6210dde422c45189!2sNEO%20VALLEY%20EDUCATION!5e0!3m2!1sne!2snp!4v1771044633244!5m2!1sne!2snp"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />

          {/* Location Badge */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Kalpabrikshya Engineering</h4>
              <p className="text-slate-600 text-sm">Putalisadak, Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
