import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';
import AuthLayout from '../../components/layout/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Determine where to redirect after login (default: /dashboard)
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  /**
   * One-Click Demo Login: Perfect for quick evaluation during viva!
   */
  const handleDemoLogin = async () => {
    try {
      await login('john.doe@interviewsense.ai', 'demo1234');
      navigate(from, { replace: true });
    } catch (err) {
      setError('Demo login failed.');
    }
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to track your mock interview performance and AI reports."
    >
      {/* 1-Click Demo Login Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#8c60a2]/10 via-[#ce93cb]/10 to-[#fa846e]/10 border border-[#ce93cb]/40 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#6e4876]">Project Evaluation Demo</p>
          <p className="text-[11px] text-[#8c60a2]">Quick sign in with preloaded mock candidate data</p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={handleDemoLogin}
          isLoading={isLoading}
          leftIcon={Zap}
          className="shrink-0"
        >
          Demo Login
        </Button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-1.5">
          <Input
            label="Password"
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            leftIcon={Lock}
            rightIcon={() => (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#a08ba7] hover:text-[#6e4876] focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            required
          />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-[#6e5975] cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-[#ede3f0] text-[#8c60a2] focus:ring-[#8c60a2]"
            />
            <span>Remember me</span>
          </label>

          <a href="#" className="font-semibold text-[#8c60a2] hover:text-[#6e4876]">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Sign In to Dashboard
        </Button>
      </form>

      {/* Switch to Register */}
      <p className="text-center text-xs text-[#6e5975] pt-2">
        Don't have an account yet?{' '}
        <Link to={ROUTES.REGISTER} className="font-bold text-[#8c60a2] hover:text-[#6e4876]">
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;