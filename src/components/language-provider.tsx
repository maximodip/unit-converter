"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type Language = "en" | "es";

type TranslationKey =
  | "unitConverter"
  | "us"
  | "metric"
  | "length"
  | "weight"
  | "volume"
  | "temperature"
  | "lengthConversion"
  | "weightConversion"
  | "volumeConversion"
  | "temperatureConversion"
  | "convertFromTo"
  | "enter"
  | "centimeters"
  | "inches"
  | "grams"
  | "ounces"
  | "milliliters"
  | "fluidOunces"
  | "celsius"
  | "fahrenheit"
  | "english"
  | "spanish"
  | "madeby";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const translations: Translations = {
  en: {
    unitConverter: "Unit Converter",
    us: "US",
    metric: "Metric",
    length: "Length",
    weight: "Weight",
    volume: "Volume",
    temperature: "Temperature",
    lengthConversion: "Length Conversion",
    weightConversion: "Weight Conversion",
    volumeConversion: "Volume Conversion",
    temperatureConversion: "Temperature Conversion",
    convertFromTo: "Convert from {from} to {to}",
    enter: "Enter {unit}",
    centimeters: "Centimeters",
    inches: "Inches",
    grams: "Grams",
    ounces: "Ounces",
    milliliters: "Milliliters",
    fluidOunces: "Fluid Ounces",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    english: "English",
    spanish: "Spanish",
    madeby: "Made by ",
  },
  es: {
    unitConverter: "Conversor de Unidades",
    us: "EE.UU.",
    metric: "Métrico",
    length: "Longitud",
    weight: "Peso",
    volume: "Volumen",
    temperature: "Temperatura",
    lengthConversion: "Conversión de Longitud",
    weightConversion: "Conversión de Peso",
    volumeConversion: "Conversión de Volumen",
    temperatureConversion: "Conversión de Temperatura",
    convertFromTo: "Convertir de {from} a {to}",
    enter: "Ingrese {unit}",
    centimeters: "Centímetros",
    inches: "Pulgadas",
    grams: "Gramos",
    ounces: "Onzas",
    milliliters: "Mililitros",
    fluidOunces: "Onzas Líquidas",
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    english: "Inglés",
    spanish: "Español",
    madeby: "Programado por ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: TranslationKey): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
