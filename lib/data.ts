export interface Product {
  id: string;
  title: string;
  tag: string;
  iconName: 'DoorClosed' | 'Box' | 'Wind' | 'Cpu' | 'Gauge' | 'Thermometer' | 'Activity' | 'Clock' | 'Settings';
  shortDescription: string;
  longOverview: string;
  applications: string[];
  features: string[];
  workingPrinciple: { step: string; title: string; description: string }[];
  specs: { category: string; items: { label: string; value: string }[] }[];
  downloads: { type: 'Datasheet' | 'Manual' | 'Drawing' | 'Certificate'; name: string; size: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export interface Industry {
  id: string;
  title: string;
  tagline: string;
  description: string;
  challenges: string[];
  solutions: string[];
  stats: { value: string; label: string };
  iconName: 'ShieldAlert' | 'Dna' | 'Utensils' | 'Building2' | 'Microchip' | 'Tv' | 'FlaskConical' | 'Binary';
}

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  workflow: { step: number; title: string; desc: string; icon: string }[];
  technicalHighlights: string[];
}

export interface TechTopic {
  id: string;
  title: string;
  description: string;
  details: string[];
  diagramTitle: string;
  nodes: { label: string; x: number; y: number; type: 'input' | 'process' | 'output' | 'sensor' }[];
  connections: { from: number; to: number }[];
}

export const products: Product[] = [
  {
    id: 'door-interlocking-system',
    title: 'Door Interlocking System',
    tag: 'Access Control',
    iconName: 'DoorClosed',
    shortDescription: 'Advanced multi-door access control ensuring air hygiene, pressure regulation, and contamination containment.',
    longOverview: 'The Neural Intelligent Door Interlocking System is engineered for high-integrity cleanroom environments, preventing simultaneous door openings to maintain differential pressure cascades. Trusted by over 60+ pharmaceutical leaders, it offers real-time logic control, emergency override triggers, and seamless card reader integration.',
    applications: [
      'Pharmaceutical Formulation Labs',
      'Biosafety Cabinets (BSL-3/BSL-4)',
      'Semiconductor Cleanrooms (Class 10 - 10000)',
      'Hospital Isolation Wards & OT Complex'
    ],
    features: [
      'Programmable interlocking logic for up to 8 doors in a single loop.',
      'Emergency override system (EMG) integrated with fire alarm panels.',
      'Acoustic and visual alarms for door-open-too-long (DOTL) states.',
      'Sub-millisecond relay response preventing overlapping entry requests.',
      'RS485 Modbus connectivity for central building management integration.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Idle State Monitoring', description: 'All doors are closed and electromagnetically locked. Status LEDs show Green (Ready).' },
      { step: '2', title: 'Request & Validation', description: 'User presses a request button or swipes a card. The controller instantly checks the state of all other doors in the interlocking zone.' },
      { step: '3', title: 'Lock Release & Interlock Actuation', description: 'If other doors are closed, the request is approved. The target door locks disengage, while status LEDs on other doors turn Red (Locked).' },
      { step: '4', title: 'Cycle Completion', description: 'Once the user enters and the door closes, sensors confirm the seal, return the loop to idle, and enable the next access request.' }
    ],
    specs: [
      {
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '24V DC ±10%' },
          { label: 'Power Consumption', value: '15 Watts max (without locks)' },
          { label: 'Relay Output Rating', value: '5A @ 30V DC / 250V AC' }
        ]
      },
      {
        category: 'Control Parameters',
        items: [
          { label: 'Supported Doors', value: '2 to 8 Doors per controller cascade' },
          { label: 'Feedback Inputs', value: 'Magnetic Door Status Switches (NC/NO)' },
          { label: 'Emergency Input', value: 'Potential-free Fire Alarm / Manual Override contacts' }
        ]
      },
      {
        category: 'Physical & Compliance',
        items: [
          { label: 'Enclosure', value: 'DIN Rail mountable / ABS Flame Retardant' },
          { label: 'Ingress Protection', value: 'IP65 Rated Front Panel' },
          { label: 'Operating Temperature', value: '0°C to 55°C' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'Door_Interlock_TDS_V3.pdf', size: '1.8 MB' },
      { type: 'Manual', name: 'Door_Interlock_User_Guide_EN.pdf', size: '4.2 MB' },
      { type: 'Drawing', name: 'Interlock_Wiring_Schematic_2D.dwg', size: '3.1 MB' },
      { type: 'Certificate', name: 'CE_Compliance_Certificate.pdf', size: '850 KB' }
    ],
    faqs: [
      { q: 'What happens during a power failure?', a: 'By default, our interlocking system fails-safe. Upon complete loss of power, all door electromagnet locks are immediately de-energized, allowing unrestricted exit. An auxiliary battery backup can be installed to maintain lock state if requested.' },
      { q: 'Can this integrate with third-party biometric access card readers?', a: 'Yes. The controller receives standard dry-contact trigger signals from card readers, biometric scanners, or touch-free sensors, overlaying interlocking logic on top of security access approvals.' }
    ],
    related: ['pass-box-interlocking-system', 'air-shower-controller', 'differential-pressure-indicator']
  },
  {
    id: 'pass-box-interlocking-system',
    title: 'Pass Box Interlocking System',
    tag: 'Access Control',
    iconName: 'Box',
    shortDescription: 'Secures transfer hatches with electronic interlocking to prevent cross-contamination between zones.',
    longOverview: 'Designed for static and dynamic pass boxes, this controller coordinates mechanical or electromagnetic locks across transfer hatches. It ensures that raw materials move between clean and non-clean zones without venting filtered air, maintaining cleanroom integrity.',
    applications: [
      'Sterile Transfer Ports in Pharma',
      'Material Airlocks in Bio-containment Labs',
      'Wafer Transfer Hatches in Semiconductor Fabs'
    ],
    features: [
      'Dual-door sequential locking logic with status screen overlays.',
      'Dynamic pass box UV light and blower fan integration.',
      'Settable UV exposure timers to ensure material sterilization before door release.',
      'Stainless Steel flush-mountable touch panels for seamless cleanroom cleaning.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Material Loading', description: 'Operator opens the non-sterile side door. The sterile side door locks immediately, and UV lights turn off.' },
      { step: '2', title: 'Sanitization Cycle', description: 'Once the material is inside and the door is closed, the UV sterilization timer triggers. Both doors remain locked.' },
      { step: '3', title: 'Unloading Access', description: 'After the UV sterilization cycle finishes, the sterile side door unlocks. Status indicator turns green.' },
      { step: '4', title: 'Reset', description: 'When the sterile door is closed and locked, the system resets to the idle state.' }
    ],
    specs: [
      {
        category: 'Technical Specifications',
        items: [
          { label: 'Operating Voltage', value: '12V / 24V DC compatibility' },
          { label: 'UV Timer Range', value: '0 to 999 Seconds (Configurable)' },
          { label: 'Display Panel', value: '7-Segment LED / TFT Touch options' },
          { label: 'Output Relays', value: 'Door Locks, UV Light, Blower Fan (2A resistive)' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'PassBox_Controller_SpecSheet.pdf', size: '1.2 MB' },
      { type: 'Manual', name: 'PassBox_Wiring_Manual.pdf', size: '2.5 MB' }
    ],
    faqs: [
      { q: 'Can I adjust the UV light cycle duration?', a: 'Yes, the UV exposure cycle is fully programmable from the front display panel, allowing timers between 10 seconds to 15 minutes.' }
    ],
    related: ['door-interlocking-system', 'air-shower-controller']
  },
  {
    id: 'air-shower-controller',
    title: 'Air Shower Controller',
    tag: 'Controller',
    iconName: 'Wind',
    shortDescription: 'Intelligent control units with HEPA filter monitors and programmable cycles for personnel decontamination.',
    longOverview: 'The Neural Air Shower Controller coordinates entry-door locking, high-velocity blower fans, dynamic HEPA filtration monitoring, and customizable cycle timers. It ensures that personnel entering the cleanroom are stripped of surface particulates, with step-by-step audio prompts.',
    applications: [
      'Gown Rooms in Semiconductor Fabs',
      'Biosafety Level 3 (BSL-3) Entry Chambers',
      'Precision Electronics Manufacturing Entryways'
    ],
    features: [
      'Automatic entry interlocking (keeps cleanroom door locked during shower cycle).',
      'High-velocity fan control (20-25 m/s) with soft-start capability.',
      'Filter pressure drop monitoring using integrated differential pressure transducers.',
      'Interactive voice instructions and bright graphic displays.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Entry Trigger', description: 'Personnel enter the air shower. The entry door locks, and the presence sensor activates.' },
      { step: '2', title: 'High-Velocity Cleaning', description: 'HEPA-filtered air jets blow at 22 m/s for a set time (e.g., 12 seconds). Doors remain locked.' },
      { step: '3', title: 'Purge Cycle', description: 'Blower stops, and the exhaust fan draws remaining airborne dust through lower return grids.' },
      { step: '4', title: 'Exit Release', description: 'The inner cleanroom door unlocks, allowing personnel to exit. The entry door remains locked until exit is complete.' }
    ],
    specs: [
      {
        category: 'Control Parameters',
        items: [
          { label: 'Shower Duration', value: '5 to 99 Seconds (Default: 12s)' },
          { label: 'Blower Relay Output', value: 'Solid State Relay / Contact for 3-Phase Motors' },
          { label: 'Audio Prompts', value: 'Multi-lingual Voice synthesizer (1W Speaker output)' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'Air_Shower_Ctrl_TDS.pdf', size: '2.1 MB' },
      { type: 'Manual', name: 'AirShower_Installation_Guide.pdf', size: '5.1 MB' }
    ],
    faqs: [
      { q: 'Is there an emergency exit routine?', a: 'Yes. Pressing the glowing emergency stop button on the internal panel immediately cuts motor power and opens both doors for immediate egress.' }
    ],
    related: ['door-interlocking-system', 'differential-pressure-indicator']
  },
  {
    id: 'laf-buf-controller',
    title: 'LAF / BUF Controller',
    tag: 'Controller',
    iconName: 'Cpu',
    shortDescription: 'Laminar Air Flow and Barrier User Friendly controllers regulating airflow velocities and pressure drop.',
    longOverview: 'This controller is optimized for Laminar Air Flow (LAF) benches, Biosafety Cabinets, and Barrier User Friendly (BUF) systems. It features closed-loop fan speed controls, pressure drop monitoring across filters, UV disinfection timers, and audible alarms.',
    applications: [
      'Sterile Preparation Benches',
      'Biosafety Cabinets Class II & III',
      'Vial Filling and Stoppering Machine Hoods'
    ],
    features: [
      'Closed-loop PWM/0-10V control for EC backward curved fans.',
      'Differential pressure tracking across pre-filters and HEPA filters.',
      'Sash-height sensor integration to adjust fan speeds automatically.',
      'Audible velocity deviation alarms.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Start & Calibrate', description: 'The blower ramps up, adjusting to maintain a laminar flow velocity of 0.45 m/s (90 FPM).' },
      { step: '2', title: 'Continuous Tracking', description: 'Sensors feed back real-time velocities. If filter resistance increases, the controller increases fan voltage.' },
      { step: '3', title: 'Deviation Alert', description: 'If velocity drops below 0.36 m/s, the controller triggers a visual flash and audible beep.' }
    ],
    specs: [
      {
        category: 'Specifications',
        items: [
          { label: 'Speed Output', value: '0-10V DC / PWM / RS485 Modbus fan control' },
          { label: 'Differential Pressure Range', value: '0 to 500 Pascals (HEPA monitoring)' },
          { label: 'Sash Inputs', value: 'Limit switches or Ultrasonic distance sensors' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'LAF_Controller_Data_Sheet.pdf', size: '1.7 MB' },
      { type: 'Manual', name: 'LAF_Controller_Programming_Manual.pdf', size: '3.4 MB' }
    ],
    faqs: [
      { q: 'Can it communicate with a building SCADA?', a: 'Absolutely. It exports all velocity, alarm states, and pressure readings via Modbus RTU (RS485).' }
    ],
    related: ['differential-pressure-indicator', 'temperature-rh-indicator']
  },
  {
    id: 'differential-pressure-indicator',
    title: 'Differential Pressure Indicator',
    tag: 'Sensor',
    iconName: 'Gauge',
    shortDescription: 'High-precision digital indicators measuring pressure differences between critical cleanroom zones.',
    longOverview: 'The Neural Digital Differential Pressure Indicator features ultra-low range piezoresistive sensors, delivering high-accuracy pressure readings. Complete with programmable alarms, analog re-transmission, and digital communication, it acts as the primary monitoring node for pressure cascades.',
    applications: [
      'Cleanroom Parameter Monitoring (ISO 5 to 8)',
      'Hospital Negative Pressure Isolation Wards',
      'HVAC Duct Static Pressure Control'
    ],
    features: [
      'High accuracy (±0.5% or ±0.25% of full scale) with zero-point calibration.',
      'Bright multi-line LED or TFT display showing actual and setpoint pressures.',
      'Built-in audio-visual alarms with mute buttons.',
      'Simultaneous 4-20mA analog and RS485 Modbus digital outputs.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Pressure Sampling', description: 'Dual ports (High & Low pressure) sample cleanroom and corridor air through cleanroom-flush nipples.' },
      { step: '2', title: 'Digital Conversion', description: 'An on-board piezoresistive micro-machined sensor translates physical deflection into a calibrated voltage.' },
      { step: '3', title: 'Display and Alert', description: 'The controller reads the voltage, displays the value in Pascals, mmWg, or InWc, and triggers alarms if thresholds are crossed.' }
    ],
    specs: [
      {
        category: 'Measurement Specs',
        items: [
          { label: 'Standard Range', value: '-100.0 to +100.0 Pascals (Custom ranges available)' },
          { label: 'Resolution', value: '0.1 Pascal' },
          { label: 'Accuracy', value: '±0.25% of Full Scale' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'DPI_Product_Datasheet.pdf', size: '1.4 MB' },
      { type: 'Certificate', name: 'NABL_Calibration_Report_Template.pdf', size: '600 KB' }
    ],
    faqs: [
      { q: 'Does it require recalibration?', a: 'We recommend annual calibration. The front panel features a zero-calibration button that simplifies offset corrections during annual audits.' }
    ],
    related: ['door-interlocking-system', 'temperature-rh-indicator', 'temperature-rh-transmitter']
  },
  {
    id: 'temperature-rh-indicator',
    title: 'Temperature & RH Indicator',
    tag: 'Sensor',
    iconName: 'Thermometer',
    shortDescription: 'Dual-display cleanroom indicators offering real-time visualization of environmental metrics.',
    longOverview: 'This indicator is a premium dual-readout device designed specifically for cleanrooms. It features a flush stainless steel front plate, providing visible, highly accurate readings of temperature and relative humidity directly on cleanroom walls.',
    applications: [
      'Pharmaceutical Formulation Areas',
      'Biotech Hatcheries and Incubator Rooms',
      'Electronic Component Storage Areas'
    ],
    features: [
      'Flush-mount stainless steel bezel (AISI 304) with smooth surface for sanitization.',
      'High-brightness red/green 7-segment LED display visible from up to 15 meters.',
      'Accepts standard RTD (Pt100) and capacitance RH transmitter inputs.',
      'Programmable high/low alarm limits with dry contact outputs.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Input Acquisition', description: 'The indicator receives raw signals (Pt100 resistance, 4-20mA humidity signals) from external or integrated sensors.' },
      { step: '2', title: 'Linearization', description: 'Micro-controller algorithms linearize Pt100 curve and temperature-compensate the humidity curve.' },
      { step: '3', title: 'Display Update', description: 'Updates the visual displays 4 times per second, maintaining stable, lag-free readouts.' }
    ],
    specs: [
      {
        category: 'Range & Accuracy',
        items: [
          { label: 'Temperature Range', value: '-20.0°C to +80.0°C (±0.2°C accuracy)' },
          { label: 'Relative Humidity Range', value: '0.0% to 100.0% RH (±1.5% RH accuracy)' },
          { label: 'Sensors', value: 'Digital CMOS / Pt100 RTD Class A' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'TRH_Indicator_DataSheet.pdf', size: '1.5 MB' },
      { type: 'Drawing', name: 'TRH_Panel_Cutout_Drawing.pdf', size: '920 KB' }
    ],
    faqs: [
      { q: 'Is the front plate chemical resistant?', a: 'Yes. The AISI 304/316 stainless steel front plate and polycarbonate overlay are fully resistant to cleaning agents like Isopropyl Alcohol (IPA) and Hydrogen Peroxide (H2O2).' }
    ],
    related: ['temperature-rh-transmitter', 'differential-pressure-indicator']
  },
  {
    id: 'temperature-rh-transmitter',
    title: 'Temperature & RH Transmitter',
    tag: 'Sensor',
    iconName: 'Activity',
    shortDescription: 'Industrial-grade transmitters converting temperature and humidity into industrial analog/digital telemetry.',
    longOverview: 'Designed for HVAC duct-mounting or cleanroom wall-mounting, this transmitter translates environmental parameters into analog 4-20mA/0-10V signals or Modbus RS485 packages. It features high stability and resistance to condensation.',
    applications: [
      'HVAC Duct Temperature & Humidity Feedback',
      'Stability Testing Chambers',
      'Cold Storage Rooms & Warehouses'
    ],
    features: [
      'High-performance capacitive RH sensor with hydrophobic filter protection.',
      'Duct-mount, wall-mount, and remote-probe models.',
      'IP65 rated robust enclosure with easy-connect terminal blocks.',
      'Field-selectable analog output ranges.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Physical Sensing', description: 'Air diffuses through a sintered stainless steel filter to reach the capacitive humidity sensor and Pt100 RTD.' },
      { step: '2', title: 'Telemetry Conversion', description: 'On-board circuits convert sensor changes into standard 4-20mA current loops or digital Modbus values.' },
      { step: '3', title: 'Transmission', description: 'Transmits values over long distances (up to 1200 meters for Modbus) to PLC/SCADA controllers without signal degradation.' }
    ],
    specs: [
      {
        category: 'Specifications',
        items: [
          { label: 'Analog Outputs', value: 'Dual 4-20 mA (2-wire) or 0-10 V DC' },
          { label: 'Digital Output', value: 'RS485 Modbus RTU protocol' },
          { label: 'Sensor Protection', value: 'Sintered Stainless Steel / Mesh filter options' }
        ]
      }
    ],
    downloads: [
      { type: 'Datasheet', name: 'TRH_Transmitter_Specs.pdf', size: '1.9 MB' },
      { type: 'Manual', name: 'TRH_Transmitter_User_Manual.pdf', size: '2.8 MB' }
    ],
    faqs: [
      { q: 'Does it work in high condensation environments?', a: 'Yes, our probes can be equipped with sintered metal mesh filters which prevent water droplets from damaging the sensing grid while maintaining gas permeability.' }
    ],
    related: ['temperature-rh-indicator', 'differential-pressure-indicator']
  },
  {
    id: 'swing-door-automation',
    title: 'Swing Door Automation',
    tag: 'Entrance Automation',
    iconName: 'DoorClosed',
    shortDescription: 'Contactless automated opening systems for heavy cleanroom doors with BLDC motor logic.',
    longOverview: 'Automated swing door openers designed to facilitate hands-free entry and pressure cascade seals in critical gown rooms and airlocks. Supports opening forces between 100-200 kg.',
    applications: ['Pharmaceutical Entry Corridors', 'OT Suites', 'Airlocks'],
    features: [
      'Contactless biometric or card access triggers.',
      'Adjustable opening and closing speed parameters.',
      'Obstacle detection safety sensors with automatic reverse.',
      'Emergency manual override release loop.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Activation', description: 'Contactless trigger signals the microprocessor.' },
      { step: '2', title: 'Controlled Opening', description: '24V BLDC motor drives the door open smoothly.' },
      { step: '3', title: 'Safe Auto-Close', description: 'Timer coordinates closing once the path is clear.' }
    ],
    specs: [
      {
        category: 'Motor & Drive',
        items: [
          { label: 'Motor Type', value: '24V BLDC' },
          { label: 'Weight Capacity', value: '100 to 200 kg' }
        ]
      }
    ],
    downloads: [],
    faqs: [],
    related: ['door-interlocking-system']
  },
  {
    id: 'smart-locker',
    title: 'Smart Locker',
    tag: 'Changeroom Automation',
    iconName: 'Settings',
    shortDescription: 'Cleanroom locker cabinet assignment dynamically controlled via biometric authorization.',
    longOverview: 'Maximizes changeroom cabinet utilization during shift changes. Assigns lockers dynamically to active staff, recording full logs.',
    applications: ['Personnel Changerooms', 'Cleanroom Vestibules'],
    features: [
      'Biometric and RFID scanner synchronization.',
      'Dynamic locker assignment based on active occupancy.',
      'Solenoid electric security locks.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Identity Verification', description: 'Operator swipes or scans fingerprint.' },
      { step: '2', title: 'Dynamic Assignment', description: 'System assigns and opens a vacant locker cabinet.' }
    ],
    specs: [
      {
        category: 'Control',
        items: [
          { label: 'Auth Methods', value: 'RFID / Fingerprint' },
          { label: 'Cabinet Material', value: 'Stainless Steel 304' }
        ]
      }
    ],
    downloads: [],
    faqs: [],
    related: ['shoe-cover-machine']
  },
  {
    id: 'cleanroom-clock',
    title: 'Wired & Wireless Cleanroom Clocks',
    tag: 'Digital Clocks',
    iconName: 'Clock',
    shortDescription: 'High-visibility 7-segment LED clocks synchronized via Modbus/GPS inputs.',
    longOverview: 'High-visibility synchronized digital clocks for pharmaceutical formulation halls. Features washdown-safe flush bezels.',
    applications: ['Formulation Suites', 'Operating Theaters', 'Packaging Halls'],
    features: [
      'Master-slave configuration loops.',
      'Modbus RTU / SCADA server synchronization.',
      'Accuracy of ±1 second per day with GPS receivers.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Time Sync', description: 'GPS or Modbus connection delivers real-time time updates to the clock bus.' }
    ],
    specs: [
      {
        category: 'Display & Power',
        items: [
          { label: 'Sync Source', value: 'Wired / Wireless with GPS' },
          { label: 'Display Type', value: '7-segment LED' },
          { label: 'Power Supply', value: '230 VAC' }
        ]
      }
    ],
    downloads: [],
    faqs: [],
    related: ['differential-pressure-indicator']
  }
];

export const industries: Industry[] = [
  {
    id: 'pharmaceutical',
    title: 'Pharmaceutical',
    tagline: 'Maintaining strict compliance & sterile environments.',
    description: 'Sterile drug manufacturing requires absolute isolation and pressure cascading. Our interlocking systems and indicators protect Grade A-D cleanrooms from ingress of external contaminants.',
    challenges: [
      'Cross-contamination during operator entries.',
      'Strict US FDA and WHO GMP validation audits.',
      'Pressure drops resulting in sterile zone breach.'
    ],
    solutions: [
      'Multi-door interlocks with active pressure feedback loops.',
      'NABL-traceable indicators with digital calibration logs.',
      'IP65 cleanroom-grade flush mount panels resistant to vaporized H2O2.'
    ],
    stats: { value: '60+', label: 'Pharma Leaders Trusted' },
    iconName: 'ShieldAlert'
  },
  {
    id: 'biotechnology',
    title: 'Biotechnology',
    tagline: 'Safeguarding biological agents and cell cultures.',
    description: 'Biosafety cabinets and containment facilities require precise pressure barriers. We provide certified controllers that manage air isolation and protect operators from pathogens.',
    challenges: [
      'Containment of BSL-3 / BSL-4 hazardous pathogens.',
      'Sash-height fluctuations altering air velocities.',
      'Constant sterilizing chemicals degrading hardware.'
    ],
    solutions: [
      'Laminar Air Flow controllers with PID blower loops.',
      'Audible alarm panels triggering on minor air flow drops.',
      'Dynamic emergency exhaust override logic integration.'
    ],
    stats: { value: 'BSL-4', label: 'Containment Ready' },
    iconName: 'Dna'
  },
  {
    id: 'food-processing',
    title: 'Food Processing',
    tagline: 'Ensuring food hygiene, processing safety, and shelf-life.',
    description: 'Preventing bacterial growth requires strict environmental control. We regulate relative humidity, cleanroom passages, and air showers to ensure food safety compliance.',
    challenges: [
      'Spoilage due to humidity-induced mold growth.',
      'Dust and allergen carry-over between processing halls.',
      'Heavy washdown cycles causing sensor rust.'
    ],
    solutions: [
      'Corrosion-resistant stainless steel sensors and indicators.',
      'Personnel air showers stripping particles at entry doors.',
      'Integrated Temperature & RH transmitters for dry-zones.'
    ],
    stats: { value: '0%', label: 'Contamination Incidents' },
    iconName: 'Utensils'
  },
  {
    id: 'hospitals',
    title: 'Hospitals',
    tagline: 'Securing surgical suites and isolation wards.',
    description: 'Infectious diseases require negative pressure containment, while surgical OTs require positive pressure. Our indicators give surgical teams peace of mind with live parameter logs.',
    challenges: [
      'Airborne transmission of nosocomial infections.',
      'Silent pressure drop warning failures.',
      'Inefficient air change rates in operating rooms.'
    ],
    solutions: [
      'Clear, oversized visual indicators visible from surgical beds.',
      'Duct-mounted differential pressure sensors with alarm relays.',
      'Fail-safe door locks integrated directly with fire panels.'
    ],
    stats: { value: '<1s', label: 'Alarm Latency' },
    iconName: 'Building2'
  },
  {
    id: 'semiconductor',
    title: 'Semiconductor',
    tagline: 'Yield maximization through sub-micron particle control.',
    description: 'Microchips are sensitive to single-nanometer dust and electrostatic discharges. Our controllers keep Class 1-100 cleanroom airlocks under ultra-stable pressure gradients.',
    challenges: [
      'Microscopic particles destroying silicon wafer circuits.',
      'Electrostatic discharge (ESD) damaging chips.',
      'Micro-changes in humidity affecting photo-lithography.'
    ],
    solutions: [
      'Ultra-clean high-velocity air showers with ESD discharge nets.',
      'Highly sensitive differential pressure sensors (±0.1 Pa resolution).',
      'Digital transmitters sending parameters via Modbus to SCADA.'
    ],
    stats: { value: 'Class 1', label: 'Cleanroom Compatible' },
    iconName: 'Microchip'
  },
  {
    id: 'electronics',
    title: 'Electronics',
    tagline: 'Optimal environments for SMT lines and PCB assembly.',
    description: 'PCB reflow and SMT processes require dry air zones. We deliver high-reliability relative humidity sensors and transmitters that ensure boards avoid moisture traps.',
    challenges: [
      'Moisture traps causing delamination during reflow.',
      'Corrosion in copper circuits due to high moisture.',
      'Thermal fluctuations altering glue viscosity.'
    ],
    solutions: [
      'Fast-response capacitive Relative Humidity sensors.',
      'Industrial Modbus RTU networks connecting all assembly line nodes.',
      'LED parameter panels for SMT hall supervisors.'
    ],
    stats: { value: '1.5%', label: 'RH Calibration Accuracy' },
    iconName: 'Tv'
  },
  {
    id: 'chemical',
    title: 'Chemical',
    tagline: 'Managing corrosive vapors and gas safety.',
    description: 'Chemical synthesis labs deal with corrosive exhausts and volatile gases. Our explosion-proof and chemically-resistant sensors feed reliable telemetry to ventilation PLCs.',
    challenges: [
      'Corrosive acid fumes destroying standard electronics.',
      'Explosion hazards in solvent storage zones.',
      'Exhaust failure leading to toxic buildup.'
    ],
    solutions: [
      'Sintered metal mesh and Teflon-coated transmitter probes.',
      'Intrinsically safe sensors and relay outputs.',
      'Closed-loop exhaust monitor integrations.'
    ],
    stats: { value: 'ATEX', label: 'Compliant Abstraction' },
    iconName: 'FlaskConical'
  },
  {
    id: 'research-labs',
    title: 'Research Labs',
    tagline: 'Repeatable experiments through environmental control.',
    description: 'Scientific research demands identical baseline parameters. We automate environmental parameter locking so scientists can focus entirely on their assays.',
    challenges: [
      'Fluctuations in parameters corrupting sample records.',
      'Lack of centralized audit trails for regulatory compliance.',
      'Complex setups requiring custom integration.'
    ],
    solutions: [
      'Multi-channel data logging indicators storing records local and cloud.',
      'Modbus-to-Ethernet gateways integrating to lab software.',
      'Custom logic blocks designed for experimental setups.'
    ],
    stats: { value: '100%', label: 'Audit Trail Accuracy' },
    iconName: 'Binary'
  }
];

export const solutions: Solution[] = [
  {
    id: 'cleanroom-entry-control',
    title: 'Cleanroom Entry & Air Containment',
    subtitle: 'Securing entry logic and removing particulates.',
    description: 'A complete system coordinating personnel authorization, air decontamination, and airlock pressure locking. This solution guarantees that outdoor or lower-grade air never crosses into sterile cleanrooms.',
    workflow: [
      { step: 1, title: 'Access Request', desc: 'Operator swipes an RFID card at the outer anteroom door. System verifies identity and checks if the inner airlock or cleanroom doors are closed.', icon: 'Key' },
      { step: 2, title: 'Outer Door Unlock', desc: 'The system releases the magnetic lock of the outer door. The inner cleanroom doors remain locked.', icon: 'Unlock' },
      { step: 3, title: 'Decontamination Cycle', desc: 'Operator enters the Air Shower. High-velocity HEPA-filtered air jets (22 m/s) blow for 12 seconds to remove dust particles from gowning.', icon: 'Wind' },
      { step: 4, title: 'Cleanroom Entry', desc: 'Once the purge cycle finishes, the outer door locks, and the inner cleanroom door unlocks, allowing safe entry.', icon: 'DoorOpen' }
    ],
    technicalHighlights: [
      'Interconnected Access Controller coordinating 2 to 8 doors.',
      'PIR sensor automated cycle activation.',
      'Emergency override system instantly disengages all electromagnetic locks.'
    ]
  },
  {
    id: 'environmental-monitoring-cascade',
    title: 'Environmental Cascading & Monitoring',
    subtitle: 'Positive pressure loops and parameter tracing.',
    description: 'Integrated monitoring of Differential Pressure, Temperature, and Relative Humidity across sterile cascades. Connects multiple wall indicators to a central telemetry hub to record and alarm parameter breaches.',
    workflow: [
      { step: 1, title: 'Differential Pressure Sampling', desc: 'Indicators measure pressure gradients between Cleanroom Grade B (e.g. +30 Pa) and Grade C (e.g. +15 Pa).', icon: 'Gauge' },
      { step: 2, title: 'Temp & Humidity Sensing', desc: 'Digital transmitters measure ambient air conditions inside the cleanroom and duct lines, relaying them to the display indicators.', icon: 'Thermometer' },
      { step: 3, title: 'SCADA Logs & Alerts', desc: 'Indicators broadcast data via Modbus. If pressure drops below limits for >5 seconds, a local audio-visual buzzer and SMS alerts are triggered.', icon: 'AlertTriangle' }
    ],
    technicalHighlights: [
      'Digital piezoresistive sensors with ±0.25% FS accuracy.',
      'Modbus RTU daisy-chain linking 32+ indicators into a single interface.',
      'AISI 304 Stainless Steel flush mounting.'
    ]
  }
];

export const techTopics: TechTopic[] = [
  {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    description: 'Industrial-grade 32-bit microcontroller architectures designed with hardware watchdog timers and Real-Time Operating Systems (RTOS) to guarantee sub-millisecond reliability.',
    details: [
      'Arm Cortex-M processors running deterministic firmware core loops.',
      'Hardware watchdog monitoring preventing code freeze or locking.',
      'Optoisolated inputs protecting control circuits from high-voltage spikes.'
    ],
    diagramTitle: 'Embedded Logic Architecture',
    nodes: [
      { label: 'Opto-Inputs', x: 10, y: 50, type: 'input' },
      { label: 'Cortex-M CPU', x: 50, y: 50, type: 'process' },
      { label: 'Watchdog IC', x: 50, y: 15, type: 'sensor' },
      { label: 'Relay Driver', x: 90, y: 50, type: 'output' }
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 2, to: 1 },
      { from: 1, to: 3 }
    ]
  },
  {
    id: 'industrial-electronics',
    title: 'Industrial Electronics',
    description: 'Hardware engineered to thrive in harsh environments. Features robust surge suppression, EMI/EMC shielding, and multi-stage power conditioning.',
    details: [
      'CE and EMC compliant PCB layouts with dedicated ground planes.',
      'TVS diodes and metal oxide varistors (MOVs) filtering input spikes up to 2kV.',
      'Flame-retardant ABS and IP65-grade aluminum housings.'
    ],
    diagramTitle: 'EMC Protection Stack',
    nodes: [
      { label: 'Surge Input', x: 10, y: 50, type: 'input' },
      { label: 'MOV & TVS Filter', x: 40, y: 50, type: 'process' },
      { label: 'L-C Pi Filter', x: 70, y: 50, type: 'process' },
      { label: 'Clean DC Bus', x: 95, y: 50, type: 'output' }
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 }
    ]
  },
  {
    id: 'sensors-telemetry',
    title: 'Sensors & Calibration',
    description: 'Ultra-low range pressure sensors and highly-calibrated relative humidity elements trace their reliability to international NABL standards.',
    details: [
      'Piezoresistive silicon chips measuring micro-pascals accurately.',
      'Multi-point digital lookup tables calibrating out non-linearity.',
      'Hydrophobic sintered steel filters protecting sensor cells from washdowns.'
    ],
    diagramTitle: 'Sensor Compensation Loop',
    nodes: [
      { label: 'Raw Transducer', x: 10, y: 50, type: 'sensor' },
      { label: 'ADC 24-bit', x: 40, y: 50, type: 'process' },
      { label: 'Temp Compensate', x: 70, y: 50, type: 'process' },
      { label: 'Calibrated Output', x: 95, y: 50, type: 'output' }
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 }
    ]
  },
  {
    id: 'plc-iot-monitoring',
    title: 'PLC Integration & IoT SCADA',
    description: 'Ready for the Industrial Internet of Things (IIoT). Built-in support for Modbus RTU/TCP, BACnet, and analog daisy chains to slide into existing building automation systems.',
    details: [
      'RS485 Modbus RTU communication supporting up to 247 nodes on a bus.',
      'Modbus-TCP / Ethernet Gateways pushing data directly to cloud dashboards.',
      'Compatibility with leading PLC vendors (Siemens, ABB, Schneider Electric, Rockwell).'
    ],
    diagramTitle: 'Telemetry & SCADA Stack',
    nodes: [
      { label: 'Sensor Nodes', x: 10, y: 50, type: 'sensor' },
      { label: 'RS485 Modbus', x: 45, y: 50, type: 'process' },
      { label: 'Edge Gateway', x: 75, y: 50, type: 'process' },
      { label: 'SCADA / Cloud', x: 95, y: 50, type: 'output' }
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 }
    ]
  }
];

