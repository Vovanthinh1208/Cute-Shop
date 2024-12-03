import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import bcrypt from "bcryptjs";
import styled from "styled-components";

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

    if (!formData.email) {
      validationErrors.email = "Email is required.";
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
    if (!storedUserData) {
      setErrors({
        email: "User not found",
      });
      setIsSubmitting(false);
      return;
    }

    const parsedUserData = JSON.parse(storedUserData);
    const isPasswordValid = bcrypt.compareSync(
      formData.password,
      parsedUserData.password
    );
    if (!isPasswordValid) {
      setErrors({
        password: "Incorrect password",
      });
      setIsSubmitting(false);
      return;
    }

    // Lưu token vào localStorage
    localStorage.setItem("token", "valid_token");

    // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
    history.push("/");

    setIsSubmitting(false);
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            hasError={!!errors.email}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default SignIn;
