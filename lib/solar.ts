// Single source of truth for the savings calculator. Change a number here and the calculator follows.
// Methodology: "Solar Savings Calculator — How the Numbers Are Calculated" (Nov 2026).

export const SOLAR = {
  /** 3 kW makes ~400 units a month. */
  unitsPerKwMonth: 400 / 3,
  roofSqFtPerKw: 50,
  co2KgPerUnit: 0.814,
  co2KgPerTreeYear: 21,
  plantLifeYears: 30,
  downPaymentPct: 0.1,
  emiYears: 10,
  emiInterestPct: 10, // TO CONFIRM with client (sheet value not visible)
  autoRate: { home: 12.5, business: 18.5, industry: 18.5 } as Record<PropertyType, number>,
  businessPricePerKw: 45000,
  homeSizes: [1, 1.5, 2, 2.5, 3, 3.6, 4, 5],
  homeMaxKw: 10,
  businessMaxKw: 1000,
  /** Home price list (₹). Below 3 kW and above 5 kW are derived — see homePrice(). */
  homePrice: { 3: 200000, 3.6: 215000, 4: 250000, 5: 300000 } as Record<number, number>,
  homeBelow3PerKw: 200000 / 3, // TO CONFIRM: assumed same rate as 3 kW
  homeAbove5PerExtraKw: 45000, // TO CONFIRM
  subsidy: { first2PerKw: 30000, thirdKwPerKw: 18000, cap: 78000 },
  billMin: 500,
  billMax: 15000,
} as const;

export type PropertyType = "home" | "business" | "industry";

const EPS = 1e-9;
const roundTo = (n: number, step: number) => Math.round(n / step) * step;

/** Smallest standard size that covers the required kW. */
function standardSize(rawKw: number, type: PropertyType): number {
  if (type !== "home") {
    return Math.min(SOLAR.businessMaxKw, Math.max(0.5, Math.ceil(rawKw * 2 - EPS) / 2));
  }
  for (const s of SOLAR.homeSizes) if (s + EPS >= rawKw) return s;
  const above5 = Math.ceil(rawKw * 2 - EPS) / 2; // every 0.5 kW after 5
  return Math.min(SOLAR.homeMaxKw, Math.max(5.5, above5));
}

function homePrice(kw: number): number {
  const listed = SOLAR.homePrice[kw];
  if (listed) return listed;
  if (kw < 3) return roundTo(kw * SOLAR.homeBelow3PerKw, 1000);
  return SOLAR.homePrice[5] + (kw - 5) * SOLAR.homeAbove5PerExtraKw;
}

function homeSubsidy(kw: number): number {
  const { first2PerKw, thirdKwPerKw, cap } = SOLAR.subsidy;
  if (kw <= 2) return Math.round(kw * first2PerKw);
  if (kw >= 3) return cap;
  return Math.min(cap, Math.round(2 * first2PerKw + (kw - 2) * thirdKwPerKw));
}

function emi(principal: number): number {
  if (principal <= 0) return 0;
  const r = SOLAR.emiInterestPct / 100 / 12;
  const n = SOLAR.emiYears * 12;
  return Math.round((principal * r) / (1 - Math.pow(1 + r, -n)));
}

export function calculate(billInput: number, type: PropertyType, rateInput?: number) {
  const bill = Math.max(0, billInput);
  const autoRate = SOLAR.autoRate[type];
  const rate = rateInput && rateInput > 0 ? rateInput : autoRate;

  const units = bill / rate;
  const kw = standardSize(units / SOLAR.unitsPerKwMonth, type);
  const generation = kw * SOLAR.unitsPerKwMonth;

  const price = type === "home" ? homePrice(kw) : roundTo(kw * SOLAR.businessPricePerKw, 1000);
  const subsidy = type === "home" ? homeSubsidy(kw) : 0;
  const pays = Math.max(0, price - subsidy);

  const monthly = Math.round(Math.min(bill, generation * rate));
  const paybackMonths = monthly > 0 ? Math.round(pays / monthly) : null;
  const yearly = monthly * 12;
  const lifetime = yearly * SOLAR.plantLifeYears;

  const downPayment = Math.round(pays * SOLAR.downPaymentPct);
  const monthlyEmi = emi(pays - downPayment);

  const co2 = Math.round(generation * 12 * SOLAR.co2KgPerUnit);

  return {
    rate, autoRate, units, kw, generation: Math.round(generation),
    price, subsidy, pays, monthly, paybackMonths, yearly, lifetime,
    downPayment, emi: monthlyEmi,
    roofSqFt: Math.round(kw * SOLAR.roofSqFtPerKw),
    co2, trees: Math.round(co2 / SOLAR.co2KgPerTreeYear),
  };
}

export type CalcResult = ReturnType<typeof calculate>;

/** Home price-list row for a given system size (used by the pricing page). */
export function homeQuote(kw: number) {
  const price = homePrice(kw);
  const subsidy = homeSubsidy(kw);
  const pays = Math.max(0, price - subsidy);
  const downPayment = Math.round(pays * SOLAR.downPaymentPct);
  return {
    kw,
    price,
    subsidy,
    pays,
    units: Math.round(kw * SOLAR.unitsPerKwMonth),
    roofSqFt: Math.round(kw * SOLAR.roofSqFtPerKw),
    emi: emi(pays - downPayment),
    /** Rows outside the client's 3–5 kW price list are derived and still to be confirmed. */
    indicative: !(kw in SOLAR.homePrice),
  };
}
