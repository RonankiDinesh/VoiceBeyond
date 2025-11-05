import { motion } from "framer-motion";
import { useState } from "react";

const LANGUAGES = [
  "Assamese","Bengali","Bodo","Dogri","Gujarati","Hindi","Kannada","Kashmiri",
  "Konkani","Maithili","Malayalam","Manipuri (Meitei)","Marathi","Nepali",
  "Odia (Oriya)","Punjabi","Sanskrit","Santhali","Sindhi","Tamil","Telugu","Urdu",
];

export default function LanguageSelector({ 
  onChange,
  scrollable = false
}: { onChange: (lang: string) => void; scrollable?: boolean }) {
  const [selected, setSelected] = useState("Hindi");
  const [search, setSearch] = useState("");

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (lang: string) => {
    setSelected(lang);
    onChange(lang);
  };

  return (
    <div className="font-clash">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Caption Language</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search language..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full text-black font-bold px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ${scrollable ? 'max-h-64 overflow-y-auto pr-2' : ''}`}>
        {filteredLanguages.map((lang, i) => (
          <motion.div
            key={lang}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => handleSelect(lang)}
            className={`p-4 rounded-xl cursor-pointer border shadow-md text-center transition-all 
              ${selected === lang
                ? "bg-primary text-white border-primary shadow-lg scale-105"
                : "bg-card border-border hover:border-primary hover:shadow-primary/30"
              }`}
            whileHover={{ scale: 1.03 }}
          >
            {lang}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
