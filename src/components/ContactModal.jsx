import React, { useEffect } from 'react';
import { X, Phone, Linkedin } from 'lucide-react';

export default function ContactModal({
  show,
  onClose,
  portfolioData,
  nameInputRef,
  modalPrefill,
  handleSubmit,
  emailCopied,
  setEmailCopied,
  submitLoading,
  submitSuccess,
  submitError
}) {
  // lock background scroll when modal is open
  useEffect(() => {
    if (!show) return;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    // compensate for scrollbar to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-white">Send Me a Message</h3>
          <button onClick={onClose} className="text-white hover:text-red-400 transition-colors">
            <X size={32} />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              try {
                navigator.clipboard && navigator.clipboard.writeText(portfolioData.personal.email);
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
                console.log('email_copied');
              } catch (err) {
                alert('Copy failed. Email: ' + portfolioData.personal.email);
              }
            }}
            className="text-sm underline"
          >
            Copy email
          </button>
          {emailCopied && <div className="text-sm text-green-300">Copied!</div>}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            ref={nameInputRef}
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            defaultValue={modalPrefill.subject}
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            defaultValue={modalPrefill.message}
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
          ></textarea>

          <div className="space-y-2">
            <button type="submit" disabled={submitLoading} className={`w-full px-8 py-4 rounded-xl font-bold text-xl transition-transform shadow-xl ${submitLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105'}`}>
              {submitLoading ? 'Sending...' : 'Send Message 🚀'}
            </button>
            {submitSuccess && <div className="text-center text-green-300">Message sent — thank you!</div>}
            {submitError && <div className="text-center text-red-300">Error: {submitError}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}
