export default function AddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone Number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      ></input>
      <label>Street Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(ev) => setAddressProp("streetAddress", ev.target.value)}
      ></input>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProp("postalCode", ev.target.value)}
          ></input>
        </div>

        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp("city", ev.target.value)}
          ></input>
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp("country", ev.target.value)}
      ></input>
    </>
  );
}
