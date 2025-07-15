import type { FormattedCountry } from "../models/typeDefinitions";

interface countriesProps {
  countries: FormattedCountry[] | null;
}

const CountrySelector: React.FC<countriesProps> = ({ countries }) => {
  return (
    <select className="border p-2 w-full">
      {countries &&
        countries.map((c, i) => (
          <option key={i} value={c.code}>
            {c.name} ({c.code})
          </option>
        ))}
    </select>
  );
};

export default CountrySelector;
