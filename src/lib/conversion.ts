// Conversion functions
export const inchesToCm = (inches: number) => (inches * 2.54).toFixed(2);
export const feetToMeters = (feet: number) => (feet * 0.3048).toFixed(2);
export const yardsToMeters = (yards: number) => (yards * 0.9144).toFixed(2);
export const milesToKm = (miles: number) => (miles * 1.60934).toFixed(2);

export const ouncesToGrams = (ounces: number) => (ounces * 28.3495).toFixed(2);
export const poundsToKg = (pounds: number) => (pounds * 0.453592).toFixed(2);

export const fluidOuncesToMl = (flOz: number) => (flOz * 29.5735).toFixed(2);
export const cupsToMl = (cups: number) => (cups * 236.588).toFixed(2);
export const pintsToLiters = (pints: number) => (pints * 0.473176).toFixed(2);
export const quartsToLiters = (quarts: number) =>
  (quarts * 0.946353).toFixed(2);
export const gallonsToLiters = (gallons: number) =>
  (gallons * 3.78541).toFixed(2);

export const fahrenheitToCelsius = (f: number) =>
  (((f - 32) * 5) / 9).toFixed(1);
