export type Project = {
  slug: string
  index: string
  title: string
  category: string
  year: string
  status: 'active' | 'archived' | 'prototype'
  summary: string
  tags: string[]
  metrics: { label: string; value: string }[]
  role: string
  timeframe: string
  overview: string[]
  challenge: string
  approach: string[]
  outcomes: string[]
  stack: { group: string; items: string[] }[]
  links?: { label: string; href: string }[]
  /** Card + detail hero thumbnail — relative to /public */
  thumbnail?: string
  /** Extra gallery images shown in the detail page lightbox */
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: 'wien-displacement-digitalization',
    index: 'P-01',
    title: "Digitalization of Wien's Displacement Experiment",
    category: 'Instrumentation',
    year: '2024',
    status: 'archived',
    thumbnail: '/images/projects/P-01_thumbnail_wien_digitalize_data.png',
    gallery: [
      '/images/projects/P-01_thumbnail_wien_digitalize_data.png',
    ],
    summary:
      'An Arduino Uno R3 and TCS34725 RGB-sensor based system that digitizes Wien displacement experiment readings and turns serial data into wavelength-intensity plots with Python.',
    tags: ['Arduino', 'TCS34725', 'Python', 'Physics Lab'],
    metrics: [
      { label: 'Accuracy', value: '99.99%' },
      { label: 'Sensor', value: 'TCS34725 RGB' },
      { label: 'b value', value: '2.998e-3' },
    ],
    role: 'Developer · Data Acquisition & Analysis',
    timeframe: 'Sept 2024 - Oct 2024',
    overview: [
      "This project digitizes the Wien displacement experiment by pairing an Arduino Uno R3 with a TCS34725 RGB sensor and a Python-based analysis layer.",
      'The workflow captures experimental readings over serial, processes them in software, and renders intensity-versus-wavelength plots for analysis and reporting.',
    ],
    challenge:
      'The main problem was turning raw sensor readings into a clean, repeatable experiment workflow that could be analyzed without manual spreadsheet chaos and inconsistent plotting.',
    approach: [
      'Used Arduino-side serial output to stream sensor readings from the TCS34725.',
      'Processed the incoming data in Python using NumPy, Pandas, and Matplotlib.',
      'Converted measurement sets into wavelength-intensity graphs for Wien displacement evaluation.',
      'Kept the codebase split into acquisition and analysis layers so the experiment stayed maintainable.',
    ],
    outcomes: [
      'Produced a working digital measurement pipeline for the Wien displacement experiment.',
      'Generated reproducible plots and report assets from the experiment data.',
      'Kept the implementation lightweight with a C++ plus Python stack.',
    ],
    stack: [
      { group: 'Hardware', items: ['Arduino Uno R3', 'TCS34725 RGB sensor', 'Serial connection'] },
      { group: 'Software', items: ['C++', 'Python 3.8.10', 'Matplotlib'] },
      { group: 'Data', items: ['NumPy', 'Pandas', 'Excel'] },
    ],
  },
  
  {
    slug: 'brownian-motion-digitalization',
    index: 'P-02',
    title: 'Brownian Motion — Digitalized Tracking System',
    category: 'Instrumentation',
    year: '2024',
    status: 'archived',
    thumbnail: '/images/projects/P-02_thumbnail_brownian_motion_GUI.png',
    gallery: [
      '/images/projects/P-02_thumbnail_brownian_motion_GUI.png',
    ],
    summary:
      'An ESP32-CAM and OpenCV-based system for digitizing Brownian motion experiments through automated particle tracking and Python-assisted data analysis.',
    tags: ['ESP32-CAM', 'OpenCV', 'Python', 'Computer Vision'],
    metrics: [
      { label: 'Camera', value: 'ESP32-CAM' },
      { label: 'Optics', value: '60x converging lens' },
      { label: 'Interface', value: 'Python 3.8.10' },
    ],
    role: 'Developer · Computer Vision & Data Acquisition',
    timeframe: 'Oct 2024 - Nov 2024',
    overview: [
      'This project digitizes Brownian motion observations by combining an ESP32-CAM imaging setup with OpenCV-based object tracking in Python.',
      'The workflow turns captured video into structured motion data, then pushes it into plotting and analysis assets for report-ready interpretation.',
    ],
    challenge:
      'Brownian motion is noisy, microscopic, and easy to misread by eye. The real problem was making the capture process stable enough for automated tracking without turning the lab setup into a fragile toy.',
    approach: [
      'Built the capture pipeline around ESP32-CAM footage and the repo’s dedicated program folder.',
      'Used OpenCV to detect and follow moving particles frame by frame.',
      'Organized the codebase into acquisition and tooling layers for cleaner maintenance.',
      'Prepared plotted output and sample data assets from the `DATA/DATA PLOTTING` structure.',
    ],
    outcomes: [
      'Produced a working digital tracking workflow for Brownian motion experiments.',
      'Generated analysis-ready plots and sample output files from the measurement pipeline.',
      'Kept the implementation compact with a Python plus C++ codebase.',
    ],
    stack: [
      { group: 'Hardware', items: ['ESP32-CAM', '60x converging lens', 'Camera module'] },
      { group: 'Vision', items: ['OpenCV', 'Python 3.8.10', 'Frame tracking'] },
      { group: 'Data', items: ['Plotting assets', 'Excel', 'Experimental logging'] },
    ],
  },

  {
  slug: 'sibi-hand-gesture-recognition-led-control',
  index: 'P-03',
  title: 'SIBI Hand Gesture Recognition and LED System Control Using Deep Neural Network',
  category: 'AI & Embedded Systems',
  year: '2025',
  status: 'prototype',
  thumbnail: '/images/projects/P-03_thumbnail_nyala_detect.jfif',
  gallery: [
    '/images/projects/P-03_thumbnail_nyala_detect.jfif',
    '/images/projects/P-03_SIBI_train_acc_loss.jfif',
    '/images/projects/P-03_confusion_matrix.jfif',
    '/images/projects/P-03_statistical_report.jfif',
    '/images/projects/P-03_nyala_output.jfif',
  ],
  summary:
    'A real-time SIBI hand-gesture recognition system built with MediaPipe and a deep neural network, integrated with Arduino for LED and display control.',
  tags: ['MediaPipe', 'DNN', 'Arduino Uno', 'OpenCV'],
  metrics: [
    { label: 'Accuracy', value: '>90%' },
    { label: 'Input', value: '3D Hand Landmarks' },
    { label: 'Interface', value: 'Tkinter + Serial' },
  ],
  role: 'Developer · ML, Vision & Hardware Integration',
  timeframe: 'Jun 2025 — Jun 2025',
  overview: [
    'This project bridges accessibility and embedded intelligence by recognizing Bahasa Isyarat Indonesia (SIBI) gestures in real time using MediaPipe and a deep neural network.',
    'The pipeline covers dataset collection, model training, live prediction, and hardware feedback through an Arduino Uno connected over serial.',
  ],
  challenge:
    'The main challenge was turning noisy real-time hand landmarks into stable gesture predictions while keeping the system responsive enough for live use and hardware control.',
  approach: [
    'Built a custom dataset collector using OpenCV and MediaPipe to record structured landmark samples.',
    'Trained a multi-layer DNN classifier on 3D hand landmark data for gesture prediction.',
    'Created a Tkinter dashboard for live visualization, confidence feedback, and word-buffer management.',
    'Linked predictions to Arduino-based outputs so gestures can trigger LED or OLED responses.',
  ],
  outcomes: [
    'Delivered a real-time gesture recognition pipeline with live confidence feedback.',
    'Reached over 90% model accuracy on the trained landmark dataset.',
    'Enabled practical hardware control from recognized SIBI gestures.',
  ],
  stack: [
    { group: 'Vision', items: ['OpenCV', 'MediaPipe', 'Hand Landmark Tracking'] },
    { group: 'ML', items: ['Python', 'Deep Neural Network', 'NumPy'] },
    { group: 'Hardware', items: ['Arduino Uno', 'Serial Communication', 'LED / OLED Output'] },
  ],
},

 {
  slug: 'staysafex2-solo-gamma-radiation-detector',
  index: 'P-04',
  title: 'StaySafeX2 Solo — Gamma Radiation Detector Replica',
  category: 'Instrumentation',
  year: '2025',
  status: 'archived',
  thumbnail: '/images/projects/P-04_thumbnail_StaySafe_setup.jfif',
  gallery: [
    '/images/projects/P-04_thumbnail_StaySafe_setup.jfif',
    '/images/projects/P-04_StaySafe_plot_data.png',
    '/images/projects/P-04_StaySafe_schematic.png',
    '/images/projects/P-04_StaySafe_output_LCD.jfif',
  ],
  summary:
    'A cost-effective gamma radiation detector replica built with a BPW34 photodiode, ADS1115, and Wemos D1 Mini, combining pulse detection, dose accumulation, and live Python-based visualization.',
  tags: ['BPW34', 'ADS1115', 'Wemos D1 Mini', 'Python'],
  metrics: [
    { label: 'Analog Output', value: '2.57–2.68 V' },
    { label: 'Dose Step', value: '0.001 µSv/pulse' },
    { label: 'Count Rate', value: '15–19 CPM' },
  ],
  role: 'Developer · Sensor Electronics & IoT Visualization',
  timeframe: 'Jun 2025',
  overview: [
    'This project replicates a gamma radiation detector using a BPW34 photodiode, transimpedance amplification, and ADS1115 digitization, with Wemos D1 Mini handling the embedded workflow.',
    'The system streams measurement data into a Python dashboard for live plotting and dose-rate monitoring, turning the detector into a practical low-cost radiation sensing platform.',
  ],
  challenge:
    'Low-level radiation detection is noisy and unstable, so the core problem was keeping the pulse threshold and baseline calibration stable enough to avoid false counts while still capturing real events.',
  approach: [
    'Used a BPW34 photodiode with a TLC272-based transimpedance amplifier to convert radiation-induced signals into measurable voltage output.',
    'Added ADS1115 16-bit ADC acquisition for finer analog resolution.',
    'Implemented pulse detection and adaptive baseline calibration in the Arduino-side logic.',
    'Built a Python GUI with Tkinter and Matplotlib to visualize spikes, count rate, and dose accumulation in real time.',
  ],
  outcomes: [
    'Delivered a working low-cost detector replica for radiation monitoring experiments.',
    'Supported live plotting and dose accumulation through a serial-linked software pipeline.',
    'Created a compact embedded-plus-GUI workflow suitable for lab demonstrations and educational use.',
  ],
  stack: [
    { group: 'Hardware', items: ['BPW34 photodiode', 'TLC272 op-amp', 'ADS1115', 'Wemos D1 Mini'] },
    { group: 'Firmware', items: ['Arduino C++', 'Pulse detection', 'Baseline calibration'] },
    { group: 'Software', items: ['Python', 'Tkinter', 'Matplotlib', 'Pandas'] },
  ],
},

