import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { newsService } from '../services/newsService';
import { noticeService } from '../services/noticeService';
import { eventService } from '../services/eventService';
import NewsCard from '../components/NewsCard';
import NoticeCard from '../components/NoticeCard';
import EventCard from '../components/EventCard';
import StatisticsCard from '../components/StatisticsCard';
import SkeletonCard from '../components/SkeletonCard';
import { statsData } from '../data/dummyData';

export default function Home() {
  const { data: news, loading: newsLoading } = useFetch(() => newsService.getAll(), []);
  const { data: notices, loading: noticesLoading } = useFetch(() => noticeService.getAll(), []);
  const { data: events, loading: eventsLoading } = useFetch(() => eventService.getAll(), []);

  const featuredNews = useMemo(() => news?.filter((n) => n.featured) ?? [], [news]);
  const latestNotices = useMemo(() => notices?.slice(0, 3) ?? [], [notices]);
  const upcomingEvents = useMemo(() => events?.slice(0, 3) ?? [], [events]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="hero__kicker">Issue No. 47 · Academic Year 2026</p>
          <h1 className="hero__title">Everything happening on campus, in one place.</h1>
          <p className="hero__sub">
            News, examination notices, and event announcements — verified by the college administration and
            updated daily.
          </p>
          <div className="d-flex gap-3 mt-4">
            <Link to="/notices" className="btn btn-oxblood btn-lg">View Notices</Link>
            <Link to="/events" className="btn btn-outline-brass btn-lg">Browse Events</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="row g-3">
          {statsData.map((stat) => (
            <div className="col-6 col-md-3" key={stat.id}>
              <StatisticsCard stat={stat} />
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="d-flex justify-content-between align-items-end">
          <h2 className="section-title mb-0">Featured News</h2>
          <Link to="/news" className="mb-3">See all news →</Link>
        </div>
        <div className="row g-4">
          {newsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div className="col-md-4" key={i}><SkeletonCard /></div>
              ))
            : featuredNews.map((item) => (
                <div className="col-md-4" key={item.id}><NewsCard item={item} /></div>
              ))}
        </div>
      </section>

      <section className="section container">
        <div className="d-flex justify-content-between align-items-end">
          <h2 className="section-title mb-0">Latest Notices</h2>
          <Link to="/notices" className="mb-3">See all notices →</Link>
        </div>
        <div className="row g-4">
          {noticesLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div className="col-md-4" key={i}><SkeletonCard /></div>
              ))
            : latestNotices.map((item) => (
                <div className="col-md-4" key={item.id}><NoticeCard item={item} /></div>
              ))}
        </div>
      </section>

      <section className="section container">
        <div className="d-flex justify-content-between align-items-end">
          <h2 className="section-title mb-0">Upcoming Events</h2>
          <Link to="/events" className="mb-3">See all events →</Link>
        </div>
        <div className="row g-4">
          {eventsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div className="col-md-4" key={i}><SkeletonCard /></div>
              ))
            : upcomingEvents.map((item) => (
                <div className="col-md-4" key={item.id}><EventCard item={item} /></div>
              ))}
        </div>
      </section>
    </>
  );
}
