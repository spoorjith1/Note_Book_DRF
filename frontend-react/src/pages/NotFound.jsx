import React from 'react'

function NotFound() {
  return (
    <>
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-5 shadow rounded-4 bg-dark text-light">
        <h1 className="display-1 fw-bold text-warning">404</h1>
        <h3 className="mb-3">Page Not Found</h3>
        <p className="text-secondary mb-4">
          The page you're looking for doesn’t exist.
        </p>

        <a href="/" className="btn btn-warning px-4 fw-semibold">
          Go Home
        </a>
      </div>
    </div>
    </>
  )
}

export default NotFound
