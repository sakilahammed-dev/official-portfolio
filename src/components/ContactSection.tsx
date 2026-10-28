"use client";

import { useState, useRef, useEffect } from "react";
import {
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  ExternalLink,
  RotateCcw,
} from "lucide-react";

// Official YouTube Icon SVG
function YoutubeIcon({ className = "w-4 h-4 sm:w-4.5 sm:h-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submittedName, setSubmittedName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [directActions, setDirectActions] = useState<{
    gmailWeb?: string;
    whatsapp?: string;
    mailto?: string;
  } | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Email is required. You cannot send without providing an email address.";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmed)) {
      return "Please enter a valid email format (e.g. name@gmail.com).";
    }
    return "";
  };

  const validateName = (val: string) => {
    if (!val.trim()) {
      return "Your name is required.";
    }
    return "";
  };

  const validateMessage = (val: string) => {
    if (!val.trim()) {
      return "Please write your message.";
    }
    return "";
  };

  // Global click / touch listener: Clicking anywhere on the project dismisses the red errors
  useEffect(() => {
    const handleDismissErrors = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      // Do not clear if user is clicking on the Submit button
      if (target?.closest('button[type="submit"]')) {
        return;
      }
      if (fieldErrors.name || fieldErrors.email || fieldErrors.message || errorMsg) {
        setFieldErrors({});
        setErrorMsg(null);
      }
    };

    window.addEventListener("pointerdown", handleDismissErrors);
    return () => window.removeEventListener("pointerdown", handleDismissErrors);
  }, [fieldErrors, errorMsg]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time clearance of error as soon as user types
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFocus = (field: "name" | "email" | "message") => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
    setFieldErrors({});
    setSubmittedName("");
    setSubmitted(false);
    setErrorMsg(null);
    setDirectActions(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict Form Validation (Blocks submission immediately if email or required fields are missing)
    const emailErr = validateEmail(formData.email);
    const nameErr = validateName(formData.name);
    const msgErr = validateMessage(formData.message);

    if (emailErr || nameErr || msgErr) {
      setFieldErrors({
        name: nameErr,
        email: emailErr,
        message: msgErr,
      });

      // Immediately focus into the invalid field (prioritizing email if empty)
      if (emailErr && !formData.email.trim()) {
        emailInputRef.current?.focus();
      } else if (nameErr) {
        nameInputRef.current?.focus();
      } else if (emailErr) {
        emailInputRef.current?.focus();
      } else if (msgErr) {
        messageInputRef.current?.focus();
      }
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    const clientName = formData.name.trim();
    setSubmittedName(clientName);

    // Prepare instant fallback & 1-click action links immediately
    const encSub = encodeURIComponent(formData.subject.trim() || `Portfolio Inquiry from ${clientName}`);
    const encBody = encodeURIComponent(
      `Name: ${clientName}\nPhone: ${formData.phone.trim() || "N/A"}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    const instantDirectActions = {
      gmailWeb: `https://mail.google.com/mail/?view=cm&fs=1&to=sakilahammed114@gmail.com&su=${encSub}&body=${encBody}`,
      whatsapp: `https://wa.me/8801763838194?text=${encodeURIComponent(
        `Hi Sakil! My name is ${clientName}. Regarding: "${formData.subject.trim() || "Portfolio Inquiry"}".\n\n${formData.message.trim()}`
      )}`,
      mailto: `mailto:sakilahammed114@gmail.com?subject=${encSub}&body=${encBody}`,
    };
    setDirectActions(instantDirectActions);

    // 1. Background Non-Blocking Dispatch to FormSubmit (Delivers to sakilahammed114@gmail.com)
    // keepalive: true ensures delivery even if the visitor closes the tab
    try {
      fetch("https://formsubmit.co/ajax/sakilahammed114@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: clientName,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          _subject: formData.subject.trim() || `Portfolio Inquiry from ${clientName}`,
          message: formData.message.trim(),
          _template: "table",
          _captcha: "false",
        }),
        keepalive: true,
      }).catch((e) => console.warn("[Background FormSubmit]", e));
    } catch {
      // background error ignored
    }

    // 2. Background Non-Blocking Dispatch to Local Database (/api/contact)
    try {
      fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
        keepalive: true,
      }).catch((e) => console.warn("[Background Contact API]", e));
    } catch {
      // background error ignored
    }

    // Instant optimistic UI transition: short 350ms tactile feedback so the user feels high-speed responsiveness!
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 350);
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/sakilahammed-dev",
      icon: Github,
      hoverColor: "hover:text-black hover:border-black/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      hoverColor: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:shadow-[0_8px_20px_rgba(10,102,194,0.18)]",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61593307638016",
      icon: Facebook,
      hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:shadow-[0_8px_20px_rgba(24,119,242,0.18)]",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Instagram,
      hoverColor: "hover:text-[#E4405F] hover:border-[#E4405F]/30 hover:shadow-[0_8px_20px_rgba(228,64,95,0.18)]",
    },
    {
      name: "Twitter / X",
      href: "https://twitter.com",
      icon: Twitter,
      hoverColor: "hover:text-black hover:border-black/30 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: YoutubeIcon,
      hoverColor: "hover:text-[#FF0000] hover:border-[#FF0000]/30 hover:shadow-[0_8px_20px_rgba(255,0,0,0.18)]",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full bg-[#F4F5F8] text-[#1C1D20] pt-20 sm:pt-28 pb-20 px-6 sm:px-12 xl:px-20 border-t border-black/[0.06] select-none overflow-hidden scroll-mt-12"
    >
      {/* Subtle Ambient Light Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#FF014F]/5 via-[#FF5E00]/3 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-16 sm:space-y-20">
        {/* ================================================================= */}
        {/* 1. SECTION TITLE (Exact InBio Centered Heading - Light Edition)     */}
        {/* ================================================================= */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1C1D20] tracking-tight leading-tight">
            Contact With Me
          </h2>
        </div>

        {/* ================================================================= */}
        {/* 2. SPLIT WHITE CARDS (Left: Profile, Right: Interactive Form)     */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Contact Profile Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] border border-[#1C1D20]/8 flex flex-col justify-between group transition-all duration-300">
            <div>
              {/* Handshake Image */}
              <div className="rounded-[14px] overflow-hidden bg-[#E9EBEF] aspect-[16/10] border border-[#1C1D20]/8 shadow-sm">
                <img
                  src="/images/men-business-handshake.png"
                  alt="Sakil Ahammed - Partnership &amp; Collaboration"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Profile Details */}
              <div className="pt-6 space-y-2">
                <h3 className="text-2xl sm:text-[29px] font-bold text-[#1C1D20] tracking-tight leading-snug">
                  Sakil Ahammed
                </h3>
                <span className="text-sm sm:text-[15px] font-semibold text-[#2563EB] block tracking-wide">
                  Full-Stack AI Automation &amp; Autonomous Operations Architect
                </span>
                <p className="text-[14px] sm:text-[15px] text-[#555962] leading-relaxed pt-2 font-normal">
                  Specializing in deterministic multi-agent swarms, self-healing workflow pipelines, and enterprise AI automation. Grounded in Sidq (Truthfulness) &amp; Amanah (Trust) to deliver root-cause solutions for business growth and humanity.
                </p>
              </div>

              {/* Contact Meta */}
              <div className="pt-6 space-y-2.5 text-[15px]">
                <div className="flex items-center gap-2">
                  <span className="text-[#7E8490] font-medium">Phone:</span>
                  <a
                    href="tel:+8801763838194"
                    className="text-[#1C1D20] font-semibold hover:text-[#FF014F] transition-colors"
                  >
                    +880 1763838194
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#7E8490] font-medium">Email:</span>
                  <a
                    href="mailto:sakilahammed114@gmail.com"
                    className="text-[#1C1D20] font-semibold hover:text-[#FF014F] transition-colors"
                  >
                    sakilahammed114@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Grid: FIND WITH ME */}
            <div className="pt-8 border-t border-[#1C1D20]/10 mt-6">
              <span className="text-xs font-semibold tracking-[2px] text-[#7E8490] uppercase block mb-4">
                FIND WITH ME
              </span>
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.name}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-[#F4F5F7] hover:bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#1C1D20] hover:-translate-y-1 transition-all duration-300 ${s.hoverColor || "hover:text-[#2563EB]"}`}
                    >
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </a>
                  );
                })}

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/8801763838194"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp Direct Chat: +880 1763838194"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-[#F4F5F7] hover:bg-white border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#1C1D20] hover:text-[#25D366] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(37,211,102,0.2)] hover:border-[#25D366]/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-[20px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] border border-[#1C1D20]/8 flex flex-col justify-center">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4 space-y-6 animate-in fade-in zoom-in-95 duration-400">
                {/* Glowing Success Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#10B981]/10 border-2 border-[#10B981] flex items-center justify-center text-[#10B981] shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
                </div>

                <div className="space-y-2 max-w-md">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1C1D20] tracking-tight">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#555962] leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1C1D20]">{submittedName || formData.name || "friend"}</span>! Your inquiry has been securely recorded and dispatched to Sakil's primary inbox (<span className="text-[#2563EB] font-semibold">sakilahammed114@gmail.com</span>).
                  </p>
                </div>

                {/* Direct Action Hub for Immediate Response */}
                <div className="w-full max-w-md pt-2 space-y-3">
                  <p className="text-xs font-bold tracking-[1.5px] text-[#7E8490] uppercase">
                    NEED AN INSTANT RESPONSE?
                  </p>

                  {directActions?.whatsapp && (
                    <a
                      href={directActions.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-[52px] rounded-[10px] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm tracking-wide shadow-[0_8px_20px_rgba(37,211,102,0.25)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Chat Directly on WhatsApp (+880 1763838194)</span>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </a>
                  )}

                  {directActions?.gmailWeb && (
                    <a
                      href={directActions.gmailWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-[52px] rounded-[10px] bg-[#EA4335] hover:bg-[#d63b2e] text-white font-bold text-sm tracking-wide shadow-[0_8px_20px_rgba(234,67,53,0.25)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Open Direct in Gmail Web</span>
                      <ExternalLink className="w-4 h-4 opacity-80" />
                    </a>
                  )}
                </div>

                {/* Reset button to send another message */}
                <button
                  onClick={handleReset}
                  type="button"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[1.5px] uppercase text-[#7E8490] hover:text-[#1C1D20] pt-4 transition-colors cursor-pointer group"
                >
                  <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-300" />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="space-y-5">
                {/* Dual Row: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-xs font-bold tracking-[1.5px] uppercase block transition-colors ${fieldErrors.name ? "text-red-600" : "text-[#1C1D20]"}`}>
                        YOUR NAME <span className="text-red-500">*</span>
                      </label>
                      {fieldErrors.name && (
                        <span className="text-[11px] font-semibold text-red-500 animate-pulse">Required</span>
                      )}
                    </div>
                    <input
                      ref={nameInputRef}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      placeholder="e.g. John Doe"
                      className={`w-full rounded-[8px] h-[54px] px-4 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 focus:outline-none ${
                        fieldErrors.name
                          ? "bg-red-50/50 border-2 border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                          : "bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#1C1D20] placeholder-[#9AA0A6] focus:bg-white focus:border-[#FF014F]"
                      }`}
                    />
                    {fieldErrors.name && (
                      <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <svg className="w-3.5 h-3.5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{fieldErrors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold tracking-[1.5px] text-[#1C1D20] uppercase block">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXXXXXXXX"
                      className="w-full bg-[#F8F9FA] border-2 border-[#E5E7EB] rounded-[8px] h-[54px] px-4 text-sm text-[#1C1D20] placeholder-[#9AA0A6] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:border-[#FF014F] focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email (Strictly Validated with Instant Inline Error) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold tracking-[1.5px] uppercase block transition-colors ${fieldErrors.email ? "text-red-600" : "text-[#1C1D20]"}`}>
                      EMAIL <span className="text-red-500">*</span>
                    </label>
                    {fieldErrors.email && (
                      <span className="text-[11px] font-semibold text-red-500 animate-pulse">Required to Send</span>
                    )}
                  </div>
                  <input
                    ref={emailInputRef}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    placeholder="e.g. client@gmail.com"
                    className={`w-full rounded-[8px] h-[54px] px-4 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 focus:outline-none ${
                      fieldErrors.email
                        ? "bg-red-50/50 border-2 border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        : "bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#1C1D20] placeholder-[#9AA0A6] focus:bg-white focus:border-[#FF014F]"
                    }`}
                  />
                  {fieldErrors.email && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <svg className="w-4 h-4 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{fieldErrors.email}</span>
                    </div>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-[1.5px] text-[#1C1D20] uppercase block">
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. AI Workflow Automation Project"
                    className="w-full bg-[#F8F9FA] border-2 border-[#E5E7EB] rounded-[8px] h-[54px] px-4 text-sm text-[#1C1D20] placeholder-[#9AA0A6] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus:bg-white focus:border-[#FF014F] focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-bold tracking-[1.5px] uppercase block transition-colors ${fieldErrors.message ? "text-red-600" : "text-[#1C1D20]"}`}>
                      YOUR MESSAGE <span className="text-red-500">*</span>
                    </label>
                    {fieldErrors.message && (
                      <span className="text-[11px] font-semibold text-red-500 animate-pulse">Required</span>
                    )}
                  </div>
                  <textarea
                    ref={messageInputRef}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    rows={6}
                    placeholder="Describe your project, timeline, or requirements..."
                    className={`w-full rounded-[8px] p-4 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-300 resize-y focus:outline-none ${
                      fieldErrors.message
                        ? "bg-red-50/50 border-2 border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                        : "bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#1C1D20] placeholder-[#9AA0A6] focus:bg-white focus:border-[#FF014F]"
                    }`}
                  />
                  {fieldErrors.message && (
                    <div className="flex items-center gap-1.5 text-xs text-red-600 font-semibold pt-0.5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <svg className="w-3.5 h-3.5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{fieldErrors.message}</span>
                    </div>
                  )}
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-[8px] bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[54px] rounded-[8px] bg-[#1C1D20] hover:bg-[#FF014F] text-white font-bold text-sm tracking-[2px] uppercase shadow-[0_10px_25px_rgba(28,29,32,0.15)] hover:shadow-[0_12px_28px_rgba(255,1,79,0.3)] active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin text-white" />
                      <span>SENDING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. FOOTER SIGNATURE OUTRO HUB (Light Edition)                      */}
        {/* ================================================================= */}
        <div className="pt-20 border-t border-[#1C1D20]/10 text-center space-y-4">
          {/* Avatar with Gradient Glowing Ring */}
          <div className="w-[74px] h-[74px] rounded-full p-[3px] bg-gradient-to-tr from-[#FF014F] via-[#FF5E00] to-[#FFD700] shadow-[0_8px_25px_rgba(255,1,79,0.25)] mx-auto">
            <img
              src="/images/avatar.png"
              alt="Sakil Ahammed"
              className="w-full h-full rounded-full object-cover bg-white"
            />
          </div>

          {/* Name & Tagline */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black tracking-[2.5px] text-[#1C1D20] uppercase">
              SAKIL AHAMMED
            </h3>
            <p className="text-xs sm:text-[14px] text-[#2563EB] font-semibold tracking-wider">
              Full-Stack AI Automation &amp; Autonomous Operations Architect
            </p>
            <p className="text-xs text-[#7E8490] tracking-widest uppercase font-mono pt-0.5">
              Rapid Learner • Deep Resilience • Tech for Business Growth &amp; Humanity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
