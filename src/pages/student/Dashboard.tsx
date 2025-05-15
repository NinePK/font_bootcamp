import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { StatsCard } from '@/components/charts/StatsCard';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { activityService } from '@/services/activity.service';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    registered: 0,
    hours: 0,
    points: 0,
  });

  useEffect(() => {
    activityService.getMySummary().then(setSummary);
  }, []);

  return (
    <main className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        ยินดีต้อนรับ, {user?.firstname} {user?.lastname}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard title="กิจกรรมที่เข้าร่วม" value={summary.registered.toString()} />
        <StatsCard title="ชั่วโมงสะสม" value={summary.hours.toString()} />
        <StatsCard title="คะแนนสะสม" value={summary.points.toString()} />
      </div>

      <div className="flex gap-3 mt-6">
        <Button onClick={() => navigate('/activities')}>ค้นหากิจกรรม</Button>
        <Button variant="outline" onClick={() => navigate('/profile')}>โปรไฟล์</Button>
      </div>
    </main>
  );
}
