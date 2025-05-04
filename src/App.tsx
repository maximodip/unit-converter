"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { useTheme } from "./components/theme-provider";
import { useLanguage } from "./components/language-provider";
import { Heart } from "lucide-react";

export default function App() {
  const { theme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Length states
  const [inches, setInches] = useState<string>("");
  const [feet, setFeet] = useState<string>("");

  // Weight states
  const [ounces, setOunces] = useState<string>("");
  const [lbs, setLbs] = useState<string>("");

  // Volume state
  const [volume, setVolume] = useState<string>("");

  // Temperature state
  const [temperature, setTemperature] = useState<string>("");

  // Speed state
  const [speed, setSpeed] = useState<string>("");

  // Conversion functions
  // Length conversions
  const convertInches = (value: number) => {
    if (isMetric) {
      return (value * 0.393701).toFixed(2) + " " + t("inches");
    } else {
      return (value * 2.54).toFixed(2) + " " + t("centimeters");
    }
  };

  const convertFeet = (value: number) => {
    if (isMetric) {
      return (value * 3.28084).toFixed(2) + " " + t("feet");
    } else {
      return (value * 0.3048).toFixed(2) + " " + t("meters");
    }
  };

  // Weight conversions
  const convertOunces = (value: number) => {
    if (isMetric) {
      return (value * 0.035274).toFixed(2) + " " + t("ounces");
    } else {
      return (value * 28.34952).toFixed(2) + " " + t("grams");
    }
  };

  const convertLbs = (value: number) => {
    if (isMetric) {
      return (value * 2.20462).toFixed(2) + " " + t("lbs");
    } else {
      return (value * 0.453592).toFixed(2) + " " + t("kilograms");
    }
  };

  // Volume conversion
  const convertVolume = (value: number) => {
    if (isMetric) {
      return (value * 0.033814).toFixed(2) + " " + t("fluidOunces");
    } else {
      return (value * 29.5735).toFixed(2) + " " + t("milliliters");
    }
  };

  // Temperature conversion
  const convertTemperature = (value: number) => {
    if (isMetric) {
      return ((value * 9) / 5 + 32).toFixed(1) + " °F";
    } else {
      return (((value - 32) * 5) / 9).toFixed(1) + " °C";
    }
  };

  // Speed conversion
  const convertSpeed = (value: number) => {
    if (isMetric) {
      return (value * 0.621371).toFixed(2) + " " + t("mph");
    } else {
      return (value * 1.60934).toFixed(2) + " " + t("kmh");
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <main className="flex-grow container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          {t("unitConverter")}
        </h1>

        <div className="flex justify-center items-center mb-8 space-x-4">
          <div className="flex items-center space-x-2">
            <span>{t("us")}</span>
            <Switch
              checked={isMetric}
              onCheckedChange={setIsMetric}
              aria-label="Toggle metric"
            />
            <span>{t("metric")}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{t("english")}</span>
            <Switch
              checked={language === "es"}
              onCheckedChange={(checked) => setLanguage(checked ? "es" : "en")}
              aria-label="Toggle language"
            />
            <span>{t("spanish")}</span>
          </div>
        </div>

        <Tabs
          defaultValue="length"
          className="max-w-3xl mx-auto max-sm:items-center"
        >
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="length">{t("length")}</TabsTrigger>
            <TabsTrigger value="weight">{t("weight")}</TabsTrigger>
            <TabsTrigger value="speed">{t("speed")}</TabsTrigger>
            <TabsTrigger value="temperature">{t("temperature")}</TabsTrigger>
            <TabsTrigger value="volume">{t("volume")}</TabsTrigger>
          </TabsList>

          <TabsContent value="length">
            <Card>
              <CardHeader>
                <CardTitle>{t("lengthConversion")}</CardTitle>
                <CardDescription>
                  {t("convertFromTo")
                    .replace(
                      "{from}",
                      isMetric
                        ? t("centimeters") + "/" + t("meters")
                        : t("inches") + "/" + t("feet")
                    )
                    .replace(
                      "{to}",
                      isMetric
                        ? t("inches") + "/" + t("feet")
                        : t("centimeters") + "/" + t("meters")
                    )}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="inches">
                      {isMetric ? t("centimeters") : t("inches")}
                    </Label>
                    <Input
                      id="inches"
                      type="number"
                      placeholder={t("enter").replace(
                        "{unit}",
                        isMetric ? t("centimeters") : t("inches")
                      )}
                      value={inches}
                      onChange={(e) => setInches(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      {inches && !isNaN(Number.parseFloat(inches))
                        ? convertInches(Number.parseFloat(inches))
                        : `0 ${isMetric ? t("inches") : t("centimeters")}`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feet">
                      {isMetric ? t("meters") : t("feet")}
                    </Label>
                    <Input
                      id="feet"
                      type="number"
                      placeholder={t("enter").replace(
                        "{unit}",
                        isMetric ? t("meters") : t("feet")
                      )}
                      value={feet}
                      onChange={(e) => setFeet(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      {feet && !isNaN(Number.parseFloat(feet))
                        ? convertFeet(Number.parseFloat(feet))
                        : `0 ${isMetric ? t("feet") : t("meters")}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weight">
            <Card>
              <CardHeader>
                <CardTitle>{t("weightConversion")}</CardTitle>
                <CardDescription>
                  {t("convertFromTo")
                    .replace(
                      "{from}",
                      isMetric
                        ? t("grams") + "/" + t("kilograms")
                        : t("ounces") + "/" + t("lbs")
                    )
                    .replace(
                      "{to}",
                      isMetric
                        ? t("ounces") + "/" + t("lbs")
                        : t("grams") + "/" + t("kilograms")
                    )}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lbs">
                      {isMetric ? t("kilograms") : t("lbs")}
                    </Label>
                    <Input
                      id="lbs"
                      type="number"
                      placeholder={t("enter").replace(
                        "{unit}",
                        isMetric ? t("kilograms") : t("lbs")
                      )}
                      value={lbs}
                      onChange={(e) => setLbs(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      {lbs && !isNaN(Number.parseFloat(lbs))
                        ? convertLbs(Number.parseFloat(lbs))
                        : `0 ${isMetric ? t("lbs") : t("kilograms")}`}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ounces">
                      {isMetric ? t("grams") : t("ounces")}
                    </Label>
                    <Input
                      id="ounces"
                      type="number"
                      placeholder={t("enter").replace(
                        "{unit}",
                        isMetric ? t("grams") : t("ounces")
                      )}
                      value={ounces}
                      onChange={(e) => setOunces(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      {ounces && !isNaN(Number.parseFloat(ounces))
                        ? convertOunces(Number.parseFloat(ounces))
                        : `0 ${isMetric ? t("ounces") : t("grams")}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volume">
            <Card>
              <CardHeader>
                <CardTitle>{t("volumeConversion")}</CardTitle>
                <CardDescription>
                  {t("convertFromTo")
                    .replace(
                      "{from}",
                      isMetric ? t("milliliters") : t("fluidOunces")
                    )
                    .replace(
                      "{to}",
                      isMetric ? t("fluidOunces") : t("milliliters")
                    )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="volume">
                    {isMetric ? t("milliliters") : t("fluidOunces")}
                  </Label>
                  <Input
                    id="volume"
                    type="number"
                    placeholder={t("enter").replace(
                      "{unit}",
                      isMetric ? t("milliliters") : t("fluidOunces")
                    )}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {volume && !isNaN(Number.parseFloat(volume))
                    ? convertVolume(Number.parseFloat(volume))
                    : `0 ${isMetric ? t("fluidOunces") : t("milliliters")}`}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle>{t("temperatureConversion")}</CardTitle>
                <CardDescription>
                  {t("convertFromTo")
                    .replace(
                      "{from}",
                      isMetric ? t("celsius") : t("fahrenheit")
                    )
                    .replace("{to}", isMetric ? t("fahrenheit") : t("celsius"))}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="temperature">
                    {isMetric ? t("celsius") : t("fahrenheit")}
                  </Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder={t("enter").replace(
                      "{unit}",
                      isMetric ? "°C" : "°F"
                    )}
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {temperature && !isNaN(Number.parseFloat(temperature))
                    ? convertTemperature(Number.parseFloat(temperature))
                    : `0 ${isMetric ? "°F" : "°C"}`}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speed">
            <Card>
              <CardHeader>
                <CardTitle>{t("speedConversion")}</CardTitle>
                <CardDescription>
                  {t("convertFromTo")
                    .replace("{from}", isMetric ? t("kmh") : t("mph"))
                    .replace("{to}", isMetric ? t("mph") : t("kmh"))}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="speed">
                    {isMetric ? t("kmh") : t("mph")}
                  </Label>
                  <Input
                    id="speed"
                    type="number"
                    placeholder={t("enter").replace(
                      "{unit}",
                      isMetric ? t("kmh") : t("mph")
                    )}
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {speed && !isNaN(Number.parseFloat(speed))
                    ? convertSpeed(Number.parseFloat(speed))
                    : `0 ${isMetric ? t("mph") : t("kmh")}`}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-4 border-t border-border">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            {t("madeby")}{" "}
            <a
              href="https://github.com/maximodip"
              target="_blank"
              className="underline hover:opacity-70"
            >
              max
            </a>{" "}
            <Heart className="inline-block w-4 h-4 ml-1 text-red-500 animate-pulse" />
          </p>
        </div>
      </footer>
    </div>
  );
}
