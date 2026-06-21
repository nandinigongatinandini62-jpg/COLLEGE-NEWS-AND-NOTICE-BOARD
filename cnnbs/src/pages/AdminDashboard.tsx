import { useFetch } from '../hooks/useFetch';
import { newsService } from '../services/newsService';
import { noticeService } from '../services/noticeService';
import { eventService } from '../services/eventService';
import { useAuth } from '../context/AuthContext';
import StatisticsCard from '../components/StatisticsCard';
import { statsData } from '../data/dummyData';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: news, loading: l1 } = useFetch(() => newsService.getAll(), []);
  const { data: notices, loading: l2 } = useFetch(() => noticeService.getAll(), []);
  const { data: events, loading: l3 } = useFetch(() => eventService.getAll(), []);

  return (
    <div className="container section">
      <p className="eyebrow">Staff Dashboard</p>
      <h1 className="section-title">Welcome, {user?.name}</h1>

      <div className="row g-3 mb-5">
        {statsData.map((stat) => (
          <div className="col-6 col-md-3" key={stat.id}>
            <StatisticsCard stat={stat} />
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <h2 className="h5">News Articles {l1 ? '' : `(${news?.length})`}</h2>
          <ul className="list-group">
            {(news ?? []).map((n) => (
              <li className="list-group-item" key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h2 className="h5">Notices {l2 ? '' : `(${notices?.length})`}</h2>
          <ul className="list-group">
            {(notices ?? []).map((n) => (
              <li className="list-group-item" key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h2 className="h5">Events {l3 ? '' : `(${events?.length})`}</h2>
          <ul className="list-group">
            {(events ?? []).map((n) => (
              <li className="list-group-item" key={n.id}>{n.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
