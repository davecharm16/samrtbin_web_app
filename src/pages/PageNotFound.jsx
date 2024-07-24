import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-dark">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">OPPS! Page not found.</p>
                    <p className="mb-4 text-lg text-gray-900">
                        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
