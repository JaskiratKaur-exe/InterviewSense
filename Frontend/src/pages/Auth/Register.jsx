import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export function Register() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await register({
        ...formData,
        targetRole: 'Software Engineer', // Default role; configurable on Dashboard
      });
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Create an account 🚀"
      subtitle="Start your multi-modal AI interview preparation journey today."
    >
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          name="name"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={handleChange}
          leftIcon={User}
          required
        />

        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          leftIcon={Mail}
          required
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          leftIcon={Lock}
          required
        />

        <Button
          type="submit"
          className="w-full mt-2"
          size="lg"
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Create Candidate Account
        </Button>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-xs text-[#6e5975] pt-2">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-bold text-[#8c60a2] hover:text-[#6e4876]">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;