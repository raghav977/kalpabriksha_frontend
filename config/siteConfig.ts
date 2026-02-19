export const siteConfig = {
  name: "Kalpabrikshya Engineering Solutions",
  shortName: "KES",
  description: "Nepal-based professional engineering consultancy firm delivering technically sound, sustainable, and future-ready solutions in hydropower and solar energy.",
  motto: "Leading with excellence, Rising with vision",
  domain: "www.consultkes.com.np",
  
  contact: {
    address: "Putalisadak, Kathmandu, Nepal",
    phones: ["+977-9851328965", "+977-9851444045"],
    email: "nexus@consultkes.com",
    partnerEmail: "partnerwithkes@connectkes.com",
    consultEmail: "nexus@consultkes.com",
  },

  social: {
    linkedin: "#",
    facebook: "#",
  },

  team: [
    {
      name: "Manoj Bhattarai",
      position: "Founder managing director",
      email: "m.bhattarai@connectkes.com",
      linkedin: "#",
      image: "/founder.jpg"
    },
    {
      name: "Nabin Gautam",
      position: "Senior Hydropower Engineer",
      email: "n.gautam@connectkes.com",
      linkedin: "#",
      image: "/nabingautamsenior.jpeg"
    },
    {
      name: "Nirajan Ojha",
      position: "Senior Hydrogeologist and Research Coordinator",
      email: "n.ojha@connectkes.com",
      linkedin: "#",
      image: "/nirajanojha.jpeg"
    }
  ],

  founder: {
    name: "Manoj Bhattarai",
    title: "Founder & Managing Director",
    message: `At Kalpabrikshya Engineering Solutions, our journey began with a clear purpose: to contribute meaningfully to Nepal's infrastructure and energy development while building a consultancy capable of competing at the international level.

Nepal holds immense potential in hydropower and renewable energy. Our responsibility as engineers is not only to harness this potential but to do so with technical excellence, environmental responsibility, and long-term vision. We believe that quality engineering, backed by research and innovation, is the foundation for sustainable development.

With our head office in Kathmandu, our long-term goal is to expand globally by establishing international branches and collaborative partnerships. Through continuous learning, selective research funding, and adherence to global standards, we aim to elevate Nepali engineering consultancy onto the world stage.

I warmly invite clients, partners, and young researchers to join us in this journey of growth, innovation, and excellence.`,
  },

  vision: "To become a leading international engineering consultancy firm, with Nepal as the central hub, delivering innovative, sustainable, and world-class engineering solutions.",

  mission: [
    "To provide high-quality engineering consultancy services aligned with national and international standards",
    "To support Nepal's renewable energy growth through technically robust and sustainable solutions",
    "To promote research, innovation, and knowledge development in engineering",
    "To expand globally while retaining strong Nepali engineering identity and values",
  ],

  coreValues: [
    { title: "Engineering Excellence", icon: "Award" },
    { title: "Integrity & Professional Ethics", icon: "Shield" },
    { title: "Sustainability & Environmental Responsibility", icon: "Leaf" },
    { title: "Innovation through Research", icon: "Lightbulb" },
    { title: "Global Collaboration", icon: "Globe" },
  ],

  services: [
    {
      id: "hydropower",
      title: "Hydropower Engineering",
      shortDesc: "End-to-end hydropower project consultancy from feasibility to commissioning",
      icon: "Droplets",
      features: [
        "Project identification and screening studies",
        "Pre-feasibility and feasibility studies",
        "Hydrological analysis and hydraulic design",
        "Headrace tunnel, penstock, and powerhouse design",
        "Electromechanical coordination support",
        "Construction supervision and technical audit",
        "Pre-commissioning and commissioning support",
      ],
      image:"/construction.jpg"
    },
    {
      id: "solar",
      title: "Solar Energy Systems",
      shortDesc: "Comprehensive solar PV solutions for grid-connected and off-grid applications",
      icon: "Sun",
      features: [
        "Solar resource assessment",
        "Grid-connected and off-grid solar PV system design",
        "Hybrid renewable energy solutions",
        "Technical due diligence and performance evaluation",
      ],
      image:"/solar.jpg",
    },
    {
      id: "energy-consulting",
      title: "Energy Sector Consulting",
      shortDesc: "Strategic advisory for renewable energy planning and regulatory compliance",
      icon: "Zap",
      features: [
        "Renewable energy planning and policy support",
        "Power evacuation and grid interconnection studies",
        "Energy project documentation for regulatory approvals",
        "Technical advisory for investors and developers",
      ],
      image:"/energy.webp",
    },
    {
      id: "geology",
      title: "Geology & Geotechnical Studies",
      shortDesc: "Subsurface investigation and geological assessment for infrastructure projects",
      icon: "Mountain",
      features: [
        "Engineering geological mapping",
        "Subsurface investigation planning and interpretation",
        "Rock mass classification and slope stability analysis",
        "Foundation assessment for hydraulic structures",
      ],
      image:"/geology.jpg",
    },
    {
      id: "hydrology",
      title: "Hydrology & Hydraulic Design",
      shortDesc: "Scientific water resource assessment and hydraulic structure design",
      icon: "Waves",
      features: [
        "Catchment assessment and hydrological modeling",
        "Flood estimation and design flood analysis",
        "River training and intake structure design",
        "Sediment analysis and mitigation planning",
      ],
      image:"/construction.jpg",
    },
    
    {
      id: "gis",
      title: "GIS & Spatial Analysis",
      shortDesc: "Geographic Information Systems for Nepal-focused hydrology and mapping applications",
      icon: "Map",
      features: [
        "River basin mapping and analysis",
        "Watershed delineation and management",
        "Land use and terrain analysis",
        "Hydropower site identification using GIS",
        "Spatial data management and visualization",
      ],
      image:"/construction.jpg",
    },
    {
      id: "cfd",
      title: "CFD & Simulation",
      shortDesc: "Computational Fluid Dynamics for international-level hydraulic modeling",
      icon: "Activity",
      features: [
        "Advanced hydraulic flow simulation",
        "Turbine and spillway CFD analysis",
        "Sediment transport modeling",
        "Dam break and flood simulation",
        "Optimization of hydraulic structures",
      ],
      image:"/construction.jpg",
    },
  ],

  additionalServices: [
    { title: "Geological & Geotechnical Survey", icon: "Mountain" },
    { title: "Topographical Survey", icon: "Map" },
    { title: "Hydrological Survey", icon: "Droplets" },
    { title: "Transmission Line Survey", icon: "Zap" },
    { title: "Property Valuation", icon: "Building" },
    { title: "Road Design", icon: "Route" },
    { title: "Construction Supervision", icon: "HardHat" },
    { title: "Environmental Impact Assessment", icon: "Leaf" },
  ],

  engineeringTools: [
    { name: "Civil 3D", category: "Design" },
    { name: "Flow 3D", category: "CFD" },
    { name: "Ansys", category: "Simulation" },
    { name: "ArcGIS / ArcMap", category: "GIS" },
    { name: "Primavera", category: "Project Management" },
    { name: "RETScreen Expert", category: "Energy Analysis" },
    { name: "WMS", category: "Hydrology" },
    { name: "Global Mapper", category: "GIS" },
    { name: "ETAP", category: "Electrical" },
    { name: "ETABS / SAFE", category: "Structural" },
    { name: "AutoCAD", category: "Design" },
    { name: "HEC-RAS", category: "Hydraulics" },
  ],

  projects: [
    {
      name: "Upper Khadam Khola Small Hydropower Project",
      capacity: "990 kW",
      client: "Abiral Hydropower Company Limited",
      role: "Lead Technical Consultant",
      scope: [
        "Hydrological and hydraulic design",
        "Review and coordination of civil and electro-mechanical components",
        "Power evacuation and grid interconnection support",
        "Pre-commissioning and technical documentation",
      ],
      status: "Ongoing",
      image:"/upperkhadamreal.jpeg"
    },
    {
      name: "Super Khadam Khola Small Hydropower Project",
      capacity: "814 kW",
      client: "Abiral Hydropower Company Limited",
      role: "Lead Technical Consultant",
      scope: [
        "Detailed engineering design support",
        "Hydrology and flood analysis",
        "Technical coordination during construction stage",
      ],
      status: "Ongoing",
      image:"/superkhadamreal.jpeg"
    },
    {
      name: "Lower Khadam Khola Small Hydropower Project",
      capacity: "935 kW",
      client: "Unity Power Plus Pvt. Ltd.",
      role: "Technical Consultant",
      scope: [
        "Feasibility review and design verification",
        "Hydraulic structures and waterway assessment",
        "Regulatory and approval documentation support",
      ],
      status: "Ongoing",
      image:"/lowerreal.jpeg"
    },
    {
      name: "Ultimate Khadam Khola Small Hydropower Project",
      capacity: "998 kW",
      client: "Ultimate Hydropower Company Pvt. Ltd.",
      role: "Lead Technical Consultant",
      scope: [
        "Comprehensive hydropower engineering consultancy",
        "Hydrology, hydraulics, and sediment analysis",
        "Pre-commissioning technical support",
      ],
      status: "Ongoing",
      image:"/ultimatereal.jpeg"
    },
  ],

  researchAreas: [
    "Hydropower optimization and efficiency",
    "Climate-resilient infrastructure design",
    "Advanced hydrological modeling",
    "Sediment and flood management",
    "Sustainable engineering practices",
  ],

  whyChooseUs: [
    { title: "Specialized Expertise", desc: "Strong specialization in hydropower and renewable energy", icon: "Target" },
    { title: "Standards Compliant", desc: "Technically rigorous and standards-compliant approach", icon: "CheckCircle" },
    { title: "Global Outlook", desc: "Local knowledge combined with international outlook", icon: "Globe" },
    { title: "Research Driven", desc: "Commitment to research, innovation, and capacity building", icon: "Microscope" },
  ],

  navLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Research", href: "/research" },
    { name: "Careers", href: "/careers" },
    { name: "Connect", href: "/contact" },
    { name: "Global Vision", href: "/vision" }
  ],
}

export type SiteConfig = typeof siteConfig
