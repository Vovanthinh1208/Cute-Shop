import React, { useState } from "react";
import styled from "styled-components";
import CartOrder from "../../src/components/CartOrder";
import { Link, useLocation, useHistory } from "react-router-dom";

const inputs: any[] = [
  {
    level: "Name",
    type: "text",
    placeholder: "userTest",
    for: "name",
    required: true,
  },
  {
    level: "Email",
    type: "email",
    placeholder: "user@gmail.com",
    for: "email",
    required: true,
  },
  {
    level: "Country",
    type: "text",
    placeholder: "VietNam",
    for: "country",
    required: true,
  },
  {
    level: "Street Address",
    type: "text",
    placeholder: "11 To Huu, DaNang",
    for: "address",
    required: true,
  },

  {
    level: "Phone",
    type: "number",
    placeholder: "+84016999789",
    for: "phone",
    required: true,
  },
];

const progressBardetails: any[] = [
  { value: "1", active: true },
  { value: "2", active: true },
  { value: "3", active: false },
];

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  height: 40px;
  padding: 12px;
  display: flex;
  gap: 6px;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(29, 78, 216, 0.1);
  border-radius: 8px;
  border: 1px solid #4b5563;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #1e3a8a;
  }
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
`;

const ProgressStep = styled.span<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  fon-size: 12px;
  background-color: ${(props) => (props.active ? "#AB7A5F" : "#e5e7eb")};
  color: ${(props) => (props.active ? "#fff" : "#4b5563")};
  cursor: pointer;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  border-top: 2px dashed #d1d5db;
`;

const PaymentSection = styled.div`
  background-color: white;
  padding: 0 24px 24px 24px;
  border-radius: 8px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #ab7a5f;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const PaymentPage = () => {
  const location = useLocation();
  const history = useHistory();
  const target =
    location.pathname === "/order" ? "/successful_payment" : "/order";

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
    setErrors((prev: any) => ({
      ...prev,
      [id]: "",
    }));
  };
  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    inputs.forEach(({ for: field, level, required, type }) => {
      const value = formData[field] || "";

      if (required && !value.trim()) {
        validationErrors[field] = `This field is required`;
      } else if (
        type === "email" &&
        value &&
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ) {
        validationErrors[field] = "Invalid email format";
      }
    });

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form Data:", formData);

      if (location.pathname === "/order") {
        history.push("/successful_payment");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        maxWidth: "1000px",
        marginLeft: "120px",
      }}
      className=""
    >
      <div style={{ width: "100%" }} className="">
        <h4>Complete Your Order</h4>
        <ProgressBarContainer>
          {progressBardetails.map((step, index) => (
            <>
              <ProgressStep key={index} active={step.active}>
                {step.value}
              </ProgressStep>
              {index < progressBardetails.length - 1 && <ProgressLine />}
            </>
          ))}
        </ProgressBarContainer>
        <InputGroup>
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <div style={{ marginTop: "5px" }} key={index}>
                <Label htmlFor={input.for}>{input.level}</Label>
                <Input
                  type={input.type}
                  id={input.for}
                  placeholder={input.placeholder}
                  required={input.required}
                  value={formData[input.for] || ""}
                  onChange={handleChange}
                />
                {errors[input.for] && (
                  <p className="error" style={{ color: "red" }}>
                    {errors[input.for]}
                  </p>
                )}
              </div>
            ))}
            <Button
              style={{ marginTop: "50px" }}
              onClick={handleSubmit}
              type="submit"
              className="btn"
            >
              Payment
            </Button>
          </form>
        </InputGroup>
      </div>
      <div style={{ width: "100%" }}>
        <PaymentSection>
          <h4>Order Summary</h4>

          <Wrapper className="page">
            <CartOrder />
          </Wrapper>
        </PaymentSection>
      </div>
    </div>
  );
};
const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;

export default PaymentPage;
