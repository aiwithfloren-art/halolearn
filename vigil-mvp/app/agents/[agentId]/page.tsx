"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const REC_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  "strong-yes": { bg: "rgba(16,185,129,0.15)", color: "#10B981", label: "💚 Strong Yes" },
  "yes": { bg: "rgba(16,185,129,0.1)", color: "#34D399", label: "✅ Yes" },
  "maybe": { bg: "rgba(245,158,11,0.1)", color: "#F59E0B", label: "🤔 Maybe" },
  "no": { bg: "rgba(239,68,68,0.1)", color: "#EF4444", label: "❌ No" },
  "strong-no": { bg: "rgba(239,68,68,0.15)", color: "#DC2626", label: "🚫 Strong No" },
};

function ScoreBar({ label, score }: { label: string; score?: number }) {
  if (!score) return null;
  const color = score >= 8 ? "#10B981" : score >= 6 ? "#F59E0B" : "#EF4444";
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "3px" }}>
        <span style={{ color: "#94A3B8" }}>{label}</span>
        <span style={{ color, fontWeight: 700 }}>{score}/10</span>
      </div>
      <div style={{ background: "#1E2030", borderRadius: "4px", height: "5px" }}>
        <div style={{ background: color, width: `${score * 10}%`, height: "100%", borderRadius: "4px", transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

// Agent metadata
const AGENT_META: Record<string, { name: string; emoji: string; description: string }> = {
  "pitch-deck-analyzer": { name: "Pitch Deck Analyzer", emoji: "📊", description: "Analyzes incoming pitch decks and scores them" },
  "deal-flow": { name: "Deal Flow Manager", emoji: "💼", description: "Tracks and prioritizes your deal pipeline" },
  "email-monitor": { name: "Email Monitor", emoji: "📧", description: "Monitors emails and surfaces action items" },
  "follow-up-tracker": { name: "Follow-up Tracker", emoji: "🔔", description: "Tracks deals going cold and follow-up reminders" },
  "calendar-optimizer": { name: "Calendar Optimizer", emoji: "📅", description: "Optimizes your schedule and flags conflicts" },
  "meeting-prep": { name: "Meeting Prep Scheduler", emoji: "🎯", description: "Prepares briefs for upcoming meetings" },
  "cv-screener": { name: "CV Screener", emoji: "👥", description: "Screens CVs and identifies top candidates" },
  "subscription-auditor": { name: "Subscription Auditor", emoji: "💰", description: "Audits subscriptions and identifies waste" },
  "meeting-optimizer": { name: "Meeting Optimizer", emoji: "📅", description: "Optimizes meetings and schedules async alternatives" },
};

// Connected tools per agent type
const AGENT_TOOLS: Record<string, { name: string; emoji: string; status: "connected" | "coming-soon" }[]> = {
  "cv-screener": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Google Drive", emoji: "📁", status: "connected" },
    { name: "LinkedIn", emoji: "💼", status: "coming-soon" },
    { name: "BambooHR", emoji: "👥", status: "coming-soon" },
  ],
  "pitch-deck-analyzer": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Google Drive", emoji: "📁", status: "connected" },
    { name: "Calendar", emoji: "📅", status: "connected" },
  ],
  "deal-flow": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Google Drive", emoji: "📁", status: "connected" },
    { name: "Calendar", emoji: "📅", status: "connected" },
  ],
  "email-monitor": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Calendar", emoji: "📅", status: "connected" },
    { name: "Slack", emoji: "💬", status: "coming-soon" },
  ],
  "follow-up-tracker": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Calendar", emoji: "📅", status: "connected" },
    { name: "HubSpot", emoji: "🤝", status: "coming-soon" },
  ],
  "subscription-auditor": [
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Google Drive", emoji: "📁", status: "connected" },
    { name: "Stripe", emoji: "💳", status: "coming-soon" },
    { name: "QuickBooks", emoji: "💰", status: "coming-soon" },
  ],
  "meeting-optimizer": [
    { name: "Calendar", emoji: "📅", status: "connected" },
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Zoom", emoji: "🎥", status: "coming-soon" },
    { name: "Slack", emoji: "💬", status: "coming-soon" },
  ],
  "calendar-optimizer": [
    { name: "Calendar", emoji: "📅", status: "connected" },
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Zoom", emoji: "🎥", status: "coming-soon" },
  ],
  "meeting-prep": [
    { name: "Calendar", emoji: "📅", status: "connected" },
    { name: "Gmail", emoji: "📧", status: "connected" },
    { name: "Google Drive", emoji: "📁", status: "connected" },
  ],
};

