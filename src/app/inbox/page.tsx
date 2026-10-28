"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Phone,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface StoredMessage {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  recipient: string;
  dispatched: boolean;
  deliveryMethod?: string;
  error?: string | null;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setSmtpConfigured(Boolean(data.smtpConfigured));
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = messages.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      m.name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.subject?.toLowerCase().includes(q) ||
      m.message?.toLowerCase().includes(q) ||
      m.phone?.toLowerCase().includes(q)
    );
  });

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#1F2937] bg-[#111827]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="w-10 h-10 rounded-xl bg-[#1A2234] border border-[#28334A] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#2563EB] hover:border-[#2563EB] transition-all duration-300"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Portfolio Inquiries Inbox
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/40">
                  {messages.length} Total
                </span>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Permanent Zero-Data-Loss Architecture • Sakil Ahammed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="h-10 px-4 rounded-xl bg-[#1A2234] border border-[#28334A] text-xs font-semibold text-[#D1D5DB] hover:text-white hover:border-[#3B82F6] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* System Health / SMTP Status Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#111827] border border-[#1F2937] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                smtpConfigured
                  ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                  : "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
              }`}
            >
              {smtpConfigured ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {smtpConfigured
                    ? "Direct Google SMTP Active (100% Lifetime Dispatch)"
                    : "Zero-Data-Loss Local Inbox Active"}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    smtpConfigured ? "bg-[#10B981] animate-ping" : "bg-[#F59E0B]"
                  }`}
                />
              </div>
              <p className="text-xs text-[#9CA3AF] mt-0.5">
                {smtpConfigured
                  ? "All inquiries are dispatched immediately to sakilahammed114@gmail.com using your Google SMTP credentials."
                  : "Every submission is permanently archived in the server database. Add your 16-character GMAIL_APP_PASSWORD in .env.local for automatic Google SMTP delivery."}
              </p>
            </div>
          </div>

          <div className="text-xs text-[#9CA3AF] bg-[#1A2234] px-3.5 py-2 rounded-xl border border-[#28334A] shrink-0">
            Recipient: <span className="font-semibold text-white">sakilahammed114@gmail.com</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, subject, or message content..."
            className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#111827] border border-[#1F2937] text-sm text-white placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
          />
        </div>

        {/* Messages List */}
        {loading && messages.length === 0 ? (
          <div className="py-20 text-center text-[#9CA3AF] space-y-3">
            <RotateCcw className="w-8 h-8 animate-spin mx-auto text-[#3B82F6]" />
            <p className="text-sm">Loading your messages securely...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#111827] border border-[#1F2937] p-8">
            <MessageSquare className="w-12 h-12 mx-auto text-[#4B5563] mb-3" />
            <h3 className="text-base font-bold text-white">No messages found</h3>
            <p className="text-xs text-[#9CA3AF] mt-1">
              {searchTerm
                ? "No inquiries matched your search criteria."
                : "No inquiries submitted yet. Submit a test message from your portfolio contact form!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((msg) => {
              const formattedDate = new Date(msg.timestamp).toLocaleString("en-US", {
                timeZone: "Asia/Dhaka",
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });

              const replySubject = encodeURIComponent(`Re: ${msg.subject || "Portfolio Inquiry"}`);
              const replyBody = encodeURIComponent(
                `Hi ${msg.name},\n\nThank you for reaching out through my portfolio!\n\nBest regards,\nSakil Ahammed\nFull-Stack AI Automation Architect`
              );
              const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                msg.email
              )}&su=${replySubject}&body=${replyBody}`;

              const waPhone = msg.phone?.replace(/[^0-9]/g, "");
              const waUrl = waPhone
                ? `https://wa.me/${waPhone}?text=${encodeURIComponent(
                    `Hi ${msg.name}, thank you for reaching out via my portfolio!`
                  )}`
                : null;

              return (
                <div
                  key={msg.id}
                  className="bg-[#111827] border border-[#1F2937] hover:border-[#28334A] rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-sm"
                >
                  {/* Top Bar: Name, Status, Date */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-[#1F2937]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#7C3AED] flex items-center justify-center font-bold text-white text-sm">
                        {msg.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {msg.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                          <span>{msg.email}</span>
                          <button
                            onClick={() => handleCopyEmail(msg.email, msg.id)}
                            className="p-1 hover:text-white transition-colors"
                            title="Copy Email"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-[#10B981]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                          msg.dispatched
                            ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                            : "bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30"
                        }`}
                      >
                        {msg.dispatched ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{msg.deliveryMethod || "Saved in Inbox"}</span>
                      </span>

                      <span className="text-[#6B7280]">{formattedDate} (BST)</span>
                    </div>
                  </div>

                  {/* Subject & Details */}
                  <div className="py-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                        Subject:
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {msg.subject || "No Subject"}
                      </span>
                    </div>

                    {msg.phone && (
                      <div className="flex items-center gap-2 text-xs text-[#34D399]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Phone / WhatsApp: {msg.phone}</span>
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="mt-3 p-4 rounded-xl bg-[#1A2234] border border-[#28334A] text-sm text-[#E5E7EB] leading-relaxed whitespace-pre-wrap font-normal">
                      {msg.message}
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="pt-3 flex items-center justify-end gap-2.5 flex-wrap">
                    <a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-9 px-3.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Gmail</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 px-3.5 rounded-lg bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp Chat</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}