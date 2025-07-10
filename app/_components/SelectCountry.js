async function SelectCountry({ defaultCountry, name, id, className }) {
  const baseUrl = process.env.NEXTAUTH_URL;
  const res = await fetch(baseUrl + "/api/countries");
  const data = await res.json();
  const { countries } = data;

  const flag =
    countries.find(
      (country) => country.name.toLowerCase() === defaultCountry.toLowerCase()
    )?.flag ?? "";

  return (
    <select
      className={className}
      id={id}
      name={name}
      defaultValue={`${defaultCountry}%${flag}`}
      // key={`${defaultCountry}-${flag}`}
    >
      <option value="">Select a country...</option>
      {countries.map((c) => (
        <option value={`${c.name}%${c.flag}`} key={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
