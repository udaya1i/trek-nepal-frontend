import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Icon from 'components/ui/AppIcon';
import type { LoginFormData, LoginError, MockCredentials } from './types';
import LoginForm from './components/LoginForm';
import SecurityNotice from './components/SecurityNotification';
import CredentialsInfo from './components/CredentialsInfo';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError>({});
  const [sessionWarning, setSessionWarning] = useState(false);

  const mockCredentials: MockCredentials[] = [
    {
      email: 'admin@nepaltrek.com',
      password: 'Admin@2025',
      role: 'admin',
      name: 'Platform Administrator',
    },
    {
      email: 'moderator@nepaltrek.com',
      password: 'Mod@2025',
      role: 'moderator',
      name: 'Content Moderator',
    },
    {
      email: 'safety@nepaltrek.com',
      password: 'Safety@2025',
      role: 'coordinator',
      name: 'Safety Coordinator',
    },
    {
      email: 'analytics@nepaltrek.com',
      password: 'Analytics@2025',
      role: 'analytics',
      name: 'Analytics Manager',
    },
  ];

  useEffect(() => {
    const sessionExpired = localStorage.getItem('sessionExpired');
    if (sessionExpired === 'true') {
      setSessionWarning(true);
      localStorage.removeItem('sessionExpired');
      setTimeout(() => setSessionWarning(false), 5000);
    }
  }, []);

  const validateForm = (data: LoginFormData): LoginError => {
    const errors: LoginError = {};

    if (!data.email) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleLogin = async (data: LoginFormData) => {
    setError({});
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const validCredential = mockCredentials.find(
        (cred) =>
          cred.email === data.email &&
          cred.password === data.password &&
          cred.role === data.role
      );

      if (validCredential) {
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminRole', data.role);
        localStorage.setItem('adminEmail', data.email);
        localStorage.setItem('adminName', validCredential.name);
        if (data.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        navigate('/admin-dashboard');
      } else {
        setError({
          general: `Invalid credentials. Please check your email, password, and selected role. Use the demo credentials provided below.`,
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Nepal Trek Explorer</title>
        <meta
          name="description"
          content="Secure login portal for Nepal Trek Explorer administrators"
        />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          {sessionWarning && (
            <div className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/20 animate-slideDown">
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-warning">Session Expired</p>
                  <p className="text-xs text-warning/80 mt-1">
                    Your session has timed out due to inactivity. Please sign in again.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-card rounded-lg shadow-elevation-3 p-6 md:p-8 lg:p-10 border border-border">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-foreground"
                  />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                Admin Portal
              </h1>
              <p className="text-sm md:text-base text-muted-foreground caption">
                Nepal Trek Explorer Management System
              </p>
            </div>

            <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />

            <SecurityNotice />

            <CredentialsInfo credentials={mockCredentials} />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground caption">
              &copy; {new Date().getFullYear()} Nepal Trek Explorer. All rights reserved.
            </p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth caption">
                Privacy Policy
              </button>
              <span className="text-muted-foreground">•</span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth caption">
                Terms of Service
              </button>
              <span className="text-muted-foreground">•</span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth caption">
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;