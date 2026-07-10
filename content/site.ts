export const profile = {
  name: 'Gilang Pratama Putra Siswanto',
  shortName: 'Gilang',
  initials: 'GPPS',
  title: 'IoT Engineer · Instrumentation & Systems Engineer',
  location: 'Bandung, Indonesia',
  status: 'Who Am I',
  tagline:
    'Building measurement systems where physics, electronics, and code converge.',
  intro:
    'I am a physics graduate working at the intersection of scientific research and applied engineering. My work spans precision instrumentation, embedded systems, IoT networks, computational physics, robotics, and applied AI, translating physical phenomena into signals, data, and decisions.',
  bioLong: [
    'Trained as a physicist, I design and build instruments that turn the physical world into measurable, reproducible data. I move between the bench and the workbench: defining the measurement problem, modelling the phenomenon, then engineering the sensor, firmware, and analysis pipeline that captures and interprets it.',
    'My work focuses on low-cost, high-value systems for research and industry, from experimental sensing platforms to automation, control, and computational models for noisy real-world signals.',
  ],
} as const

export const contact = {
  email: 'gilangpputras03@gmail.com',
  whatsapp: '+6281585077445',
  whatsappHref: 'https://wa.me/6281585077445',
  emailHref: 'mailto:gilangpputras03@gmail.com',
} as const

export const socials = [
  { label: 'Email', handle: 'gilangpputras03@gmail.com', href: 'mailto:gilangpputras03@gmail.com', kind: 'email' as const },
  { label: 'WhatsApp', handle: '+62 815 8507 7445', href: 'https://wa.me/6281585077445', kind: 'whatsapp' as const },
  { label: 'LinkedIn', handle: 'in/gilang-pratama-putra-siswanto', href: 'https://www.linkedin.com/in/gilang-pratama-putra-siswanto-93170231b/', kind: 'linkedin' as const },
  { label: 'GitHub', handle: '@gilangpps', href: 'https://github.com/gilangpps', kind: 'github' as const },
  { label: 'Instagram', handle: '@gilang_pratamaps', href: 'https://www.instagram.com/gilang_pratamaps/', kind: 'instagram' as const },
]

export const positions = [
  {
    role: 'Senior IoT Engineer',
    org: 'Coune Labworks',
    period: 'Jan 2026 — Present',
    type: 'Industry',
    summary:
      'Designing and developing embedded systems, IoT workflows, hardware prototypes, firmware, and automation solutions for real-world engineering applications.',
  },
  {
    role: 'Research Assistant',
    org: 'UIN Sunan Gunung Djati Bandung',
    period: 'Jan 2025 — Present',
    type: 'Research',
    summary:
      'Working on giant magnetoresistance sensor-based experimental systems, signal acquisition, data processing, and analysis workflows for physical measurement.',
  },
  {
    role: 'Founder & Principal Engineer',
    org: 'Bex 7386 Mini-Techlab',
    period: 'Feb 2026 — Present',
    type: 'Sidekick',
    summary:
      'Building open, low-cost measurement hardware, firmware, and automation tools for research, prototyping, and small industry use.',
  },
]

/** Icon keys map to lucide-react icons in the ResearchFocus component. */
export type ResearchFocusItem = {
  code: string
  title: string
  /** Short label under the icon */
  label: string
  /** One-line caption revealed on hover/focus */
  hover: string
  /** lucide-react icon name */
  icon: 'Radar' | 'Cpu' | 'Sigma' | 'Waves'
  order: number
  description: string
}

export const researchFocus: ResearchFocusItem[] = [
  {
    code: 'RF-01',
    title: 'Precision Instrumentation',
    label: 'Instrumentation',
    hover: 'Sensor design, analog front-ends, calibration & metrology.',
    icon: 'Radar',
    order: 1,
    description:
      'Sensor design, analog front-ends, calibration, and metrology for reproducible measurement.',
  },
  {
    code: 'RF-02',
    title: 'Embedded & Real-Time Systems',
    label: 'Embedded',
    hover: 'Firmware, deterministic control loops & edge computing.',
    icon: 'Cpu',
    order: 2,
    description:
      'Firmware, deterministic control loops, and edge computing on constrained microcontrollers.',
  },
  {
    code: 'RF-03',
    title: 'Computational Physics',
    label: 'Computation',
    hover: 'Numerical modelling, simulation & inverse problems.',
    icon: 'Sigma',
    order: 3,
    description:
      'Numerical modelling, simulation, and inverse problems for physical systems.',
  },
  {
    code: 'RF-04',
    title: 'Applied AI for Sensing',
    label: 'Applied AI',
    hover: 'Signal denoising, anomaly detection & on-device inference.',
    icon: 'Waves',
    order: 4,
    description:
      'Signal denoising, anomaly detection, and on-device inference for instrumentation.',
  },
]

export const statistics = [
  { value: 24, suffix: '+', label: 'Instruments built', code: 'ST-01' },
  { value: 9, suffix: '', label: 'Publications & preprints', code: 'ST-02' },
  { value: 6, suffix: '', label: 'Research domains', code: 'ST-03' },
  { value: 140, suffix: 'k', label: 'Lines of firmware shipped', code: 'ST-04' },
]
