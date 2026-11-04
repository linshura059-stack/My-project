import React, { useState } from 'react';
import { PORTFOLIO_CONFIG } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [shakingField, setShakingField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim().length >= 2 ? '' : 'Enter at least 2 characters for your name.';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ''
          : 'Enter a valid email address (e.g., name@example.com).';
      case 'subject':
        return value.trim().length >= 2 ? '' : 'Add a subject with at least 2 characters.';
      case 'message':
        return value.trim().length >= 10 ? '' : 'Write at least 10 characters.';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const newErrors: { [key: string]: string } = {};
    let firstBadField: string | null = null;

    Object.entries(formData).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) {
        newErrors[key] = err;
        if (!firstBadField) firstBadField = key;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakingField(firstBadField);
      setTimeout(() => setShakingField(null), 400);
      setStatusMessage({
        text: 'Please fix the highlighted fields and try sending again.',
        isError: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form delivery or fallback to mailto
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mailtoUrl = `mailto:${PORTFOLIO_CONFIG.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;

      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.click();

      setStatusMessage({
        text: `Thank you, ${formData.name.trim()}! Your email app should open with the message ready to send. If nothing opens, your text is still here: copy it and write directly to ${PORTFOLIO_CONFIG.email}.`,
      });
      setErrors({});
    } catch {
      setStatusMessage({
        text: `Message couldn't send. Please contact ${PORTFOLIO_CONFIG.email} directly.`,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
      {/* Contact Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Name Field */}
        <div className={`space-y-1 ${shakingField === 'name' ? 'shake-it' : ''}`}>
          <label htmlFor="f-name" className="block text-sm font-medium text-[#c6d1d6]">
            Your Name
          </label>
          <input
            id="f-name"
            name="name"
            type="text"
            placeholder="Your Name"
            autoComplete="name"
            required
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-name' : undefined}
            className={`w-full bg-black/45 text-white border rounded-md px-4 py-3 outline-none transition-all placeholder:text-[#c6d1d6]/70 shadow-[0_0_7px_rgba(127,243,234,0.35)] focus:border-white focus:bg-[#000a0c]/70 focus:shadow-[0_0_16px_rgba(127,243,234,0.9),0_0_38px_rgba(25,224,210,0.45)] ${
              errors.name ? 'border-[#ff8080] shadow-[0_0_12px_rgba(255,128,128,0.6)]' : 'border-[#7ff3ea]'
            }`}
          />
          {errors.name && <p id="err-name" className="text-[#ff8080] text-xs pt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div className={`space-y-1 ${shakingField === 'email' ? 'shake-it' : ''}`}>
          <label htmlFor="f-email" className="block text-sm font-medium text-[#c6d1d6]">
            Your Email
          </label>
          <input
            id="f-email"
            name="email"
            type="email"
            placeholder="Your Email"
            autoComplete="email"
            required
            maxLength={254}
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'err-email' : undefined}
            className={`w-full bg-black/45 text-white border rounded-md px-4 py-3 outline-none transition-all placeholder:text-[#c6d1d6]/70 shadow-[0_0_7px_rgba(127,243,234,0.35)] focus:border-white focus:bg-[#000a0c]/70 focus:shadow-[0_0_16px_rgba(127,243,234,0.9),0_0_38px_rgba(25,224,210,0.45)] ${
              errors.email ? 'border-[#ff8080] shadow-[0_0_12px_rgba(255,128,128,0.6)]' : 'border-[#7ff3ea]'
            }`}
          />
          {errors.email && <p id="err-email" className="text-[#ff8080] text-xs pt-1">{errors.email}</p>}
        </div>

        {/* Subject Field */}
        <div className={`space-y-1 ${shakingField === 'subject' ? 'shake-it' : ''}`}>
          <label htmlFor="f-subject" className="block text-sm font-medium text-[#c6d1d6]">
            Subject
          </label>
          <input
            id="f-subject"
            name="subject"
            type="text"
            placeholder="Subject"
            required
            maxLength={160}
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'err-subject' : undefined}
            className={`w-full bg-black/45 text-white border rounded-md px-4 py-3 outline-none transition-all placeholder:text-[#c6d1d6]/70 shadow-[0_0_7px_rgba(127,243,234,0.35)] focus:border-white focus:bg-[#000a0c]/70 focus:shadow-[0_0_16px_rgba(127,243,234,0.9),0_0_38px_rgba(25,224,210,0.45)] ${
              errors.subject ? 'border-[#ff8080] shadow-[0_0_12px_rgba(255,128,128,0.6)]' : 'border-[#7ff3ea]'
            }`}
          />
          {errors.subject && <p id="err-subject" className="text-[#ff8080] text-xs pt-1">{errors.subject}</p>}
        </div>

        {/* Message Field */}
        <div className={`space-y-1 ${shakingField === 'message' ? 'shake-it' : ''}`}>
          <label htmlFor="f-message" className="block text-sm font-medium text-[#c6d1d6]">
            Your Message
          </label>
          <textarea
            id="f-message"
            name="message"
            rows={5}
            placeholder="Write your message here..."
            required
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'err-message' : undefined}
            className={`w-full bg-black/45 text-white border rounded-md px-4 py-3 outline-none transition-all resize-y min-h-[130px] placeholder:text-[#c6d1d6]/70 shadow-[0_0_7px_rgba(127,243,234,0.35)] focus:border-white focus:bg-[#000a0c]/70 focus:shadow-[0_0_16px_rgba(127,243,234,0.9),0_0_38px_rgba(25,224,210,0.45)] ${
              errors.message ? 'border-[#ff8080] shadow-[0_0_12px_rgba(255,128,128,0.6)]' : 'border-[#7ff3ea]'
            }`}
          />
          {errors.message && <p id="err-message" className="text-[#ff8080] text-xs pt-1">{errors.message}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="relative overflow-hidden min-h-[50px] rounded-md border border-[#7ff3ea] text-white font-medium text-base shadow-[0_0_10px_rgba(127,243,234,0.5)] hover:bg-[#7ff3ea]/15 hover:shadow-[0_0_24px_rgba(127,243,234,0.85),0_0_45px_rgba(25,224,210,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none group"
        >
          {isSubmitting ? (
            <>
              <span>Sending</span>
              <span className="w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin" />
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </>
          )}
        </button>

        {statusMessage && (
          <p
            role={statusMessage.isError ? 'alert' : 'status'}
            className={`text-sm mt-1 leading-relaxed ${
              statusMessage.isError ? 'text-[#ff8080]' : 'text-[#9df5ee]'
            }`}
          >
            {statusMessage.text}
          </p>
        )}
      </form>

      {/* NTTI Google Maps Container */}
      <div className="group relative w-full min-h-[340px] md:min-h-[460px] rounded-[22px] overflow-hidden border border-[#7ff3ea]/25 bg-[#071017] shadow-[0_22px_70px_rgba(0,0,0,0.34),0_0_35px_rgba(25,224,210,0.1)]">
        {/* Travelling Neon Border Comet */}
        <span className="nb" aria-hidden="true">
          <i />
        </span>

        {/* Interactive Google Map iframe */}
        <iframe
          title={`Google Map showing ${PORTFOLIO_CONFIG.location}`}
          src={PORTFOLIO_CONFIG.mapsEmbedUrl}
          className="w-full h-full min-h-[340px] md:min-h-[460px] border-0 saturate-[0.85] contrast-[1.05]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Top Left 'Open in Maps' external shortcut */}
        <a
          href={PORTFOLIO_CONFIG.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 min-h-[40px] px-3.5 py-1.5 rounded-lg bg-[#050f14]/90 text-[#eaffff] text-sm font-medium shadow-[0_10px_28px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/10 hover:bg-[#0b1d23] hover:-translate-y-0.5 transition-all group/maplink"
        >
          <span>Open in Maps</span>
          <svg
            className="w-3.5 h-3.5 transition-transform group-hover/maplink:translate-x-0.5 group-hover/maplink:-translate-y-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </a>

        {/* Bottom Location Badge */}
        <div className="absolute left-3 right-3 bottom-3 z-10 pointer-events-none">
          <span className="inline-block max-w-full truncate bg-[#030a0e]/85 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
            📍 {PORTFOLIO_CONFIG.location}
          </span>
        </div>
      </div>
    </div>
  );
};
