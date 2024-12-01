import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface LoginForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.span`
  font-size: 1.5rem;
  color: #333;
  font-weight: 400;
  display: inline-block;
`;
const TitleS = styled.span`
  font-size: 1.5rem;
  color: #ab7a5f;
  font-style: italic;
  display: inline-block;
  margin-left: 52px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 18px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  color: #333;
  display: flex;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ddd")};
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: ${({ hasError }) => (hasError ? "red" : "#4f46e5")};
    box-shadow: 0 0 0 2px
      ${({ hasError }) =>
        hasError ? "rgba(255, 0, 0, 0.3)" : "rgba(79, 70, 229, 0.3)"};
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.75rem;
  color: red;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #ab7a5f;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #eaddd7;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SignUp = () => {
  const history = useHistory();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof LoginForm]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = (): Partial<LoginForm> => {
    const validationErrors: Partial<LoginForm> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!formData.name) {
      validationErrors.name = "Name is required.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    history.push("/sign_in");

    setIsSubmitting(false);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign Up</Title>
        <TitleS> Hello To Cute Shop</TitleS>

        <StyledForm onSubmit={handleSubmit}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label htmlFor="email">Email address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                hasError={!!errors.email}
              />
            </div>

            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                hasError={!!errors.name}
              />
            </div>

            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                hasError={!!errors.password}
              />
            </div>

            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                hasError={!!errors.confirmPassword}
              />
            </div>

            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </div>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Sign Up"}
          </SubmitButton>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
