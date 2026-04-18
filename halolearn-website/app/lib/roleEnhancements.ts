export interface RoleEnhancement {
  salary: {
    range: string;
    note: string;
    highlights: string[];
  };
  careerPath: string[];
  faq: Array<{ q: string; a: string }>;
}

export const roleEnhancementData: Record<string, RoleEnhancement> = {
  'management-trainee': {
    salary: {
      range: 'Rp5 juta – Rp10 juta+',
      note: 'Tergantung industri, kota, dan brand perusahaan. Program MT besar biasanya lebih kompetitif dari posisi entry-level biasa.',
      highlights: [
        'FMCG / manufaktur besar sering di kisaran menengah ke atas',
        'Bank / ODP sering lebih tinggi dengan benefit tambahan',
        'Beberapa perusahaan memberi bonus, tunjangan rotasi, dan asuransi',
      ],
    },
    careerPath: ['Management Trainee', 'Officer / Supervisor Track', 'Assistant Manager', 'Manager', 'Business Leader'],
    faq: [
      {
        q: 'Apakah MT harus punya pengalaman organisasi?',
        a: 'Tidak wajib, tapi pengalaman organisasi, magang, atau project leadership sangat membantu karena menunjukkan potensi memimpin dan bekerja lintas tim.',
      },
      {
        q: 'Apakah semua peserta MT pasti jadi manager?',
        a: 'Tidak instan. MT adalah jalur percepatan, tetapi hasil akhirnya tetap bergantung pada evaluasi, performa, dan kebutuhan bisnis perusahaan.',
      },
      {
        q: 'Apa kesalahan paling umum saat interview MT?',
        a: 'Terlalu generik, tidak punya alasan kuat kenapa memilih jalur fast-track, dan kurang menunjukkan cara berpikir bisnis atau ownership.',
      },
    ],
  },
  akuntansi: {
    salary: {
      range: 'Rp4 juta – Rp7 juta+',
      note: 'Untuk level entry sampai junior, angka bisa naik jika kandidat kuat di Excel, tax, audit, atau punya pengalaman internship yang relevan.',
      highlights: [
        'Multinasional dan perusahaan besar biasanya lebih kompetitif',
        'Periode closing atau lembur kadang disertai kompensasi tambahan',
        'Skill reporting, tax, dan audit bisa meningkatkan daya tawar',
      ],
    },
    careerPath: ['Accounting Staff', 'Senior Accounting', 'Supervisor', 'Chief Accountant', 'Finance / Accounting Manager'],
    faq: [
      {
        q: 'Apakah harus jago Excel untuk role akuntansi?',
        a: 'Iya, Excel hampir selalu jadi basic skill wajib karena banyak pekerjaan akuntansi bergantung pada formula, lookup, rekap, dan validasi data.',
      },
      {
        q: 'Apa bedanya finance dan accounting saat interview?',
        a: 'Accounting fokus pada pencatatan dan pelaporan historis, sedangkan finance lebih banyak ke analisis, budgeting, cash flow, dan pengambilan keputusan.',
      },
      {
        q: 'Kalau belum pernah closing bulanan bagaimana?',
        a: 'Jawab jujur, lalu jelaskan pemahamanmu tentang alurnya dan pengalaman terdekat yang relevan seperti rekonsiliasi, data entry, atau laporan internship.',
      },
    ],
  },
  admin: {
    salary: {
      range: 'Rp3,5 juta – Rp6 juta+',
      note: 'Range dipengaruhi lokasi, skala perusahaan, dan apakah perannya murni admin atau merangkap support sekretaris / operasional lain.',
      highlights: [
        'Admin eksekutif / sekretaris biasanya punya range lebih tinggi',
        'Perusahaan besar cenderung memberi SOP dan benefit yang lebih jelas',
        'Skill software dan multitasking bikin kandidat lebih menonjol',
      ],
    },
    careerPath: ['Admin Staff', 'Senior Admin', 'Executive Assistant / Office Coordinator', 'Office Manager', 'Operations Support Lead'],
    faq: [
      {
        q: 'Apakah admin cuma input data?',
        a: 'Tidak. Banyak role admin juga menangani koordinasi dokumen, jadwal, komunikasi internal, arsip, dan menjaga kelancaran operasional harian.',
      },
      {
        q: 'Skill apa yang paling penting untuk admin?',
        a: 'Ketelitian, prioritas kerja, komunikasi profesional, dan kemampuan pakai tools seperti Excel, Word, email, serta sistem internal perusahaan.',
      },
      {
        q: 'Apa red flag saat interview admin?',
        a: 'Jawaban terlalu umum, tidak bisa menjelaskan sistem kerja yang rapi, dan terlihat tidak nyaman dengan tugas detail atau repetitif.',
      },
    ],
  },
  'human-resources': {
    salary: {
      range: 'Rp4 juta – Rp7 juta+',
      note: 'Berbeda menurut fungsi HR-nya, misalnya recruiter, HR admin, atau HR generalist. Perusahaan besar biasanya punya struktur gaji lebih jelas.',
      highlights: [
        'Recruitment-heavy roles kadang punya insentif tambahan',
        'Generalist dengan exposure luas biasanya berkembang lebih cepat',
        'Training budget dan benefit employee sering jadi nilai tambah',
      ],
    },
    careerPath: ['HR Staff / Recruiter', 'HR Generalist', 'Senior HR', 'HR Supervisor / Specialist', 'HR Manager / HRBP'],
    faq: [
      {
        q: 'Apakah HR harus extrovert?',
        a: 'Tidak harus. Yang lebih penting adalah bisa berkomunikasi baik, mendengarkan aktif, menjaga objektivitas, dan nyaman berinteraksi dengan berbagai tipe orang.',
      },
      {
        q: 'Kenapa interview HR sering banyak pertanyaan situasional?',
        a: 'Karena HR berhubungan dengan orang dan kebijakan, jadi interviewer ingin melihat judgement, empati, ketegasan, dan cara kamu menangani situasi sensitif.',
      },
      {
        q: 'Kalau belum paham UU Ketenagakerjaan secara detail bagaimana?',
        a: 'Jawab jujur, sebutkan dasar yang kamu tahu, lalu tekankan bahwa kamu terbiasa belajar cepat dan akan selalu cross-check dengan aturan serta tim legal bila perlu.',
      },
    ],
  },
  'odp-bank': {
    salary: {
      range: 'Rp5,5 juta – Rp10 juta+',
      note: 'ODP bank umumnya punya kompensasi menarik untuk fresh graduate karena memang disiapkan sebagai talent pipeline jangka panjang.',
      highlights: [
        'Bank besar nasional biasanya sangat kompetitif',
        'Benefit bisa termasuk training, bonus, dan asuransi',
        'Penempatan dan unit akhir dapat memengaruhi paket keseluruhan',
      ],
    },
    careerPath: ['ODP / Officer Development Program', 'Officer', 'Senior Officer / Supervisor', 'Assistant Manager', 'Branch / Functional Manager'],
    faq: [
      {
        q: 'Apa bedanya ODP dan MT bank?',
        a: 'Secara konsep mirip, tetapi ODP biasanya lebih spesifik ke jalur officer di industri perbankan, termasuk exposure ke compliance, layanan, kredit, dan risk.',
      },
      {
        q: 'Apakah harus dari jurusan ekonomi untuk ODP bank?',
        a: 'Tidak selalu. Banyak bank membuka untuk berbagai jurusan, asalkan kandidat punya logika yang baik, cepat belajar, dan mampu memahami industri keuangan.',
      },
      {
        q: 'Apa yang paling dicari bank saat interview ODP?',
        a: 'Biasanya kombinasi antara leadership potential, profesionalisme, analisis, komunikasi, dan kesiapan bekerja di lingkungan yang regulated serta target-oriented.',
      },
    ],
  },
};
