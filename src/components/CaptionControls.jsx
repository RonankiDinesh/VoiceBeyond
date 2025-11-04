import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export const CaptionControls = ({
  outputLanguage,
  setOutputLanguage,
  captionMode,
  setCaptionMode,
  fontSize,
  setFontSize,
  captionSpeed,
  setCaptionSpeed,
  highContrast,
  setHighContrast,
  dyslexiaFriendly,
  setDyslexiaFriendly,
}) => {
  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "ta", label: "Tamil" },
    { value: "te", label: "Telugu" },
    { value: "bn", label: "Bengali" },
    { value: "mr", label: "Marathi" },
    { value: "gu", label: "Gujarati" },
    { value: "kn", label: "Kannada" },
    { value: "ml", label: "Malayalam" },
    { value: "pa", label: "Punjabi" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl bg-card shadow-card border border-border p-6 space-y-6 h-fit sticky top-24"
    >
      <h3 className="text-xl font-bold">Caption Settings</h3>

      {/* Output Language */}
      <div className="space-y-2">
        <Label htmlFor="language">Output Language</Label>
        <Select value={outputLanguage} onValueChange={setOutputLanguage}>
          <SelectTrigger id="language">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Caption Mode */}
      <div className="space-y-2">
        <Label htmlFor="mode">Caption Mode</Label>
        <Select value={captionMode} onValueChange={setCaptionMode}>
          <SelectTrigger id="mode">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="raw">Raw Transcription</SelectItem>
            <SelectItem value="simplified">Simplified</SelectItem>
            <SelectItem value="ultra">Ultra Simple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
        <Slider
          id="fontSize"
          min={16}
          max={48}
          step={2}
          value={[fontSize]}
          onValueChange={([value]) => setFontSize(value)}
        />
      </div>

      {/* Caption Speed */}
      <div className="space-y-2">
        <Label htmlFor="speed">Caption Speed: {captionSpeed}%</Label>
        <Slider
          id="speed"
          min={25}
          max={100}
          step={5}
          value={[captionSpeed]}
          onValueChange={([value]) => setCaptionSpeed(value)}
        />
      </div>

      {/* High Contrast */}
      <div className="flex items-center justify-between">
        <Label htmlFor="contrast" className="cursor-pointer">
          High Contrast
        </Label>
        <Switch
          id="contrast"
          checked={highContrast}
          onCheckedChange={setHighContrast}
        />
      </div>

      {/* Dyslexia Friendly */}
      <div className="flex items-center justify-between">
        <Label htmlFor="dyslexia" className="cursor-pointer">
          Dyslexia-Friendly Font
        </Label>
        <Switch
          id="dyslexia"
          checked={dyslexiaFriendly}
          onCheckedChange={setDyslexiaFriendly}
        />
      </div>
    </motion.aside>
  );
};
