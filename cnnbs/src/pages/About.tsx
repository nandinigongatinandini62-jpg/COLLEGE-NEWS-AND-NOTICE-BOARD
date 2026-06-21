export default function About() {
  return (
    <div className="container section" style={{ maxWidth: 760 }}>
      <p className="eyebrow">About</p>
      <h1 className="section-title">About the Notice Board System</h1>
      <p>
        The College News &amp; Notice Board System is the official digital home for campus communication,
        replacing scattered paper notices with a single, searchable, always-up-to-date portal for students,
        faculty, and administrators.
      </p>
      <p>
        Built as a front-end engineering capstone, the system demonstrates component-driven architecture,
        typed service layers, client-side routing, accessible forms, and a responsive, dark-mode-ready interface
        — all running entirely in the browser against a typed mock data layer that mirrors a production API.
      </p>
      <h2 className="h4 mt-4">What you'll find here</h2>
      <ul>
        <li>Verified campus news and department announcements</li>
        <li>Examination, fee, and administrative notices</li>
        <li>A live calendar of workshops, fests, and placement events</li>
        <li>A staff dashboard for managing day-to-day updates</li>
      </ul>
    </div>
  );
}
