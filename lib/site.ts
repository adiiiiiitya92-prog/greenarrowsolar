// Single source of truth for business details.
// TODO(owner): replace contact values with real ones (or set the NEXT_PUBLIC_* env vars).
export const site = {
  name: "Green Arrow Solar",
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
  founder: {
    name: "Our Founder",
    role: "Founder & Managing Director",
    quote:
      "Solar should not feel complicated. We survey your roof, size the system honestly, handle the paperwork and stay with you long after the panels go up.",
  },
};

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
    short: "Cut your home electricity bill by up to 90% with a subsidy-eligible rooftop system.",
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
  { title: "Installation in days", text: "A trained crew, quality structure and cabling, tested before handover." },
  { title: "Monitor & maintain", text: "Track generation on your phone. We are one call away for cleaning and service." },
];

export const faqs = [
  {
    q: "How much subsidy can I get for rooftop solar in Madhya Pradesh?",
    a: "Under the central PM Surya Ghar: Muft Bijli Yojana, eligible households receive ₹30,000 per kW for the first 2 kW and ₹18,000 for the third kW, capped at ₹78,000. Rules can change, so we confirm current scheme terms during your survey.",
  },
  {
    q: "How many units does a 1 kW solar system generate in Jabalpur?",
    a: "Roughly 4 units (kWh) per day on average, or about 1,300–1,500 units a year, depending on shade, tilt and cleaning. A 3 kW system typically produces around 360 units a month.",
  },
  {
    q: "What size system does my home need?",
    a: "A rule of thumb is 1 kW for every 120 units of monthly consumption. Use the calculator on our home page for an indicative size, then book a free survey for an exact design.",
  },
  {
    q: "What is net metering and do I need it?",
    a: "Net metering lets you export surplus power to the grid and get credit on your bill. It is required for on-grid systems, and we file the application with your DISCOM (MPPKVVCL covers Jabalpur) on your behalf.",
  },
  {
    q: "Will solar work during monsoon or power cuts?",
    a: "Panels still generate in cloudy weather, at reduced output. A standard on-grid system switches off during a grid outage for safety; if you need backup, choose a hybrid system with batteries.",
  },
  {
    q: "How long do solar panels last and what maintenance is needed?",
    a: "Quality panels carry a performance warranty of up to 25 years. Maintenance is mostly periodic cleaning and an annual check of the inverter and connections.",
  },
];

export type City = { slug: string; name: string; discom: string; blurb: string };

export const cities: City[] = [
  { slug: "jabalpur", name: "Jabalpur", discom: "MPPKVVCL (East Discom)", blurb: "Our home city. Fast surveys, quick installation slots and local service for Napier Town, Vijay Nagar, Wright Town, Adhartal, Ranjhi and nearby colonies." },
  { slug: "katni", name: "Katni", discom: "MPPKVVCL (East Discom)", blurb: "Katni's mix of homes, mining-linked businesses and industrial units benefits from strong year-round sun and rising tariffs." },
  { slug: "narsinghpur", name: "Narsinghpur", discom: "MPPKVVCL (East Discom)", blurb: "Farm-heavy Narsinghpur is ideal for solar water pumps alongside rooftop systems for homes and agri-businesses." },
  { slug: "mandla", name: "Mandla", discom: "MPPKVVCL (East Discom)", blurb: "Where grid supply is unreliable, hybrid and off-grid systems with batteries keep homes and clinics running." },
  { slug: "seoni", name: "Seoni", discom: "MPPKVVCL (East Discom)", blurb: "Homes and small businesses in Seoni can pair rooftop solar with net metering to cut monthly bills sharply." },
  { slug: "sagar", name: "Sagar", discom: "MPMKVVCL (Central Discom)", blurb: "Sagar's institutions, shops and homes get engineered rooftop systems with subsidy and net-metering support." },
  { slug: "satna", name: "Satna", discom: "MPPKVVCL (East Discom)", blurb: "Cement-belt industries and homes in Satna gain from solar's very low per-unit cost over the system's life." },
  { slug: "rewa", name: "Rewa", discom: "MPPKVVCL (East Discom)", blurb: "Rewa hosts one of India's largest solar parks; bring that same clean power to your own rooftop." },
  { slug: "bhopal", name: "Bhopal", discom: "MPMKVVCL (Central Discom)", blurb: "Bungalows, apartments and commercial buildings across Bhopal can go solar with managed design and installation." },
  { slug: "indore", name: "Indore", discom: "MPPaKVVCL (West Discom)", blurb: "Large rooftops and high daytime loads make Indore businesses strong candidates for fast-payback solar." },
];

export const cityHref = (slug: string) =>
  slug === "jabalpur" ? "/solar-panel-installation-jabalpur" : `/solar-panel-installation/${slug}`;
