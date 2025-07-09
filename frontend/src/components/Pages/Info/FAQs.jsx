import React from 'react';

export const FAQs = () => {
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our catalog, add items to your cart, and proceed to checkout.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes, tracking details will be emailed once your order ships.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, Stripe, and COD for local orders.'
    },
    {
      question: 'How can I cancel or change my order?',
      answer: 'Contact support within 12 hours of placing the order.'
    }
  ];

  return (
    <div className="pt-20 pb-16 container-custom">
      <h1 className="font-heading text-3xl font-semibold mb-6 text-secondary">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3 className="font-medium text-neutral-800">{faq.question}</h3>
            <p className="text-neutral-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