{
  slug: 'iot-smarthome-control-monitoring-esp32-ngrok',
  index: 'P-05',
  title: 'IoT Smarthome Control and Monitoring System Using ESP32 and Ngrok',
  category: 'IoT & Automation',
  year: '2025',
  status: 'archived',
  thumbnail: '/images/projects/P-05_thumbnail_ngrok_output_gui.jfif',
  gallery: [
    '/images/projects/P-05_thumbnail_ngrok_output_gui.jfif',
    '/images/projects/P-05_ngrok_gui.jfif',
    '/images/projects/P-05_ngrok_terminal.jfif',
  ],
  summary:
    'A prototype smart home system built with ESP32, asynchronous web serving, SPIFFS-based web assets, and ngrok-backed remote access for controlling a servo, two LEDs, and monitoring DHT11 temperature-humidity data.',
  tags: ['ESP32', 'Ngrok', 'DHT11', 'Web Server'],
  metrics: [
    { label: 'Actuators', value: '1 Servo + 2 LEDs' },
    { label: 'Sensors', value: 'DHT11' },
    { label: 'Connectivity', value: 'Local WiFi + Ngrok' },
  ],
  role: 'Developer · Web IoT Integration & Embedded Control',
  timeframe: 'Feb 2025',
  overview: [
    'This project is a smart home prototype that combines ESP32-based device control with live temperature-humidity monitoring through a browser interface.',
    'The system is designed around local WiFi access first, then extended for remote accessibility using ngrok so the same interface can be reached outside the local network.',
  ],
  challenge:
    'The hard part was not toggling a servo or blinking LEDs. It was building a control layer that stays stable on local WiFi, serves assets cleanly from SPIFFS, and remains reachable remotely without turning the whole setup into a brittle demo.',
  approach: [
    'Implemented an ESP32 asynchronous web server for responsive browser-based control.',
    'Stored and delivered web assets through SPIFFS for lightweight on-device hosting.',
    'Connected a DHT11 sensor for live temperature and humidity monitoring.',
    'Integrated ngrok to expose the local interface through a public tunnel for remote access.',
  ],
  outcomes: [
    'Delivered a working browser-controlled smart home prototype.',
    'Enabled live environmental monitoring alongside actuator control.',
    'Established a scalable path from local WiFi demo to remote-access deployment.',
  ],
  stack: [
    { group: 'Hardware', items: ['ESP32', 'Servo Motor', 'LEDs', 'DHT11'] },
    { group: 'Firmware', items: ['Arduino C++', 'Async Web Server', 'SPIFFS'] },
    { group: 'Access', items: ['WiFi', 'Ngrok', 'Web Interface'] },
  ],
},

