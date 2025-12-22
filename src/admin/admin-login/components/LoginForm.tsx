import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

import Icon from 'components/ui/AppIcon';
import Image from 'components/ui/AppImage';
import type { LoginFormData, LoginError, AdminRole } from '../types';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
  error: LoginError;
}

const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
    role: 'admin',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const adminRoles: AdminRole[] = [
    {
      value: 'admin',
      label: 'Platform Administrator',
      description: 'Full system access and control',
    },
    {
      value: 'moderator',
      label: 'Content Moderator',
      description: 'Content review and approval',
    },
    {
      value: 'coordinator',
      label: 'Safety Coordinator',
      description: 'Trail conditions and emergency updates',
    },
    {
      value: 'analytics',
      label: 'Analytics Manager',
      description: 'Platform performance tracking',
    },
  ];

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptCount((prev) => prev + 1);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Select
          label="Admin Role"
          description="Select your administrative role"
          options={adminRoles}
          value={formData.role}
          onChange={(value) => handleInputChange('role', value as string)}
          required
          className="mb-6"
        />
      </div>

      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="admin@nepaltrek.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={error.email}
          required
          disabled={isLoading}
          className="w-full"
        />
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={error.password}
            required
            disabled={isLoading}
            className="w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-smooth"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
      </div>

      {error.general && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-error/10 border border-error/20">
          <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-error">{error.general}</p>
            {attemptCount >= 3 && (
              <p className="text-xs text-error/80 mt-1">
                Multiple failed attempts detected. Please verify your credentials.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          className="text-sm font-medium text-accent hover:text-accent/80 transition-smooth"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        Sign In to Dashboard
      </Button>

      {attemptCount >= 5 && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
          <Icon name="Shield" size={16} className="text-warning" />
          <p className="text-xs text-warning">
            Account will be temporarily locked after 10 failed attempts
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;