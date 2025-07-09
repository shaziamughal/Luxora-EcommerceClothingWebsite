import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // In a real app, this would send the email to a backend service
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the submitted state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };
  
  return (
    <section className="bg-primary/10 py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-3 text-secondary">
            Join Our Newsletter
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, special offers, and exclusive content.
          </p>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-success/10 text-success rounded-sm p-4"
            >
              Thank you for subscribing! We've sent a confirmation to your email.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="input-field flex-grow"
                required
              />
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center whitespace-nowrap"
              >
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};