import { useEffect, useState } from 'react';
import { activityService } from '@/services/activity.service';
import type { Activity } from '@/types/activity';
import { DataTable } from '@/components/ui/Table';

export default function MyActivities() {
  const [data, setData] = useState<Activity[]>([]);

  useEffect(() => {
    activityService.getMyActivities().then(setData);
  }, []);

  return (
    <main className="p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">กิจกรรมของฉัน</h2>

      <DataTable<Activity>
        columns={[
          { title: 'ชื่อกิจกรรม', key: 'title' },
          { title: 'ประเภท', key: 'type' },
          { title: 'วันที่', key: 'startDate' },
        ]}
        data={data}
        onRowClick={(row) => window.location.href = `/activities/${row.id}`}
        className="bg-white/80 dark:bg-neutral-800/80"
      />
    </main>
  );
}