export const timelineEvents = [
  { year: '2019', title: 'R&D Operations Launch', desc: 'Neural Industrial Automation was established with a focus on designing high-stability embedded controllers for sterile corridors.' },
  { year: '2021', title: 'Pharma Cleanroom Series', desc: 'Launched the flush-mount Door Interlocking and TRH indicators, quickly securing approvals from 20+ pharma companies.' },
  { year: '2023', title: 'NABL & CE Standardization', desc: 'Achieved full CE certifications and NABL-traceable sensor calibrations. Expanded installations to major biotech clusters.' },
  { year: '2025', title: 'IoT & Telemetry Expansion', desc: 'Integrated edge-modem telemetry and Modbus-TCP gateways, introducing live cloud dashboards for cleanrooms.' },
  { year: '2026', title: 'Global Operations & Next-Gen', desc: 'Deploying high-speed electronic interlocks globally, serving 60+ pharmaceutical leaders and electronics labs.' }
];

export const generalFAQs = [
  {
    q: 'What quality standards do Neural Industrial Automation products meet?',
    a: 'All our products are manufactured under strict ISO 9001:2015 standards, conform to CE certification requirements, and are built to comply with WHO GMP and US FDA cleanroom validation guidelines.'
  },
  {
    q: 'Do you offer on-site installation and commission support?',
    a: 'Yes. We provide complete installation guidelines, terminal mapping schematics, and can deploy senior calibration engineers to your facility for validation testing, loops checking, and commissioning.'
  },
  {
    q: 'How long does a typical calibration certificate remain valid?',
    a: 'All indicators and transmitters are dispatched with NABL-traceable certificates valid for 12 months. We offer calibration contracts to verify sensor accuracy annually at your facility.'
  },
  {
    q: 'What is the lead time for standard and custom products?',
    a: 'Standard products like the Differential Pressure Indicators and 2-door interlocking panels are usually dispatched within 3-5 working days. Custom configurations (e.g., 6-door interlock or specific display modules) have a lead time of 2-3 weeks.'
  }
];

