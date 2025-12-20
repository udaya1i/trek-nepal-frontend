import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { Checkbox } from "../../../components/ui/Checkbox";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";
import type { RegisterFormData, FormErrors, ExperienceLevel } from "../types";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experienceLevel: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const experienceLevels: ExperienceLevel[] = [
    {
      value: "beginner",
      label: "Beginner",
      description: "First time trekker",
    },
    {
      value: "intermediate",
      label: "Intermediate",
      description: "Some trekking experience",
    },
    {
      value: "advanced",
      label: "Advanced",
      description: "Experienced trekker",
    },
    {
      value: "expert",
      label: "Expert",
      description: "Professional level",
    },
  ];

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Please select your experience level";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.fullName);
      navigate("/landing-home");
      setIsLoading(false);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const getPasswordStrengthColor = (): string => {
    if (passwordStrength < 40) return "bg-error";
    if (passwordStrength < 70) return "bg-warning";
    return "bg-success";
  };

  const getPasswordStrengthText = (): string => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Medium";
    return "Strong";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="explorer@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          disabled={isLoading}
        />
      </div>

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {getPasswordStrengthText()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={
            showConfirmPassword ? "Hide password" : "Show password"
          }
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
        </button>
      </div>

      <div>
        <Select
          label="Experience Level"
          placeholder="Select your trekking experience"
          options={experienceLevels}
          value={formData.experienceLevel}
          onChange={(value) =>
            handleChange({
              target: { name: "experienceLevel", value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          error={errors.experienceLevel}
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => alert("Terms of Service")}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => alert("Privacy Policy")}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData.agreeToTerms}
          onChange={handleChange}
          name="agreeToTerms"
          error={errors.agreeToTerms}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        Create Account
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;