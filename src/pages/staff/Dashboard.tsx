import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '@/components/charts/StatsCard';
import Button from '@/components/ui/Button';
import { activityService } from '@/services/activity.service';

interface StaffSummary {
  totalActivities: number;
  pendingApprovals: number;
  upcomingActivities: number;
}

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<StaffSummary>({
    totalActivities: 0,
    pendingApprovals: 0,
    upcomingActivities: 0,
  });

  useEffect(() => {
    activityService.getStaffSummary().then(setSummary);
  }, []);

  return (
    <main className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        สรุปภาพรวม (Staff)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="กิจกรรมทั้งหมด"
          value={summary.totalActivities.toString()}
        />
        <StatsCard
          title="รออนุมัติ"
          value={summary.pendingApprovals.toString()}
        />
        <StatsCard
          title="กิจกรรมกำลังจะมาถึง"
          value={summary.upcomingActivities.toString()}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button onClick={() => navigate('/staff/activities/create')}>
          สร้างกิจกรรมใหม่
        </Button>
        <Button variant="outline" onClick={() => navigate('/staff/activities')}>
          จัดการกิจกรรม
        </Button>
      </div>
    </main>
  );
}
