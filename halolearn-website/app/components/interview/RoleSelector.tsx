'use client';

import { interviewData } from '../../data/interviewQuestions';

type RoleKey = keyof typeof interviewData;

interface RoleSelectorProps {
  roles: RoleKey[];
  selectedRole: RoleKey;
  onSelectRole: (role: RoleKey) => void;
}

const roleLabels: Record<RoleKey, string> = {
  hr_staff: 'HR Staff',
  admin_secretary: 'Admin / Secretary',
};

const roleEmojis: Record<RoleKey, string> = {
  hr_staff: '👔',
  admin_secretary: '📋',
};

export default function RoleSelector({
  roles,
  selectedRole,
  onSelectRole,
}: RoleSelectorProps) {
  return (
    <div className="mb-12">
      <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide mb-4">
        Pilih Role
      </h2>
      <div className="flex flex-wrap gap-3">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => onSelectRole(role)}
            className={`px-6 py-3 rounded-lg font-medium transition flex items-center gap-2 ${
              selectedRole === role
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg">{roleEmojis[role]}</span>
            {roleLabels[role]}
          </button>
        ))}

        {/* Locked Roles */}
        <button
          disabled
          className="px-6 py-3 rounded-lg font-medium bg-slate-100 text-slate-400 cursor-not-allowed flex items-center gap-2 opacity-60"
        >
          <span className="text-lg">🎯</span>
          <span>Marketing</span>
          <span className="text-lg">🔒</span>
        </button>
        <button
          disabled
          className="px-6 py-3 rounded-lg font-medium bg-slate-100 text-slate-400 cursor-not-allowed flex items-center gap-2 opacity-60"
        >
          <span className="text-lg">💰</span>
          <span>Finance</span>
          <span className="text-lg">🔒</span>
        </button>
        <button
          disabled
          className="px-6 py-3 rounded-lg font-medium bg-slate-100 text-slate-400 cursor-not-allowed flex items-center gap-2 opacity-60"
        >
          <span className="text-lg">💻</span>
          <span>IT</span>
          <span className="text-lg">🔒</span>
        </button>
      </div>
    </div>
  );
}