const DEFAULT_TOOLS = [
  { name: "Gmail", emoji: "📧", status: "connected" as const },
  { name: "Google Drive", emoji: "📁", status: "connected" as const },
  { name: "Calendar", emoji: "📅", status: "connected" as const },
];

// Demo activity data per agent type
// Helper to normalize agent IDs to demo keys
const normalizeAgentId = (id: string): string => {
  const map: Record<string, string> = {
    // Follow-up tracker aliases
    "deal-followup-agent": "follow-up-tracker",
    "email-followup-agent": "follow-up-tracker",
    "deal-follow-up": "follow-up-tracker",
    "followup": "follow-up-tracker",
    "follow-up": "follow-up-tracker",
    "deal-monitor": "follow-up-tracker",
    // CV screener aliases
    "candidate-screener": "cv-screener",
    "cv-screener-agent": "cv-screener",
    "recruitment-agent": "cv-screener",
    "hr-agent": "cv-screener",
    // Subscription auditor aliases
    "budget-auditor": "subscription-auditor",
    "subscription-audit": "subscription-auditor",
    "finance-agent": "subscription-auditor",
    "budget-monitor": "subscription-auditor",
    // Meeting optimizer aliases
    "meeting-optimizer-agent": "meeting-optimizer",
    "calendar-optimizer": "meeting-optimizer",
    "ops-agent": "meeting-optimizer",
    // Email monitor aliases
    "email-monitor-agent": "email-monitor",
    "inbox-monitor": "email-monitor",
    "email-agent": "email-monitor",
    // Deal flow aliases
    "deal-flow": "pitch-deck-analyzer",
    "dealflow": "pitch-deck-analyzer",
  };
  return map[id] || id;
};

