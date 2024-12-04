import FormField from "./FormField";

const BillingDetailsFields = () => {
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Cute Buddy",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "hello@cutebuddy.com",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "185 Berry St. Suite 550",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "San Francisco",
      required: true,
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "California",
      required: true,
    },
    { name: "zip", label: "ZIP", type: "text", placeholder: "94103" },
    {
      name: "country",
      label: "Country",
      type: "text",
      placeholder: "USA",
      required: true,
    },
  ];

  return (
    <>
      {fields.map(({ name, label, type, placeholder, required }) => (
        <FormField
          key={name}
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      ))}
    </>
  );
};

export default BillingDetailsFields;
