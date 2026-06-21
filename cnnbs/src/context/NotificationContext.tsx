// CO4: Global state architecture via React Context (notifications)
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { noticeData } from '../data/dummyData';

interface NotificationContextValue {
  unreadCount: number;
  markAllRead: () => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [readCount, setReadCount] = useState(0);
  const unreadCount = useMemo(() => Math.max(noticeData.length - readCount, 0), [readCount]);

  const markAllRead = () => setReadCount(noticeData.length);

  return (
    <NotificationContext.Provider value={{ unreadCount, markAllRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
