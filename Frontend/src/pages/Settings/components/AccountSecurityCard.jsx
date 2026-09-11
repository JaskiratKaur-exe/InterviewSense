import React, { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Lock, Bell, CheckCircle2 } from 'lucide-react';

export function AccountSecurityCard() {
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [emailDigest, setEmailDigest] = useState(true);
  const [practiceReminders, setPracticeReminders] = useState(true);
  const [isUpdatingPass, setIsUpdatingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsUpdatingPass(true);
    setTimeout(() => {
      setIsUpdatingPass(false);
      setPassSuccess(true);
      setPasswords({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setPassSuccess(false), 3000);
    }, 900);
  };

  return (
    <Card className="border border-[#ede3f0] space-y-5">
      <CardHeader className="mb-1">
        <div>
          <CardTitle>Account Security & Notifications</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Manage your credentials and email digest preferences.
          </p>
        </div>
      </CardHeader>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordSubmit} className="space-y-3 pb-4 border-b border-[#ede3f0]/80">
        <Input
          label="Current Password"
          type="password"
          placeholder="••••••••"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          leftIcon={Lock}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="New Password"
            type="password"
            placeholder="Min 8 characters"
            value={passwords.newPass}
            onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
            leftIcon={Lock}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            leftIcon={Lock}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {passSuccess && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Password updated!
            </span>
          )}
          <Button
            type="submit"
            size="sm"
            isLoading={isUpdatingPass}
            className="ml-auto"
          >
            Update Password
          </Button>
        </div>
      </form>

      {/* Notification Preferences */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold text-[#2b1d30]">
          Email Digest & Reminders:
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-[#faf8fb] border border-[#ede3f0] cursor-pointer">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#8c60a2]" />
            <div>
              <p className="text-xs font-bold text-[#2b1d30]">Session Report Email Notification</p>
              <p className="text-[10px] text-[#6e5975]">Receive a PDF summary immediately after AI processing.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={emailDigest}
            onChange={(e) => setEmailDigest(e.target.checked)}
            className="rounded border-[#ede3f0] text-[#8c60a2] focus:ring-[#8c60a2]"
          />
        </label>

        <label className="flex items-center justify-between p-3 rounded-xl bg-[#faf8fb] border border-[#ede3f0] cursor-pointer">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#fa846e]" />
            <div>
              <p className="text-xs font-bold text-[#2b1d30]">Weekly Practice Streak Reminder</p>
              <p className="text-[10px] text-[#6e5975]">Remind me if I haven't practiced in 3 days.</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={practiceReminders}
            onChange={(e) => setPracticeReminders(e.target.checked)}
            className="rounded border-[#ede3f0] text-[#8c60a2] focus:ring-[#8c60a2]"
          />
        </label>
      </div>
    </Card>
  );
}

export default AccountSecurityCard;
