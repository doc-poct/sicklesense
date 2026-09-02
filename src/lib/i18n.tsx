import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Locale = 'en-IN' | 'hi'

export interface LocaleOption {
  code: Locale
  label: string
  nativeLabel: string
  shortLabel: string
}

export const SUPPORTED_LOCALES: LocaleOption[] = [
  {
    code: 'en-IN',
    label: 'English (India)',
    nativeLabel: 'English (India)',
    shortLabel: 'English',
  },
  {
    code: 'hi',
    label: 'Hindi (India)',
    nativeLabel: 'हिन्दी',
    shortLabel: 'हिन्दी',
  },
]

const STORAGE_KEY = 'sicklesense_locale'

export const translations = {
  'en-IN': {
    brand: {
      title: 'JeevDristi',
      subtitle: 'SICKLESENSE POCT',
    },
    nav: {
      overview: 'Overview',
      showcase: 'Showcase',
      workflow: 'Workflow',
      specs: 'Specifications',
      results: 'Phone Results',
      downloads: 'Downloads',
      portal: 'Web Portal',
      downloadApp: 'Download App',
      language: 'Language',
    },
    hero: {
      badge: 'IIT Bhilai Medical Innovation • SickleSense POCT',
      headingLine1: 'Clarity at the',
      headingLine2: 'point of care.',
      description:
        'Precision optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.',
      downloadApk: (version?: string) =>
        version ? `Download Android App (v${version})` : 'Download Android App',
      downloadPreparing: 'Preparing Download...',
      openPortal: 'Open Web Portal',
      chipHardware: 'IIT Bhilai Optical Unit',
      chipSoftware: 'JeevDristi Offline Companion',
      chipDock: 'Calibrated Cartridge Dock',
      highlights: {
        timeValue: '< 5 min',
        timeLabel: 'Rapid screening',
        offlineValue: '100% Offline',
        offlineLabel: 'Zero internet needed',
        syncValue: 'Direct USB Sync',
        syncLabel: 'Peer-to-peer export',
        verifiedValue: 'Verified',
        verifiedLabel: 'Diagnostic integrity',
      },
    },
    showcase: {
      badge: 'PLATFORM SHOWCASE',
      heading: 'Complete ecosystem from optics to mobile analytics.',
      description:
        'Explore the physical optical unit, companion application, medical enclosure, and diagnostic reporting engineered for field reliability.',
      cards: {
        prototype: {
          badge: 'IIT Bhilai Unit',
          title: 'Prototype Focus',
          subtitle: 'Celebrating Innovation: Functional Prototype',
          description:
            'Lab-tested optical unit engineered at IIT Bhilai, pairing precision LED illumination with a dedicated companion stand for real-time sample processing.',
          highlights: ['Micro-optical stage', 'IIT Bhilai seal & calibrated dock', 'Live companion synchronization'],
        },
        app: {
          badge: 'Android Companion',
          title: 'App Control & Reports',
          subtitle: 'Seamless Data Access',
          description:
            'JeevDristi Android interface providing comprehensive patient search, organized test history, and instant clinical report generation completely offline.',
          highlights: ['100% Offline patient database', 'Recent reports & search filters', 'Instant PDF clinical summaries'],
        },
        medical: {
          badge: 'Production Target',
          title: 'Final Product Concept - Medical Grade',
          subtitle: 'Future Ready: Production Grade Materials',
          description:
            'Next-generation clinical enclosure designed to IBITF medical standards, featuring light-shielded cartridge insertion and durable, sterilizable field housing.',
          highlights: ['IBITF institutional design', 'Light-shielded sample chamber', 'Ultra-rugged clinical durability'],
        },
        analytics: {
          badge: 'AI Diagnostics',
          title: 'Detailed Analytics',
          subtitle: 'Instant, Clear Results',
          description:
            'Direct on-device AI morphology analysis delivering unequivocal negative vs. positive classifications with full cellular metrics and micrograph inspection.',
          highlights: ['On-device RBC classification', 'Clear green/red diagnostic alerts', 'High-res micrograph audit trail'],
        },
      },
    },
    projectOverview: {
      badge: 'ENGINEERED FOR THE FIELD',
      heading: 'Designed around the realities of rural & point-of-care clinics.',
      description:
        'Every layer of the JeevDristi platform—from precision optics to intuitive mobile UI—is built to ensure high diagnostic reliability in resource-limited environments.',
      features: [
        {
          tag: 'Autonomous',
          title: '100% Offline AI Analysis',
          description:
            'Advanced computer vision models run directly inside the testing device. Complete screening autonomy in remote field clinics and rural health camps with zero internet or cloud dependency.',
          highlights: ['On-device morphology detection', 'No cloud delay or subscription fees', 'Local encrypted result storage'],
        },
        {
          tag: 'Quality Control',
          title: 'Standardized Guided Testing',
          description:
            'Interactive, clear on-screen guidance takes health workers step-by-step through sample preparation, optical calibration, incubation timing, and test completion.',
          highlights: ['Step-by-step visual timers', 'Error prevention checks', 'Operator test verification'],
        },
        {
          tag: 'Zero-Cloud',
          title: 'Direct USB Data Transfer',
          description:
            'Transfer completed test records directly from your Android phone to a computer using a standard USB cable—without uploading sensitive patient data to any external server.',
          highlights: ['6-digit PIN code confirmation', 'Zero computer software setup', 'End-to-end local privacy'],
        },
        {
          tag: 'Diagnostics',
          title: 'Clinical Reports & Integrity',
          description:
            'Instant clinical PDF summary generation, high-resolution cell morphology inspection, and verified archive packages for seamless medical record integration.',
          highlights: ['Digital verification checks', 'Standardized medical format', 'Tamper-evident audit logs'],
        },
        {
          tag: 'Portability',
          title: 'Ultra-Low Power & Portable',
          description:
            'Engineered with an optimized optical chamber and calibrated illumination, powered for all-day mobile screening from any standard USB power bank or adapter.',
          highlights: ['Standard USB-C power input', 'Compact rugged enclosure', 'All-day field battery life'],
        },
        {
          tag: 'Engineering',
          title: 'Medical Grade Reliability',
          description:
            'Engineered with rigorous quality standards at IIT Bhilai. Calibrated optics, precision manufacturing, and validated diagnostic workflows.',
          highlights: ['Institutional quality standards', 'Consistent optical response', 'Field-tested durability'],
        },
      ],
    },
    workflow: {
      badge: 'STEP-BY-STEP OPERATION',
      heading: 'From sample to verified result. One unified flow.',
      description:
        'Designed for minimal cognitive overhead so community health workers and clinicians can conduct rapid tests with high repeatability.',
      steps: [
        {
          step: '01',
          duration: '10 sec',
          title: 'Connect & Initialize',
          subtitle: 'Automatic device pairing',
          description:
            'Turn on the testing device and open JeevDristi on your phone. The app connects securely and completes automatic optical self-calibration.',
        },
        {
          step: '02',
          duration: '2 min',
          title: 'Load Specimen Slide',
          subtitle: 'Sample cartridge dock',
          description:
            'Insert the prepared blood cartridge into the light-shielded optical chamber. On-screen prompts confirm correct positioning and focus.',
        },
        {
          step: '03',
          duration: '30 sec',
          title: 'Autonomous AI Scan',
          subtitle: 'Built-in diagnostic analysis',
          description:
            'The device captures high-resolution optical scans and executes built-in AI models to evaluate sickled cell morphology and cellular density.',
        },
        {
          step: '04',
          duration: 'Instant',
          title: 'Review & Export',
          subtitle: 'Verified clinical report',
          description:
            'View diagnostic classification immediately on the mobile app. Connect to any PC via USB cable to inspect artifacts and save complete records.',
        },
      ],
      completedPhase: (phase: number) => `Phase ${phase} completed`,
    },
    techSpecs: {
      badge: 'PRODUCT SPECIFICATIONS',
      heading: 'Integrated hardware, companion app, and portal.',
      description:
        'A cohesive diagnostic platform connecting precision optics, mobile control, and secure data export.',
      tabBox: 'Testing Device',
      tabApp: 'Mobile App',
      tabPortal: 'Web Portal',
      box: {
        card1Title: 'Built-in AI Engine',
        card1Sub: 'On-Device Processing',
        card1Items: [
          { label: 'Processor', value: 'Dedicated multi-core embedded AI unit' },
          { label: 'Inference', value: 'Instant cellular morphology classification' },
          { label: 'Operation', value: '100% offline self-contained analysis' },
          { label: 'Power Input', value: 'Standard 5V USB-C rechargeable' },
        ],
        card2Title: 'Optics & Sensors',
        card2Sub: 'Micro-Imaging Stage',
        card2Items: [
          { label: 'Sensor', value: 'High-resolution micro-optical sensor' },
          { label: 'Illumination', value: 'Calibrated narrow-band LED source' },
          { label: 'Chamber', value: 'Light-shielded microfluidic slide dock' },
          { label: 'Resolution', value: 'High-magnification cellular view' },
        ],
        card3Title: 'Field Durability',
        card3Sub: 'Rugged Portable Enclosure',
        card3Items: [
          { label: 'Enclosure', value: 'Shock-resistant field housing' },
          { label: 'Form Factor', value: 'Compact, lightweight handheld footprint' },
          { label: 'Battery Life', value: 'All-day mobile screening capable' },
          { label: 'Environment', value: 'Designed for tropical field clinics' },
        ],
        strip1Badge: 'Prototype Stage',
        strip1Title: 'IIT Bhilai Optical Unit',
        strip1Desc: 'Lab-validated functional prototype with calibrated light chamber.',
        strip2Badge: 'Production Target',
        strip2Title: 'IBITF Medical Enclosure',
        strip2Desc: 'Sterilizable polymer body designed for field clinic deployment.',
      },
      app: {
        card1Title: 'Operator Experience',
        card1Sub: 'Android Companion',
        card1Items: [
          { label: 'Compatibility', value: 'Android 8.0 or higher' },
          { label: 'Interface', value: 'Step-by-step visual timers & alerts' },
          { label: 'Storage', value: 'Local encrypted patient records' },
          { label: 'Connectivity', value: 'Zero cellular or Wi-Fi requirement' },
        ],
        card2Title: 'Data Security',
        card2Sub: 'Operator & Patient Privacy',
        card2Items: [
          { label: 'Authentication', value: 'PIN / Biometric operator login' },
          { label: 'Encryption', value: 'High-grade local database protection' },
          { label: 'Anonymization', value: 'De-identified demographic tokens' },
          { label: 'Integrity', value: 'Tamper-evident test result logs' },
        ],
        card3Title: 'Clinical Reporting',
        card3Sub: 'Instant Documentation',
        card3Items: [
          { label: 'PDF Generation', value: 'On-device instant report creation' },
          { label: 'Export', value: 'Direct USB transfer or local sharing' },
          { label: 'Languages', value: 'Multi-language regional support' },
          { label: 'Standard', value: 'Standardized diagnostic format' },
        ],
        stripBadge: 'Offline UI',
        stripTitle: 'JeevDristi Android Application',
        stripDesc: 'Streamlined operator dashboard with searchable patient histories and local PDF exports.',
      },
      webusb: {
        card1Title: 'Direct USB Link',
        card1Sub: 'Zero-Install Protocol',
        card1Items: [
          { label: 'Browser', value: 'Works directly in Chrome and Edge' },
          { label: 'Install', value: 'Zero software installation needed on PC' },
          { label: 'Connection', value: 'Standard USB-C to USB-A/C cable' },
          { label: 'Speed', value: 'Instantaneous local data transfer' },
        ],
        card2Title: 'Zero-Cloud Privacy',
        card2Sub: 'Complete Data Sovereignty',
        card2Items: [
          { label: 'Storage', value: 'No tracking cookies or browser storage' },
          { label: 'Servers', value: 'Zero external server uploads' },
          { label: 'Session', value: 'Ephemeral in-memory transfer' },
          { label: 'PIN Code', value: '6-digit physical confirmation code' },
        ],
        card3Title: 'Data Packaging',
        card3Sub: 'Verified Archive Format',
        card3Items: [
          { label: 'Format', value: 'Verified ZIP package with test records' },
          { label: 'Artifacts', value: 'Clinical PDF + Micrographs + Summary' },
          { label: 'Integrity', value: 'Checksum-verified data bundle' },
          { label: 'Compatibility', value: 'Ready for clinic database import' },
        ],
        stripBadge: 'AI Morphology Reports',
        stripTitle: 'Diagnostic Result Inspection',
        stripDesc: 'High-magnification cell images, clear negative/positive status, and complete diagnostic packages.',
      },
    },
    promo: {
      badge: 'DIRECT PHONE EXPORT',
      heading: 'Inspect results directly from your phone.',
      description:
        'Connect your Android device via standard USB cable to access the zero-cloud Web Portal. Review patient test histories, preview generated PDF clinical summaries, inspect cropped cellular images, and download integrity-verified ZIP packages directly onto your desktop.',
      bulletCloud: 'Zero cloud upload',
      bulletStorage: 'Zero browser storage',
      bulletPin: 'PIN code authorization',
      portalBoxTitle: 'Phone Results Portal',
      portalBoxSub: 'Hardware-authenticated WebUSB session',
      portalBoxDesc: 'No software installation required on your computer. Open directly in Chrome or Edge.',
      btnOpen: 'Open Phone Results Portal',
      privacyNote: 'Data stays strictly between your phone and this browser.',
    },
    downloads: {
      badge: 'OFFICIAL SOFTWARE & PACKAGES',
      heading: 'Ready for the field. Download official packages.',
      description:
        'Official application packages, testing unit firmware, and diagnostic workstation images for field deployments and clinical screening camps.',
      cardApp: {
        title: 'JeevDristi Mobile App',
        desc: 'Companion Android application for guided testing, on-screen results, patient history, and report export.',
        compatLabel: 'Compatibility:',
        compatVal: 'Android 8.0+',
        formatLabel: 'Format:',
        formatVal: 'Official APK (.apk)',
        verifLabel: 'Verification:',
        verifVal: 'Signed & Verified',
        btn: 'Download Android APK',
      },
      cardBox: {
        title: 'POCT Box Firmware',
        desc: 'Firmware image for the portable POCT turbidity testing box with autonomous optical capture and BLE link.',
        targetLabel: 'Target Unit:',
        targetVal: 'JeevDristi Box',
        formatLabel: 'Format:',
        formatVal: 'A/B Image (.xz)',
        archLabel: 'Architecture:',
        archVal: 'ARM64',
        btn: 'Download Box Firmware',
      },
      cardTerminal: {
        title: 'SCD Terminal Image',
        desc: 'Kiosk appliance image for single-cell automated microscopy terminal with ONNX Cellpose segmentation.',
        targetLabel: 'Target Unit:',
        targetVal: 'Microscopy Unit',
        formatLabel: 'Format:',
        formatVal: 'Kiosk Image (.xz)',
        archLabel: 'Architecture:',
        archVal: 'ARM64',
        btn: 'Download Terminal Image',
      },
      cardSupport: {
        title: 'Support & Portal',
        desc: 'Connect phone via WebUSB to review clinical results, preview data, and access user guides.',
        instLabel: 'Institution:',
        instVal: 'IIT Bhilai POCT',
        portalLabel: 'Portal:',
        portalVal: 'Direct WebUSB',
        assistLabel: 'Assistance:',
        assistVal: 'Research Team',
        btn: 'Launch Web Portal',
      },
    },
    footer: {
      about:
        'A point-of-care medical diagnostics and computer vision innovation project developed at the Indian Institute of Technology Bhilai (IIT Bhilai).',
      navTop: 'Top',
      rights: (year: number) => `© ${year} IIT Bhilai POCT Project. All rights reserved.`,
      status: 'All Systems Operational • Offline-First Ready',
    },
  },
  hi: {
    brand: {
      title: 'जीवदृष्टि',
      subtitle: 'सिकलसेंस पीओसीटी',
    },
    nav: {
      overview: 'अवलोकन',
      showcase: 'प्रदर्शन',
      workflow: 'कार्यप्रणाली',
      specs: 'विशिष्टताएँ',
      results: 'फ़ोन परिणाम',
      downloads: 'डाउनलोड',
      portal: 'वेब पोर्टल',
      downloadApp: 'ऐप डाउनलोड',
      language: 'भाषा',
    },
    hero: {
      badge: 'आईआईटी भिलाई चिकित्सा नवाचार • सिकलसेंस पीओसीटी',
      headingLine1: 'जाँच स्थल पर',
      headingLine2: 'सटीक स्पष्टता।',
      description:
        'सटीक ऑप्टिकल परीक्षण, ऑन-डिवाइस एआई सेल आकारिकी विश्लेषण, और ज़ीरो-क्लाउड फील्ड रिपोर्टिंग एक ही एकीकृत मंच पर—बिना इंटरनेट के भी कहीं भी काम करने के लिए निर्मित।',
      downloadApk: (version?: string) =>
        version ? `एंड्रॉइड ऐप डाउनलोड करें (v${version})` : 'एंड्रॉइड ऐप डाउनलोड करें',
      downloadPreparing: 'डाउनलोड तैयार हो रहा है...',
      openPortal: 'वेब पोर्टल खोलें',
      chipHardware: 'आईआईटी भिलाई ऑप्टिकल यूनिट',
      chipSoftware: 'जीवदृष्टि ऑफलाइन साथी ऐप',
      chipDock: 'कैलिब्रेटेड कार्ट्रिज डॉक',
      highlights: {
        timeValue: '< 5 मिनट',
        timeLabel: 'त्वरित स्क्रीनिंग',
        offlineValue: '100% ऑफलाइन',
        offlineLabel: 'इंटरनेट की आवश्यकता नहीं',
        syncValue: 'डायरेक्ट यूएसबी सिंक',
        syncLabel: 'सीधा डेटा ट्रांसफर',
        verifiedValue: 'सत्यापित',
        verifiedLabel: 'नैदानिक विश्वसनीयता',
      },
    },
    showcase: {
      badge: 'मंच अवलोकन',
      heading: 'ऑप्टिक्स से लेकर मोबाइल एनालिटिक्स तक संपूर्ण इकोसिस्टम।',
      description:
        'मैदानी विश्वसनीयता के लिए विशेष रूप से डिज़ाइन की गई ऑप्टिकल यूनिट, मोबाइल ऐप, मेडिकल एनक्लोज़र और डायग्नोस्टिक रिपोर्टिंग की विस्तृत जानकारी।',
      cards: {
        prototype: {
          badge: 'आईआईटी भिलाई यूनिट',
          title: 'प्रोटोटाइप फ़ोकस',
          subtitle: 'नवाचार का उत्सव: कार्यात्मक प्रोटोटाइप',
          description:
            'आईआईटी भिलाई में विकसित प्रयोगशाला-परीक्षित ऑप्टिकल यूनिट, जो सटीक एलईडी रोशनी और रियल-टाइम नमूना प्रसंस्करण के लिए समर्पित स्टैंड प्रदान करती है।',
          highlights: ['माइक्रो-ऑप्टिकल स्टेज', 'आईआईटी भिलाई सील एवं कैलिब्रेटेड डॉक', 'लाइव साथी सिंक्रोनाइज़ेशन'],
        },
        app: {
          badge: 'एंड्रॉइड साथी ऐप',
          title: 'ऐप नियंत्रण एवं रिपोर्ट्स',
          subtitle: 'सहज और सुरक्षित डेटा प्रबंधन',
          description:
            'जीवदृष्टि एंड्रॉइड इंटरफ़ेस जो पूरी तरह ऑफलाइन रहते हुए व्यापक रोगी खोज, व्यवस्थित परीक्षण इतिहास और त्वरित नैदानिक रिपोर्ट प्रदान करता है।',
          highlights: ['100% ऑफलाइन रोगी डेटाबेस', 'हाल की रिपोर्ट्स और खोज फ़िल्टर', 'त्वरित पीडीएफ नैदानिक सारांश'],
        },
        medical: {
          badge: 'उत्पादन लक्ष्य',
          title: 'अंतिम उत्पाद अवधारणा - मेडिकल ग्रेड',
          subtitle: 'भविष्य के लिए तैयार: मेडिकल ग्रेड सामग्री',
          description:
            'आईबीआईटीएफ मेडिकल मानकों के अनुसार डिज़ाइन किया गया अगली पीढ़ी का एनक्लोज़र, जिसमें प्रकाश-रोधी कार्ट्रिज कक्ष और टिकाऊ आवास शामिल है।',
          highlights: ['आईबीआईटीएफ संस्थागत डिज़ाइन', 'प्रकाश-रोधी नमूना कक्ष', 'अत्यधिक टिकाऊ नैदानिक संरचना'],
        },
        analytics: {
          badge: 'एआई डायग्नोस्टिक्स',
          title: 'विस्तृत एनालिटिक्स',
          subtitle: 'तुरंत और स्पष्ट परिणाम',
          description:
            'डायरेक्ट ऑन-डिवाइस एआई सेल विश्लेषण जो सटीक नेगेटिव बनाम पॉज़िटिव वर्गीकरण, पूर्ण सेलुलर मेट्रिक्स और माइक्रोग्राफ निरीक्षण उपलब्ध कराता है।',
          highlights: ['ऑन-डिवाइस आरबीसी वर्गीकरण', 'स्पष्ट हरे/लाल डायग्नोस्टिक अलर्ट', 'हाई-रिज़ॉल्यूशन माइक्रोग्राफ ऑडिट'],
        },
      },
    },
    projectOverview: {
      badge: 'ग्रामीण स्वास्थ्य हेतु निर्मित',
      heading: 'ग्रामीण और प्राथमिक स्वास्थ्य केंद्रों की आवश्यकताओं के अनुरूप।',
      description:
        'जीवदृष्टि प्लेटफॉर्म की हर परत—सटीक ऑप्टिक्स से लेकर सहज मोबाइल यूआई तक—सीमित संसाधनों वाले क्षेत्रों में उच्च नैदानिक विश्वसनीयता सुनिश्चित करती है।',
      features: [
        {
          tag: 'स्वायत्त',
          title: '100% ऑफलाइन एआई विश्लेषण',
          description:
            'उन्नत कंप्यूटर विज़न मॉडल सीधे परीक्षण उपकरण में चलते हैं। बिना इंटरनेट या क्लाउड निर्भरता के दूरस्थ फील्ड क्लीनिकों और स्वास्थ्य शिविरों में पूर्ण स्वायत्तता।',
          highlights: ['ऑन-डिवाइस सेल पहचान', 'क्लाउड विलंब या सदस्यता शुल्क नहीं', 'स्थानीय एन्क्रिप्टेड परिणाम भंडारण'],
        },
        {
          tag: 'गुणवत्ता नियंत्रण',
          title: 'मानकीकृत निर्देशित परीक्षण',
          description:
            'स्पष्ट ऑन-स्क्रीन निर्देश स्वास्थ्य कार्यकर्ताओं को नमूना तैयार करने, ऑप्टिकल कैलिब्रेशन, समय और परीक्षण पूर्णता के हर चरण पर मार्गदर्शन करते हैं।',
          highlights: ['चरण-दर-चरण दृश्य टाइमर', 'त्रुटि रोकथाम सत्यापन', 'ऑपरेटर परीक्षण सत्यापन'],
        },
        {
          tag: 'ज़ीरो-क्लाउड',
          title: 'डायरेक्ट यूएसबी डेटा ट्रांसफर',
          description:
            'संवेदनशील रोगी डेटा को किसी बाहरी सर्वर पर अपलोड किए बिना, मानक यूएसबी केबल से सीधे अपने फ़ोन से कंप्यूटर पर रिकॉर्ड ट्रांसफर करें।',
          highlights: ['6-अंकों का पिन कोड सत्यापन', 'कंप्यूटर पर किसी अतिरिक्त सॉफ़्टवेयर की आवश्यकता नहीं', 'शुरुआत से अंत तक पूर्ण स्थानीय गोपनीयता'],
        },
        {
          tag: 'डायग्नोस्टिक्स',
          title: 'नैदानिक रिपोर्ट्स एवं अखंडता',
          description:
            'त्वरित पीडीएफ नैदानिक सारांश, उच्च-रिज़ॉल्यूशन सेल माइक्रोग्राफ निरीक्षण और मेडिकल रिकॉर्ड हेतु सत्यापित संग्रह पैकेज।',
          highlights: ['डिजिटल सत्यापन जाँच', 'मानकीकृत चिकित्सा प्रारूप', 'छेड़छाड़-रोधी ऑडिट लॉग्स'],
        },
        {
          tag: 'पोर्टेबिलिटी',
          title: 'अति-निम्न ऊर्जा एवं पोर्टेबल',
          description:
            'अनुकूलित ऑप्टिकल कक्ष और कैलिब्रेटेड रोशनी, जो किसी भी मानक यूएसबी पावर बैंक या एडाप्टर से दिनभर की जाँच के लिए संचालित होती है।',
          highlights: ['मानक यूएसबी-सी पावर इनपुट', 'कॉम्पैक्ट और मजबूत केसिंग', 'दिनभर चलने वाली बैटरी लाइफ'],
        },
        {
          tag: 'इंजीनियरिंग',
          title: 'मेडिकल-ग्रेड विश्वसनीयता',
          description:
            'आईआईटी भिलाई में कड़े गुणवत्ता मानकों के साथ विकसित। कैलिब्रेटेड ऑप्टिक्स, सटीक विनिर्माण और प्रमाणित वर्कफ़्लो।',
          highlights: ['संस्थागत गुणवत्ता मानक', 'समान ऑप्टिकल परिणाम', 'मैदानी परीक्षणों में प्रमाणित मजबूती'],
        },
      ],
    },
    workflow: {
      badge: 'चरण-दर-चरण कार्यप्रणाली',
      heading: 'नमूने से लेकर सत्यापित परिणाम तक। एक सहज प्रवाह।',
      description:
        'सरल एवं स्पष्ट डिज़ाइन ताकि स्वास्थ्य कार्यकर्ता और चिकित्सक उच्च सटीकता से त्वरित परीक्षण आसानी से कर सकें।',
      steps: [
        {
          step: '01',
          duration: '10 सेकंड',
          title: 'कनेक्ट और प्रारंभ करें',
          subtitle: 'स्वचालित डिवाइस पेयरिंग',
          description:
            'डिवाइस चालू करें और फ़ोन में जीवदृष्टि ऐप खोलें। ऐप सुरक्षित रूप से कनेक्ट होता है और स्वचालित ऑप्टिकल कैलिब्रेशन पूरा करता है।',
        },
        {
          step: '02',
          duration: '2 मिनट',
          title: 'नमूना स्लाइड डालें',
          subtitle: 'नमूना कार्ट्रिज डॉक',
          description:
            'तैयार रक्त कार्ट्रिज को प्रकाश-रोधी ऑप्टिकल कक्ष में डालें। स्क्रीन पर दिए गए निर्देश सही स्थिति और फ़ोकस की पुष्टि करते हैं।',
        },
        {
          step: '03',
          duration: '30 सेकंड',
          title: 'स्वायत्त एआई स्कैन',
          subtitle: 'ऑन-डिवाइस नैदानिक विश्लेषण',
          description:
            'डिवाइस उच्च-रिज़ॉल्यूशन स्कैन कैप्चर करता है और सिकल कोशिकाओं के आकार व घनत्व का विश्लेषण करने के लिए अंतर्निहित एआई मॉडल चलाता है।',
        },
        {
          step: '04',
          duration: 'तुरंत',
          title: 'समीक्षा एवं एक्सपोर्ट',
          subtitle: 'सत्यापित नैदानिक रिपोर्ट',
          description:
            'मोबाइल ऐप पर तुरंत परिणाम देखें। विस्तृत रिकॉर्ड देखने और सहेजने के लिए यूएसबी केबल से किसी भी पीसी से कनेक्ट करें।',
        },
      ],
      completedPhase: (phase: number) => `चरण ${phase} पूर्ण`,
    },
    techSpecs: {
      badge: 'उत्पाद विशिष्टताएँ',
      heading: 'एकीकृत हार्डवेयर, साथी मोबाइल ऐप और वेब पोर्टल।',
      description:
        'सटीक ऑप्टिक्स, मोबाइल नियंत्रण और सुरक्षित डेटा एक्सपोर्ट को जोड़ने वाला एक संपूर्ण डायग्नोस्टिक प्लेटफॉर्म।',
      tabBox: 'परीक्षण उपकरण',
      tabApp: 'मोबाइल ऐप',
      tabPortal: 'वेब पोर्टल',
      box: {
        card1Title: 'अंतर्निहित एआई इंजन',
        card1Sub: 'ऑन-डिवाइस प्रोसेसिंग',
        card1Items: [
          { label: 'प्रोसेसर', value: 'समर्पित मल्टी-कोर एम्बेडेड एआई यूनिट' },
          { label: 'इनफरेंस', value: 'तुरंत सेलुलर आकारिकी वर्गीकरण' },
          { label: 'संचालन', value: '100% ऑफलाइन आत्मनिर्भर विश्लेषण' },
          { label: 'पावर इनपुट', value: 'मानक 5V यूएसबी-सी रिचार्जेबल' },
        ],
        card2Title: 'ऑप्टिक्स एवं सेंसर्स',
        card2Sub: 'माइक्रो-इमेजिंग स्टेज',
        card2Items: [
          { label: 'सेंसर', value: 'उच्च-रिज़ॉल्यूशन माइक्रो-ऑप्टिकल सेंसर' },
          { label: 'रोशनी स्रोत', value: 'कैलिब्रेटेड नैरो-बैंड एलईडी' },
          { label: 'चैंबर', value: 'प्रकाश-रोधी माइक्रोफ्लुइडिक स्लाइड डॉक' },
          { label: 'रिज़ॉल्यूशन', value: 'उच्च-आवर्धन सेलुलर दृश्य' },
        ],
        card3Title: 'मैदानी मजबूती',
        card3Sub: 'मजबूत पोर्टेबल एनक्लोज़र',
        card3Items: [
          { label: 'एनक्लोज़र', value: 'शॉक-प्रतिरोधी फील्ड हाउसिंग' },
          { label: 'आकार', value: 'कॉम्पैक्ट, हल्का हैंडहेल्ड डिज़ाइन' },
          { label: 'बैटरी बैकअप', value: 'दिनभर मोबाइल स्क्रीनिंग हेतु सक्षम' },
          { label: 'पर्यावरण', value: 'उष्णकटिबंधीय फील्ड क्लीनिकों हेतु अनुकूलित' },
        ],
        strip1Badge: 'प्रोटोटाइप चरण',
        strip1Title: 'आईआईटी भिलाई ऑप्टिकल यूनिट',
        strip1Desc: 'कैलिब्रेटेड लाइट चैंबर के साथ प्रयोगशाला-प्रमाणित कार्यात्मक प्रोटोटाइप।',
        strip2Badge: 'उत्पादन लक्ष्य',
        strip2Title: 'आईबीआईटीएफ मेडिकल एनक्लोज़र',
        strip2Desc: 'फील्ड क्लीनिकों में तैनाती के लिए डिज़ाइन किया गया स्टेरलाइज़ेबल पॉलीमर केस।',
      },
      app: {
        card1Title: 'ऑपरेटर अनुभव',
        card1Sub: 'एंड्रॉइड साथी ऐप',
        card1Items: [
          { label: 'अनुकूलता', value: 'एंड्रॉइड 8.0 या उच्चतर' },
          { label: 'इंटरफ़ेस', value: 'चरण-दर-चरण दृश्य टाइमर और अलर्ट' },
          { label: 'स्टोरेज', value: 'स्थानीय एन्क्रिप्टेड रोगी रिकॉर्ड' },
          { label: 'कनेक्टिविटी', value: 'सेल्युलर या वाई-फ़ाई की कोई आवश्यकता नहीं' },
        ],
        card2Title: 'डेटा सुरक्षा',
        card2Sub: 'ऑपरेटर एवं रोगी गोपनीयता',
        card2Items: [
          { label: 'प्रमाणीकरण', value: 'पिन / बायोमेट्रिक ऑपरेटर लॉगिन' },
          { label: 'एन्क्रिप्शन', value: 'उच्च-स्तरीय स्थानीय डेटाबेस सुरक्षा' },
          { label: 'अनामिकरण', value: 'डी-आइडेंटिफ़ाइड जनसांख्यिकीय टोकन' },
          { label: 'अखंडता', value: 'छेड़छाड़-रोधी परीक्षण परिणाम लॉग्स' },
        ],
        card3Title: 'नैदानिक रिपोर्टिंग',
        card3Sub: 'त्वरित दस्तावेज़ीकरण',
        card3Items: [
          { label: 'पीडीएफ निर्माण', value: 'ऑन-डिवाइस त्वरित रिपोर्ट निर्माण' },
          { label: 'एक्सपोर्ट', value: 'सीधा यूएसबी ट्रांसफर या स्थानीय शेयरिंग' },
          { label: 'भाषाएँ', value: 'क्षेत्रीय बहुभाषी समर्थन' },
          { label: 'मानक', value: 'मानकीकृत नैदानिक प्रारूप' },
        ],
        stripBadge: 'ऑफलाइन यूआई',
        stripTitle: 'जीवदृष्टि एंड्रॉइड एप्लिकेशन',
        stripDesc: 'खोजने योग्य रोगी इतिहास और स्थानीय पीडीएफ एक्सपोर्ट के साथ सुव्यवस्थित डैशबोर्ड।',
      },
      webusb: {
        card1Title: 'डायरेक्ट यूएसबी लिंक',
        card1Sub: 'ज़ीरो-इंस्टॉल प्रोटोकॉल',
        card1Items: [
          { label: 'ब्राउज़र', value: 'क्रोम और एज में सीधे काम करता है' },
          { label: 'इंस्टॉलेशन', value: 'पीसी पर किसी सॉफ्टवेयर इंस्टॉलेशन की आवश्यकता नहीं' },
          { label: 'कनेक्शन', value: 'मानक यूएसबी-सी से यूएसबी-ए/सी केबल' },
          { label: 'गति', value: 'त्वरित स्थानीय डेटा ट्रांसफर' },
        ],
        card2Title: 'ज़ीरो-क्लाउड प्राइवेसी',
        card2Sub: 'पूर्ण डेटा संप्रभुता',
        card2Items: [
          { label: 'स्टोरेज', value: 'कोई ट्रैकिंग कुकीज़ या ब्राउज़र स्टोरेज नहीं' },
          { label: 'सर्वर', value: 'बाहरी सर्वर पर शून्य अपलोड' },
          { label: 'सत्र', value: 'अस्थायी इन-मेमोरी सुरक्षित ट्रांसफर' },
          { label: 'पिन कोड', value: '6-अंकों का भौतिक पुष्टि कोड' },
        ],
        card3Title: 'डेटा पैकेजिंग',
        card3Sub: 'सत्यापित संग्रह प्रारूप',
        card3Items: [
          { label: 'प्रारूप', value: 'परीक्षण रिकॉर्ड के साथ सत्यापित ज़िप पैकेज' },
          { label: 'सामग्री', value: 'नैदानिक पीडीएफ + माइक्रोग्राफ + सारांश' },
          { label: 'अखंडता', value: 'चेकसम-सत्यापित डेटा बंडल' },
          { label: 'अनुकूलता', value: 'क्लीनिक डेटाबेस में आयात के लिए तैयार' },
        ],
        stripBadge: 'एआई सेल रिपोर्ट्स',
        stripTitle: 'नैदानिक परिणाम निरीक्षण',
        stripDesc: 'उच्च-आवर्धन सेल छवियां, स्पष्ट नेगेटिव/पॉज़िटिव स्थिति और पूर्ण डायग्नोस्टिक पैकेज।',
      },
    },
    promo: {
      badge: 'सीधा फ़ोन एक्सपोर्ट',
      heading: 'अपने फ़ोन से सीधे परिणाम देखें और निर्यात करें।',
      description:
        'ज़ीरो-क्लाउड वेब पोर्टल तक पहुँचने के लिए अपने एंड्रॉइड डिवाइस को मानक यूएसबी केबल से कनेक्ट करें। रोगी परीक्षण इतिहास देखें, पीडीएफ सारांश का पूर्वावलोकन करें, सेल छवियां देखें और सीधे कंप्यूटर पर सत्यापित ज़िप पैकेज डाउनलोड करें।',
      bulletCloud: 'शून्य क्लाउड अपलोड',
      bulletStorage: 'शून्य ब्राउज़र स्टोरेज',
      bulletPin: 'पिन कोड प्रमाणीकरण',
      portalBoxTitle: 'फ़ोन परिणाम पोर्टल',
      portalBoxSub: 'हार्डवेयर-प्रमाणित वेब-यूएसबी सत्र',
      portalBoxDesc: 'कंप्यूटर पर किसी सॉफ़्टवेयर स्थापना की आवश्यकता नहीं। क्रोम या एज में सीधे खोलें।',
      btnOpen: 'फ़ोन परिणाम पोर्टल खोलें',
      privacyNote: 'डेटा केवल आपके फ़ोन और इस ब्राउज़र के बीच ही सुरक्षित रहता है।',
    },
    downloads: {
      badge: 'आधिकारिक सॉफ्टवेयर एवं पैकेज',
      heading: 'मैदानी उपयोग हेतु तैयार। आधिकारिक पैकेज डाउनलोड करें।',
      description:
        'फील्ड तैनाती और स्वास्थ्य शिविरों के लिए आधिकारिक एप्लिकेशन पैकेज, टेस्टिंग यूनिट फ़र्मवेयर और डायग्नोस्टिक वर्कस्टेशन इमेज।',
      cardApp: {
        title: 'जीवदृष्टि मोबाइल ऐप',
        desc: 'निर्देशित परीक्षण, ऑन-स्क्रीन परिणाम, रोगी इतिहास और रिपोर्ट एक्सपोर्ट हेतु साथी एंड्रॉइड ऐप।',
        compatLabel: 'अनुकूलता:',
        compatVal: 'एंड्रॉइड 8.0+',
        formatLabel: 'प्रारूप:',
        formatVal: 'आधिकारिक एपीके (.apk)',
        verifLabel: 'सत्यापन:',
        verifVal: 'हस्ताक्षरित एवं सत्यापित',
        btn: 'एंड्रॉइड एपीके डाउनलोड करें',
      },
      cardBox: {
        title: 'पीओसीटी बॉक्स फ़र्मवेयर',
        desc: 'स्वायत्त ऑप्टिकल कैप्चर और बीएलई लिंक वाले पोर्टेबल टर्बिडिटी टेस्टिंग बॉक्स हेतु फ़र्मवेयर इमेज।',
        targetLabel: 'लक्षित इकाई:',
        targetVal: 'जीवदृष्टि बॉक्स',
        formatLabel: 'प्रारूप:',
        formatVal: 'ए/बी इमेज (.xz)',
        archLabel: 'आर्किटेक्चर:',
        archVal: 'ARM64',
        btn: 'बॉक्स फ़र्मवेयर डाउनलोड करें',
      },
      cardTerminal: {
        title: 'एससीडी टर्मिनल इमेज',
        desc: 'ऑनिक्स सेलपोज़ सेगमेंटेशन के साथ सिंगल-सेल ऑटोमेटेड माइक्रोस्कोपी टर्मिनल हेतु कियोस्क इमेज।',
        targetLabel: 'लक्षित इकाई:',
        targetVal: 'माइक्रोस्कोपी इकाई',
        formatLabel: 'प्रारूप:',
        formatVal: 'कियोस्क इमेज (.xz)',
        archLabel: 'आर्किटेक्चर:',
        archVal: 'ARM64',
        btn: 'टर्मिनल इमेज डाउनलोड करें',
      },
      cardSupport: {
        title: 'सहायता एवं पोर्टल',
        desc: 'नैदानिक परिणाम देखने, डेटा का पूर्वावलोकन करने और उपयोगकर्ता गाइड प्राप्त करने हेतु फ़ोन कनेक्ट करें।',
        instLabel: 'संस्थान:',
        instVal: 'आईआईटी भिलाई पीओसीटी',
        portalLabel: 'पोर्टल:',
        portalVal: 'डायरेक्ट वेब-यूएसबी',
        assistLabel: 'सहायता:',
        assistVal: 'अनुसंधान दल',
        btn: 'वेब पोर्टल शुरू करें',
      },
    },
    footer: {
      about:
        'भारतीय प्रौद्योगिकी संस्थान भिलाई (आईआईटी भिलाई) में विकसित एक पॉइंट-ऑफ-केयर मेडिकल डायग्नोस्टिक्स एवं कंप्यूटर विज़न नवाचार परियोजना।',
      navTop: 'शीर्ष पर जाएँ',
      rights: (year: number) => `© ${year} आईआईटी भिलाई पीओसीटी परियोजना। सर्वाधिकार सुरक्षित।`,
      status: 'सभी प्रणालियाँ सक्रिय • 100% ऑफलाइन तैयार',
    },
  },
} as const

interface LanguageContextType {
  locale: Locale
  setLocale: (loc: Locale) => void
  t: (typeof translations)['en-IN']
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'hi' || stored === 'en-IN') return stored
      // Check browser preference
      const browserLang = navigator.language?.toLowerCase()
      if (browserLang.startsWith('hi')) return 'hi'
    } catch {
      // fallback
    }
    return 'en-IN'
  })

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = (translations[locale] ?? translations['en-IN']) as (typeof translations)['en-IN']

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
