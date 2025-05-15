import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Users,
  ClipboardList,
  PlusSquare,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Check current mode from path
  const isStaffMode =
    location.pathname.startsWith('/staff/activities') ||
    location.pathname.startsWith('/staff/admin');

  const menuItems = [
    // Student Mode items
    { to: '/staff', icon: <Home size={20} />, label: 'แดชบอร์ด (นิสิต)' },
    {
      to: '/staff/student/activities',
      icon: <ClipboardList size={20} />,
      label: 'กิจกรรมทั้งหมด',
    },
    {
      to: '/staff/student/my-activities',
      icon: <ClipboardList size={20} />,
      label: 'กิจกรรมของฉัน',
    },
    { to: '/staff/student/profile', icon: <Users size={20} />, label: 'โปรไฟล์' },
    // Divider
    { to: '', icon: null, label: '', isDivider: true },
    // Staff Mode items
    { to: '/staff/admin', icon: <Home size={20} />, label: 'แดชบอร์ด (Staff)' },
    {
      to: '/staff/activities',
      icon: <ClipboardList size={20} />,
      label: 'จัดการกิจกรรม',
    },
    {
      to: '/staff/activities/create',
      icon: <PlusSquare size={20} />,
      label: 'สร้างกิจกรรม',
    },
    { to: '/staff/profile', icon: <Users size={20} />, label: 'จัดการผู้ใช้' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitch = () => {
    navigate(isStaffMode ? '/staff' : '/staff/admin');
    setOpen(false);
  };

  // Dynamic classes based on mode
  const bgGradient = isStaffMode
    ? 'bg-gradient-to-br from-violet-100 to-orange-50 dark:from-neutral-900 dark:to-orange-900'
    : 'bg-gradient-to-br from-violet-100 to-violet-50 dark:from-neutral-900 dark:to-neutral-800';
  const navGradient = isStaffMode
    ? 'bg-gradient-to-r from-violet-600 to-orange-500 dark:from-violet-400 dark:to-orange-400'
    : 'bg-gradient-to-r from-violet-600 to-purple-500 dark:from-violet-400 dark:to-purple-400';
  const activeNavGradient = isStaffMode
    ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]'
    : 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]';
  const hoverBg = isStaffMode
    ? 'hover:bg-orange-200/20 dark:hover:bg-orange-900/20 hover:text-orange-600'
    : 'hover:bg-violet-200/20 dark:hover:bg-violet-900/20 hover:text-violet-600';
  const hoverOverlay = isStaffMode
    ? 'bg-orange-400/20'
    : 'bg-violet-400/20';
  const borderColor = isStaffMode
    ? 'border-orange-300/30 dark:border-orange-900/30'
    : 'border-violet-300/30 dark:border-violet-900/30';

  return (
    <div className={`flex h-screen ${bgGradient} font-sans overflow-hidden transition-colors duration-300`}>
      {/* Sidebar - Desktop */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`hidden md:flex flex-col w-72 bg-white/10 dark:bg-neutral-950/10 backdrop-blur-xl shadow-2xl rounded-r-3xl border-r ${borderColor}`}
      >
        <div className="px-6 py-5 flex items-center gap-3">
          <motion.img
            src="/logo.png"
            alt="StaffHub"
            className="h-10 w-10 rounded-full"
            whileHover={{ scale: 1.2, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          />
          <span className={`text-2xl font-extrabold bg-clip-text text-transparent ${navGradient} animate-gradient`}>
            StaffHub
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item, i) =>
            item.isDivider ? (
              <motion.hr
                key={i}
                className={`my-2 ${borderColor}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                    isActive ? activeNavGradient : `text-neutral-700 dark:text-neutral-100 ${hoverBg}`
                  }`
                }
              >
                <motion.span
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.span>
                <span className={`absolute inset-0 rounded-xl ${hoverOverlay} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`} />
              </NavLink>
            )
          )}
        </nav>
        <div className={`p-4 border-t ${borderColor}`}>
          <motion.button
            onClick={handleSwitch}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white ${navGradient} hover:from-violet-700 hover:to-orange-600 rounded-xl transition-all shadow-md`}
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.97 }}
            aria-label={`สลับไปยังโหมด${isStaffMode ? 'นิสิต' : 'Staff'}`}
          >
            <RefreshCw size={20} />
            โหมด: {isStaffMode ? 'Staff' : 'นิสิต'}
          </motion.button>
        </div>
        <div className="p-4">
          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-100/20 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            whileHover={{ scale: 1.03, x: 5 }}
            whileTap={{ scale: 0.97 }}
            aria-label="ออกจากระบบ"
          >
            <LogOut size={20} />
            ออกจากระบบ
          </motion.button>
        </div>
      </motion.aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 120, damping: 20 }}
              className={`absolute left-0 top-0 h-full w-72 bg-white/10 dark:bg-neutral-950/10 backdrop-blur-xl shadow-2xl rounded-r-3xl border-r ${borderColor}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <span className={`text-2xl font-extrabold bg-clip-text text-transparent ${navGradient} animate-gradient`}>
                  StaffHub
                </span>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="text-neutral-500 dark:text-neutral-100 hover:text-orange-600 transition-colors"
                  whileHover={{ rotate: 180, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="ปิดเมนู"
                >
                  <X size={28} />
                </motion.button>
              </div>
              <nav className="px-4 space-y-2">
                {menuItems.map((item, i) =>
                  item.isDivider ? (
                    <motion.hr
                      key={i}
                      className={`my-2 ${borderColor}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `relative flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                          isActive ? activeNavGradient : `text-neutral-700 dark:text-neutral-100 ${hoverBg}`
                        }`
                      }
                      onClick={() => setOpen(false)}
                    >
                      <motion.span
                        className="flex items-center gap-4"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.span>
                      <span className={`absolute inset-0 rounded-xl ${hoverOverlay} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`} />
                    </NavLink>
                  )
                )}
              </nav>
              <div className={`p-4 border-t ${borderColor}`}>
                <motion.button
                  onClick={handleSwitch}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white ${navGradient} hover:from-violet-700 hover:to-orange-600 rounded-xl transition-all shadow-md`}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`สลับไปยังโหมด${isStaffMode ? 'นิสิต' : 'Staff'}`}
                >
                  <RefreshCw size={20} />
                  โหมด: {isStaffMode ? 'Staff' : 'นิสิต'}
                </motion.button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg shadow-lg px-6 py-4 flex items-center justify-between border-b ${borderColor}`}
        >
          <div className="flex items-center gap-4">
            <motion.button
              className="md:hidden text-neutral-700 dark:text-neutral-100 hover:text-orange-600 transition-colors"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="เปิดเมนู"
            >
              <Menu size={28} />
            </motion.button>
            <div className="flex items-center gap-3">
              <motion.div
                className={`h-12 w-12 rounded-full ${navGradient} flex items-center justify-center text-white font-semibold text-lg shadow-md`}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {user?.firstname?.[0]}{user?.lastname?.[0]}
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  สวัสดี, {user?.firstname} {user?.lastname}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  รหัส: {user?.sid}
                </div>
              </div>
            </div>
          </div>
          <motion.button
            onClick={handleSwitch}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white ${navGradient} hover:from-violet-700 hover:to-orange-600 rounded-lg transition-all shadow-md`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`สลับไปยังโหมด${isStaffMode ? 'นิสิต' : 'Staff'}`}
          >
            <RefreshCw size={18} />
            {isStaffMode ? 'Staff' : 'นิสิต'}
          </motion.button>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-violet-50/50 dark:bg-neutral-900/50 p-6 md:p-8 backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}