{
  slug: 'lumina-gan-image-reconstruction-refinement',
  index: 'P-06',
  title: 'LUMINA-GAN — Image Reconstruction and Refinement',
  category: 'AI & Medical Imaging',
  year: '2025',
  status: 'archived',
  thumbnail: '/images/projects/P-06_thumbnail_lumina_gui.jfif',
  gallery: [
    '/images/projects/P-06_thumbnail_lumina_gui.jfif',
    '/images/projects/P-06_lumina_reconstructed.jfif',
  ],
  summary:
    'A lightweight GAN framework for reconstructing and refining grayscale medical images, especially CT brain slices, using a U-Net-based generator, PatchGAN discriminator, and hybrid reconstruction-adversarial losses.',
  tags: ['GAN', 'U-Net', 'PatchGAN', 'Python'],
  metrics: [
    { label: 'Input', value: 'Grayscale CT' },
    { label: 'Quality', value: 'PSNR / SSIM' },
    { label: 'Deployment', value: 'CPU Inference' },
  ],
  role: 'Developer · Model Design & Deployment',
  timeframe: 'Nov 2025',
  overview: [
    'LUMINA-GAN is a compact generative adversarial framework built to reconstruct and refine degraded grayscale medical images, with a focus on CT brain slices.',
    'The pipeline combines a streamlined U-Net-style generator with a PatchGAN discriminator and a hybrid loss design to preserve structure while improving perceptual quality.',
  ],
  challenge:
    'Medical image restoration has to balance structural fidelity, training stability, and low compute cost. The main problem was keeping the model lightweight without wrecking anatomical detail or making inference impractical on modest hardware.',
  approach: [
    'Built a lightweight encoder-decoder generator with skip connections for spatial detail recovery.',
    'Used a compact PatchGAN discriminator to enforce local realism at patch level.',
    'Trained on synthetically degraded CT data with blur, compression, and intensity distortions.',
    'Added stable training controls such as fixed seeds, checkpointing, and evaluation with PSNR and SSIM.',
    'Wrapped inference in a Tkinter GUI for practical drag-and-drop use.',
  ],
  outcomes: [
    'Produced structurally coherent reconstructions from degraded CT inputs.',
    'Kept inference efficient enough for low-resource CPU environments.',
    'Delivered a usable GUI workflow for research or clinical-style review.',
  ],
  stack: [
    { group: 'Model', items: ['U-Net generator', 'PatchGAN discriminator', 'Adversarial learning'] },
    { group: 'Training', items: ['L1 loss', 'Feature matching', 'PSNR', 'SSIM'] },
    { group: 'Deployment', items: ['Python', 'Tkinter', 'CPU inference'] },
  ],
},

