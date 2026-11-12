// Single source of truth for business details.
// TODO(owner): replace contact values with real ones (or set the NEXT_PUBLIC_* env vars).
export const site = {
  name: "Green Arrow Solar",
  legalName: "Green Arrow Solar Pvt. Ltd.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://greenarrowsolar.com",
  tagline: "Rooftop solar for Jabalpur & Madhya Pradesh",
  description:
    "Green Arrow Solar designs and installs rooftop solar systems for homes, businesses and farms in Jabalpur and across Madhya Pradesh. PM Surya Ghar subsidy support, net metering and 25-year panel life.",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+919876543210",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919876543210",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@greenarrowsolar.com",
  address: {
    street: "Napier Town",
    city: "Jabalpur",
    region: "Madhya Pradesh",
    postalCode: "482001",
    country: "IN",
  },
  hours: "Mon–Sat, 10:00 AM – 7:00 PM",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  /** Jabalpur city centre, for map / local-search structured data. */
  geo: { latitude: 23.1815, longitude: 79.9864 },
  /** Add verified profile URLs here (Instagram, Facebook, Google Business Profile…); they feed the sameAs schema. */
  socialProfiles: [] as string[],
};

export const founders: { name: string; role: string; company: string; bio: string; photo?: string }[] = [
  {
    name: "Nitin Thakre",
    role: "Co-Founder",
    company: "Green Energy Solutions Pvt. Ltd., Nagpur",
    bio: "Nitin brings the experience of Green Energy Solutions Pvt. Ltd., Nagpur, which delivers rooftop, hybrid, off-grid and solar water-heater systems for homes, schools, hospitals, farms and businesses, including projects at Tadoba Resort and Gondwana Resort.",
    photo: "/hero/founder-thakre.webp",
  },
  {
    name: "Vishal Korde",
    role: "Co-Founder",
    company: "Solar Trees (India)",
    bio: "Vishal brings the product and solutions expertise of Solar Trees, with a commitment to making solar energy simple and affordable for every household — now extended to Jabalpur and Madhya Pradesh.",
    photo: "/hero/founder-korde.webp",
  },
];

export const foundersMission = "Together, they are on a mission to make Jabalpur a solar-powered city.";

export const about = {
  intro:
    "Green Arrow Solar is a Jabalpur-based solar energy company founded by two industry veterans who are expanding their established solar businesses into the heart of Madhya Pradesh. Backed by the proven expertise of Green Energy Solutions Pvt. Ltd., Nagpur and Solar Trees, our founders bring years of hands-on experience in solar panel installation, system design and renewable energy consulting.",
  notNew:
    "We are not newcomers: we are trusted names in the solar industry who have come together to serve Jabalpur and the surrounding cities of Madhya Pradesh with quality solar solutions at fair prices.",
  mission:
    "To make clean, affordable solar energy accessible to every home, farm and business in Jabalpur and across Madhya Pradesh, backed by government subsidies like PM Surya Ghar Muft Bijli Yojana.",
  vision:
    "To be the most trusted solar installation company in Jabalpur, empowering thousands of families to achieve energy independence.",
};

export const parentCompanies = [
  {
    name: "Green Energy Solutions Pvt. Ltd.",
    place: "Nagpur, Maharashtra",
    text: "Solar inverters, solar water heaters (FPC, ETC and pressurised), hybrid, off-grid and rooftop solar systems for homes, commercial buildings, schools, hospitals, farms and industries. Completed projects include Tadoba Resort, Gondwana Resort and 30 kW commercial systems.",
  },
  {
    name: "Solar Trees (India)",
    place: "Solar products & solutions",
    text: "A solar product and solutions company whose experience in making solar practical for households now supports Green Arrow Solar's work in Madhya Pradesh.",
  },
];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solar-panel-installation-jabalpur", label: "Jabalpur Solar" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "residential",
    title: "Residential Rooftop Solar",
    short: "Cut your home electricity bill sharply with a subsidy-eligible rooftop system sized to your usage.",
    points: ["On-grid systems from 1 kW to 10 kW", "PM Surya Ghar subsidy paperwork handled", "Net-metering application with your DISCOM", "Generation monitoring app included"],
    icon: "home",
  },
  {
    slug: "commercial",
    title: "Commercial & Industrial",
    short: "Shops, schools, hospitals and factories — lower running costs and a faster payback.",
    points: ["Load study and ROI report", "Accelerated depreciation guidance", "Structures for RCC and shed roofs", "Annual maintenance contracts"],
    icon: "building",
  },
  {
    slug: "agriculture",
    title: "Solar Water Pumps",
    short: "Daytime irrigation without diesel or grid dependence for farms across MP.",
    points: ["Pumps from 1 HP to 10 HP", "PM-KUSUM scheme guidance", "Works in remote, off-grid fields", "Low maintenance, zero fuel cost"],
    icon: "drop",
  },
  {
    slug: "offgrid",
    title: "Off-Grid & Hybrid + Battery",
    short: "Power that keeps running through cuts — batteries and hybrid inverters done right.",
    points: ["Lithium and tubular battery options", "Hybrid inverter configuration", "Backup for homes, clinics, shops", "Right-sized, never over-sold"],
    icon: "battery",
  },
] as const;

