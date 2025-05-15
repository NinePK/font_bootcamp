import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { activityService } from '@/services/activity.service';
import type { ActivityDetail } from '@/types/activity';
import { useAuth } from '@/hooks/useAuth';

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) activityService.getById(id).then(setActivity);
  }, [id]);

  const handleToggle = async () => {
    if (!activity) return;
    setLoading(true);
    await activityService.toggleRegistration(activity.id);
    const updated = await activityService.getById(activity.id);
    setActivity(updated);
    setLoading(false);
  };

  if (!activity) return <p className="p-4">กำลังโหลดข้อมูล...</p>;

  return (
    <main className="p-4 md:p-8 space-y-6">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
        {activity.title}
      </h1>
      <p className="text-neutral-700 dark:text-neutral-300">{activity.description}</p>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-neutral-700 dark:text-neutral-300">
        <div>
          <dt className="font-semibold">ประเภท</dt>
          <dd>{activity.type}</dd>
        </div>
        <div>
          <dt className="font-semibold">ช่วงเวลา</dt>
          <dd>
            {activity.startDate} - {activity.endDate}
          </dd>
        </div>
        <div>
          <dt className="font-semibold">จำนวนรับสมัคร</dt>
          <dd>
            {activity.currentParticipants}/{activity.maxParticipants} คน
          </dd>
        </div>
        <div>
          <dt className="font-semibold">สถานะ</dt>
          <dd>{activity.isRegistered ? 'สมัครแล้ว' : 'ยังไม่สมัคร'}</dd>
        </div>
      </dl>

      {user?.role === 'STUDENT' && (
        <Button
          onClick={handleToggle}
          disabled={loading}
          className="w-full sm:w-64"
        >
          {activity.isRegistered ? 'ยกเลิกการสมัคร' : 'สมัครเข้าร่วม'}
        </Button>
      )}
    </main>
  );
}