{
  slug: 'bekkusu-cam',
  index: 'P-07',
  title: 'Bekkusu-CAM — Retro ESP32-CAM Web Camera',
  category: 'Embedded Vision',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-07_thumbnail_bekkusu-cam_red-gui.png',
  gallery: [
    '/images/projects/P-07_thumbnail_bekkusu-cam_red-gui.png',
    '/images/projects/P-07_bekkusu-cam_vtg-gui.png',
    '/images/projects/P-07_bekkusu_vtg-img.jpeg',
    '/images/projects/P-07_bekkusu_jpn_img.jpg',
    '/images/projects/P-07_bekkusu-cam_case.png',
  ],
  summary:
    'A standalone ESP32-CAM digital camera with a retro local web UI, client-side image processing, hardware shutter input, and dual stylized output modes.',
  tags: ['ESP32-CAM', 'OV2640', 'Web UI', 'C++'],
  metrics: [
    { label: 'Board', value: 'AI Thinker ESP32-CAM' },
    { label: 'Sensor', value: 'OV2640' },
    { label: 'Modes', value: 'JPN / VTG' },
  ],
  role: 'Developer · Embedded Vision & Web Interface',
  timeframe: 'Mar 2026',
  overview: [
    'Bekkusu-CAM turns an AI-Thinker ESP32-CAM module into a compact standalone camera with its own WiFi hotspot and a browser-based control panel.',
    'The system serves its UI directly from the microcontroller and applies retro image processing in the browser for a low-latency, self-hosted capture workflow.',
  ],
  challenge:
    'The main challenge was making a tiny camera feel complete: stable capture, responsive UI, fresh frames, and a usable photo workflow without relying on cloud services or external apps.',
  approach: [
    'Built the camera as a self-hosted access point using ESP32-CAM AP mode.',
    'Served the UI locally and handled processing through client-side JavaScript canvas filters.',
    'Added physical shutter support through GPIO 13 with status polling for UI sync.',
    'Implemented dual aesthetic modes, JPN duotone and VTG vintage film, with timestamped downloads.',
  ],
  outcomes: [
    'Delivered a fully standalone camera experience with local-only operation.',
    'Enabled both browser control and hardware shutter capture.',
    'Created a distinctive retro-style output pipeline with two visual modes.',
  ],
  stack: [
    { group: 'Hardware', items: ['AI Thinker ESP32-CAM', 'OV2640', 'GPIO 4 Flash LED', 'GPIO 13 Button'] },
    { group: 'Firmware', items: ['C++', 'Arduino IDE / PlatformIO', 'SPIFFS'] },
    { group: 'Interface', items: ['WiFi AP Mode', 'HTML/CSS/JS', 'Canvas Processing'] },
  ],
},

{
  slug: 'robot-matcha-v2-clw',
  index: 'P-08',
  title: 'Robot Matcha V2 [CLW] — 4-DOF SCARA Matcha Robot',
  category: 'Robotics & Automation',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-08_thumbnail_robot-matcha-ros_gui-rviz.png',
  gallery: [
    '/images/projects/P-08_thumbnail_robot-matcha-ros_gui-rviz.png',
  ],
  summary:
    'A ROS 2 Humble SCARA robot workspace using MoveIt 2 and ros2_control mock hardware, featuring homing, whisk, clean, Abort → Home safety, Pick a Bowl placement, and an RViz-native control panel.',
  tags: ['ROS 2', 'MoveIt 2', 'ros2_control', 'C++'],
  metrics: [
    { label: 'DOF', value: '4' },
    { label: 'Middleware', value: 'ROS 2 Humble' },
    { label: 'GUI', value: 'RViz Qt Panel' },
  ],
  role: 'Developer · Motion Planning & Control Stack',
  timeframe: ' Apr 2026',
  overview: [
    'Robot Matcha V2 is a ROS 2 Humble workspace that brings a 4-DOF SCARA arm to life in simulation with MoveIt 2 motion planning and ros2_control mock hardware.',
    'The system centers on an RViz-first control workflow with preset motions, bowl placement tools, workspace safety zones, and a checkpoint-based replay pipeline.',
  ],
  challenge:
    'The hard part was not making the arm move. It was making motion planning, safety logic, bowl placement, and execution control behave like a coherent system instead of a pile of disconnected ROS nodes.',
  approach: [
    'Built the robot model and simulation stack in `scara_description` with URDF/Xacro, controllers, and local visual meshes.',
    'Configured MoveIt 2 planning and joint limits in `scara_moveit_config` for the `scara_arm` group.',
    'Implemented service-driven motion macros in `scara_waypoint_controller` for Homing, Whisk 1/2, Clean 1/2, and Abort → Home.',
    'Added Pick a Bowl placement, safe/unsafe workspace quads, optional interactive markers, and checkpoint planning/execution in RViz.',
  ],
  outcomes: [
    'Delivered a complete SCARA simulation stack with preset motions and safety-aware execution.',
    'Enabled RViz-native operation without needing a separate control application.',
    'Documented a workspace layout that can be extended with local mesh assets and new motion presets.',
  ],
  stack: [
    { group: 'Platform', items: ['Ubuntu 22.04', 'ROS 2 Humble', 'colcon / ament_cmake'] },
    { group: 'Motion', items: ['MoveIt 2', 'OMPL', 'KDL kinematics'] },
    { group: 'Control', items: ['ros2_control', 'mock_components/GenericSystem', 'C++17'] },
  ],
},

