import '@/common/styles/not-found.scss';
import Link from 'next/link';

export default async function NotFound() {
  return (
    <div className="not-found padding">
      <div className="not-found-404">Oops! Error 404</div>

      <div className="not-found-content">
        <h1 className="not-found-title">Page Not Found</h1>

        <p className="not-found-text">
          <span>{`We can\'t seem to find the page you're looking for.`}</span>
          <br />
          <span>Go to the home page to start over.</span>
        </p>
        <Link href="/">
          <button className="btn btn-primary btn-sm">Go To Home Page </button>
        </Link>
      </div>
    </div>
  );
}
