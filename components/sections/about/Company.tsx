export default function Comapny(){
    return(
        <section className="relative bg-white text-black py-24 lg:py-32 overflow-hidden">
  {/* subtle pattern */}
  <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:40px_40px]" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
    <div className="max-w-3xl">
      <span className="inline-block px-4 py-1.5 bg-white border text-black text-sm font-semibold rounded-full mb-6">
        About Us
      </span>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        Professional Engineering Consultancy from{" "}
        <span className="text-primary">Nepal</span>
      </h1>

      <p className="text-black-300 text-lg lg:text-xl leading-relaxed">
        Kalpabrikshya Engineering Solutions Pvt. Ltd. is a Nepal-based professional
        engineering consultancy firm committed to delivering technically sound,
        sustainable, and future-ready solutions.
      </p>
    </div>
  </div>

  {/* Bottom Wave Divider */}
  <div className="absolute bottom-0 left-0 w-full leading-none">
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="w-full h-20 md:h-28 lg:h-32"
    >
      <path
        className="fill-green-300"
        d="M0,160L34.3,181.3C68.6,203,137,245,206,266.7C274.3,288,343,288,411,282.7C480,277,549,267,617,240C685.7,213,754,171,823,144C891.4,117,960,107,1029,90.7C1097.1,75,1166,53,1234,58.7C1302.9,64,1371,96,1406,112L1440,128L1440,320L0,320Z"
      />
    </svg>
  </div>
</section>
    )
}