const DEMO_ACTIVITIES: Record<string, any[]> = {
  "cv-screener": [
    { message: "👥 [CV Screener] Rizky Pratama — Software Engineer | Score: 8.7/10 ✅ Strong Match | Skills: React, TypeScript, Node.js | 3 years exp", priority: "high", created_at: new Date(Date.now() - 5 * 60000).toISOString() },
    { message: "👥 [CV Screener] Siti Rahma — Product Designer | Score: 7.2/10 ✅ Good Match | Skills: Figma, User Research | 2 years exp", priority: "medium", created_at: new Date(Date.now() - 12 * 60000).toISOString() },
    { message: "👥 [CV Screener] Budi Santoso — Backend Dev | Score: 4.1/10 ❌ Below threshold | Missing: System design experience", priority: "insight", created_at: new Date(Date.now() - 25 * 60000).toISOString() },
    { message: "👥 [CV Screener] 47 CVs scanned today | 8 Strong Match | 12 Good Match | 27 Below threshold → Only top 8 need your attention", priority: "insight", created_at: new Date(Date.now() - 60 * 60000).toISOString() },
    { message: "⚠️ [CV Screener] Alert: Rizky Pratama belum di-response 48 jam — kandidat top mungkin terima offer lain → Kirim reply sekarang", priority: "high", created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  ],
  "subscription-auditor": [
    { message: "💰 [Subscription Auditor] ALERT: Figma Pro — 0 login dalam 90 hari | Rp 45.000.000/tahun | Recommended: Downgrade ke Free", priority: "high", created_at: new Date(Date.now() - 3 * 60000).toISOString() },
    { message: "💰 [Subscription Auditor] Zoom Webinar — Last used 4 bulan lalu | Rp 67.200.000/tahun | Recommended: Cancel immediately", priority: "high", created_at: new Date(Date.now() - 8 * 60000).toISOString() },
    { message: "💰 [Subscription Auditor] Notion Business — 3 dari 15 seats aktif | Rp 28.000.000/tahun | Recommended: Downgrade ke 5 seats", priority: "medium", created_at: new Date(Date.now() - 15 * 60000).toISOString() },
    { message: "💰 [Subscription Auditor] Total waste detected: Rp 847.000.000/tahun dari 8 tools tidak terpakai — Action required", priority: "high", created_at: new Date(Date.now() - 30 * 60000).toISOString() },
    { message: "💡 [Subscription Auditor] Insight: Slack vs Microsoft Teams — kedua tools aktif. Konsolidasi ke 1 bisa hemat Rp 156.000.000/tahun", priority: "insight", created_at: new Date(Date.now() - 90 * 60000).toISOString() },
  ],
  "meeting-optimizer": [
    { message: "📅 [Meeting Optimizer] Weekly Sync (Senin 9am, 1 jam, 8 orang) — Bisa diganti async Loom update. Potensi save 8 jam/minggu", priority: "high", created_at: new Date(Date.now() - 10 * 60000).toISOString() },
    { message: "📅 [Meeting Optimizer] 14 dari 31 meeting minggu ini = status updates yang bisa async — Kirim Loom template?", priority: "high", created_at: new Date(Date.now() - 25 * 60000).toISOString() },
    { message: "📅 [Meeting Optimizer] CEO optimal meeting window: Tue-Thu 9-11am (3x lebih responsif). Reschedule Q2 review ke slot ini?", priority: "medium", created_at: new Date(Date.now() - 45 * 60000).toISOString() },
    { message: "📅 [Meeting Optimizer] Meeting overload alert: Maya dijadwal 7 jam meeting besok — Blok 2 jam focus time?", priority: "medium", created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
  ],
  "follow-up-tracker": [
    { message: "⚠️ [Follow-up Tracker] PT Maju Jaya — Deal Rp 850 juta | Last contact 6 hari lalu | COLD in 48 jam → Draft follow-up siap", priority: "high", created_at: new Date(Date.now() - 5 * 60000).toISOString() },
    { message: "⚠️ [Follow-up Tracker] Budi Kurniawan (CFO Teknindo) post tentang efisiensi operasional — Perfect timing untuk pitch Vigil", priority: "high", created_at: new Date(Date.now() - 20 * 60000).toISOString() },
    { message: "📧 [Follow-up Tracker] 3 proposal sent 7+ hari lalu tanpa response: PT Cahaya, CV Mandiri, Startup X | Suggested: Send bump email", priority: "medium", created_at: new Date(Date.now() - 45 * 60000).toISOString() },
    { message: "💡 [Follow-up Tracker] Best time to email prospects: Tuesday 9-10am (open rate 3.2x average) — Schedule outreach batch?", priority: "insight", created_at: new Date(Date.now() - 3 * 3600000).toISOString() },
  ],
  "email-monitor": [
    { message: "📧 [Email Monitor] 3 investor emails unread >72 jam: Sequoia (Tue), East Ventures (Mon), Intudo (Sun) — Funding at risk", priority: "high", created_at: new Date(Date.now() - 8 * 60000).toISOString() },
    { message: "📧 [Email Monitor] Client PT Maju Jaya follow-up 3x dalam seminggu — Needs immediate response, deal at risk", priority: "high", created_at: new Date(Date.now() - 20 * 60000).toISOString() },
    { message: "📧 [Email Monitor] Daily digest: 127 emails received, 8 need response today, 3 urgent, 0 missed SLA", priority: "insight", created_at: new Date(Date.now() - 60 * 60000).toISOString() },
    { message: "📧 [Email Monitor] Inbox zero achieved — 0 unread emails >48 jam. All priority threads responded.", priority: "insight", created_at: new Date(Date.now() - 4 * 3600000).toISOString() },
  ],
};

export default function AgentDashboard() {
  const params = useParams();
  const router = useRouter();
  const agentId = params.agentId as string;
  const normalizedId = normalizeAgentId(agentId);
  const meta = AGENT_META[agentId] || AGENT_META[normalizedId] || { name: agentId.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), emoji: "🤖", description: "AI Agent monitoring your tools" };

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    // Known demo agent IDs (these should always show demo data)
    const DEMO_AGENT_IDS = ["cv-screener", "subscription-auditor", "follow-up-tracker", "meeting-optimizer", "email-monitor"];
    const normalKey = normalizeAgentId(agentId);
    const isDemoAgent = DEMO_AGENT_IDS.includes(agentId) || DEMO_AGENT_IDS.includes(normalKey);
    const demoData = DEMO_ACTIVITIES[agentId] || DEMO_ACTIVITIES[normalKey];

    // Always use demo data for known demo agents
    if (isDemoAgent && demoData) {
      setData({
        type: "feed",
        activities: demoData,
        stats: {
          total: demoData.length,
          high: demoData.filter((a: any) => a.priority === "high").length,
          medium: demoData.filter((a: any) => a.priority === "medium").length,
        },
        isDemo: true,
      });
      setLoading(false);
      return;
    }

    // For non-demo agents or pitch-deck, fetch from API
    fetchResults();
  }, [agentId]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      if (agentId === "pitch-deck-analyzer" || agentId === "deal-flow" || agentId === "dealflow") {
        // Use real dealflow endpoint
        const res = await fetch("/api/dealflow");
        const deals = await res.json();
        const strongYes = deals.filter((d: any) => d.recommendation === "strong-yes").length;
        const yes = deals.filter((d: any) => d.recommendation === "yes").length;
        const maybe = deals.filter((d: any) => d.recommendation === "maybe").length;
        const no = deals.filter((d: any) => d.recommendation === "no" || d.recommendation === "strong-no").length;
        const totalPipeline = deals.filter((d: any) => d.funding_ask).reduce((sum: number, d: any) => {
          const match = d.funding_ask?.match(/[\d.]+/);
          return sum + (match ? parseFloat(match[0]) : 0);
        }, 0);
        setData({
          type: "pitch-deck",
          deals,
          stats: { total: deals.length, strongYes, yes, maybe, no, pipeline: `$${totalPipeline.toFixed(1)}M` }
        });
      } else {
        const res = await fetch(`/api/agents/${agentId}/results`);
        const json = await res.json();

        // Always try demo data first for better demo experience
        const normalKey = normalizeAgentId(agentId);
        const demoData = DEMO_ACTIVITIES[normalKey] || DEMO_ACTIVITIES[agentId];
        
        if (demoData && (!json.activities || json.activities.length === 0)) {
          setData({
            type: "feed",
            activities: demoData,
            stats: {
              total: demoData.length,
              high: demoData.filter((a: any) => a.priority === "high").length,
              medium: demoData.filter((a: any) => a.priority === "medium").length,
            },
            isDemo: true,
          });
          setLoading(false);
          return;
        }

        setData(json);
      }
    } catch {}
    setLoading(false);
  };

  const [scanStatus, setScanStatus] = useState("");

  const runScan = async () => {
    setScanning(true);
    try {
      if (agentId === "pitch-deck-analyzer" || agentId === "deal-flow" || agentId === "dealflow") {
        // Step 1: Scan Gmail for pitch decks
        setScanStatus("📧 Scanning Gmail for pitch decks...");
        const scanRes = await fetch("/api/dealflow/scan", { method: "POST" });
        const scanData = await scanRes.json();
        const newDeals = scanData.deals?.filter((d: any) => d.status === "pending") || [];

        // Step 2: Analyze each pending deal
        if (newDeals.length > 0) {
          setScanStatus(`🧠 Analyzing ${newDeals.length} pitch decks with AI...`);
          for (const deal of newDeals) {
            await fetch("/api/dealflow/analyze", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ dealId: deal.id }),
            }).catch(() => {});
          }
        } else {
          // Re-analyze any existing deals that are still pending
          const allDealsRes = await fetch("/api/dealflow");
          const allDeals = await allDealsRes.json();
          const pending = allDeals.filter((d: any) => d.status === "pending" || !d.score_overall);
          if (pending.length > 0) {
            setScanStatus(`🧠 Analyzing ${pending.length} pending decks...`);
            for (const deal of pending) {
              await fetch("/api/dealflow/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ dealId: deal.id }),
              }).catch(() => {});
            }
          }
        }
        setScanStatus("✅ Scan complete!");
      } else {
        setScanStatus("🔍 Scanning...");
        await fetch("/api/agents/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId, agentName: meta.name, agentEmoji: meta.emoji, tasks: [], category: agentId }),
        });
        setScanStatus("✅ Done!");
      }
      await fetchResults();
    } catch (e) {
      setScanStatus("⚠️ Error during scan");
    }
    setTimeout(() => setScanStatus(""), 3000);
    setScanning(false);
  };

  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const isPitchDeck = data?.type === "pitch-deck";
  const topDeals = isPitchDeck ? (data.deals || []).filter((d: any) => d.recommendation === "strong-yes" || d.recommendation === "yes").slice(0, 3) : [];
  const allDeals = isPitchDeck ? (data.deals || []) : [];
  const activities = data?.activities || [];

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", color: "white", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(10,10,15,0.95)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => router.push("/dashboard")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#94A3B8", fontSize: "13px", padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Dashboard
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "28px" }}>{meta.emoji}</span>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 700 }}>{meta.name}</div>
              <div style={{ fontSize: "12px", color: "#94A3B8" }}>{meta.description}</div>
            </div>
          </div>
          <span style={{ fontSize: "12px", color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "4px 10px", borderRadius: "20px" }}>
            🟢 Active
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {scanStatus && (
            <span style={{ fontSize: "13px", color: "#94A3B8", background: "rgba(255,255,255,0.05)", padding: "6px 12px", borderRadius: "8px" }}>
              {scanStatus}
            </span>
          )}
          <button onClick={runScan} disabled={scanning} style={{ padding: "10px 20px", background: scanning ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366F1, #818CF8)", border: "none", borderRadius: "10px", color: "white", fontSize: "14px", fontWeight: 700, cursor: scanning ? "not-allowed" : "pointer", boxShadow: scanning ? "none" : "0 0 20px rgba(99,102,241,0.3)" }}>
            {scanning ? "⏳ Scanning..." : "🔄 Run Scan"}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 28px" }}>
        {loading ? (
          /* Shimmer skeleton */
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ background: "#111118", borderRadius: "12px", height: "100px", marginBottom: "16px", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Connected Tools */}
            {!isPitchDeck && (
              <div style={{ marginBottom: "24px", background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px 20px" }}>
                <div style={{ fontSize: "12px", color: "#94A3B8", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, marginBottom: "12px" }}>
                  🔗 Connected Tools
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {(AGENT_TOOLS[agentId] || AGENT_TOOLS[normalizedId] || DEFAULT_TOOLS).map((tool, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "6px",
                      padding: "6px 14px", borderRadius: "8px",
                      background: tool.status === "connected" ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
                      border: tool.status === "connected" ? "1px solid rgba(16,185,129,0.2)" : "1px dashed rgba(255,255,255,0.1)",
                      fontSize: "13px",
                      color: tool.status === "connected" ? "#10B981" : "#4B5563",
                    }}>
                      <span>{tool.emoji}</span>
                      <span>{tool.name}</span>
                      {tool.status === "connected" ? <span style={{ fontSize: "10px" }}>✓</span> : <span style={{ fontSize: "10px", color: "#6366F1" }}>Soon</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Bar */}
            {isPitchDeck && data.stats && (
              <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap", animation: "slideUp 0.4s ease" }}>
                {[
                  { label: "Total Decks", value: data.stats.total, icon: "📄" },
                  { label: "Strong Yes", value: data.stats.strongYes, icon: "💚" },
                  { label: "Yes", value: data.stats.yes, icon: "✅" },
                  { label: "Maybe", value: data.stats.maybe, icon: "🤔" },
                  { label: "Pipeline", value: data.stats.pipeline, icon: "💰" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px 20px", flex: "1", minWidth: "120px", animation: "slideUp 0.4s ease forwards", animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{stat.icon}</div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>{stat.value}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {!isPitchDeck && data.stats && (
              <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap", animation: "slideUp 0.4s ease" }}>
                {[
                  { label: "Total Items", value: data.stats.total, icon: "📋" },
                  { label: "High Priority", value: data.stats.high, icon: "🔴" },
                  { label: "Medium Priority", value: data.stats.medium, icon: "🟡" },
                ].map((stat, i) => (
                  <div key={i} style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "16px 20px", flex: "1", minWidth: "120px" }}>
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{stat.icon}</div>
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "white" }}>{stat.value}</div>
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Pitch Deck View */}
            {isPitchDeck && (
              <>
                {/* Top Opportunities */}
                {topDeals.length > 0 && (
                  <div style={{ marginBottom: "36px" }}>
                    <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                      🔥 Top Opportunities
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                      {topDeals.map((deal: any, i: number) => {
                        const rec = REC_COLORS[deal.recommendation] || REC_COLORS["maybe"];
                        return (
                          <div key={deal.id} style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.05))", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "16px", padding: "20px", animation: "slideUp 0.4s ease forwards", animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                              <div>
                                <div style={{ fontSize: "18px", fontWeight: 700 }}>{deal.company_name || "Unknown"}</div>
                                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "2px" }}>{deal.stage} · {deal.sector}</div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: "28px", fontWeight: 800, color: deal.score_overall >= 8 ? "#10B981" : deal.score_overall >= 6 ? "#F59E0B" : "#EF4444" }}>
                                  {deal.score_overall}/10
                                </div>
                                <span style={{ fontSize: "11px", color: rec.color, background: rec.bg, padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                                  {rec.label}
                                </span>
                              </div>
                            </div>
                            <div style={{ marginBottom: "14px" }}>
                              <ScoreBar label="Team" score={deal.score_team} />
                              <ScoreBar label="Market" score={deal.score_market} />
                              <ScoreBar label="Product" score={deal.score_product} />
                              <ScoreBar label="Traction" score={deal.score_traction} />
                            </div>
                            {deal.executive_summary && (
                              <div style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "14px", lineHeight: 1.5 }}>
                                {deal.executive_summary.slice(0, 120)}...
                              </div>
                            )}
                            <div style={{ display: "flex", gap: "8px" }}>
                              {deal.sender_from && (
                                <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(deal.sender_from)}&su=Re: ${encodeURIComponent(deal.subject || "Your Pitch Deck")}`} target="_blank" rel="noopener noreferrer"
                                  style={{ flex: 1, padding: "8px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "8px", color: "#818CF8", fontSize: "12px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "block" }}>
                                  📧 Reply to Sender
                                </a>
                              )}
                              {deal.funding_ask && (
                                <div style={{ flex: 1, padding: "8px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", color: "#10B981", fontSize: "12px", fontWeight: 600, textAlign: "center" }}>
                                  💰 {deal.funding_ask}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* All Decks */}
                <div>
                  <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}>📋 All Pitch Decks</h2>
                  {allDeals.length === 0 ? (
                    <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "48px", textAlign: "center", color: "#94A3B8" }}>
                      <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
                      <div style={{ fontSize: "16px", fontWeight: 600, color: "white", marginBottom: "8px" }}>No pitch decks yet</div>
                      <div>Run a scan to let Vigil analyze pitch decks from your Gmail</div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {allDeals.map((deal: any, i: number) => {
                        const rec = REC_COLORS[deal.recommendation] || { bg: "rgba(255,255,255,0.05)", color: "#94A3B8", label: "Pending" };
                        return (
                          <div key={deal.id} style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "18px 20px", display: "flex", gap: "20px", alignItems: "flex-start", animation: "slideUp 0.4s ease forwards", animationDelay: `${i * 0.05}s`, opacity: 0, transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                            {/* Score */}
                            <div style={{ textAlign: "center", minWidth: "60px" }}>
                              <div style={{ fontSize: "26px", fontWeight: 800, color: (deal.score_overall || 0) >= 8 ? "#10B981" : (deal.score_overall || 0) >= 6 ? "#F59E0B" : "#EF4444" }}>
                                {deal.score_overall || "?"}
                              </div>
                              <div style={{ fontSize: "10px", color: "#4B5563" }}>/ 10</div>
                            </div>
                            {/* Info */}
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                                <span style={{ fontSize: "16px", fontWeight: 700 }}>{deal.company_name || "Unknown Company"}</span>
                                <span style={{ fontSize: "11px", color: rec.color, background: rec.bg, padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>{rec.label}</span>
                                {deal.stage && <span style={{ fontSize: "11px", color: "#6B7280", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: "4px" }}>{deal.stage}</span>}
                                {deal.sector && <span style={{ fontSize: "11px", color: "#6B7280", background: "rgba(255,255,255,0.04)", padding: "2px 8px", borderRadius: "4px" }}>{deal.sector}</span>}
                              </div>
                              {deal.tagline && <div style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "8px" }}>{deal.tagline}</div>}
                              <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>
                                {deal.funding_ask && <span>💰 {deal.funding_ask}</span>}
                                {deal.sender_from && <span>📧 {deal.sender_from.split("<")[0].trim()}</span>}
                                {deal.received_at && <span>📅 {timeAgo(deal.received_at)}</span>}
                              </div>
                              {deal.red_flags && deal.red_flags.length > 0 && (
                                <div style={{ fontSize: "12px", color: "#F87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: "6px", padding: "6px 10px", marginBottom: "8px" }}>
                                  ⚠️ {deal.red_flags.slice(0, 2).join(" · ")}
                                </div>
                              )}
                            </div>
                            {/* Actions */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "140px" }}>
                              {deal.message_id && (
                                <a href={`https://mail.google.com/mail/u/0/#inbox/${deal.message_id}`} target="_blank" rel="noopener noreferrer"
                                  style={{ padding: "8px 14px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "8px", color: "#818CF8", fontSize: "12px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "block", cursor: "pointer" }}>
                                  📧 Buka Email →
                                </a>
                              )}
                              {deal.sender_from && (
                                <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(deal.sender_from)}&su=Re: ${encodeURIComponent(deal.subject || "Your Pitch Deck")}`} target="_blank" rel="noopener noreferrer"
                                  style={{ padding: "8px 14px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "8px", color: "#10B981", fontSize: "12px", fontWeight: 600, textDecoration: "none", textAlign: "center", display: "block", cursor: "pointer" }}>
                                  ✍️ Reply →
                                </a>
                              )}
                              <button onClick={() => setSelectedDeal(deal)} style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: "#CBD5E1", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}>
                                📋 Details
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Generic Feed View */}
            {!isPitchDeck && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: 700 }}>📋 Agent Activity</h2>
                  {data.isDemo && (
                    <span style={{ fontSize: "11px", color: "#6366F1", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>
                      Demo Data
                    </span>
                  )}
                </div>
                {activities.length === 0 ? (
                  <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "48px", textAlign: "center", color: "#94A3B8" }}>
                    <div style={{ fontSize: "40px", marginBottom: "12px" }}>🤖</div>
                    <div style={{ fontSize: "16px", fontWeight: 600, color: "white", marginBottom: "8px" }}>No activity yet</div>
                    <div>Click "Run Scan" to let this agent analyze your tools</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {activities.map((item: any, i: number) => {
                      const priorityColor = item.priority === "high" ? "#EF4444" : item.priority === "medium" ? "#F59E0B" : "#10B981";
                      
                      // Smart action buttons based on message content
                      const getActions = (msg: string) => {
                        const actions = [];
                        // CV/candidate related
                        if (msg.includes("CV Screener") && (msg.includes("Strong Match") || msg.includes("Good Match"))) {
                          actions.push({ label: "📧 Kirim Interview Invite", href: `https://mail.google.com/mail/?view=cm&su=Undangan Interview — ${msg.match(/\b[A-Z][a-z]+ [A-Z][a-z]+/)?.[0] || "Kandidat"}` });
                        }
                        if (msg.includes("belum di-response") || msg.includes("belum dibalas") || msg.includes("Kirim reply")) {
                          actions.push({ label: "📧 Reply Sekarang →", href: "https://mail.google.com/mail/" });
                        }
                        // Finance/subscription
                        if (msg.includes("Figma") || msg.includes("Zoom") || msg.includes("Notion") || msg.includes("subscription") || msg.includes("Cancel")) {
                          actions.push({ label: "💳 Kelola Subscription", href: "https://mail.google.com/mail/#search/subscription+invoice" });
                        }
                        if (msg.includes("Invoice") || msg.includes("invoice")) {
                          actions.push({ label: "📧 Cari di Gmail →", href: "https://mail.google.com/mail/#search/invoice" });
                        }
                        // Deal/sales related  
                        if (msg.includes("going cold") || msg.includes("COLD") || msg.includes("at risk") || msg.includes("follow-up") || msg.includes("follow up")) {
                          actions.push({ label: "📧 Kirim Follow-up →", href: "https://mail.google.com/mail/?view=cm&su=Follow Up" });
                        }
                        if (msg.includes("email") || msg.includes("Email") || msg.includes("unread")) {
                          actions.push({ label: "📧 Buka Gmail →", href: "https://mail.google.com/mail/" });
                        }
                        // Calendar/meeting related
                        if (msg.includes("meeting") || msg.includes("Meeting") || msg.includes("calendar") || msg.includes("Calendar") || msg.includes("async")) {
                          actions.push({ label: "📅 Buka Calendar →", href: "https://calendar.google.com" });
                        }
                        return actions.slice(0, 2); // max 2 buttons
                      };

                      const actions = getActions(item.message);

                      return (
                        <div key={item.id || i} style={{ background: "#111118", border: `1px solid ${priorityColor}25`, borderLeft: `3px solid ${priorityColor}`, borderRadius: "10px", padding: "14px 18px", animation: "slideUp 0.4s ease forwards", animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                            <span style={{ fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>
                              {item.priority === "high" ? "🔴" : item.priority === "medium" ? "🟡" : "🟢"}
                            </span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.5 }}>{item.message}</div>
                              <div style={{ fontSize: "11px", color: "#4B5563", marginTop: "4px" }}>{timeAgo(item.created_at)}</div>
                              {/* Action buttons */}
                              {actions.length > 0 && (
                                <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                                  {actions.map((action, j) => (
                                    <a key={j} href={action.href} target="_blank" rel="noopener noreferrer"
                                      style={{
                                        padding: "6px 14px",
                                        background: item.priority === "high" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                                        border: item.priority === "high" ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "8px",
                                        color: item.priority === "high" ? "#818CF8" : "#94A3B8",
                                        fontSize: "12px",
                                        fontWeight: 700,
                                        textDecoration: "none",
                                        display: "inline-block",
                                        cursor: "pointer",
                                      }}>
                                      {action.label}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedDeal(null)}>
          <div style={{ background: "#111118", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "20px", padding: "28px", maxWidth: "600px", width: "100%", maxHeight: "85vh", overflowY: "auto", animation: "slideUp 0.3s ease" }}
            onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <div style={{ fontSize: "22px", fontWeight: 800 }}>{selectedDeal.company_name || "Unknown Company"}</div>
                <div style={{ fontSize: "13px", color: "#94A3B8", marginTop: "4px" }}>{selectedDeal.tagline}</div>
              </div>
              <button onClick={() => setSelectedDeal(null)} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "8px", color: "#94A3B8", fontSize: "18px", width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✕
              </button>
            </div>

            {/* Score + Recommendation */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "12px", padding: "16px 20px", textAlign: "center", minWidth: "80px" }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: (selectedDeal.score_overall || 0) >= 8 ? "#10B981" : (selectedDeal.score_overall || 0) >= 6 ? "#F59E0B" : "#EF4444" }}>{selectedDeal.score_overall || "?"}</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Overall</div>
              </div>
              <div style={{ flex: 1 }}>
                <ScoreBar label="Team" score={selectedDeal.score_team} />
                <ScoreBar label="Market" score={selectedDeal.score_market} />
                <ScoreBar label="Product" score={selectedDeal.score_product} />
                <ScoreBar label="Traction" score={selectedDeal.score_traction} />
              </div>
            </div>

            {/* Meta info */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              {selectedDeal.stage && <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "6px", color: "#94A3B8" }}>{selectedDeal.stage}</span>}
              {selectedDeal.sector && <span style={{ fontSize: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: "6px", color: "#94A3B8" }}>{selectedDeal.sector}</span>}
              {selectedDeal.funding_ask && <span style={{ fontSize: "12px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "4px 10px", borderRadius: "6px", color: "#10B981" }}>💰 {selectedDeal.funding_ask}</span>}
            </div>

            {/* Executive Summary */}
            {selectedDeal.executive_summary && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Executive Summary</div>
                <div style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.6, background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "12px" }}>{selectedDeal.executive_summary}</div>
              </div>
            )}

            {/* Key Strengths */}
            {selectedDeal.key_strengths?.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>💪 Key Strengths</div>
                {selectedDeal.key_strengths.map((s: string, i: number) => (
                  <div key={i} style={{ fontSize: "13px", color: "#10B981", padding: "4px 0", display: "flex", gap: "8px" }}>
                    <span>✓</span><span>{s}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Red Flags */}
            {selectedDeal.red_flags?.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>⚠️ Red Flags</div>
                {selectedDeal.red_flags.map((f: string, i: number) => (
                  <div key={i} style={{ fontSize: "13px", color: "#F87171", padding: "4px 0", display: "flex", gap: "8px" }}>
                    <span>•</span><span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendation reason */}
            {selectedDeal.recommendation_reason && (
              <div style={{ marginBottom: "20px", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px", padding: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#6366F1", marginBottom: "6px" }}>🤖 Vigil&apos;s Take</div>
                <div style={{ fontSize: "13px", color: "#CBD5E1", lineHeight: 1.5 }}>{selectedDeal.recommendation_reason}</div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {selectedDeal.message_id && (
                <a href={`https://mail.google.com/mail/u/0/#inbox/${selectedDeal.message_id}`} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, padding: "12px", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "10px", color: "#818CF8", fontSize: "13px", fontWeight: 700, textDecoration: "none", textAlign: "center", display: "block" }}>
                  📧 Buka Email Original →
                </a>
              )}
              {selectedDeal.sender_from && (
                <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(selectedDeal.sender_from)}&su=Re: ${encodeURIComponent(selectedDeal.subject || "Your Pitch Deck")}`} target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #6366F1, #818CF8)", border: "none", borderRadius: "10px", color: "white", fontSize: "13px", fontWeight: 700, textDecoration: "none", textAlign: "center", display: "block", boxShadow: "0 0 20px rgba(99,102,241,0.3)" }}>
                  ✍️ Reply to Founder →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}