{
  slug: 'clw-birthday-tunnel-mr-surya',
  index: 'P-09',
  title: 'Coune Labworks Birthday Interactive TouchDesigner Installation',
  category: 'Interactive Installation',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-09_thumbnail_hbd_output_panel.png',
  gallery: [
    '/images/projects/P-09_thumbnail_hbd_output_panel.png',
    '/images/projects/P-09_hbd_form.png',
  ],
  summary:
    'A local-first birthday greeting installation that lets visitors scan a QR code, submit a message and photo from mobile, and pushes composed cards into a TouchDesigner visual pool via OSC with HTTP polling fallback.',
  tags: ['Flask', 'TouchDesigner', 'OSC', 'Python'],
  metrics: [
    { label: 'Display Pool', value: '20 slots' },
    { label: 'Canvas', value: '1920×1080' },
    { label: 'Transport', value: 'OSC + HTTP' },
  ],
  role: 'Developer · Web Backend & TouchDesigner Integration',
  timeframe: 'Jun 2026',
  overview: [
    'This installation is a local-first birthday greeting system built for an event environment, where visitors submit names, messages, and photos from their phones through a QR-linked web form.',
    'The backend stores submissions locally, composes 16:9 display cards, and streams them into TouchDesigner, which renders the event canvas and maintains a fixed visual pool.',
  ],
  challenge:
    'The core problem was coordinating browser submissions, image storage, card composition, and real-time visual output without making the event stack fragile or dependent on a cloud backend.',
  approach: [
    'Built the backend as a Flask application served with Waitress for long-running event deployment.',
    'Validated submissions, stored raw photos and composed cards atomically, and persisted metadata in a local JSON database.',
    'Integrated OSC delivery to TouchDesigner with HTTP polling as a fallback path.',
    'Designed the TouchDesigner side around a fixed 20-slot spawner framework, preview canvas, and operator controls.',
  ],
  outcomes: [
    'Delivered a fully local event submission flow from QR scan to visual display.',
    'Supported stable photo-plus-message rendering on a controlled 1920×1080 canvas.',
    'Kept the system operational even if OSC delivery fails, thanks to polling fallback.',
  ],
  stack: [
    { group: 'Backend', items: ['Python', 'Flask', 'Waitress', 'JSON persistence'] },
    { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'Mobile form'] },
    { group: 'Visuals', items: ['TouchDesigner', 'OSC', 'Spawner framework'] },
  ],
},

{
  slug: 'bex-7386-smart-corner',
  index: 'P-10',
  title: 'Bex 7386 Mini-Techlab — Smart Corner',
  category: 'IoT & Automation',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-10_thumbnail_bexroom.jpg',
  gallery: [
    '/images/projects/P-10_thumbnail_bexroom.jpg',
    '/images/projects/P-10_bexroom_schematic.png',
  ],
  summary:
    'An AP-mode Wemos D1 Mini smart home dashboard with DHT11 sensing, DS3231 time sync, SSD1306 OLED feedback, multi-effect LED control, and dynamic OLED text scrolling.',
  tags: ['Wemos D1 Mini', 'DHT11', 'DS3231', 'SSD1306'],
  metrics: [
    { label: 'Microcontroller', value: 'ESP8266' },
    { label: 'Display', value: '128×32 OLED' },
    { label: 'Web Mode', value: 'Access Point' },
  ],
  role: 'Developer · Embedded UI & Home Automation',
  timeframe: 'Mar 2026 - Present',
  overview: [
    'Smart Corner is a single-file firmware project for the Wemos D1 Mini that turns the board into an access-point web dashboard for smart-home style monitoring and control.',
    'The system combines environmental sensing, RTC time synchronization, OLED feedback, and LED automation into one compact local-first interface.',
  ],
  challenge:
    'The main challenge was keeping the interface responsive and visually polished while running everything on a small ESP8266-class board with limited resources and no cloud dependency.',
  approach: [
    'Built an AP-only dashboard served directly from the Wemos D1 Mini.',
    'Integrated DHT11 sensing for temperature and humidity monitoring.',
    'Added DS3231 RTC support with browser-triggered time sync.',
    'Implemented SSD1306 OLED page cycling plus custom scrolling text effects for long messages.',
    'Created multiple LED modes, including breathing and fireplace-style flicker, alongside a scheduled ward light.',
  ],
  outcomes: [
    'Delivered a compact smart-home control panel that runs fully local.',
    'Enabled browser control for LED modes, brightness, scheduling, and RTC updates.',
    'Packed telemetry and status feedback into both web UI and OLED output.',
  ],
  stack: [
    { group: 'Hardware', items: ['Wemos D1 Mini', 'DHT11', 'DS3231', 'SSD1306', 'LEDs'] },
    { group: 'Firmware', items: ['C++', 'ESP8266WiFi', 'ESP8266WebServer'] },
    { group: 'Interface', items: ['AP mode', 'Web dashboard', 'OLED scrolling'] },
  ],
},

