import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import bcrypt from "bcryptjs";

interface LoginForm {
  email: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 14px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
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

  &:hover {
    background-color: #eaddd7;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
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

const SignIn = () => {
  const history = useHistory();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
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

    if (!formData.password) {
      validationErrors.password = "Password is required.";
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

    const storedUserData = localStorage.getItem(formData.email);
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      const passwordMatch = bcrypt.compareSync(
        formData.password,
        parsedData.password
      );

      if (passwordMatch) {
        history.push("/");
      } else {
        setErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      }
    } else {
      setErrors({
        email: "Invalid email or password.",
        password: "Invalid email or password.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Sign In</Title>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </SubmitButton>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
