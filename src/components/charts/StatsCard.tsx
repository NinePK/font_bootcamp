import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-neutral-800 p-4 shadow-md flex items-center gap-4">
      {icon && <div className="text-violet-500">{icon}</div>}
      <div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
        <p className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}
