import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl"
      >
        <h1 className="text-6xl font-bold text-secondary mb-4">404</h1>
        <p className="text-xl text-neutral-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-sm shadow hover:bg-primary-dark transition"
        >
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
