export const WA_NUMBER = '6285260421274';

export const ALL_ROLES = [
  { slug: 'management-trainee', name: 'Management Trainee', short: 'MT', icon: '🎯' },
  { slug: 'mt-bumn', name: 'MT BUMN', short: 'MT BUMN', icon: '🏛️' },
  { slug: 'akuntansi', name: 'Akuntansi', short: 'Akuntan', icon: '📊' },
  { slug: 'admin', name: 'Administrasi', short: 'Admin', icon: '📋' },
  { slug: 'human-resources', name: 'Human Resources', short: 'HR', icon: '👥' },
  { slug: 'odp-bank', name: 'ODP Bank', short: 'ODP', icon: '🏦' },
] as const;

export const ROLE_NAMES: Record<string, string> = Object.fromEntries(
  ALL_ROLES.map((role) => [role.slug, role.name])
);

export const roleLandingData: Record<
  string,
  {
    name: string;
    icon: string;
    price: string;
    description: string;
    features: string[];
    sampleQuestions: Array<{ q: string; options: string[] }>;
  }
> = {
  'management-trainee': {
    name: 'Management Trainee (MT)',
    icon: '🎯',
    price: 'Rp75.000',
    description:
      'Program MT adalah jalur fast-track menuju posisi manajerial. Persiapkan dirimu dengan 100 soal berbasis kasus nyata dari perusahaan top Indonesia.',
    features: [
      '100 soal berbasis kasus nyata',
      'Modul belajar easy, medium, hard',
      'Timer 60 detik per soal',
      'Passing score 80%',
      'Penjelasan detail tiap jawaban',
      'Progress tracking real-time',
    ],
    sampleQuestions: [
      {
        q: 'Apa yang dimaksud dengan Management Trainee?',
        options: ['Program pelatihan calon manajer', 'Program magang biasa', 'Staf admin', 'Program beasiswa'],
      },
      {
        q: 'Apa fokus utama saat rotasi departemen dalam MT?',
        options: ['Tugas administratif saja', 'Memahami operasional bisnis menyeluruh', 'Satu divisi saja', 'Penjualan produk'],
      },
      {
        q: 'Perbedaan utama leadership vs management?',
        options: ['Sama saja', 'Leadership = inspirasi; Management = sistem & proses', 'Leadership lebih penting', 'Management untuk orang banyak'],
      },
    ],
  },
  'mt-bumn': {
    name: 'MT BUMN (Management Trainee BUMN)',
    icon: '🏛️',
    price: 'Rp75.000',
    description:
      'Siap untuk Rekrutmen Bersama BUMN? 100 soal khusus MT BUMN — dari regulasi, GCG, holding structure, banking, energi, tambang, infra, sampai case study leadership di konteks BUMN.',
    features: [
      '100 soal khusus MT BUMN Indonesia',
      'Regulasi + struktur BUMN + RBB',
      'Core values AKHLAK + GCG TARIF',
      'Sektor: banking, energi, tambang, infra, manufaktur',
      'Case study leadership kontekstual BUMN',
      'Penjelasan detail + referensi sumber',
    ],
    sampleQuestions: [
      {
        q: 'Apa dasar hukum utama yang mengatur BUMN di Indonesia?',
        options: ['UU No. 40/2007 PT', 'UU No. 19/2003 BUMN', 'UU No. 25/2007 Penanaman Modal', 'UU No. 11/2020 Cipta Kerja'],
      },
      {
        q: 'Apa itu Rekrutmen Bersama BUMN (RBB)?',
        options: ['Program magang bersama', 'Seleksi serentak untuk puluhan BUMN dalam satu sistem terintegrasi', 'Ujian CPNS khusus BUMN', 'Program rotasi karyawan'],
      },
      {
        q: 'Apa arti core values AKHLAK yang ditetapkan Menteri BUMN?',
        options: ['Akuntabel, Kapabel, Harmonis, Lugas, Aktif, Kreatif', 'Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif', 'Adil, Kreatif, Hebat, Loyal, Aktif, Kompak', 'Akhlak, Kerja, Harapan, Lingkungan, Akar, Kesatuan'],
      },
    ],
  },
  akuntansi: {
    name: 'Akuntansi',
    icon: '📊',
    price: 'Rp75.000',
    description:
      'Kuasai semua aspek interview akuntansi & keuangan. Dari jurnal dasar hingga analisis laporan keuangan dan prosedur audit.',
    features: [
      '100 soal akuntansi komprehensif',
      'Modul belajar fundamental sampai advanced',
      'Timer 60 detik per soal',
      'Passing score 80%',
      'Penjelasan jurnal & perhitungan',
      'Progress tracking real-time',
    ],
    sampleQuestions: [
      {
        q: 'Persamaan dasar akuntansi adalah?',
        options: ['Aset = Liabilitas + Ekuitas', 'Aset = Pendapatan - Beban', 'Liabilitas = Aset + Ekuitas', 'Ekuitas = Aset - Pendapatan'],
      },
      {
        q: 'Prinsip matching dalam akuntansi maksudnya?',
        options: ['Mencocokkan rekening bank', 'Pendapatan & beban pada periode sama', 'Menyamakan debit-kredit', 'Laporan keuangan seimbang'],
      },
      {
        q: 'Perbedaan FIFO dan LIFO?',
        options: ['FIFO harga tertinggi', 'FIFO: pertama masuk pertama keluar; LIFO sebaliknya', 'Hasil akhir sama', 'FIFO untuk perishable saja'],
      },
    ],
  },
  admin: {
    name: 'Administrasi',
    icon: '📋',
    price: 'Rp75.000',
    description:
      'Persiapkan interview posisi administrasi perkantoran. Mencakup SOP, manajemen dokumen, korespondensi bisnis, dan prioritisasi tugas.',
    features: [
      '100 soal administrasi perkantoran',
      'Modul belajar dasar, menengah, lanjutan',
      'Timer 60 detik per soal',
      'Passing score 80%',
      'Penjelasan skenario kantor nyata',
      'Progress tracking real-time',
    ],
    sampleQuestions: [
      {
        q: 'Tugas utama staf administrasi?',
        options: ['Buat keputusan strategis', 'Kelola dokumen & operasional kantor', 'Sales & marketing', 'Awasi karyawan'],
      },
      {
        q: 'SOP (Standard Operating Procedure) adalah?',
        options: ['Laporan keuangan', 'Panduan langkah-langkah standar menjalankan tugas', 'Kontrak kerja', 'Sistem penggajian'],
      },
      {
        q: 'Mendapat 3 tugas mendadak dari 3 direktur, apa yang dilakukan?',
        options: ['Kerjakan berurutan', 'Tolak semua', 'Evaluasi urgensi & komunikasikan ke semua', 'Kerjakan yang termudah'],
      },
    ],
  },
  'human-resources': {
    name: 'Human Resources (HR)',
    icon: '👥',
    price: 'Rp75.000',
    description:
      'Siap interview posisi HR dengan materi rekrutmen, UU Ketenagakerjaan, HRIS, dan performance management berbasis kasus nyata.',
    features: [
      '100 soal HR komprehensif',
      'Modul belajar dasar, menengah, lanjutan',
      'Timer 60 detik per soal',
      'Passing score 80%',
      'Cakupan UU No. 13/2003 & PP Cipta Kerja',
      'Progress tracking real-time',
    ],
    sampleQuestions: [
      {
        q: 'Apa kepanjangan HRIS dan fungsi utamanya?',
        options: ['Human Resource Information System — mengelola data SDM', 'Human Resource Integration System', 'Human Resource Incentive System', 'Human Resource Internal System'],
      },
      {
        q: 'Cuti tahunan minimum per UU Ketenagakerjaan?',
        options: ['10 hari', '12 hari', '14 hari', '7 hari'],
      },
      {
        q: 'Apa itu 360-degree feedback?',
        options: ['Penilaian dari atasan saja', 'Penilaian dari atasan, bawahan, rekan & self-assessment', 'Evaluasi 360 hari sekali', 'Rotasi jabatan setahun'],
      },
    ],
  },
  'odp-bank': {
    name: 'ODP Bank',
    icon: '🏦',
    price: 'Rp75.000',
    description:
      'Lolos seleksi Officer Development Program (ODP) bank dengan latihan soal operasional perbankan, analisis kredit, regulasi OJK, dan manajemen risiko.',
    features: [
      '100 soal perbankan & ODP',
      'Modul belajar dasar, menengah, lanjutan',
      'Timer 60 detik per soal',
      'Passing score 80%',
      'Cakupan regulasi OJK terkini',
      'Progress tracking real-time',
    ],
    sampleQuestions: [
      {
        q: 'ODP singkatan dari?',
        options: ['Officer Development Program', 'Operational Data Processing', 'Organizational Development Plan', 'Official Deployment Program'],
      },
      {
        q: 'Prinsip 5C dalam analisis kredit?',
        options: ['Cash, Capital, Credit, Collateral, Condition', 'Character, Capacity, Capital, Collateral, Condition', 'Character, Cash, Credit, Collateral, Capability', 'Capacity, Cash, Capital, Credit, Condition'],
      },
      {
        q: 'NPL (Non Performing Loan) batas maksimal OJK?',
        options: ['10%', '5%', '3%', 'Tidak ada batas'],
      },
    ],
  },
};

