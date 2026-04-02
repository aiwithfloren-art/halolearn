export const WA_NUMBER = "6285260421274";
export const createWhatsAppLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
export const generalWhatsAppLink = createWhatsAppLink("Halo Halolearn, saya mau order paket Halolearn dan konsultasi karir");

export const heroStats = [
  { value: "+1.000", label: "Klien Indonesia", detail: "Dari fresh grad sampai exec" },
  { value: "7", label: "Slides viral", detail: "Setiap minggu ada insight baru" },
  { value: "24h", label: "Delivery Telegram", detail: "Review sebelum post" }
];

export const heroTrustHighlights = [
  { label: "Kandidat terbantu", value: "10.000+", detail: "dari universitas & karier beragam" },
  { label: "Success rate", value: "95%", detail: "job baru dalam 2-6 bulan" }
];

export const servicePackages = [
  {
    title: "Basic Career 1 · PBC1 (CV Edition)",
    pricePromo: "IDR 195K",
    priceNormal: "IDR 225K",
    description: "CV ATS-friendly + review + konsul tambahan 1 hari",
    details: [
      "CV ATS Friendly yang mudah terbaca sistem",
      "Review lengkap + saran feedback agar lebih optimal di mata HRD",
      "File docs editable, plus opsional konsul +20K"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Basic Career 1 PBC1 CV Edition")
  },
  {
    title: "Basic Career 1 · PBC1 (LinkedIn)",
    pricePromo: "IDR 195K",
    priceNormal: "IDR 225K",
    description: "LinkedIn optimization untuk kredibilitas + visibilitas",
    details: [
      "LinkedIn Optimisasi terima jadi",
      "Bisa bikin akun baru (ekstra 30K)",
      "Konsultasi 1 hari + follow-up revisi"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Basic Career 1 PBC1 LinkedIn")
  },
  {
    title: "Basic Career 2 · PBC2",
    pricePromo: "IDR 225K",
    priceNormal: "IDR 250K",
    description: "CV kreatif + konsultasi karir intens 1 hari",
    details: [
      "CV design untuk lamaran email/creative roles",
      "Review CV + feedback agar menarik HRD",
      "Konsultasi karir 1 hari penuh"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Basic Career 2 PBC2")
  },
  {
    title: "Basic Super 1 · PBS1 (LinkedIn)",
    pricePromo: "IDR 255K",
    priceNormal: "IDR 285K",
    description: "LinkedIn optimisasi + konsultasi karir 1 minggu",
    details: [
      "LinkedIn optimisasi yang mudah ditemukan HRD",
      "Konsultasi karir 1 minggu fokus follow-up",
      "Opsional live delivery + testimoni utk sosial"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Basic Super 1 PBS1 LinkedIn")
  },
  {
    title: "Basic Super 1 · PBS1 (CV)",
    pricePromo: "IDR 255K",
    priceNormal: "IDR 285K",
    description: "Pilih CV design atau ATS, plus konsultasi 1 minggu",
    details: [
      "CV design premium atau ATS-friendly",
      "Review & feedback strategis dari Halolearn",
      "Konsultasi karir 1 minggu + dokumen ready"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Basic Super 1 PBS1 CV")
  },
  {
    title: "Supreme 1",
    pricePromo: "IDR 335K",
    priceNormal: "IDR 365K",
    description: "CV + konsultasi 2 minggu + LinkedIn optimisasi",
    details: [
      "CV ATS/creative + LinkedIn optimization",
      "Konsultasi karir 2 minggu + 1x revisi",
      "Bonus template email follow-up"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Supreme 1")
  },
  {
    title: "Supreme 2",
    pricePromo: "IDR 435K",
    priceNormal: "IDR 465K",
    description: "CV + LinkedIn + konsultasi 1 bulan + cover letter",
    details: [
      "CV ATS atau kreatif pilihan kamu",
      "LinkedIn optimization + surat lamaran",
      "Konsultasi 1 bulan + 1x revisi"
    ],
    whatsappLink: createWhatsAppLink("Halo Halolearn, saya mau order Supreme 2")
  }
];

export const aiFeatures = [
  {
    name: "Halolearn AI – CV Analyzer",
    description:
      "Halolearn AI scan CV kamu dengan logika recruiter TikTok + ATS, lalu beri catatan per baris: grammar, impact, keyword yang kurang.",
    badge: "Halolearn AI"
  },
  {
    name: "LinkedIn Headline Generator",
    description:
      "Headline data-driven dengan 3 opsi keyword terbaru hiring Indonesia sehingga recruiter stop scroll.",
    badge: "AI Toolkit"
  },
  {
    name: "Interview Simulator",
    description:
      "Latihan video interview + feedback articulation, storytelling, dan follow-up script sesuai posisi target.",
    badge: "AI Toolkit"
  },
  {
    name: "Offer Booster Audit",
    description:
      "Audit gap resume, LinkedIn, pitch deck, dengan proof point soal kecepatan + outcome klien Halolearn.",
    badge: "AI Toolkit"
  }
];

export const testimonials = [
  {
    name: "Syafira Putri Aulia",
    quote:
      "Setelah konsul dan optimisasi CV + LinkedIn, saya tembus di posisi yang sebelumnya gak kepikiran. Terlebih, tim Halolearn bantu highlight testimoni dan case study untuk sosial media.",
    result: "Repeat order + referensi"
  },
  {
    name: "Kandidat Premium",
    quote:
      "Level Manager / Head Level upgrade premium di Halolearn: CV, LinkedIn, dan simulasi interview disatukan jadi satu flow komplit.",
    result: "Upgrade level karir"
  },
  {
    name: "Tim Internasional",
    quote:
      "Teman-teman target posisi luar negeri (Amerika, Dubai, Jepang, Inggris) naik impresi, semua dimulai dari CV + branding LinkedIn yang disiapkan Halolearn.",
    result: "Impresi +1000%"
  }
];

export const promoHighlights = [
  "Order via WhatsApp 0852 6042 1274 → dibalas langsung jam kerja.",
  "CTA nomor di bio jadi bukti human support + follow-up.",
  "Tim Halolearn bantu kelola konten LinkedIn & CV end-to-end.",
  "Trusted oleh universitas & kandidat 10.000+ dengan 95% berhasil kerja dalam 2-6 bulan."
];

export const faqItems = [
  {
    question: "Apa bedanya Halolearn AI dengan layanan biasa?",
    answer:
      "Halolearn AI buka audit data-driven dan skrip otomatis, sementara Halolearn team bantu polishing copy, desain slide, dan delivery Telegram."
  },
  {
    question: "Kalau saya butuh revisi?",
    answer:
      "Kirim revisi via WhatsApp; kami update script + slide, kirim ulang untuk verifikasi sebelum publish."
  },
  {
    question: "Quote bisa diubah?",
    answer:
      "Yup, ada paket fleksibel. Cukup request di WhatsApp, kami kirim breakdown + approval."
  }
];

export const completePackageHighlights = [
  "Complete Career Package: CV creation, CV review, LinkedIn optimization, career consultation, and psikotest handbook.",
  "E-learning mandiri + cohort class intensif untuk skill upgrade, dipadu template email reach-out dan delivery Telegram.",
  "Pemesanan via bit.ly/halolearnkarir, proses 5-7 hari kerja (express on request), dan konsultasi berlanjut sesuai paket.",
  "Terpercaya oleh Universitas & 10.000+ kandidat; 95% berhasil mendapatkan posisi baru dalam 2-6 bulan."
];

export const linkedinBrandingPackages = [
  {
    name: "LinkedIn BBasic",
    price: "IDR 599K/bulan (min 3 bulan)",
    contents: "4 konten premium + optimisasi kata kunci target",
    action: "Naikkan kredibilitas & profile visit"
  },
  {
    name: "LinkedIn BBasic2",
    price: "IDR 999K/bulan (min 3 bulan)",
    contents: "6 konten + priority review + personal brand kit",
    action: "Bangun story konsisten dengan highlight skill"
  },
  {
    name: "LinkedIn BSuper",
    price: "IDR 1.5M/bulan (min 3 bulan)",
    contents: "10 konten + engagement strategy + recruiter outreach",
    action: "Maksimalkan profile reach & connect"
  },
  {
    name: "LinkedIn BExclusive",
    price: "IDR 2.2M/bulan (min 3 bulan)",
    contents: "12 konten + personal branding + premium copy",
    action: "Impress recruiter internasional + portfolio showcase"
  }
];

export const linkedinBrandingStats = [
  "300+ profile visit setelah 3 bulan",
  "Impression naik +1000%",
  "Harga per bulan, wajib order minimal 3 bulan"
];

export const linkedinProofStats = [
  { label: "Profile visit", value: "+300", detail: "setelah 3 bulan LinkedIn branding" },
  { label: "Impression", value: "+1.000%", detail: "dari baseline minggu pertama" },
  { label: "Engagement", value: "+60 leads", detail: "dari outreach & template Halolearn" }
];

export const workflowTimelines = [
  {
    step: "Diagnosa",
    title: "Halolearn AI scan",
    detail: "CV & LinkedIn direview otomatis, skor readability + ATS + storytelling"
  },
  {
    step: "Insight",
    title: "Role + Career Path",
    detail: "AI rekomendasikan peran yang cocok dan jalur karir yang bisa kamu kejar"
  },
  {
    step: "Treatment",
    title: "Halolearn update",
    detail: "Tim bantu rewrite CV, LinkedIn, dan pitch agar sesuai insight dan tone premium"
  },
  {
    step: "Delivery",
    title: "Pengiriman + follow-up",
    detail: "File dikirim via Telegram/WhatsApp, plus template outreach untuk recruiter"
  }
];

export const testimonialScreenshots = [
  {
    title: "Slide testimoni 14–17",
    description:
      "Screenshot testimoni & success story dari brosur Halolearn, lengkap dengan hasil LinkedIn + CV + proof point.",
    file: "/halolearn-testimoni.pdf#page=14"
  }
];

export const linkedinScoreResults = {
  profileStrength: 68,
  missingSections: [
    "Professional headline belum optimal – kurang keyword industri",
    "About section kurang storytelling – 2-3 baris aja, padahal bisa lebih impactful",
    "Experience bullets tidak menunjukkan impact – hilang angka, proof point, dan hasil terukur",
    "Skills section belum di-endorse – rekomendasi tambah top 10 skills sesuai target role"
  ],
  recommendations: [
    "Rewrite headline dengan keyword: 'Product Manager | Growth Strategist | Tech for Social Good'",
    "Expand About dengan 5-7 bullets impact story + proof point dari karir kamu",
    "Optimalkan experience bullets: start dengan action verb + metric + hasil (contoh: 'Increased user engagement by 40% through personalized outreach')",
    "Request endorsement dari network untuk top skills + invite collaborators"
  ]
};

export const pricingStats = [
  { value: "10.000+", label: "Klien terbantu", detail: "dari berbagai industri" },
  { value: "95%", label: "Success rate", detail: "job baru dalam 2-6 bulan" },
  { value: "24h", label: "Delivery", detail: "CV siap dalam 24 jam" }
];

export const promoCodeInfo = {
  code: "H4LO5",
  discount: "5%",
  description: "Diskon 5% untuk semua paket career & LinkedIn branding"
};
