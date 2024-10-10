"use client";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";
import EditableImage from "./EditableIamge";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-4">
        <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
          <div className="p-2 mt-4 rounded-xl zoom relative w-[310px] h-[310px] bg--400">
            <EditableImage link={image} setLink={setImage} />
          </div>
        </div>
        <form
          className="grow w-full"
          onSubmit={(ev) =>
            onSave(ev, {
              name: userName,
              image,
              phone,
              streetAddress,
              postalCode,
              city,
              country,
              admin,
            })
          }
        >
          <label>First and last name</label>
          <input
            value={userName}
            onChange={(ev) => setUserName(ev.target.value)}
            type="text"
            placeholder="First and Last Name"
          />
          <label>Email</label>
          <input
            className="text-center"
            type="email"
            disabled={true}
            value={user.email}
            placeholder="email"
          />
          <AddressInputs
            addressProps={{
              phone,
              streetAddress,
              postalCode,
              city,
              country,
            }}
            setAddressProp={handleAddressChange}
          />
          {loggedInUserData?.admin && (
            <div>
              <label
                className="p-2 inline-flex items-center gap-2 mb-2"
                htmlFor="adminCb"
              >
                <input
                  id="adminCb"
                  type="checkbox"
                  value={"1"}
                  checked={admin}
                  onChange={(ev) => setAdmin(ev.target.checked)}
                />
                <span>Admin</span>
              </label>
            </div>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