export const steps = [
  { title: "Free site survey", text: "We visit, measure shade, roof area and your electricity load. No charge, no pressure." },
  { title: "Honest design & quote", text: "A right-sized system with a transparent breakup, expected generation and payback." },
  { title: "Subsidy & net-metering paperwork", text: "We handle portal registration, the DISCOM application and documentation." },
  { title: "Professional installation", text: "A trained crew, quality structure and cabling, tested before handover. Most home systems are fitted within a few days once approvals are in." },
  { title: "Monitor & maintain", text: "Track generation on your phone. We are one call away for cleaning and service." },
];

// Completed installations shown in the homepage slider (photos in public/projects/).
// `focus` is the CSS object-position that keeps the people in frame when the photo is cropped.
export const projects = [
  { name: "Agrawal", place: "Akot", kw: 8, photo: "/projects/agrawal-akot.webp", focus: "40% 50%" },
  { name: "Jaiswal", place: "Friends Colony", kw: 6, photo: "/projects/jaiswal-friends-colony.webp", focus: "62% 50%" },
  { name: "Ajanti Dal", place: "Hinganghat", kw: 60, photo: "/projects/ajanti-dal-hinganghat.webp", focus: "45% 50%" },
];

export const faqs = [
  {
    q: "How much subsidy can I get for rooftop solar in Madhya Pradesh?",
    a: "Under the central PM Surya Ghar: Muft Bijli Yojana, eligible households receive ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW, capped at ₹78,000. Rules can change, so we confirm current scheme terms during your survey.",
  },
  {
    q: "How much electricity does a 1 kW solar system generate in Jabalpur?",
    a: "Jabalpur receives approximately 3,500 hours of sunshine a year. A 1 kW solar system generates 4 to 4.5 units (kWh) of electricity per day, about 120–135 units a month. Actual output depends on shade, tilt and cleaning.",
  },
  {
    q: "How do I choose the right solar system size for my home?",
    a: "Match the system to your monthly electricity bill: up to ₹2,000 → 1–2 kW; ₹2,000–₹3,500 → 2–3 kW; ₹3,500–₹5,000 → 3–4 kW; ₹5,000+ → 5 kW or more. Use our savings calculator for an indicative size, and our free site survey will confirm the exact size you need.",
  },
  {
    q: "What is net metering and how does it work in Jabalpur?",
    a: "Net metering lets you send excess solar electricity back to the grid. Your meter records the power you export, and you get credit for it on your electricity bill. In Jabalpur, MPPKVVCL handles net-metering applications, and Green Arrow Solar assists with the complete process.",
  },
  {
    q: "Do solar panels work during monsoon and power cuts?",
    a: "Solar panels generate electricity even on cloudy days, though at reduced capacity (about 25–40% of peak output). During power cuts, on-grid systems shut down for safety (anti-islanding). If you want power during outages, choose a hybrid solar system with battery backup.",
  },
  {
    q: "What is the lifespan of solar panels?",
    a: "Quality solar panels last 25–30 years, with a performance warranty that typically guarantees at least 80% output at year 25. Inverters usually last 10–15 years. Panels need minimal maintenance: mainly periodic cleaning and an annual check of the inverter and connections.",
  },
];

export type City = { slug: string; name: string; discom: string; blurb: string };

export const cities: City[] = [
  { slug: "jabalpur", name: "Jabalpur", discom: "MPPKVVCL (East Discom)", blurb: "Our home city. Fast surveys, quick installation slots and local service for Napier Town, Vijay Nagar, Wright Town, Adhartal, Ranjhi and nearby colonies." },
  { slug: "katni", name: "Katni", discom: "MPPKVVCL (East Discom)", blurb: "Katni's mix of homes, mining-linked businesses and industrial units benefits from strong year-round sun and rising tariffs." },
  { slug: "narsinghpur", name: "Narsinghpur", discom: "MPPKVVCL (East Discom)", blurb: "Farm-heavy Narsinghpur is ideal for solar water pumps alongside rooftop systems for homes and agri-businesses." },
  { slug: "mandla", name: "Mandla", discom: "MPPKVVCL (East Discom)", blurb: "Where grid supply is unreliable, hybrid and off-grid systems with batteries keep homes and clinics running." },
  { slug: "seoni", name: "Seoni", discom: "MPPKVVCL (East Discom)", blurb: "Homes and small businesses in Seoni can pair rooftop solar with net metering to cut monthly bills sharply." },
  { slug: "chhindwara", name: "Chhindwara", discom: "MPPKVVCL (East Discom)", blurb: "Chhindwara's homes, farms and businesses can pair rooftop systems and solar pumps with strong sunshine and subsidy support." },
  { slug: "sagar", name: "Sagar", discom: "MPMKVVCL (Central Discom)", blurb: "Sagar's institutions, shops and homes get engineered rooftop systems with subsidy and net-metering support." },
  { slug: "satna", name: "Satna", discom: "MPPKVVCL (East Discom)", blurb: "Cement-belt industries and homes in Satna gain from solar's very low per-unit cost over the system's life." },
  { slug: "rewa", name: "Rewa", discom: "MPPKVVCL (East Discom)", blurb: "Rewa hosts one of India's largest solar parks; bring that same clean power to your own rooftop." },
  { slug: "bhopal", name: "Bhopal", discom: "MPMKVVCL (Central Discom)", blurb: "Bungalows, apartments and commercial buildings across Bhopal can go solar with managed design and installation." },
  { slug: "indore", name: "Indore", discom: "MPPaKVVCL (West Discom)", blurb: "Large rooftops and high daytime loads make Indore businesses strong candidates for fast-payback solar." },
];

export const cityHref = (slug: string) =>
  slug === "jabalpur" ? "/solar-panel-installation-jabalpur" : `/solar-panel-installation/${slug}`;
