export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'HRD Interview' | 'User Interview';
  type: 'Opening' | 'Behavioral' | 'Situational' | 'Technical' | 'Competency';
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  modelAnswer: string;
  strategy: string;
  locked?: boolean;
}

export interface RoleData {
  title: string;
  categories: string[];
  questions: InterviewQuestion[];
  totalQuestions: number;
}

export const interviewData = {
  hr_staff: {
    title: 'HR Staff',
    categories: ['HRD Interview', 'User Interview'],
    totalQuestions: 50,
    questions: [
      // ===== HRD INTERVIEW (30 Questions) =====
      {
        id: 'hr_staff_hrd_1',
        question: 'Ceritakan tentang diri Anda',
        category: 'HRD Interview',
        type: 'Opening',
        difficulty: 'Mudah',
        modelAnswer: 'Nama saya [nama], lulusan Psikologi dari [universitas]. Selama kuliah saya aktif di UKM dan magang 6 bulan di divisi HR perusahaan manufaktur, di mana saya terlibat langsung dalam proses rekrutmen dan onboarding. Saya tertarik dengan HR karena passion saya di people development dan membangun budaya kerja yang positif.',
        strategy: '• Gunakan formula: Siapa → Latar belakang relevan → Pengalaman konkret → Mengapa tertarik\n• Jangan cerita dari lahir — langsung ke poin yang relevan dengan posisi\n• Sebutkan 1 pencapaian konkret dan tutup dengan koneksi ke posisi yang dilamar\n• ❌ Hindari: "Saya orangnya pekerja keras dan jujur" (terlalu generik)',
        locked: false
      },
      {
        id: 'hr_staff_hrd_2',
        question: 'Mengapa Anda ingin bekerja di HR?',
        category: 'HRD Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Saya percaya HR adalah jantung dari sebuah perusahaan. Ketika orang yang tepat berada di posisi yang tepat, produktivitas dan kepuasan kerja meningkat drastis. Saya ingin berkontribusi dalam membangun tim yang solid dan memastikan setiap karyawan bisa berkembang maksimal.',
        strategy: '• Hubungkan jawaban dengan dampak nyata, bukan sekedar "suka sama orang"\n• Tunjukkan pemahaman tentang strategic value dari HR\n• Highlight passion untuk people development dan organizational impact',
        locked: false
      },
      {
        id: 'hr_staff_hrd_3',
        question: 'Bagaimana cara Anda menangani konflik antara dua karyawan?',
        category: 'HRD Interview',
        type: 'Situational',
        difficulty: 'Sedang',
        modelAnswer: 'Langkah pertama saya adalah mendengarkan kedua pihak secara terpisah tanpa menghakimi. Setelah memahami akar masalah, saya fasilitasi pertemuan bersama dengan tujuan mencari solusi win-win. Saya dokumentasikan kesepakatan dan lakukan follow-up dalam 2 minggu untuk memastikan masalah sudah resolved.',
        strategy: '• Gunakan metode STAR (Situation-Task-Action-Result)\n• Tunjukkan kemampuan active listening, empati, dan problem-solving terstruktur\n• Highlight follow-up dan documentation untuk accountability',
        locked: false
      },
      {
        id: 'hr_staff_hrd_4',
        question: 'Apa perbedaan antara rekrutmen internal dan eksternal?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Rekrutmen internal: fokus di employee engagement, succession planning, retention, biaya lebih rendah, waktu lebih cepat. Eksternal: akses talent pool lebih luas, perspektif fresh, tapi proses lebih panjang dan biaya lebih tinggi. Saya biasanya rekrutmen internal dulu untuk boost morale, baru eksternal jika tidak ada kandidat internal yang suitable.',
        strategy: '• Jelaskan pros dan cons keduanya dengan data-driven mindset\n• Tunjukkan understanding tentang kapan menggunakan strategi mana\n• Bonus jika mention tentang employee morale dan retention impact',
        locked: true
      },
      {
        id: 'hr_staff_hrd_5',
        question: 'Bagaimana Anda menjelaskan PHK kepada karyawan?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya percaya transparansi dan kepedulian adalah kunci. Saya siapkan meeting di tempat private, dengan HR manager dan karyawan itu. Jelaskan keputusan dengan jelas (performa, fit, atau restructuring), berikan compensation info, terminasi timeline, dan referensi untuk job search. Follow-up support (severance, reference check, career coaching) untuk minimize negative impact.',
        strategy: '• Tunjukkan empati tanpa being emotional\n• Fokus di professional, clear communication dan fair treatment\n• Mention legal compliance dan severance benefits yang akan diberikan',
        locked: true
      },
      {
        id: 'hr_staff_hrd_6',
        question: 'Ceritakan pengalaman Anda menangani karyawan bermasalah',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Pernah ada karyawan yang sering terlambat dan performa menurun. Saya minta meeting one-on-one, tanyakan root cause-nya dengan empati. Ternyata dia punya masalah personal. Saya tawarkan flexible schedule dan supporting resources (EAP/counseling). Setelah 2 bulan, performanya kembali normal dan dia jadi lebih engaged. Dokumentasi formal tetap dilakukan sesuai policy.',
        strategy: '• Gunakan STAR method dengan focus pada problem-solving yang human-centered\n• Tunjukkan balance antara empati dan compliance dengan company policy\n• Highlight hasil positif dan learning untuk approach yang serupa di masa depan',
        locked: true
      },
      {
        id: 'hr_staff_hrd_7',
        question: 'Apa yang Anda ketahui tentang UU Ketenagakerjaan No.13 Tahun 2003?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya familiar dengan UU No. 13 Tahun 2003 tentang Ketenagakerjaan. Poin kunci: hak dan kewajiban employer/karyawan, kontrak kerja, PHK procedures, tunjangan hari raya, uang lembur, kesehatan kerja, dan dispute resolution. Saya selalu konsultasi dengan legal team untuk memastikan setiap keputusan compliant dengan regulasi.',
        strategy: '• Tunjukkan basic knowledge tapi jangan claim expertise jika belum\n• Penting mention consulting dengan legal team untuk critical decisions\n• Highlight awareness tentang compliance dan risk management',
        locked: true
      },
      {
        id: 'hr_staff_hrd_8',
        question: 'Bagaimana cara Anda menghitung kebutuhan tenaga kerja (workforce planning)?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya mulai dari analisis beban kerja departement, growth projection, dan turnover rate historical. Kolaborasi dengan manager untuk understand expansion plans dan productivity metrics. Gunakan industry benchmarks dan financial forecasting. Kemudian buat workforce planning yang aligned dengan budget dan strategic goals perusahaan.',
        strategy: '• Tunjukkan data-driven thinking dan collaborative approach\n• Mention specific tools/methods yang pernah digunakan\n• Connect workforce planning dengan business strategy dan budget constraints',
        locked: true
      },
      {
        id: 'hr_staff_hrd_9',
        question: 'Apa KPI yang biasa digunakan di divisi HR?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Beberapa KPI penting: Cost Per Hire, Time to Fill, Quality of Hire (retention rate, performance rating), Employee Turnover Rate, Training Cost per Employee, Compensation Competitiveness Ratio, dan Employee Satisfaction Score (eNPS). KPI harus aligned dengan business objectives dan regularly reviewed setiap quarter.',
        strategy: '• Sebut 4-5 KPI yang paling relevan, jelaskan why masing-masing penting\n• Bonus jika mention about data collection, monitoring mechanism, dan action plans\n• Show understanding tentang connection antara HR metrics dan business impact',
        locked: true
      },
      {
        id: 'hr_staff_hrd_10',
        question: 'Bagaimana cara Anda menjaga kerahasiaan data karyawan (GDPR/data privacy)?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Data karyawan adalah sensitive dan confidential. Saya ensure: (1) limited access dengan role-based permissions, (2) encrypted storage dan secure system, (3) clear data handling policy, (4) regular security audit, (5) employee awareness training, (6) compliance dengan GDPR dan regulasi privacy lokal. Semua access ke sensitive data di-audit dan documented.',
        strategy: '• Tunjukkan understanding tentang data privacy, security, dan legal obligations\n• Mention specific practices dan safeguards yang sudah di-implement\n• Highlight regular training dan audit untuk ensure ongoing compliance',
        locked: true
      },
      {
        id: 'hr_staff_hrd_11',
        question: 'Ceritakan tentang program pelatihan yang pernah Anda rancang atau ikuti',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Pernah merancang onboarding program komprehensif untuk 100+ karyawan baru per tahun. Program meliputi: pre-boarding (paperwork, office setup), day 1 orientation (company tour, culture), week 1 (role-specific training), dan month 3 (performance check). Developed training materials, assigned mentors, dan track completion rate. Hasilnya: 40% reduction dalam time-to-productivity dan 20% improvement dalam retention rate.',
        strategy: '• Gunakan STAR method dengan concrete metrics dan ROI\n• Tunjukkan ability merancang program end-to-end dari planning hingga evaluation\n• Highlight impact terukur dan continuous improvement dari program tersebut',
        locked: true
      },
      {
        id: 'hr_staff_hrd_12',
        question: 'Bagaimana Anda handle ketika hiring manager tidak puas dengan kandidat yang Anda rekrut?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Pertama saya dengarkan feedback spesifik mereka — apa yang kurang dari candidate tersebut. Kemudian berdiskusi: apakah criteria-nya clear dari awal, atau memang ada gap antara ekspektasi dan reality. Jika ada miscommunication, saya klarifikasi criteria dan cari kandidat yang lebih fit. Jika kandidat bagus tapi manager over-expecting, saya punya feedback session dan suggest untuk beri chance dengan training support.',
        strategy: '• Tunjukkan diplomacy dan problem-solving skills\n• Balance antara manager satisfaction dan fair treatment ke candidate\n• Highlight communication dan clear expectation setting di awal proses',
        locked: true
      },
      {
        id: 'hr_staff_hrd_13',
        question: 'Apa yang dimaksud dengan employee engagement dan bagaimana cara mengukurnya?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Employee engagement adalah level di mana karyawan committed dan passionate dengan pekerjaan mereka. Diukur dengan: pulse survey, eNPS (employee Net Promoter Score), focus group discussion, one-on-one feedback, dan performance metrics. Survey harus regular (quarterly/bi-annual) dan action-oriented — hasil harus ditranslate ke improvement initiatives, bukan hanya measurement.',
        strategy: '• Jelaskan konsep dengan clear dan highlight strategic importance\n• Mention specific measurement tools dan emphasize follow-up action\n• Show understanding tentang connection antara engagement dan business results',
        locked: true
      },
      {
        id: 'hr_staff_hrd_14',
        question: 'Bagaimana cara Anda melakukan onboarding karyawan baru yang efektif?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Effective onboarding melibatkan: pre-boarding communication, structured orientation, role-specific training, buddy/mentor assignment, dan regular check-in at 30-60-90 days. Saya pastikan karyawan tahu tentang company values, policies, dan team dynamics. Onboarding checklist untuk track progress dan gathering feedback dari new hire untuk continuous improvement.',
        strategy: '• Tunjukkan systematic approach dengan clear phases dan milestones\n• Mention touch-points sepanjang proses dan measurement untuk success\n• Highlight focus pada new hire experience dan long-term retention',
        locked: true
      },
      {
        id: 'hr_staff_hrd_15',
        question: 'Apa perbedaan antara job description dan job specification?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Job description menguraikan posisi, tanggung jawab, dan deliverable dari role tersebut. Job specification detail tentang kualifikasi, skills, pengalaman, dan personal attributes yang dibutuhkan untuk sukses di posisi tersebut. JD adalah tentang "apa yang mereka lakukan", JS adalah tentang "siapa yang bisa melakukannya".',
        strategy: '• Jelaskan dengan clear distinction antara dua konsep ini\n• Mention importance kedua-duanya dalam rekrutmen process\n• Highlight bagaimana keduanya digunakan dalam job posting dan candidate evaluation',
        locked: true
      },
      {
        id: 'hr_staff_hrd_16',
        question: 'Bagaimana cara Anda menangani karyawan yang sering absen?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya first track absenteeism pattern dan cari root cause melalui private discussion. Tanyakan jika ada masalah kesehatan, personal, atau job-related. Dokumentasikan conversation dan develop improvement plan bersama dengan clear expectations dan support. Monitor progress, dan jika tidak improve, escalate sesuai company policy dengan progressive discipline approach.',
        strategy: '• Tunjukkan data-driven approach dalam identifying dan addressing issue\n• Balance antara empati (mungkin ada masalah) dan accountability\n• Mention documentation dan compliance dengan company policy',
        locked: true
      },
      {
        id: 'hr_staff_hrd_17',
        question: 'Ceritakan pengalaman Anda menggunakan HRIS (HR Information System)',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya experienced dengan HRIS untuk manage employee data, payroll integration, leave tracking, dan performance appraisal. Saya use HRIS untuk generate reports tentang headcount, turnover, dan compliance. Saya juga pernah lead HRIS implementation project dan trained users untuk ensure smooth adoption. Comfortable dengan both user-level dan admin functions.',
        strategy: '• Mention specific HRIS platform yang pernah digunakan (SAP, Workday, BambooHR, etc)\n• Highlight both operational dan strategic uses dari HRIS\n• Show comfort dengan system training dan change management',
        locked: true
      },
      {
        id: 'hr_staff_hrd_18',
        question: 'Apa yang dimaksud dengan performance appraisal dan bagaimana prosesnya?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Performance appraisal adalah evaluasi formal terhadap performa kerja karyawan terhadap goals dan expectations. Proses biasanya: (1) set clear objectives di awal tahun, (2) ongoing feedback dan coaching, (3) mid-year check-in, (4) year-end formal appraisal, (5) discussion dan feedback session, (6) dokumentasi untuk future planning. Appraisal digunakan untuk compensation, promotion, development, dan termination decisions.',
        strategy: '• Jelaskan full cycle dari appraisal process, bukan hanya final rating\n• Emphasize importance dari ongoing feedback dan coaching, bukan one-time evaluation\n• Mention connection antara appraisal, compensation, dan development planning',
        locked: true
      },
      {
        id: 'hr_staff_hrd_19',
        question: 'Bagaimana Anda menentukan gaji untuk posisi baru?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Saya melakukan market research menggunakan salary survey data dari industry benchmark (JobStreet, Mercer, Payscale). Saya analyze: (1) role responsibility dan complexity, (2) required experience level, (3) market rate range, (4) company budget dan internal equity, (5) location factor. Kemudian saya propose salary range untuk approval oleh management, dengan flexibility untuk negotiate based pada candidate profile.',
        strategy: '• Show data-driven approach dengan specific methodology\n• Mention internal equity consideration untuk avoid creating disparities\n• Highlight balance antara market competitiveness dan budget constraints',
        locked: true
      },
      {
        id: 'hr_staff_hrd_20',
        question: 'Apa strategi Anda untuk mempertahankan karyawan terbaik (retention)?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya focus pada: (1) competitive compensation dan benefits, (2) clear career path dan development opportunity, (3) meaningful work dan purpose, (4) positive culture dan good management, (5) work-life balance, (6) regular feedback dan recognition. Saya proactively engage dengan top performers melalui one-on-one meetings, succession planning conversations, dan mentoring opportunities. Saya also track turnover reasons melalui exit interviews untuk continuous improvement.',
        strategy: '• Tunjukkan holistic approach beyond salary (development, culture, purpose)\n• Highlight proactive engagement bukan reaktif response saja\n• Mention metrics untuk track dan measure retention strategy effectiveness',
        locked: true
      },
      {
        id: 'hr_staff_hrd_21',
        question: 'Ceritakan tentang situasi ketika Anda harus membuat keputusan HR yang sulit',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Pernah dalam situasi di mana saya harus recommend termination untuk long-tenure employee karena performance issue dan misconduct. Keputusan sulit karena dia sudah 8 tahun di company. Saya konsultasi dengan legal, documented semuanya, dan ensure process yang fair dan compliant. Saya juga prepare severance package yang generous dan career transition support. Keputusan yang tough tapi necessary untuk maintain team morale dan performance standard.',
        strategy: '• Gunakan STAR method untuk describe the difficult decision\n• Show ethical reasoning dan consideration dari multiple stakeholders\n• Mention consultation, documentation, dan compliance dalam decision-making process',
        locked: true
      },
      {
        id: 'hr_staff_hrd_22',
        question: 'Bagaimana Anda mengelola hubungan dengan serikat pekerja?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya percaya dalam maintaining professional dan respectful relationship dengan union. Saya: (1) understand union agreement dan member rights, (2) communicate clearly dan transparently tentang company policies, (3) involve union dalam decision-making yang affect members, (4) address grievance promptly dan fairly, (5) negotiate in good faith. Goal saya adalah find win-win solution yang benefit both company dan employees.',
        strategy: '• Tunjukkan understanding tentang union role dan rights\n• Emphasize collaboration dan respect, bukan adversarial approach\n• Mention importance dari clear communication dan transparent process',
        locked: true
      },
      {
        id: 'hr_staff_hrd_23',
        question: 'Apa yang Anda lakukan jika menemukan pelanggaran etika oleh karyawan senior?',
        category: 'HRD Interview',
        type: 'Situational',
        difficulty: 'Sulit',
        modelAnswer: 'Saya immediately report ke HR leadership dan compliance team tanpa delay. Saya pastikan investigation dilakukan dengan objektif dan fair, regardless dari seniority level. Saya: (1) document evidence, (2) conduct interviews, (3) consult dengan legal, (4) ensure confidentiality selama investigation, (5) apply discipline sesuai company policy tanpa bias. Jika substantiated, saya recommend appropriate action sesuai severity.',
        strategy: '• Tunjukkan commitment terhadap ethics dan compliance\n• Emphasize fair treatment regardless dari seniority atau position\n• Mention involvement dari relevant stakeholders (legal, compliance, leadership)',
        locked: true
      },
      {
        id: 'hr_staff_hrd_24',
        question: 'Bagaimana cara Anda mengukur efektivitas program rekrutmen Anda?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya track metrics seperti: (1) Cost Per Hire, (2) Time to Fill, (3) Quality of Hire (retention rate at 1-year, performance rating), (4) Offer Acceptance Rate, (5) Source Effectiveness (mana source yang paling quality), (6) Hiring Manager Satisfaction Score. Saya quarterly review metrics, identify trends, dan adjust strategy accordingly. Saya also conduct surveys dengan new hires tentang recruitment experience.',
        strategy: '• Mention specific, measurable metrics bukan hanya qualitative assessment\n• Show understanding tentang trade-offs (speed vs quality, cost vs quality)\n• Highlight continuous improvement mindset berdasarkan data',
        locked: true
      },
      {
        id: 'hr_staff_hrd_25',
        question: 'Apa perbedaan antara training dan development dalam konteks HR?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Training adalah focused pada teaching specific skills untuk current job (e.g., software training, compliance training). Development adalah broader, focused pada growing individual untuk future role atau career progression (e.g., leadership development, mentoring). Training adalah usually short-term, development adalah long-term investment dalam employee growth dan retention.',
        strategy: '• Jelaskan clear distinction antara dua konsep\n• Mention importance dari both untuk organizational success\n• Highlight balance antara immediate job performance dan long-term career growth',
        locked: true
      },
      {
        id: 'hr_staff_hrd_26',
        question: 'Bagaimana Anda menangani keluhan karyawan yang sensitif?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya listen dengan empati dan tanpa judgment. Keluhan sensitif bisa sexual harassment, discrimination, atau bullying. Saya: (1) document secara detail, (2) assure confidentiality, (3) explain investigation process, (4) keep complainant informed, (5) ensure no retaliation, (6) provide support resources. Saya treat semua keluhan seriously dan investigate promptly, dengan legal consultation jika needed.',
        strategy: '• Tunjukkan compassion dan professionalism dalam handling sensitive issues\n• Emphasize importance dari confidentiality dan anti-retaliation policy\n• Mention support resources dan follow-up care untuk complainant',
        locked: true
      },
      {
        id: 'hr_staff_hrd_27',
        question: 'Ceritakan pengalaman Anda dalam proses negosiasi gaji dengan kandidat',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya melakukan market research sebelumnya untuk understand fair range. Dalam negotiation, saya: (1) be transparent tentang company budget dan offer, (2) listen ke candidate expectation, (3) explore beyond salary (bonus, benefits, WFH, learning budget), (4) find win-win solution. Saya juga document semua yang agreed. Goal saya adalah hire the candidate sambil maintaining internal equity dan budget constraint.',
        strategy: '• Tunjukkan preparation dan data-driven approach\n• Emphasize transparency dan win-win mindset\n• Mention flexibility dalam benefits package, bukan hanya base salary',
        locked: true
      },
      {
        id: 'hr_staff_hrd_28',
        question: 'Apa yang dimaksud dengan succession planning?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Succession planning adalah process untuk identify dan develop internal candidates untuk key positions, especially leadership roles. Ini includes: (1) identify critical positions dan high-risk roles, (2) assess potential successors, (3) develop talent melalui mentoring dan stretch assignments, (4) create retention strategy untuk high-potential employees, (5) document plans dan regularly review. Good succession planning ensures business continuity dan demonstrates care untuk employee career growth.',
        strategy: '• Jelaskan strategic importance dari succession planning\n• Mention both organizational benefit (continuity) dan employee benefit (growth)\n• Highlight long-term perspective dan continuous development approach',
        locked: true
      },
      {
        id: 'hr_staff_hrd_29',
        question: 'Bagaimana cara Anda membangun employer branding perusahaan Anda?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya fokus pada: (1) ensure positive employee experience — retained employees adalah best brand ambassadors, (2) consistent messaging tentang company values dan culture, (3) active presence di career platforms dan social media, (4) participate dalam industry events dan talent conference, (5) develop employee referral program, (6) gather dan share employee testimonials. Strong employer brand reduces hiring cost dan increases candidate quality.',
        strategy: '• Show understanding tentang connection antara employee experience dan employer brand\n• Mention specific activities dan channels untuk build brand awareness\n• Highlight ROI dari good employer branding dalam recruitment',
        locked: true
      },
      {
        id: 'hr_staff_hrd_30',
        question: 'Di mana Anda melihat diri Anda dalam 5 tahun ke depan di bidang HR?',
        category: 'HRD Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Dalam 5 tahun, saya aspire untuk menjadi HR Manager atau Strategic HR Partner position. Saya ingin deepen expertise di organizational development dan talent strategy. Saya planning untuk take professional certification (CIPD, PHK Indonesia) dan potentially lead transformational HR initiatives seperti culture change atau digital transformation. Saya percaya continuous learning dan mentoring junior HR staff adalah key untuk growth saya.',
        strategy: '• Show ambition tapi realistic dan grounded dalam action plan\n• Mention specific goals dan concrete steps untuk achieve them\n• Connect personal development dengan value yang bisa kamu bawa ke company',
        locked: false
      },

      // ===== USER INTERVIEW (20 Questions) =====
      {
        id: 'hr_staff_user_1',
        question: 'Bagaimana cara memulai wawancara dengan nyaman dan professional?',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Gunakan ice breaker ringan sebelum formal questions: tanya perjalanan ke kantor, komentar tentang cuaca, atau sesuatu netral lainnya. Beri candidate gambaran clear tentang interview agenda dan timeline. Jelaskan role yang akan dibahas, departemen, dan apa yang akan dinilai. Set tone yang friendly tapi professional. Goal adalah buat candidate rileks sehingga jawaban mereka lebih autentik dan reflektif dari actual capability mereka.',
        strategy: '• Start dengan confident body language dan genuine smile\n• Minimize power distance — sit di same level, eye contact, lean forward slightly\n• Explicitly welcome candidate: "Thanks for coming! We\'re excited to learn about you"',
        locked: false
      },
      {
        id: 'hr_staff_user_2',
        question: 'Bagaimana cara menggali pengalaman kerja sebelumnya secara mendalam?',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Gunakan teknik STAR probing — setelah candidate answer, dig deeper dengan clarifying questions: "Bisa ceritakan lebih detail situasinya?", "Apa peran spesifik Anda di dalamnya?", "Apa hasilnya dalam angka atau metrics?", "Apa yang Anda pelajari dari experience tersebut?". Jangan puas dengan surface-level answer. Tujuannya adalah understand concrete examples bukan hanya storytelling yang bagus.',
        strategy: '• Prepare follow-up probes sebelum interview\n• Listen actively — jangan rushing ke next question\n• Look for inconsistencies atau vague claims yang perlu di-clarify',
        locked: false
      },
      {
        id: 'hr_staff_user_3',
        question: 'Cara menilai culture fit kandidat',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Assess culture fit dengan: (1) ask tentang work environment preference dan values, (2) share authentic company culture dan observe reaction, (3) gauge flexibility dan adaptability terhadap ambiguity, (4) assess collaboration style dan teamwork approach, (5) explore learning mindset dan openness to feedback. Tanyakan tentang previous workplace culture yang mereka sukai dan yang mereka hindari. Red flag: candidate yang expect rigid structure tapi company adalah agile dan fast-moving.',
        strategy: '• Share both positive dan challenging aspects dari culture — bukan hanya selling\n• Use behavioral questions untuk probe culture fit indicators\n• Trust your gut feeling tapi back it up dengan specific observations',
        locked: true
      },
      {
        id: 'hr_staff_user_4',
        question: 'Pertanyaan untuk mendeteksi kandidat yang berbohong di CV',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Ask very specific probing questions about claimed experience: "Describe your daily responsibilities di role tersebut", "What tools atau technologies yang Anda gunakan", "Berapa tim yang Anda manage dan apa karakteristik mereka", "Apa metric success di role tersebut". Lihat apakah detail-detail yang mereka sebutkan consistent dengan actual job. Cross-check dengan LinkedIn dan previous employer. Red flags: vague answers, too rehearsed responses, timing yang tidak add up, atau uncomfortable dengan detailed questions.',
        strategy: '• Prepare company-specific questions tentang industry atau role actual challenges\n• Ask untuk specific metrics atau outcomes yang measurable\n• Request portfolio atau work samples yang bisa di-verify',
        locked: true
      },
      {
        id: 'hr_staff_user_5',
        question: 'Cara menggali motivasi sejati kandidat bergabung',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Beyond "Why do you want this job?", dig deeper dengan: "What attracts you specifically tentang role ini versus others you\'re considering?", "Apa menarik Anda tentang industry kami?", "Ceritakan about time kamu felt most motivated di pekerjaan sebelumnya — apa yang membuat excited?", "Apa yang ingin Anda achieve dalam 2 tahun ke depan?". Red flags: hanya focus salary, benefits, atau superficial reasons. Strong signals: authentic passion untuk role, clear career progression, alignment dengan company mission.',
        strategy: '• Listen untuk passion dan enthusiasm dalam tone dan body language\n• Probe beneath the first answer — yang first biasanya prepared statement\n• Look untuk consistency antara claimed motivation dan actual questions they ask you',
        locked: true
      },
      {
        id: 'hr_staff_user_6',
        question: 'Pertanyaan behavioral untuk menilai kemampuan problem-solving',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Ask STAR questions seperti: "Ceritakan tentang time kamu faced complex problem. Apa yang Anda lakukan?", "Describe a situation di mana initial solution Anda tidak work. Bagaimana Anda adapt?", "Berikan example tentang kamu solve problem yang impact multiple departments". Listen untuk: structured thinking, creativity, persistence, collaboration, dan learning mindset. Assess bukan hanya hasil tapi methodology dan reasoning mereka.',
        strategy: '• Ask untuk specific situations, not hypothetical "what would you do" questions\n• Probe their thinking process: "Apa yang Anda consider dalam memutuskan...?"\n• Look untuk how they learned dari mistakes dan iterate',
        locked: true
      },
      {
        id: 'hr_staff_user_7',
        question: 'Cara menilai kemampuan leadership kandidat untuk posisi supervisor',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Ask tentang: (1) leadership philosophy dan approach, (2) specific experience managing people — berapa orang, what was outcome, (3) how they handle difficult team member atau performance issue, (4) give example tentang mereka develop atau mentor someone, (5) how they handle conflict dan different perspectives. Assess: people judgment, decisiveness, empathy, accountability, vision communication. Red flags: blame previous team members, inconsistent stories, difficulty describing team member success stories.',
        strategy: '• Ask detailed questions tentang actual team management experience\n• Assess emotional intelligence — observe how they talk about people\n• Look untuk focus pada developing others, not just achieving results',
        locked: true
      },
      {
        id: 'hr_staff_user_8',
        question: 'Pertanyaan untuk menilai kemampuan teamwork',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Ask: "Describe a successful project yang melibatkan diverse team members", "Ceritakan about conflict dengan team member — apa yang terjadi?", "Give example tentang Anda contribute ke team success meskipun it wasn\'t your responsibility", "How do you approach cross-functional collaboration?". Listen untuk: collaborative language, appreciation untuk different perspectives, willingness to support, ability to navigate conflict. Red flags: taking all credit, blaming teammates, "I prefer working alone", atau tidak mention teamwork.',
        strategy: '• Look untuk genuine appreciation untuk team contributions\n• Assess ego — can they support others\' success\n• Probe tentang conflict resolution dan collaboration style',
        locked: true
      },
      {
        id: 'hr_staff_user_9',
        question: 'Cara mendeteksi red flags dalam jawaban kandidat',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Red flags to watch: (1) Negativity tentang previous employers/colleagues — sign of victim mentality atau poor judgment, (2) Vague atau evasive answers — sign of dishonesty atau lack of self-awareness, (3) Frequently changing topics atau defensive terhadap questions, (4) Overconfidence tanpa backing up dengan evidence, (5) Too rehearsed responses — lack authenticity, (6) Inconsistency antara CV dan interview, (7) Poor listening atau tidak interested dengan company, (8) Entitlement attitude atau unrealistic expectations.',
        strategy: '• Trust your instinct — jika ada yang "feels off", probe deeper\n• Compare answers across different questions untuk check consistency\n• Observe body language: fidgeting, avoiding eye contact, defensive posture',
        locked: true
      },
      {
        id: 'hr_staff_user_10',
        question: 'Pertanyaan untuk menilai ambisi dan career goals kandidat',
        category: 'User Interview',
        type: 'Competency',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "Where do you see yourself in 3-5 years?", "What\'s your ideal career path?", "What skills atau experience do you want to develop?", "Apa yang akan membuat Anda feel successful dalam role ini?", "How does role ini fit dalam broader career goal Anda?". Assess untuk realistic goals, intrinsic motivation, continuous learning mindset. Red flags: "I don\'t know", unrealistic expectations (e.g., expecting promotion immediately), atau hanya focus external rewards.',
        strategy: '• Look untuk clear goals tapi flexibility dalam path\n• Assess alignment antara candidate goals dan company capability\n• Probe tentang what drives them beyond compensation',
        locked: true
      },
      {
        id: 'hr_staff_user_11',
        question: 'Cara menggali salary expectation dengan elegan',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Timing: discuss salary lebih late dalam process, setelah Anda confident tentang fit. Ask: "Apa salary expectation Anda?" atau "What range were you expecting for role ini?". Listen untuk range atau specific number. If too high, ask: "What figure have you reached based on?" Understanding rationale. Jika gap significant, be transparent tentang budget Anda. Explore beyond salary: "Apart from salary, apa yang penting untuk Anda dalam compensation package?" (bonus, benefits, flexibility, development budget).',
        strategy: '• Ask ke candidate first — often they request less than budget\n• Be transparent jika ada gap — maintain trust\n• Explore creative solutions (signing bonus, extra days, learning budget) if base salary tidak bisa match',
        locked: true
      },
      {
        id: 'hr_staff_user_12',
        question: 'Pertanyaan untuk menilai kemampuan adaptasi terhadap perubahan',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "Ceritakan tentang time yang significant change terjadi di workplace Anda — apa yang Anda lakukan?", "How do you handle ambiguity atau uncertainty?", "Describe situation di mana Anda had to learn something completely new", "Apa yang Anda sukai dan tidak sukai tentang perubahan?". Look untuk: flexibility, openness to learning, resilience, problem-solving mindset. Red flags: excessive complaining about change, stuck pada "the way we always did it", atau reluctance tentang learning new things.',
        strategy: '• Tailor questions untuk company context — mention anticipated changes\n• Assess not just acceptance tapi enthusiasm tentang change\n• Look untuk examples dari belajar quickly dan adapting',
        locked: true
      },
      {
        id: 'hr_staff_user_13',
        question: 'Cara menilai emotional intelligence kandidat',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Assess EI melalui: (1) self-awareness — admit mistakes atau limitations, (2) self-regulation — stay composed under stress (observe di interview jika Anda challenge them), (3) empathy — show understanding terhadap different perspectives, (4) social skills — good communication, build rapport, handle conflict, (5) motivation — intrinsic vs extrinsic. Ask tentang: "Kapan Anda get frustrated? Bagaimana Anda manage it?", "Describe feedback yang Anda received dan how you responded", "Ceritakan tentang time Anda help colleague dengan problem mereka."',
        strategy: '• Observe emotional responses during interview — do they get defensive?\n• Assess ability untuk take feedback dan criticism\n• Look untuk genuine interest di people dan relationships',
        locked: true
      },
      {
        id: 'hr_staff_user_14',
        question: 'Pertanyaan untuk menilai integritas dan etika kerja',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Ask: "Ceritakan about time Anda face ethical dilemma at work. What did you do?", "Describe situation di mana Anda disagree dengan manager atau colleague tentang right approach — bagaimana Anda handle?", "Tell me about time Anda admit mistake atau bad news ke employer", "Apa yang Anda do if Anda see colleague doing something unethical?". Listen untuk: honesty, accountability, principled decision-making, willingness untuk do right thing even when costly. Red flags: conveniently shifts blame, rationalizes unethical behavior, atau evasive tentang difficult questions.',
        strategy: '• Ask specific scenarios dengan ethical dimensions\n• Observe comfort level — are they transparent or defensive?\n• Look untuk consistency antara stated values dan actual behavior',
        locked: true
      },
      {
        id: 'hr_staff_user_15',
        question: 'Cara melakukan reference check yang efektif',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Reference check adalah critical — jangan skip! Ask candidate untuk provide 3-4 references (manager, peer, subordinate jika possible). Prepare structured questions: "Apa responsibilities mereka?", "Apa strengths dan growth areas?", "How were they dalam teamwork?", "Would you rehire them?", "Apa reason untuk leaving?". Listen untuk tone dan hesitation — often more telling than words. Compare across multiple references untuk consistency. Red flags: references reluctant untuk talk, overly positive yang seems fake, atau conflicting stories.',
        strategy: '• Schedule reference checks early, before final offer\n• Be direct about what you\'re trying to assess\n• Follow up on any inconsistencies dengan candidate',
        locked: true
      },
      {
        id: 'hr_staff_user_16',
        question: 'Pertanyaan untuk posisi fresh graduate vs experienced',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Fresh graduates: Focus pada potential, learning ability, attitude. Ask tentang: "Relevant internship atau project experience?", "How quickly do you learn?", "Tell about challenge Anda overcome di akademis", "Apa Anda excited tentang di role ini?". Experienced candidates: Focus pada proven expertise, track record, impact. Ask tentang: "Specific achievements dan metrics", "Leadership atau strategic contribution", "Apa kompleksitas yang Anda telah handle", "Why are you looking untuk change after X years?". Tailor expectations dan evaluation criteria accordingly.',
        strategy: '• Reset mindset untuk each group — different criteria apply\n• For fresh grads: assess coachability dan potential not just skills\n• For experienced: probe depth dan strategic impact beyond just longevity',
        locked: true
      },
      {
        id: 'hr_staff_user_17',
        question: 'Cara menutup interview dengan kesan positif',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Closing strong matters untuk candidate experience dan employer brand. Recap main talking points: "Great untuk hear about your experience dengan X dan success Anda delivering Y." Thank them genuinely: "Thank you untuk your time — we really appreciated learning about you." Be transparent tentang next steps: "Timeline untuk feedback is..., format adalah..., what to expect". Invite questions: "Anything else tentang role atau company yang Anda ingin tahu?" Positive closing even untuk "no" candidates — mereka might refer good people atau apply later.',
        strategy: '• Leave them feeling valued regardless of outcome\n• Be clear dan realistic tentang timeline dan process\n• Mention yang impressed Anda (authenticity builds trust)',
        locked: true
      },
      {
        id: 'hr_staff_user_18',
        question: 'Pertanyaan untuk menilai kemampuan komunikasi tertulis',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'For roles yang require strong writing: (1) Assess CV dan cover letter quality — typos, structure, clarity?, (2) Ask tentang: "Describe project di mana Anda create documentation atau communication materials", "How do you approach writing untuk different audiences?", (3) Consider requesting writing sample atau test (proposal, email, report). Look untuk: clarity, conciseness, proper grammar, structure, ability untuk tailor message untuk audience. Red flags: poor attention di detail di written materials, inability untuk explain clearly, atau dismissive tentang importance dari writing.',
        strategy: '• Review written materials carefully sebelum interview\n• For critical roles, consider writing test atau portfolio review\n• Assess both substance (organization, clarity) dan form (grammar, typos)',
        locked: true
      },
      {
        id: 'hr_staff_user_19',
        question: 'Cara menilai kandidat untuk posisi yang membutuhkan kreativitas',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'For creative roles: (1) Review portfolio atau past work — assess originality, quality, evolution, (2) Ask: "Describe a project dari conception to execution — what was your creative contribution?", "How do you approach solving problem yang belum ada clear solution?", "What inspires Anda atau drives your creativity?", (3) Pose scenario atau case: "If Anda were tasked dengan [creative challenge], how would you approach?", (4) Assess comfort dengan experimentation dan failure. Look untuk: original thinking, passion, ability untuk iterate, and bringing ideas to life.',
        strategy: '• Review tangible portfolio before interview\n• Challenge them intellectually — see how they problem-solve\n• Assess persistence — can they push through resistance atau rejection',
        locked: true
      },
      {
        id: 'hr_staff_user_20',
        question: 'Pertanyaan situasional untuk menilai decision-making skills',
        category: 'User Interview',
        type: 'Situational',
        difficulty: 'Sulit',
        modelAnswer: 'Present realistic scenario yang kandidat might face di role: "Imagine Anda have project deadline besok, tapi Anda discover major issue yang require rework. Your manager belum available. What do you do?". Assess untuk: (1) Structured thinking — identify key factors, (2) Trade-off analysis — weigh pros/cons, (3) Risk assessment — consider consequences, (4) Communication — who need to inform, (5) Accountability — own the decision bukan blame others, (6) Bias untuk action tapi thoughtful not reckless. Questions yang good involve ambiguity, competing priorities, time pressure, atau incomplete information.',
        strategy: '• Make scenario realistic dan relevant untuk actual role challenges\n• Listen untuk decision-making process not just the final answer\n• Probe untuk unpack their reasoning and assumptions\n• Assess comfort dengan ambiguity — can they decide dengan incomplete info',
        locked: true
      },
    ] as InterviewQuestion[]
  },
  admin_secretary: {
    title: 'Admin / Secretary',
    categories: ['HRD Interview', 'User Interview'],
    totalQuestions: 50,
    questions: [
      // ===== HRD INTERVIEW (30 Questions) =====
      {
        id: 'admin_sec_hrd_1',
        question: 'Apa software yang Anda kuasai untuk pekerjaan administrasi?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Saya menguasai Microsoft Office Suite terutama Excel (pivot table, VLOOKUP, formula kompleks), Word untuk dokumentasi formal, dan PowerPoint untuk presentasi. Saya juga familiar dengan Google Workspace dan pernah menggunakan sistem ERP sederhana untuk tracking. Saya mudah adaptasi dengan tools baru dan proaktif dalam learning melalui tutorial atau training.',
        strategy: '• Selalu sebutkan tools spesifik + level keahlian + kemampuan adaptasi\n• Beri contoh konkret feature yang kamu kuasai (VLOOKUP, pivot table, mail merge)\n• ❌ Hindari: "Saya bisa office" — terlalu vague dan unconvincing',
        locked: false
      },
      {
        id: 'admin_sec_hrd_2',
        question: 'Bagaimana Anda mengatur prioritas ketika ada banyak tugas deadline bersamaan?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya menggunakan metode Eisenhower Matrix — memilah tugas berdasarkan urgensi dan kepentingan. Tugas urgent+penting dikerjakan pertama, lalu important tapi tidak urgent dijadwalkan. Saya selalu komunikasikan ke atasan jika ada konflik deadline yang tidak bisa diatasi sendiri. Saya maintain priority list di Excel/Notion dan update status regularly untuk tracking.',
        strategy: '• Tunjukkan sistem/metode yang terstruktur, bukan "saya berusaha yang terbaik"\n• Mention tools yang kamu gunakan untuk tracking (Excel, Notion, Asana)\n• Highlight proactive communication dengan stakeholder tentang timeline',
        locked: false
      },
      {
        id: 'admin_sec_hrd_3',
        question: 'Ceritakan pengalaman Anda menangani tamu penting atau atasan yang demanding',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Pernah handling client meeting untuk executive director kami yang sangat detail-oriented. Saya prepare comprehensive meeting agenda, arrange catering sesuai client preference, siapkan semua documents yang mungkin dibutuhkan, dan coordinate dengan relevant departments. Saat meeting, saya monitor equipment, assist dengan technical setup, dan take comprehensive minutes. Director sangat appreciate dan rekomendasikan saya untuk handle meeting berikutnya.',
        strategy: '• Gunakan STAR method dengan concrete outcome yang positif\n• Tunjukkan attention to detail, proactive thinking, dan excellent stakeholder service\n• Highlight anticipation terhadap kebutuhan mereka sebelum diminta',
        locked: false
      },
      {
        id: 'admin_sec_hrd_4',
        question: 'Bagaimana Anda mengelola dokumen dan arsip perusahaan?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya menggunakan sistem filing yang terstruktur — baik digital (folder hierarchy yang clear, consistent naming convention) maupun physical (labeled binders, chronological order). Saya maintain master list untuk tracking dokumen penting, back-up digital files regularly, dan implement access control untuk sensitive documents. Saya juga establish retention policy — tahu mana dokumen yang harus keep berapa lama dan mana yang bisa di-archive atau destroy.',
        strategy: '• Describe specific system kamu implement (folder structure, naming, backup)\n• Mention compliance dan security considerations\n• Highlight organization system yang scalable dan easy untuk others to follow',
        locked: true
      },
      {
        id: 'admin_sec_hrd_5',
        question: 'Ceritakan pengalaman Anda membuat laporan atau presentasi untuk manajemen',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Pernah assist dalam membuat quarterly business report untuk board meeting. Saya collect data dari berbagai departemen, consolidate dalam spreadsheet, create visual charts untuk highlight key findings, dan format dalam professional PowerPoint presentation. Saya ensure data accuracy melalui double-check, provide context dan insights, bukan hanya raw numbers. Report tersebut membantu leadership dalam decision-making tentang resource allocation.',
        strategy: '• Gunakan STAR method dengan emphasize impact dari report Anda\n• Highlight attention terhadap accuracy, clarity, dan visual presentation\n• Mention how kamu translate data menjadi actionable insights',
        locked: true
      },
      {
        id: 'admin_sec_hrd_6',
        question: 'Bagaimana cara Anda menangani jadwal dan meeting atasan yang padat?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya maintain Outlook calendar yang updated real-time untuk atasan. Saya proactively manage schedule: consolidate meetings untuk minimize switching, protect focus time untuk important work, identify conflict sebelum problem, dan recommend optimal time slots. Saya juga prepare briefing materials sebelum setiap meeting dan follow-up dengan action items dan decisions. Regular sync dengan atasan untuk understand priorities dan adjust schedule accordingly.',
        strategy: '• Describe proactive approach, bukan hanya reactive scheduling\n• Mention specific system untuk tracking (Outlook dengan color-coding, etc)\n• Highlight value Anda add melalui better calendar management dan preparation',
        locked: true
      },
      {
        id: 'admin_sec_hrd_7',
        question: 'Apa yang Anda lakukan jika menemukan kesalahan dalam dokumen resmi yang sudah dikirim?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya immediately acknowledge mistake ke person yang responsible. Saya quantify impact (who received it, apa potential consequence). Saya correct error segera, send corrected version with clear notification ("Please disregard previous version — attached is corrected version with change noted"). Saya dokumentasikan apa yang salah dan why untuk prevent repeat. Untuk critical documents, saya establish double-check process dengan supervisor sebelum finalize untuk catch errors early.',
        strategy: '• Tunjukkan accountability dan responsibility — tidak membuat excuse\n• Focus di solution dan prevention, bukan blame\n• Mention improvement measures untuk prevent future occurrences',
        locked: true
      },
      {
        id: 'admin_sec_hrd_8',
        question: 'Bagaimana Anda menjaga kerahasiaan informasi perusahaan?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Confidentiality adalah fundamental responsibility. Saya: (1) tidak discuss informasi sensitive di area publik atau dengan unauthorized persons, (2) secure semua documents — filing system yang locked, digital files password-protected, (3) limit access ke people yang truly need-to-know, (4) mindful dengan emails — double-check recipients sebelum send, (5) shred semua hard copies dari sensitive docs, (6) immediately report jika ada security breach atau suspicious access.',
        strategy: '• Tunjukkan seriousness terhadap confidentiality dan specific practices\n• Mention both prevention dan detection measures\n• Highlight compliance dengan company policy dan legal requirements',
        locked: true
      },
      {
        id: 'admin_sec_hrd_9',
        question: 'Ceritakan pengalaman Anda mengkoordinasikan acara atau event perusahaan',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Handle employee appreciation event untuk 200+ staff. Saya coordinate semuanya: venue booking, catering, entertainment, invitations, logistics. Saya create detailed timeline dan checklist dengan contingency plans. Saya liaise dengan vendor, manage budget, track RSVPs. Saya juga monitor day-of execution — coordinate setup, troubleshoot issues real-time, ensure smooth flow. Event berjalan lancar, attendees sangat appreciate, dan feedback positif dari leadership about execution quality.',
        strategy: '• Gunakan STAR method dengan emphasize scope, complexity, dan successful delivery\n• Mention attention di detail, vendor management, dan budget control\n• Highlight problem-solving dan flexibility ketika unexpected issue muncul',
        locked: true
      },
      {
        id: 'admin_sec_hrd_10',
        question: 'Bagaimana Anda menangani panggilan telepon dari klien marah?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Saya stay calm dan tidak take personally. First, saya let them vent tanpa interrupt — mereka butuh feel heard. Saya acknowledge feeling: "Saya understand ini frustrating untuk Anda." Kemudian saya tanyakan specific issue: "Bisa Anda explain apa yang terjadi?" Saya listen dengan empati dan take notes. Saya explain apa yang bisa saya do dan timeline untuk resolve. Saya follow-up sebelum promised date untuk show commitment.',
        strategy: '• Emphasize calm demeanor dan active listening\n• Show empathy tanpa agreeing dengan unreasonable demands\n• Highlight focus pada solution dan customer satisfaction',
        locked: true
      },
      {
        id: 'admin_sec_hrd_11',
        question: 'Apa yang Anda lakukan ketika atasan memberikan instruksi yang tidak jelas?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya tidak assume understanding — saya ask clarifying questions. Misalnya, atasan bilang "Update presentation," saya tanyakan: "Apa slides yang perlu update? Apa specific changes? Apa format? Kapan deadline?" Saya juga summarize back understanding saya: "So if I understand correctly, Anda want me to [summary]?" Jika atasan sibuk, saya send email recap dari conversation untuk confirmation. Ini save time jangka panjang dan ensure accurate execution.',
        strategy: '• Emphasize proactive clarification sebagai sign dari professionalism\n• Show respect terhadap atasan time sambil ensuring accuracy\n• Mention benefit di clear requirements untuk better outcomes',
        locked: true
      },
      {
        id: 'admin_sec_hrd_12',
        question: 'Bagaimana cara Anda beradaptasi dengan perubahan sistem atau prosedur baru?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya embrace perubahan sebagai learning opportunity. Ketika ada sistem baru, saya: (1) attend training atau tutorial yang tersedia, (2) practice extensively sebelum go-live, (3) identify potential issues dan suggest workaround, (4) help rekan kerja yang struggle, (5) provide feedback untuk improvement. Saya understand bahwa transition takes time dan saya patient dengan learning curve. Saya juga document best practices dan create user guide untuk help adoption.',
        strategy: '• Tunjukkan positive attitude terhadap change dan learning mindset\n• Highlight proactive approach dalam understanding new system\n• Mention support yang Anda provide ke others untuk smooth transition',
        locked: true
      },
      {
        id: 'admin_sec_hrd_13',
        question: 'Ceritakan tentang pengalaman Anda bekerja dengan tim lintas departemen',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Sering coordinate antara Marketing, Sales, Finance, dan Operations untuk campaign project. Saya create timeline, collect input dari semua team, dokumentasikan approval process, dan ensure semua stakeholder aligned sebelum execution. Saya use shared spreadsheet untuk transparency dan send regular update email. Saya juga mediate ketika ada conflicting priorities dengan diplomacy. Project completed on schedule dan semua departemen satisfied dengan collaboration.',
        strategy: '• Gunakan STAR method\n• Highlight organizational skills, communication ability, dan diplomatic approach\n• Mention specific tools untuk facilitating cross-functional collaboration',
        locked: true
      },
      {
        id: 'admin_sec_hrd_14',
        question: 'Bagaimana Anda mengelola inventory atau pengadaan kebutuhan kantor?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya maintain spreadsheet untuk track office supplies: quantities on hand, reorder points, supplier info. Saya monitor usage patterns dan anticipate needs sebelum run out. Saya manage vendor relationships untuk negotiate best price tanpa compromise quality. Saya also maintain purchasing process: approval workflow, cost control, receipt verification. Saya do quarterly inventory check untuk reconcile dan prevent loss atau theft.',
        strategy: '• Describe specific system untuk inventory management\n• Mention cost control dan vendor management mindset\n• Highlight balance antara availability dan cost efficiency',
        locked: true
      },
      {
        id: 'admin_sec_hrd_15',
        question: 'Apa yang Anda lakukan jika ada konflik antara permintaan dua atasan berbeda?',
        category: 'HRD Interview',
        type: 'Situational',
        difficulty: 'Sulit',
        modelAnswer: 'Saya clarify mana request yang urgent dan mana less time-sensitive. Saya communicate ke both atasan: "Saya have request dari [person] yang due [time] dan juga dari [person] yang due [time]. Mana yang prioritas?" Saya tidak assume atau complain — saya help them decide. Saya also suggest timeline yang feasible untuk handle keduanya. Saya transparent dan proactive dalam managing conflicting priorities.',
        strategy: '• Tunjukkan diplomacy dan maturity dalam handling conflict\n• Avoid complaining atau blame — frame sebagai logistics issue\n• Emphasize transparency dan asking untuk prioritization',
        locked: true
      },
      {
        id: 'admin_sec_hrd_16',
        question: 'Bagaimana cara Anda memastikan akurasi data dalam laporan?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya implement multiple checks: (1) data entry validation — use formula untuk catch errors, (2) source verification — cross-check dengan original documents, (3) peer review — ask rekan kerja untuk verify, (4) test sebelum distribution, (5) maintain audit trail untuk tracking changes. Saya understand bahwa data accuracy adalah crucial — bad data leads ke bad decisions. Saya juga communicate dengan data providers jika ada discrepancy atau question.',
        strategy: '• Describe specific validation methods yang kamu implement\n• Mention importance di accuracy dan business impact dari errors\n• Highlight systematic approach, bukan casual atau after-the-fact checking',
        locked: true
      },
      {
        id: 'admin_sec_hrd_17',
        question: 'Ceritakan pengalaman Anda menangani korespondensi bisnis formal',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Saya handle professional correspondence dengan clients dan partners — letters, proposals, formal emails. Saya ensure correct grammar, professional tone, proper business letter format. Saya pay attention pada details: correct recipient name, addresses, date. Saya draft untuk atasan approval, incorporate feedback, finalize. Saya maintain record dan follow-up jika needed. Saya understand bahwa correspondence represents company brand dan professionalism.',
        strategy: '• Demonstrate strong writing dan attention di detail\n• Mention understanding tentang business correspondence standards dan protocols\n• Highlight pride dalam quality dan accuracy',
        locked: true
      },
      {
        id: 'admin_sec_hrd_18',
        question: 'Bagaimana Anda menangani situasi ketika sistem komputer tiba-tiba error saat deadline?',
        category: 'HRD Interview',
        type: 'Situational',
        difficulty: 'Sulit',
        modelAnswer: 'Saya stay calm dan assess situation: apa yang error, impact scope, possible solutions. Saya immediately contact IT support — clearly explain issue dan deadline urgency. Sementara itu, saya implement workaround: save backup, use alternative method jika possible (manual, different device). Saya keep atasan informed setiap 15 menit tentang status dan timeline untuk recovery. Saya prepare contingency — worst case, apa yang bisa accomplished manually atau delayed minimally. Setelah resolved, saya debrief dengan IT dan suggest prevention measures.',
        strategy: '• Tunjukkan calm problem-solving approach under pressure\n• Emphasize communication dengan IT dan stakeholder tentang status\n• Highlight preparation dari contingency plans',
        locked: true
      },
      {
        id: 'admin_sec_hrd_19',
        question: 'Apa pengalaman Anda dengan pengajuan anggaran atau expense report?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya regularly prepare dan process expense reports untuk atasan dan team. Saya collect receipts, reconcile dengan purchase orders, ensure compliance dengan company policy (allowable expenses, approval limits). Saya enter data ke sistem, check untuk duplicate atau suspicious charges, submit untuk approval. Saya follow-up dengan finance untuk payment, handle reimbursement ke employees. Saya also assist dalam departmental budget planning — consolidate needs, prioritize requests sesuai available budget.',
        strategy: '• Mention specific experience dengan expense systems dan policies\n• Highlight attention terhadap compliance dan accuracy\n• Show understanding tentang budget discipline dan cost control',
        locked: true
      },
      {
        id: 'admin_sec_hrd_20',
        question: 'Bagaimana cara Anda membangun hubungan baik dengan vendor atau supplier?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Saya treat vendor sebagai business partner, bukan just transactional relationships. Saya: (1) communicate clearly tentang needs dan expectations, (2) pay invoices on time, (3) give advance notice untuk orders dan changes, (4) appreciate good service dan quality, (5) address issues diplomatically, (6) explore mutual benefit arrangements. Good vendor relationships menghasilkan better pricing, prioritized service, dan flexibility ketika ada urgent needs.',
        strategy: '• Emphasize win-win approach dan professional respect\n• Mention importance vendor relationships dalam supporting operations\n• Highlight communication dan reliability di vendor management',
        locked: true
      },
      {
        id: 'admin_sec_hrd_21',
        question: 'Ceritakan pengalaman Anda dalam koordinasi perjalanan dinas',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya organize business travel untuk executives: book flights, arrange hotels, ground transportation, meeting schedules. Saya understand preferences (airline, hotel class, seat preference) dan anticipate needs. Saya prepare travel itinerary yang detailed dengan confirmation numbers, maps, important contacts. Saya handle last-minute changes dengan flexibility. Saya also ensure compliance dengan travel policy dan budget approval. Traveler reported feeling well-organized dan appreciated attention terhadap detail.',
        strategy: '• Highlight proactive planning dan attention terhadap preferences\n• Mention anticipation terhadap needs dan problem prevention\n• Show flexibility dalam handling changes atau unexpected situation',
        locked: true
      },
      {
        id: 'admin_sec_hrd_22',
        question: 'Bagaimana Anda menjaga konsentrasi dan akurasi untuk pekerjaan yang repetitif?',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Saya understand bahwa repetitive work mudah bosan tapi accuracy tetap critical. Saya: (1) break task ke smaller chunks dengan different pace, (2) eliminate distractions — put phone away, quiet environment, (3) take regular breaks untuk refresh, (4) use checklist untuk ensure nothing is missed, (5) vary work — alternate antara different tasks, (6) implement double-check habit. Saya juga track error rate dan celebrate zero-mistake days untuk maintain motivation.',
        strategy: '• Show self-awareness tentang challenge dari repetitive work\n• Describe specific techniques untuk maintain focus dan accuracy\n• Mention proactive habits dan systems untuk quality control',
        locked: true
      },
      {
        id: 'admin_sec_hrd_23',
        question: 'Apa yang Anda lakukan untuk terus mengembangkan skill administrasi Anda?',
        category: 'HRD Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Saya percaya continuous learning adalah essential. Saya: (1) take online courses untuk improve Excel, software, atau business skills, (2) read about best practices dan industry trends, (3) attend workshop atau certification program, (4) learn dari rekan kerja yang punya different expertise, (5) explore new tools dan method untuk efficiency. Saya set learning goals dan track progress. Saya also experiment dengan small improvements di processes — kaizen mindset terhadap pekerjaan.',
        strategy: '• Highlight intrinsic motivation untuk growth dan development\n• Mention specific learning activities yang sudah dilakukan atau planned\n• Show curiosity tentang improvement dan efficiency',
        locked: true
      },
      {
        id: 'admin_sec_hrd_24',
        question: 'Bagaimana cara Anda menangani permintaan mendadak dari atasan saat Anda sedang sibuk?',
        category: 'HRD Interview',
        type: 'Situational',
        difficulty: 'Sedang',
        modelAnswer: 'Saya listen tanpa complaint. Saya ask clarifying questions: "Apa deadline-nya?", "Apa priority dibanding task lain yang sedang saya work?" Saya honest tentang timeline: "Saya bisa mulai sekarang tapi current deadline jadi bergeser ke..." Saya suggest alternative: "Atau task A bisa delay sampai esok hari?" Saya execute dengan quality tanpa complaint atau grumbling. Saya understand bahwa urgent request sometimes terjadi dan flexibility adalah part dari job.',
        strategy: '• Show willingness dan flexibility tanpa drama\n• Ask clarifying questions untuk scope dan priority\n• Provide realistic timeline assessment',
        locked: true
      },
      {
        id: 'admin_sec_hrd_25',
        question: 'Ceritakan tentang sistem filing atau dokumentasi yang pernah Anda buat',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Develop dokumentasi system untuk divisi dengan unclear filing sebelumnya. Saya: (1) analyze existing documents dan workflow, (2) design logical folder structure (department/topic/date), (3) establish naming convention yang consistent, (4) create master index untuk quick reference, (5) digitize seluruh document yang belum digital, (6) train team untuk maintain system. Result: 80% faster document retrieval, improved compliance tracking, dan less duplicate work.',
        strategy: '• Gunakan STAR method dengan emphasis pada outcome dan impact\n• Highlight improvement dalam efficiency dan organization\n• Mention scalability dan sustainability dari system yang kamu design',
        locked: true
      },
      {
        id: 'admin_sec_hrd_26',
        question: 'Bagaimana Anda memastikan semua invoice dan dokumen keuangan diproses tepat waktu?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya maintain tracking system untuk invoice — entry date, due date, status (received, approved, processed, paid). Saya monitor aging report dan flag overdue items. Saya set reminder untuk approaching deadline dan proactively follow up dengan approval team jika ada bottleneck. Saya also validate invoice: check quantity, price, terms sebelum processing. Saya reconcile dengan PO dan receiving report. Organization dan timeliness important untuk maintain supplier relationship dan cash flow.',
        strategy: '• Describe specific system untuk tracking dan monitoring\n• Mention proactive approach untuk preventing delays\n• Highlight attention terhadap accuracy dan validation',
        locked: true
      },
      {
        id: 'admin_sec_hrd_27',
        question: 'Apa yang dimaksud dengan SOP dan bagaimana Anda mengikutinya?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'SOP (Standard Operating Procedure) adalah documented process yang define steps untuk accomplish task. SOP penting untuk consistency, efficiency, dan compliance. Saya always follow SOP karena: (1) ensures consistent quality, (2) reduce error dan rework, (3) enables knowledge transfer dan training, (4) demonstrate compliance dengan policy. Jika saya find SOP unclear atau inefficient, saya suggest improvement ke supervisor. Saya juga contribute dalam updating SOP ketika process change.',
        strategy: '• Tunjukkan respect terhadap process dan discipline\n• Mention understanding tentang importance dari standardization\n• Highlight willingness untuk contribute dalam improvement',
        locked: true
      },
      {
        id: 'admin_sec_hrd_28',
        question: 'Bagaimana cara Anda mengelola database kontak atau CRM sederhana?',
        category: 'HRD Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Saya maintain contact database dengan accurate, updated information: names, titles, emails, phone, companies, last contact date. Saya use spreadsheet atau simple CRM tool. Saya establish rules untuk data entry (required fields, format consistency). Saya regularly clean database — remove duplicates, update changed info, flag invalid contact. Saya also segment contacts untuk targeted communication. Clean database adalah essential untuk effective communication dan relationship management.',
        strategy: '• Describe data quality practices Anda maintain\n• Mention organization dan categorization untuk functional usage\n• Highlight importance dari accuracy dan timeliness',
        locked: true
      },
      {
        id: 'admin_sec_hrd_29',
        question: 'Ceritakan pengalaman Anda bekerja di lingkungan multitasking yang intensif',
        category: 'HRD Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Previous role di support division dengan 4 executives plus multiple team members semua need assistance simultaneously. Saya juggle: email, calls, in-person request, document preparation, scheduling, problem-solving. Strategy saya: (1) use system untuk tracking everything (task list, calendar, email folders), (2) batch similar task untuk efficiency, (3) say "no" atau "later" diplomatically, (4) delegate ketika possible, (5) stay calm dan organized. Saya thrive dalam high-energy environment dan proud dengan ability untuk manage complexity.',
        strategy: '• Highlight stress management dan organization strategy\n• Show pride dalam ability untuk juggle multiple priorities\n• Mention impact atau compliments dari executive tentang support quality',
        locked: true
      },
      {
        id: 'admin_sec_hrd_30',
        question: 'Apa kelebihan dan kekurangan Anda dalam pekerjaan administrasi?',
        category: 'HRD Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Kelebihan: detail-oriented, organized, proactive dalam anticipating needs, adaptable terhadap change, good communication skill. Kekurangan: sometimes overthink small details (waste time), tend to say yes ke semua request (struggle dengan boundary). Saya aware akan kekurangan dan terus improve: setting priority adalah key, learning untuk decline diplomatically, delegate tasks yang bukan urgent.',
        strategy: '• Be honest tentang both strength dan weaknesses\n• Pair each weakness dengan improvement strategy\n• Emphasize growth mindset dan self-awareness\n• Avoid cliche answer seperti "too perfectionist" (seems disingenuous)',
        locked: false
      },

      // ===== USER INTERVIEW (20 Questions) =====
      {
        id: 'admin_sec_user_1',
        question: 'Cara menilai kecepatan dan akurasi kerja kandidat admin',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Gunakan practical test atau work sample: (1) Data entry exercise — berikan 50 entries dengan deadline 30 menit, check untuk accuracy, (2) Spreadsheet task — create formula, organize data, identify errors within time limit, (3) Prioritization scenario — give list dari task dengan different deadline, see how they prioritize. Observe: speed, careless mistakes, double-checking habit, ask completion time estimate versus actual. Speed tanpa accuracy adalah useless; assess kombinasi keduanya.',
        strategy: '• Use realistic task yang representative dari actual job\n• Set reasonable timeline — jangan terlalu tight yang cause panic\n• Note both accuracy percentage dan completion time',
        locked: false
      },
      {
        id: 'admin_sec_user_2',
        question: 'Pertanyaan untuk menilai attention to detail kandidat admin',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Ask: "Describe time kamu catch error atau mistake yang almost missed", "Tell me tentang process kamu use untuk ensure accuracy", "How do you approach task yang require high precision?". Observe interview sendiri — note if CV punya typo, jika mereka notice error di presentasi materials Anda show. Red flags: careless dalam written materials, vague about quality control process. Strong signals: mention double-check habit, proofreading system, pride dalam accuracy.',
        strategy: '• Deliberately include error di interview materials untuk see if they notice\n• Ask specific behavioral questions dengan examples\n• Observe attention terhadap detail dalam interview itself',
        locked: false
      },
      {
        id: 'admin_sec_user_3',
        question: 'Cara menilai software skill kandidat admin',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Ask tentang: specific software mereka use (Excel: VLOOKUP, pivot table? Word: template, mail merge? PowerPoint: advanced formatting?). Request demo atau walkthrough: "Show me spreadsheet kamu biasa handle" atau "Explain how kamu create chart dari raw data". For Excel, ask "What formula Anda gunakan untuk...?" to gauge depth. Observe comfort level dengan interface dan problem-solving approach jika ada unfamiliar task. Strong candidates ask clarifying question dan think logically.',
        strategy: '• Ask specific, technical questions — not just "are you good at Excel?"\n• Request hands-on demo if possible (bring laptop, show actual work)\n• Assess learning ability untuk new tools — software specific knowledge bisa learned',
        locked: true
      },
      {
        id: 'admin_sec_user_4',
        question: 'Pertanyaan untuk menilai kemampuan multitasking dan prioritization',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask scenario: "You have X urgent request from boss, Y important project due esok, Z colleague asking help — what do you do?" Listen untuk: structured thinking, consultation dengan stakeholder, realistic timeline, flexibility. Ask past experience: "Describe busiest day Anda — how many concurrent task? How did you manage?" Assess: organization system, stress management, proactive communication tentang timeline.',
        strategy: '• Provide realistic scenario relevant untuk role\n• Look untuk evidence dari system usage (to-do list, calendar, prioritization method)\n• Assess ability untuk communicate tentang conflicting priorities',
        locked: true
      },
      {
        id: 'admin_sec_user_5',
        question: 'Cara menilai kemampuan komunikasi kandidat admin',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Assess dalam interview: clear speech, appropriate tone, ability untuk explain complex information simply. Ask: "How do you communicate dengan difficult person atau situation?", "Describe professional email atau letter Anda wrote". Review CV dan cover letter — grammar, tone, structure, clarity. Untuk secretary role, communication adalah critical — dengan client, executives, team. Red flags: poor grammar, unclear expression, inappropriate tone. Strong signals: articulate, professional, ability untuk adapt message untuk audience.',
        strategy: '• Observe communication quality during interview itself\n• Review written materials carefully untuk writing quality\n• Ask specific examples tentang professional communication',
        locked: true
      },
      {
        id: 'admin_sec_user_6',
        question: 'Pertanyaan untuk menilai organizational skill',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "How do you organize workspace dan documents?", "What system do you use untuk track deadline?", "Describe your email management strategy", "How do you ensure nothing falls through crack?". Look untuk evidence dari system thinking. Ask tentang specific tool mereka use (Outlook, Notion, spreadsheet). Assess: method clarity, consistency dalam application, scalability. Strong candidates punya deliberate system, bukan rely pada memory atau ad-hoc approach.',
        strategy: '• Ask untuk walk-through dari actual system mereka use\n• Assess both digital dan physical organization\n• Look untuk evidence dari discipline dan system, not just tidiness',
        locked: true
      },
      {
        id: 'admin_sec_user_7',
        question: 'Cara menilai customer service atau interpersonal skill',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Mudah',
        modelAnswer: 'Ask: "Tell me about difficult interaction dengan client atau colleague — how did you handle?", "Describe feedback Anda received tentang communication atau service", "How do you handle unreasonable request?". Observe dalam interview: do they listen aktif, maintain eye contact, show genuine interest? Can they handle criticism gracefully? Red flags: defensive terhadap feedback, dismissive tentang customer concern. Strong signals: empathy, patience, focus pada solving problem.',
        strategy: '• Ask behavioral questions dengan specific examples\n• Observe interpersonal style dalam interview itself\n• Assess ability untuk remain professional dan helpful under pressure',
        locked: true
      },
      {
        id: 'admin_sec_user_8',
        question: 'Pertanyaan untuk menilai reliability dan consistency',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask tentang: "Tell me about promise kamu keep atau break — bagaimana Anda handle?", "What\'s your attendance record seperti?", "Describe situation di mana Anda had to deliver dalam short notice — how did Anda perform?". Check reference tentang reliability. Assess: punctuality dalam interview itself, follow-through dengan preparation, follow-up dari interview (send thank you note?). Admin role memerlukan reliability — people depend pada mereka untuk consistent support.',
        strategy: '• Ask tentang actual accountability dan follow-through\n• Check reference explicitly tentang reliability\n• Observe punctuality dan preparation dalam interview',
        locked: true
      },
      {
        id: 'admin_sec_user_9',
        question: 'Cara menilai adaptability terhadap change dan learning agility',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "Tell me about new process atau system yang introduced — bagaimana Anda adapt?", "Give example tentang Anda learn new skill quickly", "How do you approach learning tool atau software yang unfamiliar?". Assess: openness to change, proactive learning approach, flexibility, resilience terhadap frustration. Red flags: rigid thinking, blame change atau resistance. Strong signals: curiosity, quick learner, see change sebagai opportunity.',
        strategy: '• Ask tentang specific learning or change experience\n• Assess attitude terhadap learning — not just capability\n• Look untuk evidence dari proactive learning behavior',
        locked: true
      },
      {
        id: 'admin_sec_user_10',
        question: 'Pertanyaan untuk menilai proactivity dan initiative',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "Describe improvement atau process that Anda initiated — why dan what was result?", "Tell me tentang time Anda anticipate problem sebelum terjadi", "How do you identify opportunities untuk add value?". Look untuk: spontaneous suggestion, problem-solving, anticipatory thinking. Red flags: only do what asked, wait untuk instruction. Strong signals: proactive improvement, anticipate need, suggest solution without being asked.',
        strategy: '• Listen untuk spontaneous examples dari initiative\n• Assess balance antara proactivity dan respecting boundaries\n• Look untuk evidence dari thinking beyond role scope',
        locked: true
      },
      {
        id: 'admin_sec_user_11',
        question: 'Cara menilai candidate fit untuk high-pressure environment',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Ask: "Describe your busiest period — what was happening dan how did kamu feel?", "Tell me tentang deadline yang extreme or demanding — bagaimana kamu handle stress?", "When everything urgent, how do you stay focus dan not panic?". Observe dalam interview: calm demeanor, clear thinking, ability untuk handle challenging question. Ask tentang stress management: "What do you do untuk relax atau manage stress?". Red flags: stress paralysis, anxiety mention, inability untuk prioritize. Strong signals: calm, structured thinking, stress management habit.',
        strategy: '• Ask tentang extreme scenario untuk see how they handle pressure\n• Observe emotional control dan stress response during interview\n• Assess coping mechanism dan stress management practices',
        locked: true
      },
      {
        id: 'admin_sec_user_12',
        question: 'Pertanyaan untuk menilai problem-solving dan critical thinking',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sulit',
        modelAnswer: 'Present scenario: "You discover discrepancy antara payment record dan invoice — what steps kamu take untuk resolve?" atau "Atasan asking untuk report yang you\'re unsure tentang data source — bagaimana kamu approach?". Look untuk: structured problem-solving, critical thinking, proactive verification, communication tentang limitation. Assess: ask clarifying question, identify root cause, suggest multiple approach, escalate jika needed. Strong candidates think through problem logically.',
        strategy: '• Give realistic, job-relevant scenario\n• Listen untuk problem-solving process, not just answer\n• Look untuk evidence dari critical thinking dan verification habit',
        locked: true
      },
      {
        id: 'admin_sec_user_13',
        question: 'Cara menilai candidate yang aspiring untuk career growth',
        category: 'User Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Ask: "Where do you see yourself dalam 3-5 tahun?", "What skill do you want develop?", "How does role ini fit dalam career goal Anda?". Assess untuk: realistic ambition, willingness untuk learn, focus pada growth. For admin role, strong candidates aspire untuk supervisory role atau specialized area (HR, finance). Red flags: "I don\'t know" atau unrealistic timeline. Strong signals: clear growth goal, specific skill development plan.',
        strategy: '• Look untuk authentic growth mindset\n• Assess alignment antara candidate goal dan company capability\n• Balance antara full commitment terhadap role dengan reasonable ambition',
        locked: true
      },
      {
        id: 'admin_sec_user_14',
        question: 'Pertanyaan untuk menilai discretion dan trustworthiness',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sulit',
        modelAnswer: 'Ask: "Tell me tentang sensitive information yang kamu handle — bagaimana Anda ensure confidentiality?", "Have you ever been tempted untuk share atau discuss confidential matter — bagaimana kamu resist?", "How do you approach information security?". Assess untuk: seriousness terhadap confidentiality, judgment tentang what\'s appropriate share. Observe dalam interview: do they mention specific company information dari previous job? Do they speak poorly about previous employer? Red flags: gossip, loose lips, poor judgment. Strong signals: clear confidentiality understanding, professional discretion.',
        strategy: '• Ask tentang actual situation where discretion was tested\n• Observe interview behavior — do they respect confidentiality?\n• Assess judgment tentang what\'s appropriate discuss',
        locked: true
      },
      {
        id: 'admin_sec_user_15',
        question: 'Cara menilai candidate yang comfortable dengan ambiguity',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "How do you feel tentang working dalam fast-paced environment di mana priority change often?", "Tell me tentang situation di mana Anda tidak have all information kamu needed — bagaimana kamu proceed?", "What\'s your approach ketika instruction tidak clear?". Look untuk: comfort dengan asking question, ability untuk move forward despite uncertainty, flexibility. Red flags: need untuk perfect clarity, anxiety tentang ambiguity, paralysis. Strong signals: ask clarifying question, make reasonable assumption, proceed dengan confidence.',
        strategy: '• Ask tentang tolerance terhadap ambiguity dan change\n• Assess ability untuk move forward despite uncertainty\n• Look untuk comfort level dengan incomplete information',
        locked: true
      },
      {
        id: 'admin_sec_user_16',
        question: 'Pertanyaan untuk menilai passion atau motivation terhadap role',
        category: 'User Interview',
        type: 'Competency',
        difficulty: 'Mudah',
        modelAnswer: 'Ask: "What excites Anda tentang pekerjaan administrasi?", "Describe role ideal Anda", "What do you enjoy most dari work Anda sebelumnya?". Listen untuk genuine passion atau at least positive attitude. Assess whether mereka see role sebagai temporary stepping stone atau meaningful contribution. Red flags: "I need job" atau "No particular interest." Strong signals: appreciate value dari role, see it as meaningful, genuinely interested dalam supporting others.',
        strategy: '• Listen untuk authentic enthusiasm or at least positive engagement\n• Distinguish antara "willing to do" dan "passionate about"\n• Assess whether role align dengan their interest',
        locked: true
      },
      {
        id: 'admin_sec_user_17',
        question: 'Cara menilai candidate dengan limited experience tapi high potential',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Sedang',
        modelAnswer: 'For fresh grad atau career changer: assess foundation skill (soft skill, learning ability) over specific experience. Ask: "How quickly do you learn?", "Tell me tentang time Anda master complex skill despite no prior experience", "What\'s your approach untuk on-boarding di new role?". Look untuk: strong fundamentals (communication, organization, reliability), coachability, enthusiasm. Experience bisa diajarkan jika foundation bagus. Red flags: entitlement atau unrealistic expectation. Strong signals: humility, eagerness learn, growth mindset.',
        strategy: '• Shift evaluation criteria untuk prioritize trainable skill\n• Assess learning ability dan potential over specific experience\n• Look untuk enthusiasm dan coachability',
        locked: true
      },
      {
        id: 'admin_sec_user_18',
        question: 'Pertanyaan untuk menilai kemampuan independent work vs collaboration',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "Describe project yang Anda handle independently — what support Anda need?", "Tell me tentang time Anda collaborate dengan team atau multiple people", "How do you know ketika untuk ask help versus figure out sendiri?". Look untuk: balance antara independence dan knowing when ask for help, comfort dengan both solo work dan collaboration. Admin often balance antara independent task dan supporting team. Red flags: need constant supervision atau refuse collaboration. Strong signals: reliable independent worker tapi also good team player.',
        strategy: '• Ask tentang both independent dan collaborative experience\n• Assess judgment tentang when ask for help\n• Look untuk balance sesuai role requirement',
        locked: true
      },
      {
        id: 'admin_sec_user_19',
        question: 'Cara menilai candidate\'s awareness tentang role scope dan responsibility',
        category: 'User Interview',
        type: 'Technical',
        difficulty: 'Mudah',
        modelAnswer: 'Ask candidate tentang understanding mereka: "What do you think are main responsibility dari role ini?", "Apa yang surprise Anda tentang pekerjaan administrasi berdasarkan apa Anda know?", "Bagaimana Anda expect typical day Anda look seperti?". Compare dengan actual scope. Strong candidates yang research perusahaan dan role show genuine preparation. Red flags: unrealistic expectation atau misunderstanding tentang role. Strong signals: asked thoughtful question, understand breadth dari role.',
        strategy: '• Ask tentang their understanding dari role scope\n• Gauge preparation dan research mereka lakukan\n• Assess realistic expectation versus fantasy',
        locked: true
      },
      {
        id: 'admin_sec_user_20',
        question: 'Pertanyaan untuk menilai cultural fit dan values alignment',
        category: 'User Interview',
        type: 'Behavioral',
        difficulty: 'Sedang',
        modelAnswer: 'Ask: "What kind dari work environment kamu thrive di?", "Describe workplace culture yang ideal untuk Anda", "Tell me tentang value yang important untuk Anda dalam job". Share authentic company culture — both positive dan challenging aspect. Assess whether mereka can thrive dalam environment Anda. Red flags: expect rigid hierarchy, overly formal, atau values misalignment. Strong signals: compatible working style, appreciate company culture, genuine fit.',
        strategy: '• Share both positive dan realistic aspect dari culture\n• Listen untuk whether their preference align dengan actual environment\n• Assess beyond just "liking people" untuk deeper value alignment',
        locked: true
      },
    ] as InterviewQuestion[]
  }
} as const;
