'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function SponsorModal({ closeModal }) {

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={closeModal}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="relative w-[95%] max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <h3 className="text-2xl font-black text-white mb-6">
          Become a Sponsor
        </h3>

        <form className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Company Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Contact Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Phone Number</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Sponsorship Tier</label>
            <select
              className="w-full mt-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option className="bg-[#0f172a]">Title Sponsor</option>
              <option className="bg-[#0f172a]">Platinum</option>
              <option className="bg-[#0f172a]">Gold</option>
              <option className="bg-[#0f172a]">Custom</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold hover:scale-[1.02] transition-transform"
          >
            Submit Application
          </button>

        </form>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

      </motion.div>
    </div>
  );
}