{
  slug: 'neisedump-photobooth',
  index: 'P-11',
  title: 'NeiseDump! — Local Web Photobooth',
  category: 'Interactive Installation',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-11_thumbnail_neisedump_blk.png',
  gallery: [
    '/images/projects/P-11_thumbnail_neisedump_blk.png',
    '/images/projects/P-11_neisedump_blkout.png',
    '/images/projects/P-11_neisedump_wht.png',
    '/images/projects/P-11_neisedump_whtout.png',
  ],
  summary:
    'A local web photobooth with stylized live capture, OpenCV-based face labeling, and a fixed 9:16 collage output pipeline for event-ready image composition.',
  tags: ['OpenCV', 'Python', 'JavaScript', 'Photobooth'],
  metrics: [
    { label: 'Layout', value: '9:16 Collage' },
    { label: 'Preview', value: '4:3 Camera Feed' },
    { label: 'Backend', value: 'Local OpenCV' },
  ],
  role: 'Developer · Web Capture & Visual Pipeline',
  timeframe: 'Mar 2026 - Present',
  overview: [
    'NeiseDump! is a local-first photobooth app that serves a stylized camera interface through a web frontend and sends face detection to a local backend.',
    'The final output is a vertical collage sheet with a fixed layout, designed for clean event-style visual exports rather than generic webcam dumping.',
  ],
  challenge:
    'The main job was to keep capture, face labeling, theme switching, and collage generation consistent across the browser and the local backend without making the system fragile.',
  approach: [
    'Served the frontend as a local web app with a lightweight static-server workflow.',
    'Used a local OpenCV backend for face detection and label overlay.',
    'Applied a hard two-color duotone style to the live feed and output result.',
    'Built a fixed 9:16 composition with header, four photo slots, and footer branding.',
  ],
  outcomes: [
    'Delivered a stylized photobooth with a clear local-only capture pipeline.',
    'Produced a consistent collage output suitable for event display or sharing.',
    'Kept the implementation simple enough to run from a local development workflow.',
  ],
  stack: [
    { group: 'Frontend', items: ['JavaScript', 'HTML', 'CSS'] },
    { group: 'Backend', items: ['Python', 'OpenCV', 'Local detection server'] },
    { group: 'Output', items: ['9:16 collage', 'Duotone processing', 'Static asset pipeline'] },
  ],
},

{
  slug: 'streamlab-sxa',
  index: 'P-12',
  title: 'StreamLab SXA — Low-Latency Secured Video Streaming',
  category: 'Streaming Systems',
  year: '2026',
  status: 'active',
  thumbnail: '/images/projects/P-12_thumbnail_streamlab.png',
  gallery: [
    '/images/projects/P-12_thumbnail_streamlab.png',
    '/images/projects/P-12_streamlab_best.png',
    '/images/projects/P-12_streamlab_preview.png',
  ],
  summary:
    'A low-latency, Tailscale-bound video streaming stack built around MJPEG capture, WebSocket metrics, adaptive buffering, and a browser dashboard for live telemetry.',
  tags: ['OpenCV', 'Aiohttp', 'WebSocket', 'Tailscale'],
  metrics: [
  { label: 'Peak FPS', value: '25 FPS' },
  { label: 'Lowest Latency', value: '3.15 ms' },
  { label: 'Peak Bitrate', value: '11.27 Mbps' },
],
  role: 'Developer · Streaming Stack & Telemetry UI',
  timeframe: 'May 2026',
  overview: [
    'StreamLab SXA is a camera streaming system that separates capture, transport, client adaptation, and dashboard telemetry into a compact local network workflow.',
    'The stack is designed so the server emits MJPEG frames, the client measures stream health in real time, and the browser dashboard exposes the operational state without needing a heavyweight backend.',
  ],
  challenge:
    'The real problem was not sending video. It was keeping latency visible, frame loss bounded, and the whole pipeline reachable only through a controlled network path instead of exposing it like a fragile public toy.',
  approach: [
    'Implemented server-side capture and MJPEG delivery through `server.py`.',
    'Pushed live operational metrics over WebSocket so the dashboard could reflect stream health in real time.',
    'Built the client around adaptive buffering, frame-gap detection, and loss estimation.',
    'Kept the services bound to Tailscale-only access to avoid broad network exposure.',
  ],
  outcomes: [
    'Delivered a measurable low-latency streaming pipeline with client and server telemetry.',
    'Added practical loss visibility through FEC markers, buffer tuning, and logging.',
    'Provided a browser dashboard for live monitoring and remote operational control.',
  ],
  stack: [
    { group: 'Backend', items: ['Python', 'aiohttp', 'websockets', 'OpenCV'] },
    { group: 'Client', items: ['Python', 'requests', 'NumPy', 'Adaptive buffer'] },
    { group: 'Interface', items: ['HTML', 'CSS', 'JavaScript', 'Browser dashboard'] },
  ],
}, 


]


// ─── Helper functions ─────────────────────────────────────────────────────────

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}

