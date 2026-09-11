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
  downloads: { type: 'Datasheet' | 'Manual' | 'Drawing' | 'Certificate' | 'Catalog'; name: string; size: string; filename?: string; requestCatalog?: boolean }[];
  faqs: { q: string; a: string }[];
  related: string[];
  photos?: { src: string; alt: string }[];
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
    longOverview: 'The Neural Intelligent Door Interlocking System is engineered for high-integrity cleanroom environments, preventing simultaneous door openings to maintain differential pressure cascades. Trusted across pharmaceutical facilities, it offers real-time logic control, emergency override triggers, and card reader integration.',
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
      'Fast relay response preventing overlapping entry requests.',
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
          { label: 'Operating Voltage', value: '80–280V AC, 50 Hz (Main Supply) / 24V DC Lock Rail' },
          { label: 'Power Consumption', value: '20W (2 Door) / 50W (4 Door) / 80W (8 Door controller max)' },
          { label: 'Relay Output Rating', value: '230V AC / 5A (Heavy-Duty Silver Alloy Contacts)' }
        ]
      },
      {
        category: 'Control & Interlocking',
        items: [
          { label: 'Supported Doors', value: '2, 3, 4 to 8 Doors per controller cascade (Expandable up to 16 Doors)' },
          { label: 'Feedback Inputs', value: 'Magnetic Reed / Proximity Door Status Sensors (NC/NO dry contacts)' },
          { label: 'Emergency Override', value: 'Potential-free Fire Alarm (NC/NO) & Manual Emergency station inputs' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Enclosure Material', value: 'MS Powder Coated Box / FLP Ex-d IIB T6 Flameproof' },
          { label: 'EM Lock Specs', value: '300 LBS (136 kg) / 600 LBS (272 kg) EMLOCK @ 24V DC, 100 mA' },
          { label: 'Operating Temperature', value: '0°C to 50°C' }
        ]
      }
    ],
    downloads: [
      { type: 'Manual', name: 'Door Interlocking System Manual', size: '430 KB', filename: '/assets/docs/door-interlock-system-manual.pdf' },
      { type: 'Manual', name: '300 LBS EM Lock Specification', size: '740 KB', filename: '/assets/docs/em-lock-specification.pdf' }
    ],
    faqs: [
      { q: 'What happens during a power failure?', a: 'By default, our interlocking system fails-safe. Upon complete loss of power, all door electromagnet locks are immediately de-energized, allowing unrestricted exit. An auxiliary battery backup can be installed to maintain lock state if requested.' },
      { q: 'Can this integrate with third-party biometric access card readers?', a: 'Yes. The controller receives standard dry-contact trigger signals from card readers, biometric scanners, or touch-free sensors, overlaying interlocking logic on top of security access approvals.' }
    ],
    related: ['pass-box-interlocking-system', 'air-shower-controller', 'differential-pressure-indicator'],
    photos: [
      { src: '/assets/products/door-interlocking-system/photo1.jpg?v=2', alt: '2-Door Interlocking Control Master Unit' },
      { src: '/assets/products/door-interlocking-system/photo2.jpg?v=2', alt: '3-Door Interlocking Controller with Built-in Purge Timer' },
      { src: '/assets/products/door-interlocking-system/photo3.jpg?v=2', alt: '5-Door Interlocking Control Master Panel' },
      { src: '/assets/products/door-interlocking-system/photo4.jpg?v=2', alt: 'High-Visibility Stainless Steel GO/WAIT Status Indicator Panel' },
      { src: '/assets/products/door-interlocking-system/photo5.jpg?v=2', alt: 'GO/WAIT Display Module with Digital Timer' },
      { src: '/assets/products/door-interlocking-system/photo6.jpg?v=2', alt: 'Touchless IR Sensor Door Release Keypad Panel' },
      { src: '/assets/products/door-interlocking-system/photo7.jpg?v=2', alt: '300 lbs Electromagnetic Door Lock (Center Hole)' },
      { src: '/assets/products/door-interlocking-system/photo8.jpg?v=2', alt: '600 lbs Heavy-Duty Electromagnetic Door Lock' },
      { src: '/assets/products/door-interlocking-system/photo9.jpg?v=2', alt: 'Flush-Mount Emergency Lock Override Release Switch' },
      { src: '/assets/products/door-interlocking-system/photo10.jpg?v=2', alt: '12V/24V DC Power Supply Module (SMPS 1122) for Door Locks' }
    ],
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
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '80–280V AC, 50 Hz (Main Controller) / 24V DC Lock supply' },
          { label: 'Power Consumption', value: '80W max controller load' },
          { label: 'Relay Outputs', value: '230V AC / 2A (Silver Alloy contacts for Locks, Blower up to 1 HP, UV Lamp & CF Lamp)' }
        ]
      },
      {
        category: 'Control Parameters',
        items: [
          { label: 'Supported Doors', value: '2 or 3 Doors per pass box controller unit (Static & Dynamic)' },
          { label: 'Door Delay & UV Timer', value: 'User programmable door delay 0–250 sec/min & UV timer control' },
          { label: 'Status Indication', value: 'GO & WAIT Bar LED / 128x64 Graphical LCD display with DOTL buzzer' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Enclosure & Mounting', value: 'Powder-coated MS controller box (Wall Mount) / SS-316L Display Panel' },
          { label: 'Operating Temperature', value: '0°C to 50°C' },
          { label: 'Lock Compatibility', value: '24V DC Electromagnetic Locks (300 LBS / 136 kg & 600 LBS / 272 kg) & Electric Strikes' }
        ]
      }
    ],
    downloads: [
      { type: 'Manual', name: 'Pass Box Interlocking Controller Manual', size: '2.0 MB', filename: '/assets/docs/passbox-interlock-manual.pdf' }
    ],
    faqs: [
      { q: 'Can I adjust the UV light cycle duration?', a: 'Yes, the UV exposure cycle is fully programmable from the front display panel, allowing timers between 10 seconds to 15 minutes.' }
    ],
    related: ['door-interlocking-system', 'air-shower-controller'],
    photos: [
      { src: '/assets/products/pass-box-interlocking-system/photo1.jpg?v=2', alt: 'Main Pass Box Interlocking Controller Module' },
      { src: '/assets/products/pass-box-interlocking-system/photo2.jpg?v=2', alt: 'Smart Digital Pass Box Interlocking Controller' },
      { src: '/assets/products/pass-box-interlocking-system/photo3.jpg?v=2', alt: 'Smart+ Pass Box Controller with UV Hour Meter' },
      { src: '/assets/products/pass-box-interlocking-system/photo4.jpg?v=2', alt: 'Static Pass Box Interlocking Unit' },
      { src: '/assets/products/pass-box-interlocking-system/photo5.jpg?v=2', alt: 'UCB Dynamic Pass Box Interlocking Controller' },
      { src: '/assets/products/pass-box-interlocking-system/photo6.jpg?v=2', alt: 'Pass Box Stainless Steel Touch Keypad Panel' },
      { src: '/assets/products/pass-box-interlocking-system/photo7.jpg?v=2', alt: 'Programmable UV Sterilization Delay Timer Module' },
      { src: '/assets/products/pass-box-interlocking-system/photo8.jpg?v=2', alt: 'Germicidal UV Sterilization Lamp Tubes (Cleanroom Grade)' },
      { src: '/assets/products/pass-box-interlocking-system/photo9.jpg?v=2', alt: 'Electronic Ballast / Choke Module for UV Lamp' },
      { src: '/assets/products/pass-box-interlocking-system/photo10.jpg?v=2', alt: 'Infrared Touchless Access Keypad for Pass Box' }
    ],
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
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '80–280V AC, 50 Hz (Main Controller) / 24V DC Lock supply' },
          { label: 'Power Consumption', value: '80W max controller load' },
          { label: 'Blower Relay Output', value: '230V AC / 2A contactor trigger for Blower Motor (up to 1 HP / 2 HP)' }
        ]
      },
      {
        category: 'Control Parameters',
        items: [
          { label: 'Shower Duration', value: 'User programmable 0 to 255 Seconds (Default: 12s)' },
          { label: 'Door Capacity', value: 'Up to 3 Doors per air shower chamber cascade' },
          { label: 'Status & Alerts', value: 'Digital Parameter Monitor (DPM) with audio-visual buzzer for Door Ajar & MCB Trip' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Enclosure Material', value: 'MS Powder Coated Main Box & Stainless Steel Panel' },
          { label: 'Operating Temperature', value: '0°C to 50°C' }
        ]
      }
    ],
    downloads: [
      { type: 'Manual', name: 'Air Shower Manual', size: '420 KB', filename: '/assets/docs/air-shower-controller-manual.pdf' }
    ],
    faqs: [
      { q: 'Is there an emergency exit routine?', a: 'Yes. Pressing the glowing emergency stop button on the internal panel immediately cuts motor power and opens both doors for immediate egress.' }
    ],
    related: ['door-interlocking-system', 'differential-pressure-indicator'],
    photos: [
      { src: '/assets/products/air-shower-controller/photo1.jpg', alt: 'Master Air Shower Logic Controller Panel' },
      { src: '/assets/products/air-shower-controller/photo2.jpg', alt: 'Integrated Single-Box Air Shower Controller Module' },
      { src: '/assets/products/air-shower-controller/photo3.jpg', alt: '2-Channel 4-Blower Air Shower Control Circuit Board' },
      { src: '/assets/products/air-shower-controller/photo4.jpg', alt: '3-Channel Blower Control Module' },
      { src: '/assets/products/air-shower-controller/photo5.jpg', alt: 'Air Shower Digital Parameter Monitor (DPM)' },
      { src: '/assets/products/air-shower-controller/photo6.jpg', alt: 'Air Shower Purge Cycle Timer & Parameter Display' },
      { src: '/assets/products/air-shower-controller/photo7.jpg', alt: 'Emergency Stop Push Button for Air Shower Egress' }
    ],
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
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '100–260V AC, 50/60 Hz' },
          { label: 'Power Consumption', value: '20W controller consumption' },
          { label: 'Relay Outputs', value: '230V AC / 2A for Blower (up to 1 HP), UV Lamp & CF Lamp' }
        ]
      },
      {
        category: 'Control Parameters',
        items: [
          { label: 'Control Signals', value: '0-10V DC / PWM / RS485 Modbus RTU interface for EC/BLDC blowers' },
          { label: 'Differential Pressure Tracking', value: '0 to 500 Pascals (HEPA filter resistance tracking)' },
          { label: 'Safety Features', value: 'Blower ON/OFF status, UV hour meter & audible filter clogging alarm' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Display Module (DPM)', value: 'High-intensity Bar LEDs & 7-Segment LED Status Display' },
          { label: 'Enclosure & Mounting', value: 'MS Powder Coated controller unit' },
          { label: 'Operating Temperature', value: '0°C to 50°C' }
        ]
      }
    ],
    downloads: [
      { type: 'Manual', name: 'LAF / BUF Controller Manual', size: '200 KB', filename: '/assets/docs/laf-controller-manual.pdf' }
    ],
    faqs: [
      { q: 'Can it communicate with a building SCADA?', a: 'Absolutely. It exports all velocity, alarm states, and pressure readings via Modbus RTU (RS485).' }
    ],
    related: ['differential-pressure-indicator', 'temperature-rh-indicator'],
    photos: [
      { src: '/assets/products/laf-buf-controller/photo1.jpg?v=1788862999999', alt: 'Laminar Air Flow (LAF) Main Control Panel' },
      { src: '/assets/products/laf-buf-controller/photo2.jpg', alt: 'PLC Control Unit for Sterile LAF Hoods' },
      { src: '/assets/products/laf-buf-controller/photo3.jpg', alt: 'Color HMI Touch Panel for LAF Monitoring' },
      { src: '/assets/products/laf-buf-controller/photo5.jpg', alt: '6-Key Touch Panel for LAF Lighting & UV Controls' },
      { src: '/assets/products/laf-buf-controller/photo6.jpg', alt: '3-Key LAF Light & Blower Toggle Switch' },
      { src: '/assets/products/laf-buf-controller/photo7.jpg', alt: 'LAF Lighting & UV Power Interface Board' }
    ],
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
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '24V DC (18–30V DC) / 24V AC, 250mA' },
          { label: 'Power Consumption', value: 'Ultra-low power design (~2 Watts)' },
          { label: 'Telemetry & Output', value: 'Simultaneous 4-20 mA / 0-10V DC analog & RS485 Modbus RTU digital output' }
        ]
      },
      {
        category: 'Measurement Specs',
        items: [
          { label: 'Standard Range', value: 'Multi-unit programmable: -105.4 to +105.4 mmWC / -1034 to +1034 Pascals (Custom ranges available)' },
          { label: 'Resolution', value: '0.1 mmWC / 1 Pascal / 0.01 mbar (Configurable)' },
          { label: 'Accuracy', value: '±1.0% of reading (Standard) / Precision option available' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Display Type', value: '4-Digit bright 0.39" / 0.56" 7-Segment LED display with violation LEDs' },
          { label: 'Enclosure & Faceplate', value: 'Flush-mounting Stainless Steel faceplate with MS Powder coated box' },
          { label: 'Mounting Compatibility', value: 'Brick wall & Modular cleanroom wall mounting' }
        ]
      }
    ],
    downloads: [
      { type: 'Manual', name: 'Differential Pressure Indicator Manual', size: '1.1 MB', filename: '/assets/docs/differential-pressure-indicator-manual.pdf' },
      { type: 'Manual', name: 'Modbus RS485 Communication Manual', size: '320 KB', filename: '/assets/docs/modbus-communication-manual.pdf' }
    ],
    faqs: [
      { q: 'Does it require recalibration?', a: 'We recommend annual calibration. The front panel features a zero-calibration button that simplifies offset corrections during annual audits.' }
    ],
    related: ['door-interlocking-system', 'temperature-rh-indicator', 'temperature-rh-transmitter'],
    photos: [
      { src: '/assets/products/differential-pressure-indicator/photo1.jpg?v=2', alt: 'Digital Differential Pressure Indicator (DPI) Front Panel' },
      { src: '/assets/products/differential-pressure-indicator/photo2.jpg?v=2', alt: 'Flush-Mount Round Differential Pressure Indicator (Stainless Steel Bezel)' },
      { src: '/assets/products/differential-pressure-indicator/photo3.jpg?v=2', alt: 'Flameproof (FLP) Differential Pressure / Interlock Indicator' },
      { src: '/assets/products/differential-pressure-indicator/photo4.jpg?v=2', alt: 'Stainless Steel Pressure Port Cable Gland (19mm)' },
      { src: '/assets/products/differential-pressure-indicator/photo5.jpg?v=2', alt: 'Flameproof Enclosure & Terminal Junction Box' },
      { src: '/assets/products/differential-pressure-indicator/photo6.jpg?v=2', alt: 'Flameproof Blower Trip & Alarm Indicator Module' }
    ],
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
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '24V DC / 230V AC ±10%, 50 Hz options' },
          { label: 'Power Consumption', value: 'Low power architecture (< 5 Watts)' },
          { label: 'Digital Telemetry', value: 'RS485 Modbus RTU multi-drop telemetry' }
        ]
      },
      {
        category: 'Range & Accuracy',
        items: [
          { label: 'Temperature Range', value: '-20.0°C to +80.0°C (Accuracy: ±0.3°C)' },
          { label: 'Relative Humidity Range', value: '0.0% to 100.0% RH (Accuracy: ±1.5% to ±2.0% RH)' },
          { label: 'Sensor Compatibility', value: 'Pt100 RTD Class A / Capacitive Polymer RH Sensor / Inbuilt integral probes' }
        ]
      },
      {
        category: 'Physical & Interface',
        items: [
          { label: 'Display Type', value: 'High-brightness 4-digit dual 7-segment LED displays (Red/Green)' },
          { label: 'Enclosure Material', value: 'AISI 304 / 316 Stainless Steel flush cleanroom bezel' },
          { label: 'Operating Temperature', value: '0°C to 50°C' }
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
    related: ['temperature-rh-transmitter', 'differential-pressure-indicator'],
    photos: [
      { src: '/assets/products/temperature-rh-indicator/photo1.jpg?v=1788862998854', alt: 'Cleanroom Digital Parameter Velocity & Temperature Display Panel' },
      { src: '/assets/products/temperature-rh-indicator/photo2.jpg?v=1788862998896', alt: 'Touch Screen Humidity & Temperature Indicator Unit' },
      { src: '/assets/products/temperature-rh-indicator/photo3.jpg?v=1788862998940', alt: 'Remote Probe Digital Air Velocity & Temperature Transmitter' },
      { src: '/assets/products/temperature-rh-indicator/photo4.jpg?v=1788862998986', alt: 'Duct-Mount Industrial Temperature & RH Transmitter' },
      { src: '/assets/products/temperature-rh-indicator/photo5.jpg?v=1788862999034', alt: 'Wall-Mount Climate Control Sensor Probe Module' }
    ],
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
      'Robust cleanroom enclosure with easy-connect terminal blocks.',
      'Field-selectable analog output ranges.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Physical Sensing', description: 'Air diffuses through a sintered stainless steel filter to reach the capacitive humidity sensor and Pt100 RTD.' },
      { step: '2', title: 'Telemetry Conversion', description: 'On-board circuits convert sensor changes into standard 4-20mA current loops or digital Modbus values.' },
      { step: '3', title: 'Transmission', description: 'Transmits values over long distances (up to 1200 meters for Modbus) to PLC/SCADA controllers without signal degradation.' }
    ],
    specs: [
      {
        category: 'Electrical & Power',
        items: [
          { label: 'Operating Voltage', value: '18 to 24V DC' },
          { label: 'Power Consumption', value: 'Low power loop (< 1.5 Watts)' },
          { label: 'Output Signals', value: 'Dual isolated 4-20 mA current loop / 0-10V DC & RS485 Modbus RTU' }
        ]
      },
      {
        category: 'Measurement Specs',
        items: [
          { label: 'Relative Humidity Range', value: '0 to 100% RH (Non-condensing, ±1.5% RH accuracy)' },
          { label: 'Temperature Range', value: '0°C to 50°C (Extended: -40°C to +100°C, ±0.3°C accuracy)' },
          { label: 'Calibration', value: '5-Point software digital calibration (No trim pots)' }
        ]
      },
      {
        category: 'Physical & Protection',
        items: [
          { label: 'Enclosure Material', value: 'Industrial ABS housing with SS-304 sensor stem' },
          { label: 'Sensor Filter Cap', value: 'Hydrophobic Sintered Bronze / Sintered Stainless Steel mesh' },
          { label: 'Mounting Types', value: 'HVAC Duct-Mount, Surface Wall-Mount, and Remote Sensor Probe versions' }
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
    related: ['temperature-rh-indicator', 'differential-pressure-indicator'],
    photos: [
      { src: '/assets/products/temperature-rh-transmitter/photo1.jpg?v=1788862999089', alt: 'Cleanroom Digital Parameter Velocity & Temperature Display Panel' },
      { src: '/assets/products/temperature-rh-transmitter/photo2.jpg?v=1788862999138', alt: 'Touch Screen Humidity & Temperature Indicator Unit' },
      { src: '/assets/products/temperature-rh-transmitter/photo3.jpg?v=1788862999187', alt: 'Remote Probe Digital Air Velocity & Temperature Transmitter' },
      { src: '/assets/products/temperature-rh-transmitter/photo4.jpg?v=1788862999234', alt: 'Duct-Mount Industrial Temperature & RH Transmitter' },
      { src: '/assets/products/temperature-rh-transmitter/photo5.jpg?v=1788862999278', alt: 'Wall-Mount Climate Control Sensor Probe Module' }
    ],
  },
  {
    id: 'swing-door-automation',
    title: 'Swing Door Automation',
    tag: 'Entrance Automation',
    iconName: 'DoorClosed',
    shortDescription: 'Automated opening systems suitable for cleanroom door assemblies.',
    longOverview: 'Automated swing door openers designed to assist hands-free access in cleanroom environments, gowning areas, and airlocks. Configurable for standard cleanroom door assemblies.',
    applications: ['Pharmaceutical Entry Corridors', 'OT Suites', 'Airlocks'],
    features: [
      'Supports access control inputs (e.g., proximity cards or sensors).',
      'Configurable opening and closing parameters.',
      'Safety features including obstacle detection.',
      'Manual override capabilities.'
    ],
    workingPrinciple: [
      { step: '1', title: 'Activation', description: 'Input signal communicates with the controller.' },
      { step: '2', title: 'Controlled Opening', description: 'Motor drive assists door operation.' },
      { step: '3', title: 'Safe Auto-Close', description: 'Automated sequence coordinates door closure.' }
    ],
    specs: [
      {
        category: 'Electrical & Drive',
        items: [
          { label: 'Supply Voltage', value: 'Standard AC Supply / Internal DC Drive option' },
          { label: 'Motor Type', value: 'Brushless DC Drive Motor' },
          { label: 'Power Consumption', value: 'Load-optimized power operation' }
        ]
      },
      {
        category: 'Performance & Capacity',
        items: [
          { label: 'Door Weight Capacity', value: 'Designed to support standard cleanroom door weights' },
          { label: 'Speed Adjustment', value: 'Configurable opening & closing speeds' },
          { label: 'Hold-Open Time', value: 'Adjustable hold-open dwell time' }
        ]
      }
    ],
    downloads: [],
    faqs: [],
    related: ['door-interlocking-system'],
    photos: []
  },
  {
    id: 'smart-locker',
    title: 'Smart Locker & Cabinet System',
    tag: 'Changeroom Automation',
    iconName: 'Settings',
    shortDescription: 'Gowning and cabinet management system with optional access credentials and weight tracking features.',
    longOverview: 'The Smart Locker & Cabinet System is designed for cleanroom gowning areas, tool lockers, and garment management. It combines optional access control, electric locking mechanisms, and weight monitoring features to assist with inventory organization.',
    applications: [
      'Pharma Cleanroom Garment & Gown Area Management',
      'Sterile Garment Inventory Weight Verification',
      'Controlled Substance & API Cabinet Access',
      'Cleanroom Tool & Device Storage',
      'Dynamic Locker Allocation in Airlocks'
    ],
    features: [
      'Multi-Modal Authorization: Supports optional RFID, biometric, or PIN credential inputs.',
      'Weight Calculation: Optional load sensing capabilities for deposit and retrieval monitoring.',
      'Automated Collection & Submission: Assists with garment return and tool allocation workflows.',
      'Electric Lock Control: Electronic door locking mechanisms with feedback capabilities.',
      'Data & Telemetry: Supports event logging and telemetry integration options.',
      'Cleanroom Construction: Flush-mountable design suitable for standard wipe-down procedures.'
    ],
    workingPrinciple: [
      { step: '1', title: 'User Identification', description: 'User presents credentials to request compartment access.' },
      { step: '2', title: 'Compartment Release', description: 'System unlocks the assigned locker door compartment.' },
      { step: '3', title: 'Weight Measurement', description: 'Integrated sensors monitor weight changes during item access.' },
      { step: '4', title: 'Logging & Lock', description: 'System records transaction details and secures the compartment upon closure.' }
    ],
    specs: [
      {
        category: 'Access & Authentication',
        items: [
          { label: 'Access Credentials', value: 'RFID / Contactless / Biometric options' },
          { label: 'Biometric Option', value: 'Optional Biometric Sensor' }
        ]
      },
      {
        category: 'Weight Monitoring',
        items: [
          { label: 'Weight Sensor Type', value: 'Strain Gauge Load Sensors' },
          { label: 'Mass Measurement', value: 'Integrated Load Sensor Array' },
          { label: 'Tare & Calibration', value: 'Digital Tare Feature' }
        ]
      },
      {
        category: 'Electrical & Cabinet Control',
        items: [
          { label: 'Power Supply', value: 'Standard AC Supply / Internal DC Lock Rail' },
          { label: 'Door Lock Actuators', value: 'Electronic Solenoid Locks with Status Feedback' },
          { label: 'Data Telemetry', value: 'Serial / Network Communication Options' },
          { label: 'Enclosure Finish', value: 'Stainless Steel Cleanroom Enclosure' }
        ]
      }
    ],
    downloads: [
      { type: 'Catalog', name: 'Request Smart Locker Product Catalog & Specification Sheet', size: 'PDF Catalog (On Request)', requestCatalog: true }
    ],
    faqs: [
      { q: 'How does weight tracking assist in cleanroom garment or tool management?', a: 'Integrated load sensors measure baseline mass and register changes during retrieval or deposit to assist with inventory tracking.' },
      { q: 'What access credentials can be integrated?', a: 'The cabinet system can be configured with various access control credentials including RFID cards, PIN codes, or optional biometric sensors based on site requirements.' }
    ],
    related: ['door-interlocking-system', 'pass-box-interlocking-system'],
    photos: []
  },
  {
    id: 'cleanroom-clock',
    title: 'Wired & Wireless Cleanroom Clocks',
    tag: 'Digital Clocks',
    iconName: 'Clock',
    shortDescription: 'Digital cleanroom clocks with clear display and optional network or time signal synchronization.',
    longOverview: 'Digital displays designed for cleanroom environments, formulation halls, and critical process areas, featuring flush-mount bezels.',
    applications: ['Formulation Suites', 'Operating Theaters', 'Packaging Halls'],
    features: [
      'Configurable master-slave setup options.',
      'Supports standard network synchronization protocols.',
      'Digital time display for cleanroom environments.'
    ],
    workingPrinciple: [],
    specs: [
      {
        category: 'Display & Synchronization',
        items: [
          { label: 'Display Type', value: 'Digital LED Display (4-digit or 6-digit configurations)' },
          { label: 'Sync Source', value: 'Wired or optional wireless time synchronization' },
          { label: 'Timekeeping', value: 'Digital timekeeping with optional external synchronization' }
        ]
      },
      {
        category: 'Electrical & Power',
        items: [
          { label: 'Power Supply', value: 'Standard AC Power / Optional Low-Voltage DC' },
          { label: 'Power Consumption', value: 'Energy-efficient LED display design' },
          { label: 'Backup Battery', value: 'Internal battery backup feature' }
        ]
      },
      {
        category: 'Physical & Environmental',
        items: [
          { label: 'Enclosure Material', value: 'Stainless Steel Flush-Mount Cleanroom Bezel' },
          { label: 'Front Panel', value: 'Polycarbonate / Toughened Glass Front Panel' },
          { label: 'Operating Range', value: 'Suitable for standard cleanroom operating environments' }
        ]
      }
    ],
    downloads: [],
    faqs: [],
    related: ['differential-pressure-indicator'],
    photos: []
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
      'Strict US FDA and international validation audits.',
      'Pressure drops resulting in sterile zone breach.'
    ],
    solutions: [
      'Multi-door interlocks with active pressure feedback loops.',
      'NABL-traceable indicators with digital calibration logs.',
      'Cleanroom-grade flush mount panels resistant to vaporized H2O2.'
    ],
    stats: { value: '150+', label: 'Pharma Leaders Trusted' },
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
    stats: { value: 'High', label: 'Isolation Efficiency' },
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
    stats: { value: 'Ex-Proof', label: 'Hazardous Zone Options' },
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
    stats: { value: 'Digital', label: 'Audit Trail Logging' },
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
  },
  {
    id: 'laminar-air-flow',
    title: 'Laminar Air Flow System',
    subtitle: 'Unidirectional airflow and particulate barrier protection.',
    description: 'Provides a continuous, uniform stream of HEPA-filtered clean air over work stations, sweeping airborne contaminants away and maintaining an ultra-clean environment for sensitive operations.',
    workflow: [
      { step: 1, title: 'Pre-Filtration Intake', desc: 'Ambient air is drawn into the system through pre-filters to capture larger airborne particles before reaching the main chamber.', icon: 'Wind' },
      { step: 2, title: 'HEPA Air Purification', desc: 'Air is pressurized through high-efficiency HEPA filters to eliminate fine particulates and microbial contaminants.', icon: 'ShieldCheck' },
      { step: 3, title: 'Unidirectional Laminar Wash', desc: 'Uniform, non-turbulent air streams flow vertically across the work surface, continuously clearing particles away from the critical zone.', icon: 'Gauge' }
    ],
    technicalHighlights: [
      'Unidirectional laminar airflow maintaining continuous positive air sweeps.',
      'Smooth stainless steel construction engineered for effortless sanitization.',
      'Integrated pressure differential monitoring and motor speed regulation.'
    ]
  }
];

