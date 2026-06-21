// CO1: Component-driven UI structure
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h6>The Quad Gazette</h6>
            <p className="small">
              The official news and notice board of the college, keeping students, faculty, and staff connected.
            </p>
          </div>
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><a href="/news">News</a></li>
              <li><a href="/notices">Notices</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6>Contact</h6>
            <address className="small mb-0">
              College Administrative Block<br />
              Main Campus Road, Vijayawada<br />
              info@college.edu
            </address>
          </div>
        </div>
        <hr className="border-secondary mt-4" />
        <p className="small mb-0 text-center">© {new Date().getFullYear()} College News &amp; Notice Board System. Built for academic demonstration.</p>
      </div>
    </footer>
  );
}