// ─── Publications ─────────────────────────────────────────────────────────────

export type Publication = {
  slug: string
  index: string
  title: string
  authors: string
  venue: string
  year: string
  type: 'Journal' | 'Conference' | 'Other' | 'Book' | 'Patent' | 'Thesis'
  serial: string
  link: string
  abstract: string
  tags: string[]
  thumbnail?: string
}

export const publications: Publication[] = [
{
  slug: 'basic-mobile-robot-arduino-berbasis-pemrograman-ide-arduino-interface-python',
  index: 'PUB-01',
  title: 'Basic Mobile Robot Arduino Berbasis Pemrograman IDE Arduino + Interface Python',
  authors: 'Mada Sanjaya W. S. dan Gilang Pratama P. S.',
  venue: 'BOLABOT',
  year: '2025',
  type: 'Book',
  serial: 'ISBN: 978-623-6452-72-1',
  link: 'https://www.bolabot.com/blog/buku-4/basic-mobile-robot-arduino-berbasis-pemrograman-ide-arduino-interface-python-64',
  thumbnail: '/images/publications/PUB-01_arduinopython.png',
  abstract:
    'Buku ini merupakan panduan robotika berbasis Arduino dan Python yang disusun dari konsep dasar hingga penerapan proyek. Isinya mencakup pengenalan robotika, sistem elektronika dan mekanika robot, pemrograman, serta implementasi proyek berbasis Arduino dan Python, termasuk sensor, aktuator, speech recognition, computer vision, kontrol GUI, integrasi smartphone, dan IoT.',
  tags: ['Arduino', 'Python', 'Robotika', 'Mobile Robot', 'IoT'],
},

{
  slug: 'membuat-robot-itu-asyik-berbasis-pemrograman-arduino-mblock-5',
  index: 'PUB-02',
  title: 'Membuat Robot Itu Asyik! Berbasis Pemrograman Arduino + mBlock 5',
  authors: 'Mada Sanjaya W. S., Gilang Pratama P. S., & Dyah Anggraeni',
  venue: 'BOLABOT',
  year: '2025',
  type: 'Book',
  serial: 'ISBN: 978-623-6452-74-5',
  link: 'https://www.bolabot.com/blog/buku-4/membuat-robot-itu-asyik-berbasis-pemrograman-arduino-mblock-5-62',
  thumbnail: '/images/publications/PUB-02_arduinomblock.png',
  abstract:
    'Buku ini disusun dalam tiga bagian utama: pengenalan robotika, sistem elektronika dan mekanika robot, serta pengenalan Arduino dan mBlock 5; proyek-proyek robot virtual interaktif seperti robot bergerak, robot dengan kontrol keyboard, anti-penghalang, robot menggambar, dan robot bermain sepak bola; serta integrasi robot virtual dan aktual melalui LED blinking, sensor ultrasonik, kontrol keyboard, joystick, IR remote, Bluetooth Android, dan palang pintu otomatis dengan motor servo.',
  tags: ['Arduino', 'mBlock 5', 'Robotika', 'Robot Virtual', 'Bluetooth'],
},

{
  slug: 'membuat-robot-berbasis-raspberry-pi-pico-w-pemrograman-python',
  index: 'PUB-03',
  title: 'Membuat Robot Berbasis Raspberry Pi Pico W + Pemrograman Python',
  authors: 'Mada Sanjaya W. S., Gilang Pratama P. S., dan Dyah Anggraeni',
  venue: 'BOLABOT',
  year: '2025',
  type: 'Book',
  serial: 'ISBN: 978-623-6452-82-0',
  link: 'https://www.bolabot.com/blog/buku-4/membuat-robot-berbasis-raspberry-pi-pico-w-pemrograman-python-43',
  thumbnail: '/images/publications/PUB-03_picopython.png',
  abstract:
    'Buku ini hadir sebagai panduan pembelajaran robotika modern berbasis Raspberry Pi Pico W, Python, dan MicroPython. Isinya disusun sistematis dari pengenalan robotika dan sistem elektronika hingga praktik langsung membangun robot line follower, robot obstacle avoider, robot mobil digital dengan GUI Python, robot arm 4 DoF dengan antarmuka wireless, sistem robot vision berbasis kamera dan OpenCV, serta aplikasi lanjutan seperti kontrol gerakan tangan dengan MediaPipe dan pengenalan wajah untuk keamanan berbasis AI.',
  tags: ['Raspberry Pi Pico W', 'Python', 'MicroPython', 'Robotika', 'IoT'],
},

{
  slug: 'perangkat-giant-magnetoresistance-gmr-berbasis-mikrokomputer-untuk-deteksi-gelatin-porcine-dan-bovine-dalam-konteks-halal-haram',
  index: 'PUB-04',
  title: 'PERANGKAT GIANT MAGNETORESISTANCE (GMR) BERBASIS MIKROKOMPUTER UNTUK DETEKSI GELATIN PORCINE DAN BOVINE DALAM KONTEKS HALAL/HARAM',
  authors: 'Mada Sanjaya W. S., Hasniah Aliah, Dyah Anggraeni, Gilang Pratama Putra Siswanto, Marissa Alpiani, Edi Suharyadi, Ryan Nur Iman, Julia Angel, Vandri Ahmad Isnaini',
  venue: 'Berita Resmi Paten Sederhana Seri-A No. 923/IX/2025, Direktorat Jenderal Kekayaan Intelektual',
  year: '2025',
  type: 'Patent',
  serial: 'Nomor Permohonan: S00202508915',
  link: 'https://dgip.go.id/uploads/berita_resmi/file/8191dc498b19a630119430b2a771e2df.pdf',
  thumbnail: '/images/publications/PUB-04_thumbnail.png',
  abstract:
    'Invensi ini berupa perangkat Giant Magnetoresistance (GMR) berbasis mikrokomputer untuk deteksi gelatin porcine dan bovine dalam konteks halal/haram. Sistem menggunakan kumparan Helmholtz untuk menghasilkan medan magnet bias konstan, sensor GMR yang responsnya diperkuat melalui op-amp subtractor dan low-pass filter, lalu dikonversi oleh ADC 18-bit. Data dikirim ke mikrokomputer melalui I2C, diproses dengan model pembelajaran mesin untuk mengenali pola gelatin porcine dan bovine, ditampilkan pada LCD sebagai grafik sinyal terhadap waktu, serta didukung IoT dan penyimpanan CSV untuk analisis.',
  tags: ['GMR', 'Microcomputer', 'Halal Detection', 'IoT', 'Machine Learning'],
},

{
  slug: 'design-and-implementation-of-a-portable-gmr-sensor-system-based-on-raspberry-pi-and-mqtt-for-real-time-magnetic-biosensing',
  index: 'PUB-05',
  title: 'Design and Implementation of a Portable GMR Sensor System Based on Raspberry Pi and MQTT for Real-Time Magnetic Biosensing',
  authors:
    'W. Mada Sanjaya, Hasniah Aliah, Edi Suharyadi, Julia Angel, Vandri Ahmad Isnaini, Dyah Anggraeni, Gilang Pratama Putra Siswanto, Abimanyu Pratama Al Qautsar Nugraha, Fitria Ayu Sulistiani, Ridho Aprian Roghodan, and Rindra Yusianto',
  venue:
    '2026 13th International Conference on Electrical Engineering, Computer Science and Informatics (EECSI 2026), Yogyakarta, Indonesia',
  year: '2026',
  type: 'Conference',
  serial: 'EECSI 2026',
  link: '',
  thumbnail: '/images/publications/PUB-05_thumbnail.png',
  abstract:
    'This paper presents a portable GMR sensor system integrated with Raspberry Pi and MQTT-based IoT communication for real-time magnetic biosensing. The system includes a GMR sensor, signal conditioning circuitry, a 16-bit ADC for high-resolution acquisition, and an Arduino-based module for data collection, while a Raspberry Pi acts as the IoT gateway for remote monitoring. The platform is evaluated using Fe3O4 nanoparticles and Fe3O4/PVA nanocomposites under controlled magnetic fields generated by a Helmholtz coil. The results show stable, low-noise, and repeatable measurements, with strong and nearly linear response to Fe3O4 concentration and effective detection of Fe3O4/PVA nanocomposites. Real-time MQTT transmission also enables continuous remote accessibility, making the system suitable for compact IoT-enabled magnetic nanoparticle sensing applications.',
  tags: ['GMR', 'Raspberry Pi', 'MQTT', 'IoT', 'Magnetic Biosensing'],
},

{
  slug: 'machine-learning-based-analysis-and-prediction-of-gmr-sensor-signals-for-fe3o4-nanoparticle-detection',
  index: 'PUB-06',
  title: 'Machine Learning-Based Analysis and Prediction of GMR Sensor Signals for Fe₃O₄ Nanoparticle Detection',
  authors:
    'W. Mada Sanjaya, Hasniah Aliah, Edi Suharyadi, Julia Angel, Vandri Ahmad Isnaini, Dyah Anggraeni, Gilang Pratama Putra Siswanto, Tsamrotus Saadah, Rangga Pramudya, and Rindra Yusianto',
  venue:
    '2026 13th International Conference on Electrical Engineering, Computer Science and Informatics (EECSI 2026), Yogyakarta, Indonesia',
  year: '2026',
  type: 'Conference',
  serial: 'EECSI 2026',
  link: '',
  thumbnail: '/images/publications/PUB-06_thumbnail.png',
  abstract:
    'This paper presents a machine learning-based framework for analyzing and predicting Giant Magnetoresistance (GMR) sensor signals for Fe₃O₄ nanoparticle detection. Time-series voltage signals acquired from a GMR sensing system were transformed into statistical features, including mean, standard deviation, minimum, maximum, range, median, and slope. These features were used as inputs to lightweight machine learning classifiers such as KNN, SVM, and Random Forest to identify and classify Fe₃O₄ concentration levels between 5 and 50 mg/mL. Regression models were also implemented to estimate continuous nanoparticle concentrations from the same feature set. The results showed that SVM and KNN achieved 99.67% classification accuracy, while Random Forest achieved 99.83% accuracy on the test dataset. For regression, KNN performed best, with an MAE of 0.0167 mg/mL, RMSE of 0.2887 mg/mL, and R² of 0.9997. Real-time GUI validation further confirmed the stability of the proposed approach across the tested concentration range.',
  tags: ['GMR', 'Machine Learning', 'Fe₃O₄', 'Classification', 'Regression'],
},

]