export const resourceDownloads = [
  { category: 'Manual', title: 'Door Interlock Programming Manual', format: 'PDF', size: '4.2 MB', filename: 'Door_Interlock_User_Guide_EN.pdf' },
  { category: 'Manual', title: 'Air Shower Control Wiring Guide', format: 'PDF', size: '5.1 MB', filename: 'AirShower_Installation_Guide.pdf' },
  { category: 'Manual', title: 'TRH Transmitter User Manual', format: 'PDF', size: '2.8 MB', filename: 'TRH_Transmitter_User_Manual.pdf' },
  { category: 'Certificate', title: 'CE Compliance Declaration', format: 'PDF', size: '850 KB', filename: '/assets/docs/ce-neural.pdf' },
  { category: 'Certificate', title: 'ISO 9001:2015 Registration Certificate', format: 'PDF', size: '1.1 MB', filename: '/assets/docs/iso-neural.pdf' }
];

export const techArticles = [
  {
    id: 'understanding-dp-cleanrooms',
    title: 'Understanding Differential Pressure in Class B Cleanrooms',
    summary: 'A detailed exploration of how pressure cascades protect drug formulation zones from particulate infiltration, outlining limits, guidelines, and recovery times.',
    date: 'May 14, 2026',
    readTime: '6 min read'
  },
  {
    id: 'modbus-daisy-chain-guide',
    title: 'Deploying RS485 Modbus in High Noise Industrial Halls',
    summary: 'A practical handbook on daisy-chain wiring, termination resistors, bias configurations, and shielding techniques to defeat electromagnetic interference.',
    date: 'June 22, 2026',
    readTime: '8 min read'
  },
  {
    id: 'uv-sterilization-logic',
    title: 'Optimizing UV Exposure Logic in Dynamic Pass Boxes',
    summary: 'An engineering review on adjusting exposure timers based on material load surface areas to achieve complete sterilization without compromising logistics speeds.',
    date: 'June 30, 2026',
    readTime: '5 min read'
  }
];