export const levelLabels: Record<number, string> = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard',
};

export const levelDescriptions: Record<number, string> = {
  1: 'Bangun fondasi dengan pertanyaan yang paling sering keluar saat screening awal.',
  2: 'Naik ke skenario yang lebih analitis, lebih tajam, dan butuh struktur jawaban yang rapi.',
  3: 'Uji kesiapan final dengan pertanyaan sulit, case-based, dan jebakan interview yang lebih realistis.',
};

export const roleOverviewData: Record<
  string,
  | {
      badge: string;
      intro: string;
      sections: Array<{
        title: string;
        body: string;
        bullets?: string[];
      }>;
    }
  | undefined
> = {
  'management-trainee': {
    badge: 'Career Overview',
    intro:
      'Management Trainee atau MT adalah program percepatan karier untuk fresh graduate atau early-career talent yang disiapkan menjadi future leader. Jadi bukan sekadar posisi entry-level biasa — perusahaan biasanya memakai MT untuk mencari kandidat yang cepat belajar, kuat secara analitis, dan siap diproyeksikan ke jalur manajerial.',
    sections: [
      {
        title: 'Apa itu Management Trainee?',
        body:
          'Program MT biasanya dirancang agar peserta memahami bisnis secara end-to-end lewat pembelajaran intensif, project assignment, dan rotasi antar divisi. Karena itulah interview MT sering lebih menuntut dari interview staff biasa: perusahaan ingin melihat potensi, cara berpikir, leadership, dan kematangan komunikasi sekaligus.',
      },
      {
        title: 'Cara kerja program MT',
        body:
          'Secara umum, peserta akan melewati fase classroom training, rotasi lintas divisi, penugasan project, evaluasi berkala, lalu penempatan akhir di unit yang dianggap paling cocok. Durasi program bisa sekitar 6 sampai 24 bulan, tergantung industri dan kompleksitas bisnis perusahaan.',
        bullets: [
          'Orientation & training dasar tentang bisnis, produk, dan culture perusahaan',
          'Rotasi divisi agar peserta paham operasional dari berbagai sisi',
          'Project / case assignment untuk menguji analisis dan eksekusi',
          'Assessment berkala dari mentor, HR, dan user',
          'Final placement ke fungsi bisnis yang paling sesuai',
        ],
      },
      {
        title: 'Skill yang paling dicari',
        body:
          'Dalam interview MT, perusahaan biasanya tidak hanya mengejar kandidat pintar, tapi kandidat yang bisa dipoles jadi pemimpin. Karena itu mereka suka kandidat yang punya kombinasi problem solving, komunikasi, adaptabilitas, ownership, dan daya tahan saat diberi tekanan atau ambiguity.',
        bullets: [
          'Leadership potential & inisiatif',
          'Analytical thinking dan problem solving',
          'Komunikasi yang rapi dan persuasif',
          'Adaptability saat pindah fungsi atau target',
          'Business acumen dan rasa ingin tahu yang tinggi',
        ],
      },
      {
        title: 'Range gaji Management Trainee',
        body:
          'Range gaji MT di Indonesia sangat bergantung pada industri, kota, dan brand perusahaan. Untuk fresh graduate, umumnya ada di kisaran menengah ke atas dibanding posisi entry-level biasa karena ekspektasi performanya juga lebih tinggi. Selain gaji pokok, beberapa perusahaan memberi tunjangan, uang transport, bonus, hingga mess/accommodation saat rotasi.',
        bullets: [
          'FMCG / manufaktur besar: sekitar Rp5 juta – Rp9 juta+',
          'Perbankan / ODP / financial services: sekitar Rp5,5 juta – Rp10 juta+',
          'BUMN / conglomerate tertentu: bisa kompetitif tergantung kebijakan perusahaan',
          'Benefit tambahan sering berupa bonus performa, BPJS/asuransi, dan tunjangan rotasi',
        ],
      },
      {
        title: 'Perusahaan yang sering buka MT',
        body:
          'Secara umum, program MT paling sering muncul di perusahaan FMCG, perbankan, BUMN, manufaktur besar, dan grup konglomerasi. Nama perusahaan bisa berubah tiap periode, tapi pola recruiter-nya kurang lebih sama: mereka mencari kandidat dengan potensi growth tinggi dan kesiapan dipindah-pindah fungsi.',
        bullets: [
          'FMCG & consumer goods: Unilever, Danone, Mayora, Wings, Indofood',
          'Perbankan: BCA, Bank Mandiri, BRI, BNI, CIMB Niaga',
          'Grup besar & manufaktur: Astra, Sinarmas, JAPFA, Adaro, Wilmar',
          'BUMN dan afiliasinya juga sering membuka jalur management trainee / ODP',
        ],
      },
      {
        title: 'Prospek karier setelah lulus MT',
        body:
          'Setelah program selesai, peserta umumnya ditempatkan ke posisi supervisor, officer, analyst, atau assistant manager track tergantung hasil evaluasi. Jalurnya memang dibuat lebih cepat, tapi konsekuensinya ekspektasi kinerja juga tinggi sejak awal. Artinya, interview MT sangat menilai apakah kamu hanya “maju di CV” atau benar-benar siap bertumbuh cepat.',
      },
      {
        title: 'Tips lolos interview MT',
        body:
          'Kunci interview MT adalah tampil sebagai kandidat yang punya potensi leader, bukan hanya kandidat yang pintar menjawab. Jawabanmu harus terdengar terstruktur, punya konteks bisnis, dan menunjukkan bahwa kamu cepat belajar serta siap menerima tantangan lintas fungsi.',
        bullets: [
          'Gunakan jawaban yang terstruktur: situasi, tindakan, hasil, dan pelajaran',
          'Tunjukkan ownership dan cara berpikir, bukan cuma hafalan definisi',
          'Hubungkan pengalaman organisasi/magang dengan leadership dan problem solving',
          'Pelajari industri dan model bisnis perusahaan sebelum interview',
          'Siapkan alasan yang kuat kenapa kamu cocok di jalur fast-track seperti MT',
        ],
      },
    ],
  },
  akuntansi: {
    badge: 'Career Overview',
    intro:
      'Role Akuntansi berfokus pada pencatatan, validasi, analisis, dan pelaporan keuangan perusahaan. Di interview, kandidat akuntansi biasanya diuji bukan hanya soal teori debit-kredit, tapi juga ketelitian, logika angka, pemahaman laporan keuangan, dan kedisiplinan terhadap prosedur.',
    sections: [
      {
        title: 'Apa itu role Akuntansi?',
        body:
          'Posisi akuntansi bertugas menjaga agar transaksi keuangan tercatat dengan benar dan dapat dipertanggungjawabkan. Tergantung perusahaannya, tugas bisa mencakup jurnal, rekonsiliasi, closing bulanan, laporan keuangan, perpajakan, hingga support audit.',
      },
      {
        title: 'Cara kerja tim akuntansi',
        body:
          'Ritme kerja akuntansi biasanya mengikuti siklus transaksi harian dan penutupan buku bulanan. Saat periode closing, workload cenderung lebih tinggi karena semua data harus rapi sebelum dilaporkan ke manajemen atau auditor.',
        bullets: [
          'Input dan verifikasi transaksi harian',
          'Rekonsiliasi kas, bank, piutang, dan hutang',
          'Closing bulanan dan penyusunan laporan',
          'Koordinasi dengan finance, tax, auditor, dan user internal',
        ],
      },
      {
        title: 'Skill yang paling dicari',
        body:
          'Perusahaan biasanya mencari kandidat yang teliti, sistematis, dan kuat di angka. Selain itu, interviewer juga suka kandidat yang paham konsekuensi bisnis dari kesalahan pencatatan dan bisa menjelaskan angka dengan bahasa yang mudah dipahami.',
        bullets: [
          'Ketelitian dan attention to detail tinggi',
          'Pemahaman jurnal dan laporan keuangan',
          'Excel dan software accounting',
          'Disiplin, integritas, dan kemampuan analisis',
          'Komunikasi yang rapi saat menjelaskan angka',
        ],
      },
      {
        title: 'Range gaji Akuntansi',
        body:
          'Gaji entry-level akuntansi di Indonesia umumnya bervariasi tergantung kota, industri, dan skala perusahaan. Kandidat dengan skill Excel kuat, pengalaman internship, atau pemahaman pajak/audit biasanya punya daya tawar lebih baik.',
        bullets: [
          'Staff Accounting entry-level: sekitar Rp4 juta – Rp7 juta+',
          'Perusahaan besar / multinasional bisa lebih tinggi',
          'Benefit tambahan kadang termasuk bonus tahunan, uang makan, dan tunjangan lembur/closing',
        ],
      },
      {
        title: 'Perusahaan yang sering cari talent akuntansi',
        body:
          'Kebutuhan talent akuntansi sangat luas karena hampir semua bisnis membutuhkannya. Peluang paling sering ada di perusahaan dagang, manufaktur, retail, konsultan, startup, dan kantor akuntan publik.',
        bullets: [
          'Manufaktur dan FMCG',
          'Retail dan distribution company',
          'Kantor Akuntan Publik / audit firm',
          'Startup, teknologi, dan shared service center',
        ],
      },
      {
        title: 'Prospek karier',
        body:
          'Jalur karier akuntansi cukup jelas: staff → senior → supervisor → chief accountant / finance manager, tergantung fokus dan performa. Kandidat yang kuat di reporting, tax, audit, atau system improvement biasanya berkembang lebih cepat.',
      },
      {
        title: 'Tips lolos interview Akuntansi',
        body:
          'Tunjukkan bahwa kamu bukan hanya hafal teori, tapi paham alur pencatatan dan impact-nya ke bisnis. Interviewer biasanya suka jawaban yang rapi, presisi, dan tidak terlalu muter-muter.',
        bullets: [
          'Latih jawaban teknikal seperti jurnal, rekonsiliasi, dan alur closing',
          'Siapkan contoh pengalaman internship atau project yang berkaitan dengan angka',
          'Tunjukkan ketelitian dan cara kerja sistematis',
          'Kalau belum tahu, jawab jujur tapi tunjukkan cara belajarmu',
        ],
      },
    ],
  },
  admin: {
    badge: 'Career Overview',
    intro:
      'Role Administrasi adalah tulang punggung operasional harian kantor. Walau sering dianggap “support role”, perusahaan justru sangat butuh kandidat admin yang rapi, cepat, disiplin, dan bisa menjaga alur kerja tetap tertib.',
    sections: [
      {
        title: 'Apa itu role Administrasi?',
        body:
          'Posisi administrasi biasanya menangani dokumen, data entry, arsip, surat-menyurat, penjadwalan, dan koordinasi kebutuhan operasional. Di interview, perusahaan biasanya mencari kandidat yang teliti, cekatan, dan tidak mudah panik saat diberi banyak tugas sekaligus.',
      },
      {
        title: 'Cara kerja posisi admin',
        body:
          'Pekerjaan admin cenderung multitasking karena harus menangani banyak request dari atasan atau tim. Karena itu, ritme kerja sangat bergantung pada kemampuan prioritisasi dan kedisiplinan mengikuti SOP.',
        bullets: [
          'Mengelola dokumen fisik dan digital',
          'Input data dan update laporan rutin',
          'Membantu jadwal meeting, kebutuhan kantor, atau korespondensi',
          'Menjaga agar informasi dan arsip mudah ditemukan saat dibutuhkan',
        ],
      },
      {
        title: 'Skill yang paling dicari',
        body:
          'Perusahaan ingin admin yang bisa diandalkan untuk hal-hal detail dan repetitif tanpa banyak error. Skill software juga penting, terutama Excel, Word, email, dan kadang sistem ERP atau tools internal perusahaan.',
        bullets: [
          'Teliti dan tertib',
          'Manajemen waktu dan prioritas',
          'Microsoft Office / Google Workspace',
          'Komunikasi profesional',
          'Disiplin dan bisa menjaga kerahasiaan data',
        ],
      },
      {
        title: 'Range gaji Administrasi',
        body:
          'Gaji admin entry-level biasanya dipengaruhi lokasi kantor, skala bisnis, dan kompleksitas tugas. Posisi admin yang merangkap sekretaris, support finance, atau support purchasing biasanya punya range yang lebih tinggi.',
        bullets: [
          'Admin entry-level: sekitar Rp3,5 juta – Rp6 juta+',
          'Sekretaris / admin eksekutif: bisa lebih tinggi tergantung exposure dan tanggung jawab',
          'Benefit umum: BPJS, uang makan/transport, bonus performa tertentu',
        ],
      },
      {
        title: 'Perusahaan yang sering buka posisi admin',
        body:
          'Role admin hampir selalu dibutuhkan di berbagai industri, dari perusahaan kecil sampai korporasi besar. Karena itu lowongannya relatif stabil dan luas.',
        bullets: [
          'Perusahaan dagang, distribusi, manufaktur',
          'Kantor konsultan dan agency',
          'Sekolah, rumah sakit, lembaga pendidikan',
          'Startup, office support, dan perusahaan jasa',
        ],
      },
      {
        title: 'Prospek karier',
        body:
          'Dengan pengalaman dan skill yang makin rapi, jalur karier admin bisa berkembang ke senior admin, executive assistant, office manager, purchasing admin, finance admin, atau HR admin tergantung exposure kerja.',
      },
      {
        title: 'Tips lolos interview Administrasi',
        body:
          'Tampilkan diri sebagai orang yang terorganisir, responsif, dan nyaman dengan tugas detail. Interviewer admin biasanya senang dengan jawaban yang konkret dan menunjukkan cara kerja yang rapi.',
        bullets: [
          'Ceritakan sistem kerja yang kamu pakai untuk tetap rapi',
          'Berikan contoh saat kamu handle banyak tugas sekaligus',
          'Tunjukkan skill software dengan contoh nyata',
          'Tonjolkan kedisiplinan, komunikasi, dan ketelitian',
        ],
      },
    ],
  },
  'human-resources': {
    badge: 'Career Overview',
    intro:
      'Human Resources atau HR adalah fungsi yang mengelola siklus karyawan dari rekrutmen sampai pengembangan dan administrasi hubungan kerja. Interview HR biasanya menilai kombinasi antara people skill, ketegasan, empati, dan pemahaman proses SDM.',
    sections: [
      {
        title: 'Apa itu role Human Resources?',
        body:
          'Posisi HR bisa sangat luas cakupannya: rekrutmen, onboarding, payroll support, employee relations, training, performance management, sampai kebijakan internal. Karena itu interviewer biasanya ingin tahu area HR mana yang kamu pahami dan bagaimana kamu melihat peran HR bagi bisnis.',
      },
      {
        title: 'Cara kerja tim HR',
        body:
          'HR bekerja di titik temu antara kebutuhan bisnis dan kebutuhan manusia dalam organisasi. Tugasnya bukan cuma administrasi, tapi juga menjaga proses SDM berjalan adil, rapi, dan mendukung target perusahaan.',
        bullets: [
          'Mendukung hiring dan onboarding',
          'Mengelola data serta administrasi karyawan',
          'Menangani employee relations dan issue internal',
          'Membantu performance management, engagement, dan training',
        ],
      },
      {
        title: 'Skill yang paling dicari',
        body:
          'Perusahaan suka kandidat HR yang komunikatif tapi tetap tegas, paham kerahasiaan data, dan tidak hanya “suka ketemu orang”. Di interview, kemampuan menimbang situasi dengan objektif biasanya sangat dihargai.',
        bullets: [
          'Komunikasi interpersonal yang baik',
          'Empati + objektivitas',
          'Administrasi dan dokumentasi yang rapi',
          'Pemahaman dasar ketenagakerjaan / HR process',
          'Kemampuan handling konflik dan stakeholder management',
        ],
      },
      {
        title: 'Range gaji HR',
        body:
          'Untuk level entry sampai junior, range gaji HR cukup bervariasi tergantung fungsi dan skala perusahaan. Recruiter, HR admin, dan HR generalist bisa punya rentang berbeda sesuai exposure tugas dan industrinya.',
        bullets: [
          'HR Staff / Recruiter junior: sekitar Rp4 juta – Rp7 juta+',
          'Perusahaan besar atau multinasional bisa lebih tinggi',
          'Benefit tambahan bisa berupa insentif hiring, bonus tahunan, dan training budget',
        ],
      },
      {
        title: 'Perusahaan yang sering buka posisi HR',
        body:
          'Karena semua organisasi butuh pengelolaan SDM, peluang kerja HR sangat luas. Biasanya kebutuhan paling sering ada di perusahaan yang sedang berkembang, ekspansi cabang, atau punya jumlah karyawan yang besar.',
        bullets: [
          'Manufaktur dan FMCG',
          'Retail dan service industry',
          'Startup dan perusahaan teknologi',
          'Perusahaan nasional besar dan multinasional',
        ],
      },
      {
        title: 'Prospek karier',
        body:
          'HR punya banyak jalur spesialisasi: recruiter, HR generalist, compensation & benefits, training, OD, atau HRBP. Semakin kuat exposure dan pemahaman bisnisnya, semakin besar peluang naik ke level strategis.',
      },
      {
        title: 'Tips lolos interview HR',
        body:
          'Jawaban terbaik di interview HR biasanya menunjukkan keseimbangan antara empati dan profesionalisme. Kamu perlu terlihat peduli pada orang, tapi tetap bisa menjaga aturan, data, dan objektivitas.',
        bullets: [
          'Siapkan contoh pengalaman menangani orang atau organisasi',
          'Pelajari basic HR process dan istilah yang umum',
          'Jawab kasus dengan runtut dan menunjukkan fairness',
          'Tunjukkan kemampuan komunikasi, listening, dan dokumentasi',
        ],
      },
    ],
  },
  'odp-bank': {
    badge: 'Career Overview',
    intro:
      'ODP Bank atau Officer Development Program adalah jalur percepatan karier di industri perbankan untuk menyiapkan future officer atau leader. Program ini mirip MT, tetapi lebih spesifik ke bisnis perbankan, kepatuhan, layanan, analisis, dan manajemen risiko.',
    sections: [
      {
        title: 'Apa itu ODP Bank?',
        body:
          'ODP adalah program pengembangan intensif bagi kandidat yang dipersiapkan untuk posisi officer di bank. Interview ODP biasanya menilai potensi leadership, pemahaman industri keuangan, kemampuan analitis, komunikasi, dan kesiapan menghadapi target maupun regulasi.',
      },
      {
        title: 'Cara kerja program ODP',
        body:
          'Peserta umumnya melewati training kelas, rotasi unit bisnis, exposure ke cabang atau head office, project assignment, lalu evaluasi sebelum placement. Karena industri bank sangat regulated, aspek compliance dan risk awareness juga biasanya ditekankan sejak awal.',
        bullets: [
          'Training dasar produk, layanan, dan proses bank',
          'Rotasi ke fungsi bisnis atau operasional tertentu',
          'Exposure ke target bisnis, layanan, dan risk control',
          'Evaluasi performa dan penempatan akhir',
        ],
      },
      {
        title: 'Skill yang paling dicari',
        body:
          'Bank biasanya mencari kandidat yang cepat belajar, rapi, profesional, dan punya kemampuan analisis yang baik. Karena banyak peran bersentuhan dengan nasabah, communication skill dan personal branding juga penting.',
        bullets: [
          'Analytical thinking dan numerasi',
          'Komunikasi profesional',
          'Leadership potential dan disiplin tinggi',
          'Risk awareness dan kepatuhan',
          'Adaptif terhadap target dan tekanan kerja',
        ],
      },
      {
        title: 'Range gaji ODP Bank',
        body:
          'ODP bank biasanya punya kompensasi yang menarik untuk fresh graduate karena jalurnya memang dipersiapkan sebagai talent pool utama. Range akan berbeda menurut bank, lokasi, dan komponen benefit.',
        bullets: [
          'ODP / MT Bank: sekitar Rp5,5 juta – Rp10 juta+',
          'Benefit umum bisa meliputi tunjangan, bonus, asuransi, dan training intensif',
          'Bank besar nasional sering menawarkan paket yang cukup kompetitif untuk fresh graduate unggulan',
        ],
      },
      {
        title: 'Bank yang sering buka ODP',
        body:
          'Program seperti ODP paling sering dibuka oleh bank besar nasional, bank swasta besar, dan beberapa lembaga keuangan besar lain yang ingin menyiapkan talent pipeline sejak awal.',
        bullets: [
          'Bank Mandiri, BRI, BNI',
          'BCA, CIMB Niaga, OCBC, BTN',
          'Bank syariah besar dan beberapa grup keuangan besar juga rutin membuka program serupa',
        ],
      },
      {
        title: 'Prospek karier',
        body:
          'Lulusan ODP biasanya masuk ke jalur officer dan bisa berkembang ke fungsi bisnis, operasional, kredit, relationship management, atau leadership track lain tergantung hasil program dan kebutuhan bank.',
      },
      {
        title: 'Tips lolos interview ODP Bank',
        body:
          'Untuk ODP bank, tampilkan kombinasi antara potensi leadership dan profesionalisme. Jawaban yang ideal biasanya menunjukkan kamu paham dunia bank, siap belajar cepat, dan sanggup menjaga kualitas kerja di lingkungan yang highly regulated.',
        bullets: [
          'Pelajari dasar industri perbankan dan istilah seperti kredit, risiko, NPL, dan OJK',
          'Tunjukkan disiplin, ketelitian, dan kesiapan kerja dengan target',
          'Hubungkan pengalaman organisasi atau magang dengan leadership dan service mindset',
          'Jawab dengan tenang, rapi, dan percaya diri',
        ],
      },
    ],
  },
};
