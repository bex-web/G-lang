export type SpecNode = {
  id: string
  label: string
  group: 'core' | 'hardware' | 'software' | 'science'
  /** normalized 0-100 coordinates within the graph viewport */
  x: number
  y: number
  links: string[]
}

/** Speciality node graph — a constellation of overlapping disciplines. */
export const specNodes: SpecNode[] = [
  { id: 'physics', label: 'Physics', group: 'core', x: 50, y: 48, links: ['instrumentation', 'computational', 'robotics', 'ai'] },
  { id: 'instrumentation', label: 'Instrumentation', group: 'hardware', x: 24, y: 26, links: ['embedded', 'iot', 'physics'] },
  { id: 'embedded', label: 'Embedded Systems', group: 'hardware', x: 16, y: 58, links: ['iot', 'robotics', 'instrumentation'] },
  { id: 'iot', label: 'IoT Networks', group: 'hardware', x: 30, y: 82, links: ['embedded', 'ai'] },
  { id: 'computational', label: 'Computational Physics', group: 'science', x: 74, y: 24, links: ['ai', 'physics'] },
  { id: 'ai', label: 'Applied AI', group: 'software', x: 82, y: 56, links: ['computational', 'iot', 'physics'] },
  { id: 'robotics', label: 'Robotics', group: 'hardware', x: 68, y: 82, links: ['embedded', 'physics', 'ai'] },
]

export const groupLabels: Record<SpecNode['group'], string> = {
  core: 'Core',
  hardware: 'Hardware',
  software: 'Software',
  science: 'Science',
}

export type TimelineEntry = {
  code: string
  year: string
  title: string
  org: string
  kind: 'research' | 'build' | 'education' | 'publication'
  description: string
}

export const timeline: TimelineEntry[] = [
  {
    code: 'REBOOT-0004',
    year: 'Dec 2024',
    title: 'Gilang Pratama Putra Siswanto',
    org: 'nothing',
    kind: 'build',
    description:
      'nothing special here. all the de.humanized words and worlds rebuilt within new-person. some refreshment after overture IV.',
  },
  {
    code: 'Author',
    year: 'Jan 2025',
    title: 'Bolabot Techno Robotic Institute',
    org: 'CV. Bolabot Techno Robotic Institute',
    kind: 'research',
    description:
      'Aftermath finishing internship, we continue the research by composing 3 books on electronics and computing within 4 months',
  },
  {
    code: 'Gold Medalist',
    year: 'July 2025',
    title: 'International Walisongo Science Competition',
    org: 'UIN Sunan Gunung Djati Bandung',
    kind: 'education',
    description:
      'One shot, joining the competition on Physics while KKN and then, we are here.',
  },
  {
    code: 'Presenter',
    year: 'Nov 2025',
    title: 'International Conference on Science and Technology',
    org: 'UIN Sunan Gunung Djati Bandung',
    kind: 'publication',
    description:
      'Presenting our works on giant magnetoresistance to the world within international grade conference.',
  },
  {
    code: '2nd International Grade',
    year: 'Dec 2025',
    title: 'SGD Awards 2025',
    org: 'UIN Sunan Gunung Djati Bandung',
    kind: 'build',
    description:
      'Unintended, we called by our college to took achievement about what we got. A little bit shocked, hence that is unbelievable moment.',  },
  {
    code: 'Graduate',
    year: 'Feb 2026',
    title: 'Physics Undergraduate | Instrumentation',
    org: 'UIN Sunan Gunung Djati Bandung',
    kind: 'education',
    description:
      'Graduated with a thesis on machine learning applied on giant magnetoresistance sensor system for saliva detection.',
  },
]

export type TechCategory = {
  name: string
  code: string
  items: string[]
}

export const techStack: TechCategory[] = [
  {
    name: 'Instrumentation',
    code: 'TS-INS',
    items: ['ADC / DAC design', 'Analog front-ends', 'Calibration', 'Metrology', 'Oscilloscopy'],
  },
  {
    name: 'Embedded',
    code: 'TS-EMB',
    items: ['C / C++', 'Rust', 'STM32', 'ESP32', 'RTOS', 'FreeRTOS'],
  },
  {
    name: 'Computation',
    code: 'TS-CMP',
    items: ['Python', 'NumPy / SciPy', 'Julia', 'MATLAB', 'CUDA'],
  },
  {
    name: 'AI / Data',
    code: 'TS-AI',
    items: ['PyTorch', 'TensorFlow Lite', 'ONNX', 'Signal processing', 'Edge inference'],
  },
  {
    name: 'Systems & Web',
    code: 'TS-SYS',
    items: ['Next.js', 'TypeScript', 'PostgreSQL', 'MQTT', 'Docker'],
  },
]
