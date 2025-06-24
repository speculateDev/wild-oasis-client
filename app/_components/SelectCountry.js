function SelectCountry({ name, id, className }) {
  return (
    <select className={className} id={id} name={name}>
      <option value="">Select a country...</option>
    </select>
  );
}

export default SelectCountry;
