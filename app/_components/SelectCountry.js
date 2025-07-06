import { getCountries } from "../_lib/data-service";

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      className={className}
      id={id}
      name={name}
      defaultValue={`${defaultCountry}%${flag}`}
    >
      <option value="">Select a country...</option>
      {countries.map((c) => (
        <option value={`${c.name}%${c.flag}`} key={c.name} className="">
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
