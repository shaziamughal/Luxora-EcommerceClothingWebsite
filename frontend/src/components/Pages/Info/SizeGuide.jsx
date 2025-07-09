import React from 'react';

export const SizeGuide = () => (
  <div className="pt-20 pb-16 container-custom">
    <h1 className="font-heading text-3xl font-semibold mb-6 text-secondary">Size Guide</h1>
    <p className="text-neutral-600 mb-6">Use this size guide to help find the perfect fit.</p>
    <table className="w-full border border-neutral-200">
      <thead>
        <tr className="bg-neutral-100 text-left">
          <th className="p-2 border-b">Size</th>
          <th className="p-2 border-b">Bust (inches)</th>
          <th className="p-2 border-b">Waist (inches)</th>
          <th className="p-2 border-b">Hips (inches)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td className="p-2">XS</td><td className="p-2">32</td><td className="p-2">24</td><td className="p-2">34</td></tr>
        <tr><td className="p-2">S</td><td className="p-2">34</td><td className="p-2">26</td><td className="p-2">36</td></tr>
        <tr><td className="p-2">M</td><td className="p-2">36</td><td className="p-2">28</td><td className="p-2">38</td></tr>
        <tr><td className="p-2">L</td><td className="p-2">38</td><td className="p-2">30</td><td className="p-2">40</td></tr>
      </tbody>
    </table>
  </div>
);
