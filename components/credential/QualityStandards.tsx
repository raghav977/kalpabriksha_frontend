import { CheckCircle2, Layers, Target } from "lucide-react"

const qualityFramework = [
  {
    title: "Technical Accuracy",
    description:
      "Engineering validation, multi-stage review, hydraulic modeling precision, and compliance verification across every deliverable.",
  },
  {
    title: "Regulatory Alignment",
    description:
      "Strict adherence to Government of Nepal regulations, licensing procedures, grid connection standards, and PPA documentation requirements.",
  },
  {
    title: "Financial Bankability",
    description: "Documentation, projections, and compliance structured to meet lender and investor scrutiny standards.",
  },
]

const engineeringAlignment = [
  "International hydropower engineering principles",
  "Sustainable river basin management guidelines",
  "Environmental and social safeguard compliance",
  "Structured documentation & audit traceability",
]

const implementationChecklist = [
  "Multi-level technical review",
  "Survey data validation process",
  "Hydrological risk assessment",
  "Energy yield modeling verification",
  "Grid compliance assessment",
  "Structured PPA documentation process",
]

const complianceStandards = [
  "Company registration & legal compliance",
  "VAT & financial reporting compliance",
  "Contractual documentation control",
  "Confidential data handling protocol",
  "Professional engagement records",
]

const riskMeasures = [
  "Engineering review checkpoints",
  "Regulatory submission tracking",
  "Documentation cross-verification",
  "Stakeholder communication records",
  "Engagement milestone control",
]

const sustainability = [
  "Environmentally responsible hydropower development",
  "Community-aligned infrastructure planning",
  "Long-term operational sustainability",
  "Ethical engineering practices",
]

const continuousImprovement = [
  "Technical research",
  "Engineering knowledge updates",
  "Energy sector regulatory reviews",
  "International collaboration and conferences",
]

export function QualityStandards() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">Quality & Standards</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Engineering Excellence. Compliance. Global Discipline.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Quality is embedded into every phase of our workflow—from feasibility studies to financial closure—
            ensuring reliability, sustainability, and bankability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {qualityFramework.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Layers className="h-10 w-10 text-yellow-500" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">Engineering & Technical Alignment</h3>
            <p className="mt-2 text-sm text-slate-600">Our consulting approach aligns with:</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {engineeringAlignment.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-yellow-500" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm font-semibold text-slate-900">We implement:</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {implementationChecklist.map((item) => (
                <div key={item} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Compliance & Governance Standards</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {complianceStandards.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Target className="mt-0.5 h-4 w-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Risk & Quality Assurance</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {riskMeasures.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Target className="mt-0.5 h-4 w-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Sustainability Commitment</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {sustainability.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Continuous Improvement</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {continuousImprovement.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-yellow-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
