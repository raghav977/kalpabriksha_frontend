import { FileText, Stamp, Briefcase } from "lucide-react"

const credentials = [
  {
    title: "Certificate of Incorporation",
    issuer: "Office of the Company Registrar, Government of Nepal",
    details: [
      "Registration No: 327619/080/081",
      "Date of Incorporation: 21 January 2024",
    ],
    button: {
      label: "View Certificate",
      href: "/companyregisteration.pdf",
    },
    icon: FileText,
  },
  {
    title: "PAN / VAT Registration",
    issuer: "Inland Revenue Department",
    details: ["VAT No: 619851097"],
    button: {
      label: "View VAT Certificate",
      href: "/VAT-KALPABRIKSHYA.pdf",
    },
    icon: Stamp,
  },
  // {
  //   title: "Professional Engagement Documentation",
  //   issuer: "Lead Consultant Appointment",
  //   details: [
  //     "Project: Lower Khadam Khola Small Hydropower Project (0.93 MW)",
  //     "Client: Unity Power Plus Pvt. Ltd.",
  //   ],
  //   button: {
  //     label: "View Engagement Confirmation",
  //     href: "/docs/engagement-confirmation.pdf",
  //   },
  //   icon: Briefcase,
  // },
]

export function GovernanceCredentials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            Governance Records
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Corporate Credentials & Compliance
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Professional documentation ready for institutional verification and lender due diligence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 ">
          {credentials.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="group flex flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500">Issued by: {item.issuer}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a
                  href={item.button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {item.button.label}
                </a>
              </div>
            )
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white/70 p-6 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Important Disclaimer</p>
          <p className="mt-2">
            This document is displayed for public reference to confirm professional engagement. Detailed contractual clauses,
            financial terms, and annexures remain confidential and are available only under formal request and non-disclosure agreement.
          </p>
        </div>
      </div>
    </section>
  )
}
