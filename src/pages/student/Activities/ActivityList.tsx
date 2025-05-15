import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/Table';
import Select from '@/components/ui/Select';
import Pagination from '@/components/ui/Pagination';
import { usePaginate } from '@/hooks/usePaginate';
import { activityService } from '@/services/activity.service';
import type { Activity, ActivityType } from '@/types/activity';

const TYPE_OPTIONS = [
  { label: 'ทุกประเภท', value: '' },
  { label: 'อาสา', value: 'VOLUNTEER' },
  { label: 'ช่วยงาน', value: 'WORK' },
  { label: 'อบรม', value: 'TRAINING' },
];

export default function ActivityList() {
  const { page, limit, setPage } = usePaginate();
  const [type, setType] = useState<ActivityType | ''>('');
  const [data, setData] = useState<{ items: Activity[]; total: number }>({
    items: [],
    total: 0,
  });

  useEffect(() => {
    activityService.getApproved({ page, limit, type }).then(setData);
  }, [page, limit, type]);

  return (
    <main className="p-4 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
        รายการกิจกรรมที่เปิดรับ
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Select
          label="ประเภทกิจกรรม"
          value={type}
          onChange={(e) => {
            setType(e.currentTarget.value as ActivityType);
            setPage(1);
          }}
          options={TYPE_OPTIONS}
          className="w-full sm:w-60"
        />
      </div>

      <DataTable<Activity>
        columns={[
          { title: 'ชื่อกิจกรรม', key: 'title' },
          { title: 'ประเภท', key: 'type' },
          { title: 'วันที่', key: 'startDate' },
        ]}
        data={data.items.map((a) => ({
          ...a,
          startDate: `${a.startDate} – ${a.endDate}`,
        }))}
        onRowClick={(row) => window.location.href = `/activities/${row.id}`}
        className="bg-white/80 dark:bg-neutral-800/80 rounded-xl shadow"
      />

      <Pagination
        page={page}
        total={data.total}
        limit={limit}
        onChange={setPage}
      />
    </main>
  );
}
