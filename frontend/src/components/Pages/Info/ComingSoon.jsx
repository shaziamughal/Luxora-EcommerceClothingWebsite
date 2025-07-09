import React from 'react';
import { Link } from 'react-router-dom';
import { Clock10 } from 'lucide-react';
import { motion } from 'framer-motion';

const ComingSoon = () => {
return (
<div className="pt-24 pb-16 flex flex-col items-center justify-center text-center container-custom">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="max-w-lg"
>
<div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-100 rounded-full mb-6">
<Clock10 size={32} className="text-neutral-500" />
</div>

    <h1 className="font-heading text-3xl font-semibold mb-4 text-secondary">
      Coming Soon
    </h1>

    <p className="text-neutral-600 mb-6">
      This page is currently under construction. We’re working hard to bring something exciting very soon!
    </p>

    <Link to="/" className="btn-primary inline-block">
      Go to Home
    </Link>
  </motion.div>
</div>
);
};

export default ComingSoon;