export const techTopics: TechTopic[] = [
  {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    description: 'Industrial-grade 32-bit microcontroller architectures designed with hardware watchdog timers to guarantee sub-millisecond reliability.',
    details: [
      'Arm Cortex-M processors running deterministic firmware core loops.',
      'Hardware watchdog monitoring preventing code freeze or locking.',
      'Optoisolated inputs protecting control circuits from high-voltage spikes.'
    ],
    diagramTitle: 'Embedded Logic Architecture',
    nodes: [
      { label: 'Opto-Inputs', x: 15, y: 50, type: 'input' },
      { label: 'Cortex-M CPU', x: 50, y: 50, type: 'process' },
      { label: 'Watchdog IC', x: 50, y: 18, type: 'sensor' },
      { label: 'Relay Driver', x: 85, y: 50, type: 'output' }
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
      'Flame-retardant ABS and durable aluminum housings.'
    ],
    diagramTitle: 'EMC Protection Stack',
    nodes: [
      { label: 'Surge Input', x: 15, y: 50, type: 'input' },
      { label: 'MOV & TVS Filter', x: 38, y: 50, type: 'process' },
      { label: 'L-C Pi Filter', x: 62, y: 50, type: 'process' },
      { label: 'Clean DC Bus', x: 85, y: 50, type: 'output' }
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
    description: 'Ultra-low range pressure sensors and highly-calibrated relative humidity elements trace their reliability to international calibration standards.',
    details: [
      'Piezoresistive silicon chips measuring micro-pascals accurately.',
      'Multi-point digital lookup tables calibrating out non-linearity.',
      'Hydrophobic sintered steel filters protecting sensor cells from washdowns.'
    ],
    diagramTitle: 'Sensor Compensation Loop',
    nodes: [
      { label: 'Raw Transducer', x: 15, y: 50, type: 'sensor' },
      { label: 'ADC 24-bit', x: 38, y: 50, type: 'process' },
      { label: 'Temp Compensate', x: 62, y: 50, type: 'process' },
      { label: 'Calibrated Output', x: 85, y: 50, type: 'output' }
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
      'Compatibility with leading industrial PLC and BMS platforms.'
    ],
    diagramTitle: 'Telemetry & SCADA Stack',
    nodes: [
      { label: 'Sensor Nodes', x: 15, y: 50, type: 'sensor' },
      { label: 'RS485 Modbus', x: 38, y: 50, type: 'process' },
      { label: 'Edge Gateway', x: 62, y: 50, type: 'process' },
      { label: 'SCADA / Cloud', x: 85, y: 50, type: 'output' }
    ],
    connections: [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 }
    ]
  }
];

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  points: string[];
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2019',
    title: 'FOUNDATION',
    subtitle: 'Vision & Inception',
    points: [
      'Founded with a vision to deliver smart, precision industrial automation solutions.',
      'Started serving pharmaceutical and cleanroom facilities with dedicated engineering expertise and core interlocking systems.'
    ],
    icon: 'Rocket'
  },
  {
    year: '2021',
    title: 'BUILDING EXPERTISE',
    subtitle: 'Interlock Systems',
    points: [
      'Launched proprietary Cleanroom Interlocking and Pass Box Control Systems.',
      'Successfully executed automation projects across multiple pharma facilities.'
    ],
    icon: 'TrendingUp'
  },
  {
    year: '2023',
    title: 'INNOVATION & GROWTH',
    subtitle: 'PLC & HMI Solutions',
    points: [
      'Expanded our portfolio with intelligent monitoring and control systems.',
      'Strengthened engineering capabilities with custom PLC & HMI solutions.'
    ],
    icon: 'Lightbulb'
  },
  {
    year: '2025',
    title: 'EXPANDING HORIZONS',
    subtitle: 'SCADA & Global Reach',
    points: [
      'Strengthened our presence through international projects.',
      'Delivered BMS, EMS and SCADA solutions for leading pharmaceutical clients.'
    ],
    icon: 'Target'
  },
  {
    year: '2026',
    title: 'VISION AHEAD',
    subtitle: 'Advanced Systems',
    points: [
      'Expanding integrated automation capabilities.',
      'Developing next-generation ESD Solutions, monitoring and automation platforms.'
    ],
    icon: 'Flag'
  }
];

