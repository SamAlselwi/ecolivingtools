'use client'
import '@/common/styles/not-found.scss';
 
export default function Error({
  reset,
}: {
  reset: () => void
}) {
  return (
    <div className="not-found padding">
      <div className="not-found-404">
        Oops! Error
      </div>

      <div className="not-found-content">
        <h1 className="not-found-title">Something went wrong!</h1>
        <button className="btn btn-primary btn-sm" onClick={() => reset()}>Try again </button>
      </div>
    </div>
  )
}