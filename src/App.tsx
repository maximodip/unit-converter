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

export default function App() {
  const { theme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Length state
  const [length, setLength] = useState<string>("");

  // Weight state
  const [weight, setWeight] = useState<string>("");

  // Volume state
  const [volume, setVolume] = useState<string>("");

  // Temperature state
  const [temperature, setTemperature] = useState<string>("");

  // Conversion functions
  const convertLength = (value: number) => {
    if (isMetric) {
      return (value / 2.54).toFixed(2) + " " + t("inches");
    } else {
      return (value * 2.54).toFixed(2) + " " + t("centimeters");
    }
  };

  const convertWeight = (value: number) => {
    if (isMetric) {
      return (value / 28.34952).toFixed(2) + " " + t("ounces");
    } else {
      return (value * 28.34952).toFixed(2) + " " + t("grams");
    }
  };

  const convertVolume = (value: number) => {
    if (isMetric) {
      return (value / 29.5735).toFixed(2) + " " + t("fluidOunces");
    } else {
      return (value * 29.5735).toFixed(2) + " " + t("milliliters");
    }
  };

  const convertTemperature = (value: number) => {
    if (isMetric) {
      return ((value * 9) / 5 + 32).toFixed(1) + " °F";
    } else {
      return (((value - 32) * 5) / 9).toFixed(1) + " °C";
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-background text-foreground">
      <h1 className="text-3xl font-bold text-center mb-8">
        {t("unitConverter")}
      </h1>

      <div className="flex justify-center items-center mb-8 gap-4 flex-wrap">
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

      <Tabs defaultValue="length" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-8 max-sm:self-center">
          <TabsTrigger value="length">{t("length")}</TabsTrigger>
          <TabsTrigger value="weight">{t("weight")}</TabsTrigger>
          <TabsTrigger value="volume">{t("volume")}</TabsTrigger>
          <TabsTrigger value="temperature">{t("temperature")}</TabsTrigger>
        </TabsList>

        <TabsContent value="length">
          <Card>
            <CardHeader>
              <CardTitle>{t("lengthConversion")}</CardTitle>
              <CardDescription>
                {t("convertFromTo")
                  .replace("{from}", isMetric ? t("centimeters") : t("inches"))
                  .replace("{to}", isMetric ? t("inches") : t("centimeters"))}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="length">
                  {isMetric ? t("centimeters") : t("inches")}
                </Label>
                <Input
                  id="length"
                  type="number"
                  placeholder={t("enter").replace(
                    "{unit}",
                    isMetric ? t("centimeters") : t("inches")
                  )}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {length && !isNaN(Number.parseFloat(length))
                  ? convertLength(Number.parseFloat(length))
                  : `0 ${isMetric ? t("inches") : t("centimeters")}`}
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
                  .replace("{from}", isMetric ? t("grams") : t("ounces"))
                  .replace("{to}", isMetric ? t("ounces") : t("grams"))}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="weight">
                  {isMetric ? t("grams") : t("ounces")}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder={t("enter").replace(
                    "{unit}",
                    isMetric ? t("grams") : t("ounces")
                  )}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {weight && !isNaN(Number.parseFloat(weight))
                  ? convertWeight(Number.parseFloat(weight))
                  : `0 ${isMetric ? t("ounces") : t("grams")}`}
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
                  .replace("{from}", isMetric ? t("celsius") : t("fahrenheit"))
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
      </Tabs>
    </div>
  );
}