export const generalFAQs = [
  {
    q: 'What quality standards do Neural Industrial Automation products meet?',
    a: 'All our products are manufactured under strict ISO 9001:2015 standards, conform to CE certification requirements, and are built to comply with international cleanroom validation guidelines.'
  },
  {
    q: 'Do you offer on-site installation and commission support?',
    a: 'Yes. We provide complete installation guidelines, terminal mapping schematics, and can deploy senior calibration engineers to your facility for validation testing, loops checking, and commissioning.'
  },
  {
    q: 'How long does a typical calibration certificate remain valid?',
    a: 'All indicators and transmitters are dispatched with traceable calibration certificates valid for 12 months. We offer calibration contracts to verify sensor accuracy annually at your facility.'
  }
];

export const resourceDownloads = [
  { category: 'Manual', title: 'Neural Corporate Product Brochure', format: 'PDF', size: '11.3 MB', filename: '/assets/docs/neural-company-brochure.pdf' },
  { category: 'Manual', title: 'Door Interlocking System User & Installation Manual', format: 'PDF', size: '430 KB', filename: '/assets/docs/door-interlock-system-manual.pdf' },
  { category: 'Manual', title: 'Pass Box Interlocking Controller Manual', format: 'PDF', size: '2.0 MB', filename: '/assets/docs/passbox-interlock-manual.pdf' },
  { category: 'Manual', title: 'Air Shower Manual', format: 'PDF', size: '420 KB', filename: '/assets/docs/air-shower-controller-manual.pdf' },
  { category: 'Manual', title: 'LAF / BUF Controller Operation Manual', format: 'PDF', size: '200 KB', filename: '/assets/docs/laf-controller-manual.pdf' },
  { category: 'Manual', title: 'Differential Pressure Indicator User Manual', format: 'PDF', size: '1.1 MB', filename: '/assets/docs/differential-pressure-indicator-manual.pdf' },
  { category: 'Manual', title: 'Modbus RS485 Communication Protocol Manual', format: 'PDF', size: '320 KB', filename: '/assets/docs/modbus-communication-manual.pdf' },
  { category: 'Certificate', title: 'Quality & Systems Compliance Certificate', format: 'PDF', size: '2.4 MB', filename: '/assets/docs/iso-neural.pdf' },
  { category: 'Certificate', title: 'CE Compliance Declaration', format: 'PDF', size: '5.0 MB', filename: '/assets/docs/ce-neural.pdf' },
  { category: 'Certificate', title: 'ISO 9001:2015 Registration Certificate', format: 'PDF', size: '4.0 MB', filename: '/assets/docs/iso-neural.pdf' }
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
