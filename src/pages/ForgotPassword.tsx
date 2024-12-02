import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
interface LoginForm {
  email: string;
  newPassword: string;
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
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
  margin-top: 15px;

  &:hover {
    background-color: #eaddd7;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ForgotPassword = () => {
  const history = useHistory();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    newPassword: "",
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

    if (!formData.newPassword) {
      validationErrors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 6) {
      validationErrors.newPassword = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.newPassword) {
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
    if (formData.email === "user123@gmail.com") {
      history.push("/sign_in");
    } else {
      setErrors({
        email: "Email does not exist in the system",
      });
    }
    // eslint-disable-next-line no-restricted-globals
    setIsSubmitting(false);
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Reset Password</Title>
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
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                hasError={!!errors.newPassword}
              />
            </div>

            {errors.newPassword && (
              <ErrorMessage>{errors.newPassword}</ErrorMessage>
            )}
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </SubmitButton>
        </StyledForm>
      </FormWrapper>
    </Container>
  );
};

export default ForgotPassword;
