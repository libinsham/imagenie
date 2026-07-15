"use client";

import { useState } from "react";
import { Zap, Target, ShieldCheck, Users, Phone, Mail, Send, Loader2, CheckCircle2 } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Quick Response", desc: "We reply within 24 business hours", bg: "bg-[#EDEBFB]", color: "text-[#6C5CE7]" },
  { icon: Target, title: "Tailored Solutions", desc: "Custom strategies for your unique goals", bg: "bg-orange-pale", color: "text-orange" },
  { icon: ShieldCheck, title: "Confidential", desc: "Your information is always secure", bg: "bg-[#DDF3E4]", color: "text-[#2FA85A]" },
  { icon: Users, title: "Right Team Match", desc: "We connect you with the perfect expert", bg: "bg-[#FDEBD3]", color: "text-[#D98A22]" },
];

const INITIAL_FORM = {
  fullName: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

export default function ContactCTA() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14">
        <div>
          <div className="eyebrow mb-4">Let's Connect</div>
          <h2 className="font-display font-semibold text-3xl md:text-[2.6rem] leading-[1.1]">
            Got a project in mind? Let's{" "}
            <em className="text-orange not-italic underline decoration-2 underline-offset-4">create</em>{" "}
            something extraordinary.
          </h2>
          <p className="text-stone text-[15px] mt-5">
            Tell us about your goals and we'll get back within{" "}
            <span className="font-semibold text-ink">24 hours</span>.
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-10">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${f.bg} ${f.color} flex items-center justify-center shrink-0`}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{f.title}</div>
                    <p className="text-stone text-xs leading-snug mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t border-line flex flex-col sm:flex-row gap-8">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-orange" />
              <div>
                <div className="text-sm font-medium">+91 98765 43210</div>
                <div className="text-xs text-stone">Mon – Sat, 10AM – 7PM</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-orange" />
              <div>
                <div className="text-sm font-medium">hello@imagenie.com</div>
                <div className="text-xs text-stone">We'll respond ASAP</div>
              </div>
            </div>
          </div>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-3xl shadow-xl border border-line p-7 md:p-9"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="text-sm font-medium">
              Full Name <span className="text-orange">*</span>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={update("fullName")}
                placeholder="Your name"
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-orange"
              />
            </label>
            <label className="text-sm font-medium">
              Email Address <span className="text-orange">*</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-orange"
              />
            </label>
          </div>

          <label className="text-sm font-medium block mt-5">
            Company / Brand
            <input
              type="text"
              value={form.company}
              onChange={update("company")}
              placeholder="Your company or brand name"
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-orange"
            />
          </label>

          <label className="text-sm font-medium block mt-5">
            What can we help you with? <span className="text-orange">*</span>
            <select
              required
              value={form.service}
              onChange={update("service")}
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-orange bg-surface"
            >
              <option value="" disabled>Select a service</option>
              <option>Brand Strategy</option>
              <option>Creative Design</option>
              <option>Digital Experiences</option>
              <option>Content Strategy</option>
              <option>Digital Marketing</option>
            </select>
          </label>

          <label className="text-sm font-medium block mt-5">
            Tell us more about your project <span className="text-orange">*</span>
            <textarea
              required
              maxLength={500}
              rows={4}
              value={form.message}
              onChange={update("message")}
              placeholder="Briefly describe your project, goals and timeline..."
              className="mt-1.5 w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none focus:border-orange resize-none"
            />
            <div className="text-right text-[11px] text-stone mt-1">{form.message.length}/500</div>
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full mt-2 rounded-xl py-3.5 text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#6C5CE7] to-orange hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </button>

          {status === "success" && (
            <p className="flex items-center justify-center gap-2 text-center text-sm text-[#2FA85A] mt-3">
              <CheckCircle2 size={15} /> Message sent — we'll be in touch within 24 hours.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-600 mt-3">{errorMessage}</p>
          )}

          <p className="text-center text-[11px] text-stone mt-3">
            🔒 Your information is safe with us. We respect your privacy.
          </p>
        </form>
      </div>
    </section>
  );
}
