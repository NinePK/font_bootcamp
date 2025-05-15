import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { userService } from '@/services/user.service';
import type { User } from '@/types/user';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      userService.getProfile().then((res) => {
        setForm(res);
      });
    }
  }, [user]);

  const handleChange = (key: keyof User, value: string) => {
    if (!form) return;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const updated = await userService.updateProfile(form);
    setUser(updated);
  };

  if (!form) return <p className="p-4">กำลังโหลดข้อมูล...</p>;

  return (
    <main className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">โปรไฟล์</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white/80 dark:bg-neutral-800/80 p-6 rounded-xl shadow-md"
      >
        <Input
          label="ชื่อจริง"
          value={form.firstname}
          onChange={(e) => handleChange('firstname', e.target.value)}
        />
        <Input
          label="นามสกุล"
          value={form.lastname}
          onChange={(e) => handleChange('lastname', e.target.value)}
        />
        <Input
          label="รหัสนิสิต"
          value={form.sid}
          onChange={(e) => handleChange('sid', e.target.value)}
          disabled
        />
        <Input
          label="อีเมล"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="ชั่วโมงสะสม" value={form.hours.toString()} disabled />
          <Input label="คะแนนสะสม" value={form.points.toString()} disabled />
        </div>
        <Button type="submit">บันทึก</Button>
      </form>
    </main>
  );
}
