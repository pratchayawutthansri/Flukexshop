import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Heart, 
  Terminal, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Code2,
  Globe,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  Copy,
  Eye,
  ZoomIn,
  Maximize2,
  Menu,
  Moon,
  User,
  Laptop
} from 'lucide-react';

// Multilingual Dictionary
const TRANSLATIONS = {
  th: {
    navHome: "หน้าหลัก",
    navModels: "สินค้าและบริการ",
    navHowTo: "วิธีการใช้งาน",
    navReviews: "รีวิวลูกค้า",
    navFaq: "คำถามที่พบบ่อย",
    navContact: "ติดต่อเรา",
    heroTagline: "เปิดใช้งานสิทธิ์จำลองทันที",
    heroTitleLine1: "ร้านค้า FLUKEXD",
    heroTitleLine2: "ผู้แนะนำบริการ AI",
    heroSubtitle: "เข้าถึงและเลือกช็อปโมเดลอัจฉริยะยอดฮิต ChatGPT, Gemini, และ Grok พร้อมคำอธิบายและแนวทางการเลือกใช้แบบกระชับ เข้าใจง่าย และตรงจุดที่สุดสำหรับคุณ",
    btnBrowse: "ดูโมเดลทั้งหมด",
    btnSandbox: "ติดต่อเรา",
    secSuiteTitle: "สินค้าและบริการ",
    secSuiteSubtitle: "โมเดล AI ยอดนิยม เลือกใช้งานง่าย พร้อมดูแลและรับประกันความเสถียร",
    sortBy: "จัดเรียงตาม:",
    sortDefault: "เรียงตามค่าเริ่มต้น",
    sortLow: "ราคา: ต่ำไปสูง",
    sortHigh: "ราคา: สูงไปต่ำ",
    rating: "คะแนน",
    addToBag: "ติดต่อสั่งซื้อ",
    contactTitle: "ช่องทางการติดต่อสั่งซื้อ",
    contactSubtitle: "แอดไลน์เพื่อสแกน QR Code หรือแชทผ่าน Facebook เพื่อสั่งซื้อบริการได้ทันที",
    contactLine: "แอดไลน์สั่งซื้อ (LINE OA)",
    contactFacebook: "ติดต่อทาง Facebook",
    contactSaveQR: "คัดลอกลิงก์ LINE เพื่อเพิ่มเพื่อน",
    contactToastCopy: "คัดลอกลิงก์ LINE เรียบร้อยแล้ว! 🟢",
    priceMonth: "เดือน",
    noProducts: "ไม่พบโมเดลที่ค้นหา",
    resetFilters: "ล้างตัวเลือกการกรอง",
    guaranteeTitle: "การรับประกันคุณภาพของเรา",
    guaranteeSubtitle: "เราให้ความสำคัญกับความเร็ว ความปลอดภัย และประสิทธิภาพสูงสุด การใช้งานจำลองของเราใช้งานได้ทันทีโดยไม่มีขั้นตอนยุ่งยาก",
    valDeliveryTitle: "ให้ติดต่อเราผ่านทางไลน์ หรือ เฟซบุ๊ค เพื่อสอบถามรายละเอียดใน Ai แต่ละตัว",
    valDeliveryDesc: "ทีมงานพร้อมให้ข้อมูลเกี่ยวกับ AI แต่ละตัว เพื่อช่วยให้คุณเลือกใช้บริการที่เหมาะสมที่สุด",
    valUptimeTitle: "รับประกันเรื่องคุณภาพ มีปัญหาติดต่อเราได้ในเวลาทำการ",
    valUptimeDesc: "หากพบปัญหาในการใช้งาน ทีมงานพร้อมช่วยเหลือและให้คำแนะนำอย่างละเอียด เพื่อให้คุณใช้งานได้อย่างราบรื่น",
    valReadyTitle: "ดูแลโดย Full stack developer",
    valReadyDesc: "ระบบของเราพัฒนาและดูแลโดยทีม Full stack developer มืออาชีพ มั่นใจได้ในความเสถียร ปลอดภัย และพร้อมอัปเดตอย่างต่อเนื่อง",
    reviewsTitle: "รีวิวจากลูกค้า",
    reviewsSubtitle: "สิ่งที่ผู้ใช้งานจริงพูดถึงบริการสิทธิ์ใบอนุญาต AI ของเรา",
    review1Text: "ซื้อ ChatGPT Plus กับ Fluke XD ไปสามรอบแล้วครับ รวดเร็วทันใจมาก คีย์จำลองทำงานได้สเตเบิลสุด ๆ เอาไปทดสอบทำระบบคุยกับเว็บได้ลื่นไหล แนะนำเลยครับ!",
    review2Text: "Gemini Pro context window 2M คุ้มค่ามาก ๆ บริการรวดเร็วทันใจ แถมให้คำปรึกษาดีเป็นกันเองสุด ๆ แฟนเพจตอบไวมาก",
    review3Text: "Super Grok ครบจบในตัวเดียวสมชื่อ! ทั้งงานภาพ งานเขียนโค้ด งานวิดีโอแรงแซงทางโค้ง แนะนำร้านนี้เลยครับ ดูแลหลังการขายเป็นเลิศ",
    faqTitle: "คำถามที่พบบ่อย (FAQ)",
    faqSubtitle: "คำถามที่พบบ่อยเกี่ยวกับการสั่งซื้อ การจัดส่ง และการรับประกันการใช้งานบริการ AI",
    faqQ1: "สั่งซื้อสินค้าและบริการอย่างไร?",
    faqA1: "ลูกค้าสามารถเลือกโมเดลที่ต้องการแล้วคลิกปุ่ม 'ติดต่อสั่งซื้อ' เพื่อแอด LINE หรือส่งข้อความทาง Facebook เพื่อทำรายการสั่งซื้อกับทีมงานได้ทันทีครับ",
    faqQ2: "หลังจากสั่งซื้อแล้วจะได้รับสินค้าภายในกี่นาที?",
    faqA2: "หลังจากการแจ้งโอนชำระเงินเรียบร้อยแล้ว ทีมงานจะส่งมอบสิทธิ์การเข้าใช้งานหรือคีย์ AI ให้คุณอย่างรวดเร็ว โดยทั่วไปใช้เวลาเพียง 10-30 นาทีในเวลาทำการครับ",
    faqQ3: "มีบริการดูแลหลังการขายและการรับประกันอย่างไร?",
    faqA3: "เรามีทีมงานพร้อมให้คำแนะนำช่วยเหลือในขั้นตอนการตั้งค่าและแก้ไขปัญหาการใช้งานตลอดระยะเวลารับประกัน หากพบปัญหาสามารถติดต่อผ่านไลน์หรือเฟซบุ๊กได้เลยครับ",
    footerDesc: "เรานำเสนอและดูแลสิทธิ์การเข้าใช้งานโมเดล AI ชั้นนำระดับโลก เพื่อเพิ่มประสิทธิภาพการทำงานและความคิดสร้างสรรค์ของท่านอย่างสูงสุด",
    footerLinks: "ลิงก์ด่วน",
    footerUptime: "สถานะระบบ",
    footerUptimeDesc: "รับการแจ้งเตือนโมเดลใหม่และการบำรุงรักษาเซิร์ฟเวอร์ก่อนใคร",
    cartTitle: "ถุงสินค้าของคุณ",
    cartAlmostThere: "ใกล้จะได้รับโบนัสแล้ว...",
    cartEarned: "ได้รับโบนัสเครดิตเพิ่มแล้ว!",
    cartToGo: "เหลืออีก เพื่อรับสิทธิ์ยกเว้นค่าธรรมเนียม",
    cartEmpty: "ถุงสินค้าของคุณว่างเปล่า",
    cartEmptyDesc: "เลือกซื้อรหัส AI เพื่อเริ่มทดสอบประสิทธิภาพกันได้เลย",
    cartDiscover: "สำรวจโมเดลทั้งหมด",
    cartSubtotal: "ยอดรวมสินค้า",
    cartSetupFee: "ค่าบริการเปิดระบบจำลอง",
    cartFree: "ฟรี",
    cartTotal: "ยอดรวมสุทธิ",
    cartCheckout: "ชำระเงินและเปิดสิทธิ์",
    modalAccent: "ธีมการใช้งาน (Accent)",
    modalBilling: "รอบบิลสมาชิก",
    modalSnippet: "โค้ดสำหรับเชื่อมต่อ (Integration Snippet)",
    modalEngine: "ชื่อโมเดลระบบ:",
    modalContext: "หน้าต่างบริบท (Context):",
    modalDelivery: "การส่งมอบ:",
    checkoutTitle: "จำลองขั้นตอนชำระเงิน",
    checkoutDesc: "กรอกข้อมูลจำลองเพื่อสั่งซื้อ ระบบจะสร้างรหัส API Key จำลองให้ทันทีหลังเสร็จสิ้น",
    checkoutStep1: "1. อีเมลบัญชีและที่อยู่จัดส่ง",
    checkoutName: "ชื่อ-นามสกุล",
    checkoutEmail: "ที่อยู่อีเมล",
    checkoutAddress: "ที่อยู่ในการเรียกเก็บเงิน",
    checkoutCity: "จังหวัด / เมือง",
    checkoutZip: "รหัสไปรษณีย์",
    checkoutStep2: "2. วิธีการชำระเงิน",
    checkoutCard: "หมายเลขบัตรเครดิต",
    checkoutExpiry: "วันหมดอายุ (MM/YY)",
    checkoutCvv: "รหัส CVV",
    checkoutCancel: "ยกเลิก",
    checkoutPlace: "สั่งซื้อ (Simulated)",
    successTitle: "เปิดใช้งานสำเร็จ!",
    successDesc: "ขอขอบคุณสำหรับคำสั่งซื้อจำลองของคุณ",
    successReceipt: "ใบเสร็จรับเงิน API Token",
    successOrderNo: "หมายเลขคำสั่งซื้อ",
    successStatus: "สถานะระบบ",
    successActive: "เปิดใช้งานแล้ว",
    successDeliveryType: "รูปแบบบริการ",
    successCourier: "รหัสเปิดใช้งาน API อัตโนมัติ",
    successKeyLabel: "คีย์ API จำลอง:",
    successCharged: "ชำระเงินทั้งหมด",
    successEmailSent: "ระบบได้ส่งอีเมลจำลองแจ้งรายละเอียดไปที่ เรียบร้อยแล้ว สามารถคัดลอกคีย์ API ด้านบนเพื่อเริ่มทดสอบแซนด์บ็อกซ์ได้ทันที",
    successBack: "กลับสู่แดชบอร์ดหลัก",
    toastCopy: "คัดลอกโค้ดตัวอย่างแล้ว! 📋",
    errorRequired: "จำเป็นต้องกรอกข้อมูลนี้",
    errorEmail: "รูปแบบอีเมลไม่ถูกต้อง",
    errorZip: "รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก",
    errorCard: "หมายเลขบัตรต้องเป็นตัวเลข 16 หลัก",
    errorExpiry: "กรุณาใช้รูปแบบ MM/YY",
    errorCvv: "รหัส CVV ต้องเป็น 3 หลัก",
    errorForm: "กรุณาแก้ไขข้อผิดพลาดในฟอร์มให้ถูกต้อง",
    heroUnderImageText: "ร้านเราพร้อมให้คำปรึกษาที่ดีแน่นอนครับผม"
  },
  en: {
    navHome: "Home",
    navModels: "Products & Services",
    navHowTo: "How to Use",
    navReviews: "Reviews",
    navFaq: "FAQs",
    navContact: "Contact Us",
    heroTagline: "Instant Simulated Licensing",
    heroTitleLine1: "FLUKEXD Shop",
    heroTitleLine2: "Your Premium AI Advisor",
    heroSubtitle: "Access and lease top-tier simulated AI licenses for ChatGPT, Gemini, and Grok. Complete with concise, simple, and high-impact advisor summaries.",
    btnBrowse: "Browse Models",
    btnSandbox: "Contact Us",
    secSuiteTitle: "Products & Services",
    secSuiteSubtitle: "Popular AI models, easy to choose and use, with guaranteed stability.",
    sortBy: "Sort By:",
    sortDefault: "Default Sorting",
    sortLow: "Price: Low to High",
    sortHigh: "Price: High to Low",
    rating: "Rating",
    addToBag: "Contact to Order",
    contactTitle: "Contact & Order Channels",
    contactSubtitle: "Scan the LINE QR Code or message us on Facebook to purchase services instantly.",
    contactLine: "Add LINE to Order",
    contactFacebook: "Message on Facebook",
    contactSaveQR: "Copy LINE Link to Add Friend",
    contactToastCopy: "LINE Link copied to clipboard! 🟢",
    priceMonth: "mo",
    noProducts: "No models match search",
    resetFilters: "Reset Filters",
    guaranteeTitle: "Our Quality Guarantee",
    guaranteeSubtitle: "We prioritize speed, security, and maximum performance. Our simulated licenses offer zero-hassle integration.",
    valDeliveryTitle: "Contact us via LINE or Facebook to ask about the details of each AI",
    valDeliveryDesc: "Our team is ready to provide information about each AI to help you choose the most suitable service.",
    valUptimeTitle: "Quality guaranteed, contact us during working hours if you have issues",
    valUptimeDesc: "If you encounter any issues, our team is ready to help and provide detailed guidance for a smooth experience.",
    valReadyTitle: "Maintained by Full stack developer",
    valReadyDesc: "Our system is developed and maintained by a professional Full stack developer team. Rest assured of stability, security, and continuous updates.",
    reviewsTitle: "Customer Reviews",
    reviewsSubtitle: "What our users say about our simulated AI licensing services",
    review1Text: "Purchased ChatGPT Plus from Fluke XD three times. Super fast setup and keys work perfectly in sandbox. Highly recommended!",
    review2Text: "Gemini Pro context window 2M is amazing. Extremely fast service and friendly support. Always helpful.",
    review3Text: "Super Grok is exactly as described—all in one! Great video generation and coding capabilities. Outstanding post-purchase support.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Frequently asked questions about purchasing, delivery, and warranty of our AI services",
    faqQ1: "How do I order products and services?",
    faqA1: "Simply choose your desired model and click 'Contact to Order' to add us on LINE or message us on Facebook to purchase services instantly.",
    faqQ2: "How many minutes after purchasing will I receive the product?",
    faqA2: "After payment is verified, our team will deliver the AI accounts or keys quickly. It typically takes only 10-30 minutes during working hours.",
    faqQ3: "What is the post-sales support and warranty policy?",
    faqA3: "We provide setup guidance and support throughout the warranty period. If you encounter any issues, feel free to message us on LINE or Facebook.",
    footerDesc: "Providing premium access and expert configuration for world-leading AI models to boost your productivity and creativity.",
    footerLinks: "Links",
    footerUptime: "Uptime Status",
    footerUptimeDesc: "Sign up to get notified of newly integrated models and API platform maintenance schedules.",
    cartTitle: "Shopping Bag",
    cartAlmostThere: "Almost there...",
    cartEarned: "Bonus credits earned!",
    cartToGo: "to go for free setup fee",
    cartEmpty: "Your bag is empty",
    cartEmptyDesc: "Select an AI assistant license to proceed with checkout.",
    cartDiscover: "Discover Models",
    cartSubtotal: "Subtotal",
    cartSetupFee: "Simulated Setup Fee",
    cartFree: "Free",
    cartTotal: "Total",
    cartCheckout: "Checkout Order",
    modalAccent: "Interface Theme",
    modalBilling: "Billing Cycle",
    modalSnippet: "Integration Snippet",
    modalEngine: "Model Engine:",
    modalContext: "Context Window:",
    modalDelivery: "Delivery:",
    checkoutTitle: "Secure simulated checkout",
    checkoutDesc: "Complete your simulated details below. Submitting will mock API generation.",
    checkoutStep1: "1. Account Email & Billing",
    checkoutName: "Full Name",
    checkoutEmail: "Email Address",
    checkoutAddress: "Street Address",
    checkoutCity: "City",
    checkoutZip: "Zip Code",
    checkoutStep2: "2. Payment Method",
    checkoutCard: "Card Number",
    checkoutExpiry: "Expiry Date (MM/YY)",
    checkoutCvv: "CVV",
    checkoutCancel: "Cancel",
    checkoutPlace: "Place simulated order",
    successTitle: "License Activated!",
    successDesc: "Thank you for your simulated order",
    successReceipt: "API Token Receipt",
    successOrderNo: "Order",
    successStatus: "Uptime Status",
    successActive: "Active",
    successDeliveryType: "Delivery Type",
    successCourier: "Auto Generated API Token",
    successKeyLabel: "Generated License Key:",
    successCharged: "Total Charged",
    successEmailSent: "A verification email has been simulated and sent to. You can copy the generated sandbox API key above to start testing.",
    successBack: "Back to Dashboard",
    toastCopy: "Code snippet copied to clipboard! 📋",
    errorRequired: "This field is required",
    errorEmail: "Invalid email format",
    errorZip: "Zip code must be 5 digits",
    errorCard: "Card number must be 16 digits",
    errorExpiry: "Format must be MM/YY",
    errorCvv: "CVV must be 3 digits",
    errorForm: "Please correct the form errors",
    heroUnderImageText: "Our shop is always ready to provide you with the best advice"
  }
};

// AI Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    title: "ChatGPT Plus",
    category: "Text & Logic",
    price: 20.00,
    image: "/assets/content.png",
    badge: "Most Popular",
    badgeTh: "ยอดนิยมที่สุด",
    rating: 4.9,
    descriptionEn: "ChatGPT Plus grants premium access to OpenAI's smartest model, unlocking higher limits and faster response times.",
    descriptionTh: "แพ็กเกจ ChatGPT Plus มอบสิทธิ์การใช้งาน AI อัจฉริยะที่สุดจาก OpenAI ปลดล็อกขีดจำกัดการประมวลผลและการตอบคำถามพร้อมการตอบสนองที่รวดเร็วพิเศษ",
    latency: "84ms",
    uptime: "99.99%",
    details: {
      engine: "GPT-4o & GPT-4 Engine",
      context: "128k context window",
      contextTh: "128k context window (หน้าต่างบริบท)",
      deliveryEn: "Instant activation on purchase.",
      deliveryTh: "ระบบจะส่งมอบสิทธิ์การใช้งานและดูแลสิทธิ์ทันทีหลังจากแจ้งชำระเงิน"
    },
    colors: ["#10a37f", "#4A3E3D"],
    sizes: ["1 Month License", "1 Year (Save 20%)"],
    sizesTh: ["ใบอนุญาต 1 เดือน", "ใบอนุญาต 1 ปี (ประหยัด 20%)"],
    modelKey: "chatgpt-4o",
    featuresTh: [
      "🤖 เข้าใช้งาน GPT-4o, GPT-4 และโมเดลล่าสุดอย่างไร้ขีดจำกัด",
      "⚡ ตอบสนองรวดเร็วพิเศษแม้ในช่วงเวลาที่มีการใช้งานหนาแน่น",
      "🗣️ โหมดแชทด้วยเสียงสมจริงและเป็นธรรมชาติ (Advanced Voice Mode)",
      "🖼️ สร้างรูปภาพสติ๊กเกอร์และงานออกแบบด้วย DALL-E 3",
      "🛠️ เข้าถึง Custom GPTs และเครื่องมือวิเคราะห์ข้อมูลขั้นสูง"
    ],
    featuresEn: [
      "🤖 Unlimited access to GPT-4o, GPT-4, and the latest models",
      "⚡ Faster response times even during peak hours",
      "🗣️ Access to Advanced Voice Mode for realistic chats",
      "🖼️ Generate high-quality images and designs with DALL-E 3",
      "🛠️ Access Custom GPTs and advanced data analysis tools"
    ],
    usageHeaderTh: "รูปแบบการให้บริการและรายละเอียดเงื่อนไข",
    usageHeaderEn: "Service Packages & Guarantee Details",
    usageInstructionsTh: "👥 แบบแชร์ใช้งาน (แบบหาร 4 คน):\nทางร้านจะส่งบัญชีอีเมลและรหัสผ่านส่วนกลางของทางร้านให้ลูกค้าเข้าใช้งาน โดยจะมีผู้ใช้ร่วมกันเพียง 4 คนต่อบัญชีเท่านั้น\n\n👤 แบบส่วนตัว (ใช้คนเดียว):\nเป็นความเป็นส่วนตัว 100% ข้อมูลไม่ปะปนกับใคร และใช้งานครอบคลุมไปถึง Codex / Advanced Coding ได้อย่างเต็มประสิทธิภาพ\n\n💡 คำแนะนำจากร้านค้า:\nหากต้องการใช้งานสำหรับงานส่วนตัวที่มีข้อมูลสำคัญ แนะนำเลือกแบบใช้คนเดียว (ส่วนตัว) จะดีที่สุดครับ! โดยทางร้านจะมีคำแนะนำวิธีการย้ายข้อมูลเดิมไปยังบัญชีใหม่ให้กับลูกค้าอย่างละเอียด\n\n🔒 การรับประกันและความปลอดภัย:\nแนะนำให้ลูกค้าซื้อบัญชีเมลของทางร้าน โดยทางร้านขอรับประกันความปลอดภัยสูงสุด และจะไม่มีการเข้าไปยุ่งเกี่ยวหรือเข้าใช้งานใดๆ กับบัญชีเมลส่วนตัวของลูกค้าโดยเด็ดขาด 100%",
    usageInstructionsEn: "👥 Shared Package (Shared by 4 users):\nOur team will provide a shared email and password access. There are exactly 4 users per account.\n\n👤 Private Package (Single user):\nEnjoy 100% complete privacy with your data isolated. Supports full access to Codex / Advanced Coding features.\n\n💡 Shop Recommendation:\nFor private work and sensitive data, we highly recommend purchasing the single-user (private) package. We provide a step-by-step guide to migrate your existing data to the new account.\n\n🔒 Safety & Warranty:\nWe recommend purchasing a store-provided email account. We guarantee maximum security and we will never access or interfere with your private store-provided account in any way."
  },
  {
    id: 2,
    title: "Google AI Pro (Gemini)",
    category: "Multimodal",
    price: 19.99,
    image: "/assets/contents.png",
    badge: "Google DeepMind",
    badgeTh: "กูเกิล ดีปมายด์",
    rating: 4.8,
    descriptionEn: "Google AI Pro Package (formerly Google One AI Premium) grants premium AI access by Google with 5 TB (5,000 GB) cloud storage shareable with Google Drive, Gmail, and Google Photos.",
    descriptionTh: "แพ็กเกจ Google AI Pro (เดิมชื่อ Google One AI Premium) มอบสิทธิ์การใช้งาน AI ระดับพรีเมียมจาก Google พร้อมพื้นที่จัดเก็บข้อมูลขนาด 5 TB (5,000 GB) ซึ่งสามารถใช้งานร่วมกันได้กับ Google Drive, Gmail และ Google Photos",
    latency: "112ms",
    uptime: "99.98%",
    details: {
      engine: "Gemini 1.5 Pro Engine",
      context: "1M to 2M context window",
      contextTh: "1M ถึง 2M context window (หน้าต่างบริบท)",
      deliveryEn: "Instant activation on purchase.",
      deliveryTh: "ระบบจะส่งมอบสิทธิ์การใช้งานและดูแลสิทธิ์ทันทีหลังจากแจ้งชำระเงิน"
    },
    colors: ["#1a73e8", "#c2e7ff"],
    sizes: ["1 Month License", "1 Year (Save 20%)"],
    sizesTh: ["ใบอนุญาต 1 เดือน", "ใบอนุญาต 1 ปี (ประหยัด 20%)"],
    modelKey: "gemini-1.5-pro",
    featuresTh: [
      "🤖 ใช้งาน Gemini AI และโมเดล AI ขั้นสูงของ Google",
      "📄 ใช้งาน Gemini ร่วมกับ Google Docs, Sheets, Slides และ Google Workspace",
      "🔍 ใช้ฟีเจอร์ Deep Research สำหรับค้นคว้าและวิเคราะห์ข้อมูลเชิงลึก",
      "🎨 สร้างรูปภาพและวิดีโอด้วยเครื่องมือ AI ระดับพรีเมียมของ Google",
      "☁️ พื้นที่เก็บข้อมูล 5 TB ใช้งานร่วมกับ Google Drive, Gmail และ Google Photos",
      "👨‍👩‍👧‍👦 สามารถแชร์พื้นที่เก็บข้อมูลกับสมาชิกครอบครัวได้สูงสุด 5 คน (ขอสงวนสิทธิ์เฉพาะ ใช้คนเดียวหรือหัวแฟมมิลี่)"
    ],
    featuresEn: [
      "🤖 Access Gemini AI and Google's advanced AI models",
      "📄 Integrate Gemini into Google Docs, Sheets, Slides, and Google Workspace",
      "🔍 Access Deep Research feature for in-depth data query and analysis",
      "🎨 Generate high-quality creative images and videos with Google's premium AI tools",
      "☁️ 5 TB storage shared across Google Drive, Gmail, and Google Photos",
      "👨‍👩‍👧‍👦 Share storage space with up to 5 family members (reserved for single user or family head/holder)"
    ],
    usageHeaderTh: "วิธีการใช้งาน (แพ็กเกจแบบหาร)",
    usageHeaderEn: "How to Use (Shared Family Package)",
    usageInstructionsTh: "สำหรับแพ็กเกจแบบหาร ทางร้านจะเชิญ Gmail ของลูกค้าเข้ากลุ่มครอบครัว (Google Family Group) เพื่อเปิดสิทธิ์การใช้งาน Google AI Pro โดยลูกค้าสามารถใช้งานผ่านบัญชี Google (Gmail) ของตนเองได้ทันที โดยไม่ต้องเปลี่ยนบัญชีหรือแชร์รหัสผ่าน",
    usageInstructionsEn: "For the shared package, our team will invite your Gmail to a Google Family Group to activate Google AI Pro access. You can use your own Google account immediately without changing accounts or sharing passwords."
  },
  {
    id: 3,
    title: "Fluke XD Super Grok",
    category: "Super AI",
    price: 16.00,
    image: "/assets/IMG_5475.jpg",
    badge: "All in One",
    badgeTh: "ครบจบในตัวเดียว",
    rating: 5.0,
    descriptionEn: "Fluke XD Super Grok is our all-in-one powerhouse for content creators. Ask complex questions, generate hyper-real images, and render high-res videos instantly.",
    descriptionTh: "โมเดลตัวท็อปครบวงจรในหนึ่งเดียว! ทั้งแชทตอบคำถาม วาดภาพคมชัดสมจริง และสร้างวิดีโอคุณภาพสูงได้ทันใจ แรง เร็ว ครบเครื่อง!",
    latency: "95ms",
    uptime: "99.99%",
    details: {
      engine: "Grok 2.0 & Fluke XD Custom Layer",
      context: "128k context window",
      contextTh: "128k context window (หน้าต่างบริบท)",
      deliveryEn: "Instant activation on purchase.",
      deliveryTh: "ระบบจะส่งมอบสิทธิ์การใช้งานและดูแลสิทธิ์ทันทีหลังจากแจ้งชำระเงิน"
    },
    colors: ["#2d2d2d", "#0055ff"],
    sizes: ["1 Month License", "1 Year (Save 20%)"],
    sizesTh: ["ใบอนุญาต 1 เดือน", "ใบอนุญาต 1 ปี (ประหยัด 20%)"],
    modelKey: "fluke-xd-grok-2",
    featuresTh: [
      "🤖 ขับเคลื่อนด้วยขุมพลัง Grok 2.0 ล่าสุดจาก xAI",
      "🎨 เจนรูปภาพความละเอียดสูง มีมิติและสมจริงสูงสุด",
      "🎥 สร้างวิดีโอสั้นและงานเคลื่อนไหวคุณภาพสูงด้วยความเร็วระดับเทอร์โบ",
      "📰 ค้นหาข้อมูลเชิงลึกแบบ Real-time เชื่อมโยงกับฐานข้อมูล X",
      "💻 ผู้ช่วยเขียนโค้ดและดีบักระบบที่มีความแม่นยำสูง"
    ],
    featuresEn: [
      "🤖 Powered by the latest Grok 2.0 engine from xAI",
      "🎨 Generate hyper-realistic, high-resolution images",
      "🎥 Create short cinematic videos and animations in turbo speed",
      "📰 Real-time search and insights linked to the X platform",
      "💻 Advanced coding and debugging assistant with high accuracy"
    ],
    usageInstructionsTh: "ส่งสิทธิ์การเปิดบัญชีใช้งานจริงพร้อมรับคำแนะนำการเชื่อมต่อส่วนตัวทางแชท LINE หรือ Facebook (ติดต่อได้ในเวลาทำการ 11:00 - 00:00 น. เท่านั้น)",
    usageInstructionsEn: "Account access credentials and step-by-step setup guides will be provided via LINE or Facebook chat support (Available during business hours 11:00 - 00:00 only)."
  }
];

export default function App() {
  // App States
  const [lang, setLang] = useState('th'); // Language State 'th' | 'en'
  const [activeTab, setActiveTab] = useState('home'); // Active Nav Link: 'home' | 'shop' | 'about' | 'reviews' | 'faq' | 'contact'
  const [lightboxImage, setLightboxImage] = useState(null); // For fullscreen image viewer
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [contactOpen, setContactOpen] = useState(false); // New state to trigger the Line/FB contact modal
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile navigation drawer state
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false); // Dropdown menu state for products and services
  const [mobileShopOpen, setMobileShopOpen] = useState(false); // Mobile products submenu state

  // FAQ Accordion states
  const [faqExpanded, setFaqExpanded] = useState({ 0: true, 1: false, 2: false });
  const [toasts, setToasts] = useState([]);

  // Helper translate function
  const t = (key) => {
    return TRANSLATIONS[lang][key] || key;
  };

  // Handle toast notifications
  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2500);
  };

  // Open product detail modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };

  // Toggle FAQ accordion item
  const toggleFaq = (index) => {
    setFaqExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };



  // Smooth scroll handler
  const handleNavClick = (tabId, anchorId) => {
    setActiveTab(tabId);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="min-h-screen bg-cream-50 text-espresso font-sans selection:bg-terracotta selection:text-white transition-colors duration-300">
      
      {/* Toast Notifications */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className="bg-charcoal text-cream-50 px-5 py-4 rounded-xl shadow-lg border border-terracotta/20 flex items-center gap-3 animate-fade-in pointer-events-auto max-w-sm transition-all duration-300 transform translate-y-0"
          >
            <Sparkles className="w-5 h-5 text-terracotta animate-spin" />
            <span className="text-sm font-medium tracking-wide">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Sticky Dark Header — matching user screenshot exactly */}
      <header className="sticky top-0 z-40 bg-black border-b border-neutral-800 transition-all">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between gap-6">
          
          {/* Logo: F icon + FLUKEXDSHOP inline text — exactly like the screenshot */}
          <a href="#" onClick={() => handleNavClick('home', 'home')} className="flex items-center gap-2.5 group shrink-0">
            {/* Italic bold F with electric blue gradient */}
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="f-grad" x1="20%" y1="0%" x2="80%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <path 
                d="M30 8H82L75 30H52L47 46H74L68 58H42L34 90H16L28 46H20L30 8Z" 
                fill="url(#f-grad)"
              />
            </svg>
            <span className="font-sans font-extrabold text-white text-sm sm:text-base tracking-wide whitespace-nowrap">
              FLUKE XD <span className="text-sky-400">SHOP</span>
            </span>
          </a>

          {/* Center Navigation — normal-case Thai text, matching screenshot exactly */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
            {[
              { id: 'home', label: t('navHome'), anchor: 'home' },
              { id: 'shop', label: t('navModels'), anchor: 'shop' },
              { id: 'about', label: t('navHowTo'), anchor: 'about' },
              { id: 'reviews', label: t('navReviews'), anchor: 'reviews' },
              { id: 'faq', label: t('navFaq'), anchor: 'faq' },
              { id: 'contact', label: t('navContact'), anchor: 'contact' }
            ].map(item => {
              const isShop = item.id === 'shop';
              return (
                <div
                  key={item.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => isShop && setShopDropdownOpen(true)}
                  onMouseLeave={() => isShop && setShopDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(item.id, item.anchor)}
                    className={`h-full px-0.5 text-[13px] font-medium relative flex items-center transition-colors duration-200 cursor-pointer ${
                      activeTab === item.id 
                        ? 'text-white' 
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isShop && <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70 transition-opacity" />}
                    {/* Blue underline on active tab — exactly like the screenshot */}
                    {activeTab === item.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-sky-500 rounded-t-sm"></span>
                    )}
                  </button>

                  {/* Dropdown Menu Overlay — redesigned to look extremely premium and modern */}
                  {isShop && shopDropdownOpen && (
                    <div 
                      className="absolute top-[85%] left-1/2 -translate-x-1/2 mt-2 w-72 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-3 flex flex-col gap-1.5 z-50 animate-fade-in text-left"
                    >
                      {/* Product Option 1: Gemini Pro */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShopDropdownOpen(false);
                          setSelectedProduct(PRODUCTS[1]); // Gemini Pro is index 1
                        }}
                        className="group w-full text-left p-2.5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:translate-x-1 flex items-center gap-3.5 cursor-pointer"
                      >
                        {/* Glowing brand-colored icon container */}
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-extrabold text-sm shadow-[0_0_12px_rgba(14,165,233,0.1)] group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-400 transition-all duration-300">
                          G
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs sm:text-[13px] font-bold text-white group-hover:text-sky-400 transition-colors">
                            {lang === 'th' ? "รายละเอียด Gemini Pro" : "Gemini Pro Details"}
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5 leading-normal">
                            {lang === 'th' ? "วิเคราะห์ข้อมูล ภาพ และเอกสารสุดล้ำ" : "Advanced multimodal image & data assistant"}
                          </div>
                        </div>
                      </button>

                      {/* Product Option 2: ChatGPT Plus */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShopDropdownOpen(false);
                          setSelectedProduct(PRODUCTS[0]); // ChatGPT Plus is index 0
                        }}
                        className="group w-full text-left p-2.5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:translate-x-1 flex items-center gap-3.5 cursor-pointer"
                      >
                        {/* Glowing brand-colored icon container */}
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold text-sm shadow-[0_0_12px_rgba(16,163,127,0.1)] group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all duration-300">
                          C
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs sm:text-[13px] font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {lang === 'th' ? "รายละเอียด ChatGPT Plus" : "ChatGPT Plus Details"}
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5 leading-normal">
                            {lang === 'th' ? "ช่วยคิดงานและเขียนโค้ดยอดนิยมอันดับ 1" : "Industry-leading logic & coding assistant"}
                          </div>
                        </div>
                      </button>

                      {/* Product Option 3: Super GROK */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShopDropdownOpen(false);
                          setSelectedProduct(PRODUCTS[2]); // Super Grok is index 2
                        }}
                        className="group w-full text-left p-2.5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:translate-x-1 flex items-center gap-3.5 cursor-pointer"
                      >
                        {/* Glowing brand-colored icon container */}
                        <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 font-extrabold text-sm shadow-[0_0_12px_rgba(234,179,8,0.1)] group-hover:bg-yellow-500 group-hover:text-neutral-900 group-hover:border-yellow-400 transition-all duration-300">
                          S
                        </div>
                        <div className="flex-grow">
                          <div className="text-xs sm:text-[13px] font-bold text-white group-hover:text-yellow-400 transition-colors">
                            {lang === 'th' ? "รายละเอียด Super GROK" : "Super GROK Details"}
                          </div>
                          <div className="text-[10px] text-neutral-400 mt-0.5 leading-normal">
                            {lang === 'th' ? "วาดภาพเสมือนจริงและสร้างวิดีโออัจฉริยะ" : "Creative hyper-real images & video generator"}
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Language Selector & Hamburger Menu */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Desktop Language Selector */}
            <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-neutral-400 border border-neutral-700 bg-neutral-900 rounded-full px-3 py-1.5">
              <Globe className="w-3 h-3 text-neutral-500" />
              <button 
                onClick={() => setLang('th')} 
                className={`hover:text-white transition-colors cursor-pointer ${lang === 'th' ? 'text-white font-black underline underline-offset-4' : 'opacity-60'}`}
                aria-label="Switch to Thai Language"
              >
                TH
              </button>
              <span className="opacity-20">|</span>
              <button 
                onClick={() => setLang('en')} 
                className={`hover:text-white transition-colors cursor-pointer ${lang === 'en' ? 'text-white font-black underline underline-offset-4' : 'opacity-60'}`}
                aria-label="Switch to English Language"
              >
                EN
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex md:hidden items-center justify-center p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section (Split 2-Column Layout with Gradient Mesh) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-soft-taupe py-20 lg:py-32 border-b border-warm-gray/30">
        {/* Ambient gradient mesh blobs for color depth and premium studio aesthetic */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/[0.07] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/[0.05] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-amber-300/[0.04] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* Heading — non-italicized, modern sans-serif with 3D text shadow depth */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl text-charcoal font-black leading-tight tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
              {t('heroTitleLine1')} <br />
              <span className="text-terracotta font-black tracking-wide" style={{ textShadow: '2px 2px 0px rgba(255,255,255,1), 4px 4px 8px rgba(140,109,88,0.18)' }}>
                {t('heroTitleLine2')}
              </span>
            </h1>
            
            {/* Subtitle with clean inline dimensional brand names */}
            <p className="text-charcoal/90 text-base sm:text-lg leading-relaxed font-medium">
              {lang === 'th' ? (
                <>
                  เข้าถึงและเลือกช็อปโมเดลอัจฉริยะยอดฮิต{' '}
                  <span className="font-extrabold text-emerald-600 drop-shadow-[0_1px_1px_rgba(16,163,127,0.12)]">ChatGPT</span>,{' '}
                  <span className="font-extrabold text-sky-600 drop-shadow-[0_1px_1px_rgba(14,165,233,0.12)]">Gemini</span>, และ{' '}
                  <span className="font-extrabold text-neutral-800 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">Grok</span>{' '}
                  พร้อมคำอธิบายและแนวทางการเลือกใช้แบบกระชับ เข้าใจง่าย และตรงจุดที่สุดสำหรับคุณ
                </>
              ) : (
                <>
                  Access and lease top-tier simulated AI licenses for{' '}
                  <span className="font-extrabold text-emerald-600 drop-shadow-[0_1px_1px_rgba(16,163,127,0.12)]">ChatGPT</span>,{' '}
                  <span className="font-extrabold text-sky-600 drop-shadow-[0_1px_1px_rgba(14,165,233,0.12)]">Gemini</span>, and{' '}
                  <span className="font-extrabold text-neutral-800 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">Grok</span>.{' '}
                  Complete with concise, simple, and high-impact advisor summaries.
                </>
              )}
            </p>
            
            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 justify-start">
              <a 
                href="#shop" 
                onClick={() => handleNavClick('shop', 'shop')}
                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full hover:from-sky-400 hover:to-indigo-400 hover:shadow-[0_8px_30px_rgba(14,165,233,0.35)] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shadow-lg"
              >
                {t('btnBrowse')}
              </a>
              <a 
                href="#contact" 
                onClick={() => handleNavClick('contact', 'contact')}
                className="bg-white/70 backdrop-blur-sm text-charcoal border border-slate-200 font-bold uppercase tracking-widest text-xs py-4 px-8 rounded-full hover:bg-white hover:border-sky-300 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                {t('btnSandbox')}
              </a>
            </div>
          </div>

          {/* Right Column: Branded Banner Image (Red Circled Area) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
            <div className="relative group max-w-xl w-full overflow-hidden rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src="/assets/flukexdshop.png" 
                alt="Fluke XD Shop Banner" 
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
              />
              {/* Subtle glass reflection sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            
            {/* Detail under the image */}
            <div className="mt-6 flex justify-center w-full">
              <div className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-[0_6px_20px_rgba(0,0,0,0.06)] text-charcoal/80 text-sm sm:text-base font-sans font-bold tracking-wide">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{t('heroUnderImageText')}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Shop Section */}
      <section id="shop" className="pt-28 sm:pt-36 pb-16 sm:pb-24 max-w-6xl mx-auto px-6 scroll-mt-20">
        
        {/* Section Header — clean & centered */}
        <div className="text-center mb-14">
          <h2 className="font-sans text-3xl sm:text-4xl text-charcoal font-extrabold tracking-tight">{t('secSuiteTitle')}</h2>
          <p className="text-charcoal/50 font-normal mt-3 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">{t('secSuiteSubtitle')}</p>
        </div>

        {/* Product Grid — Full Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map(product => (
            <div key={product.id} className="flex flex-col">
              
              {/* Image Card */}
              <div 
                onClick={() => openProductModal(product)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Full product poster — object-contain ensures nothing is cropped */}
                <div className="relative w-full bg-neutral-950">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  
                  {/* Action buttons — slide up on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightboxImage(product.image); }}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white py-3 rounded-xl text-[13px] font-semibold hover:bg-white/20 transition-all duration-200 cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" />
                        {lang === 'th' ? 'ดูรูปเต็ม' : 'Full Image'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setContactOpen(true); }}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-neutral-900 py-3 rounded-xl text-[13px] font-bold hover:bg-neutral-100 transition-all duration-200 cursor-pointer shadow-lg"
                      >
                        <MessageSquare className="w-4 h-4" />
                        {lang === 'th' ? 'ติดต่อสั่งซื้อ' : 'Contact'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Name — clear, bold, below the card */}
              <div className="mt-4 text-center">
                <h3 className="font-sans text-base font-bold text-charcoal tracking-tight">{product.title}</h3>
                <p className="font-sans text-xs text-charcoal/40 mt-0.5 font-medium">
                  {lang === 'th' ? product.descriptionTh.substring(0, 60) + '...' : product.descriptionEn.substring(0, 60) + '...'}
                </p>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Brand Values / About Banner */}
      <section id="about" className="bg-soft-taupe py-20 border-t border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl text-charcoal font-semibold tracking-tight">{t('guaranteeTitle')}</h2>
            <p className="text-charcoal/80 mt-3 font-medium text-sm sm:text-base">{t('guaranteeSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(14,165,233,0.25)]">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans text-base font-bold text-charcoal leading-snug">{t('valDeliveryTitle')}</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 font-medium leading-relaxed">{t('valDeliveryDesc')}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(16,185,129,0.25)]">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans text-base font-bold text-charcoal leading-snug">{t('valUptimeTitle')}</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 font-medium leading-relaxed">{t('valUptimeDesc')}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 space-y-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-[0_4px_14px_rgba(99,102,241,0.25)]">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-sans text-base font-bold text-charcoal leading-snug">{t('valReadyTitle')}</h3>
              <p className="text-xs sm:text-sm text-charcoal/70 font-medium leading-relaxed">{t('valReadyDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl text-charcoal font-semibold tracking-tight">{t('reviewsTitle')}</h2>
          <p className="text-charcoal/80 mt-3 font-medium text-sm sm:text-base">{t('reviewsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Color-coded review cards based on client AI service choice */}
          {[
            { name: "คุณสมศักดิ์ พลอยดี", rating: 5, model: "ChatGPT Plus", text: t('review1Text'), avatar: User, accent: "border-l-emerald-400", avatarBg: "from-emerald-400 to-emerald-500" },
            { name: "คุณธนกร แก้ววิเชียร", rating: 5, model: "Gemini Pro", text: t('review2Text'), avatar: Laptop, accent: "border-l-sky-400", avatarBg: "from-sky-400 to-sky-500" },
            { name: "คุณนลินี เลิศวิจิตร", rating: 5, model: "Fluke XD Super Grok", text: t('review3Text'), avatar: User, accent: "border-l-amber-400", avatarBg: "from-amber-400 to-amber-500" }
          ].map((review, idx) => {
            const AvatarIcon = review.avatar;
            return (
              <div key={idx} className={`bg-white p-8 rounded-3xl border border-slate-200/80 border-l-4 ${review.accent} flex flex-col justify-between text-left space-y-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex gap-0.5 text-amber-400 text-sm">
                    {"★★★★★"}
                  </div>
                  <p className="text-sm text-charcoal/85 leading-relaxed font-medium italic">"{review.text}"</p>
                </div>
                {/* User details */}
                <div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
                  <span className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarBg} flex items-center justify-center shadow-sm`}>
                    <AvatarIcon className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal">{review.name}</h4>
                    <p className="text-[10px] text-sky-500 font-bold uppercase tracking-wider mt-0.5">{review.model}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-soft-taupe py-20 border-t border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl text-charcoal font-semibold tracking-tight">{t('faqTitle')}</h2>
            <p className="text-charcoal/80 mt-3 font-medium text-sm sm:text-base">{t('faqSubtitle')}</p>
          </div>

          <div className="space-y-4 text-left">
            {[
              { q: t('faqQ1'), a: t('faqA1') },
              { q: t('faqQ2'), a: t('faqA2') },
              { q: t('faqQ3'), a: t('faqA3') }
            ].map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-sm sm:text-base font-bold text-charcoal focus:outline-none cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-sky-500 transform transition-transform duration-300 ${faqExpanded[idx] ? 'rotate-180' : ''}`} />
                </button>
                
                {faqExpanded[idx] && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-charcoal/75 font-medium leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-b from-slate-900 to-slate-950 text-cream-50 py-16 text-left scroll-mt-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-7 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Fluke XD Shop <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            </span>
            <p className="text-cream-50/80 font-medium text-xs sm:text-sm max-w-xl leading-relaxed">
              {t('footerDesc')}
            </p>
            {/* Social channels: LINE & Facebook buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* LINE button */}
              <a 
                href="https://line.me/ti/p/72WxZJU876" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#06C755]/15 border border-white/10 hover:border-[#06C755]/30 text-white/80 hover:text-white transition-all text-xs font-semibold shadow-sm hover:shadow-lg cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#06C755]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 10.3c0-4.3-4.8-7.8-10.7-7.8S2.7 6 2.7 10.3c0 3.9 3.8 7.1 9 7.7.4.1.8.4.9.8l.2 1.6c.1.4-.2.8-.5.9l-1.9 1.1c-.3.2-.4.6-.2.9.2.3.6.4.9.2l3.4-2.1c.3-.2.4-.6.2-.9-.1-.2-.2-.3-.4-.4-5.1-1.3-8.8-5.3-8.8-10 0-4.9 5-8.8 11.2-8.8s11.2 3.9 11.2 8.8c0 4.2-3.6 7.8-8.5 8.6-.4.1-.6.5-.5.9.1.4.5.6.9.5 5.5-.9 9.6-4.9 9.6-9.6z"/>
                </svg>
                <span>LINE OA</span>
              </a>

              {/* Facebook button */}
              <a 
                href="https://web.facebook.com/pratchayawut.thansri.2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-[#1877F2]/15 border border-white/10 hover:border-[#1877F2]/30 text-white/80 hover:text-white transition-all text-xs font-semibold shadow-sm hover:shadow-lg cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-5 space-y-3 md:text-right flex flex-col md:items-end">
            <h4 className="text-xs uppercase tracking-widest text-terracotta font-bold">{t('footerLinks')}</h4>
            <ul className="flex flex-wrap items-center justify-start md:justify-end gap-x-5 gap-y-2 text-xs sm:text-sm text-cream-50/85 font-medium">
              <li><a href="#" onClick={() => handleNavClick('home', 'home')} className="hover:text-white transition-colors">{t('navHome')}</a></li>
              <li><a href="#shop" onClick={() => handleNavClick('shop', 'shop')} className="hover:text-white transition-colors">{t('navModels')}</a></li>
              <li><a href="#about" onClick={() => handleNavClick('about', 'about')} className="hover:text-white transition-colors">{t('navHowTo')}</a></li>
              <li><a href="#reviews" onClick={() => handleNavClick('reviews', 'reviews')} className="hover:text-white transition-colors">{t('navReviews')}</a></li>
              <li><a href="#faq" onClick={() => handleNavClick('faq', 'faq')} className="hover:text-white transition-colors">{t('navFaq')}</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between text-xs text-cream-50/60 font-medium gap-4">
          <p>© 2026 Fluke XD AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>



      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Blur Overlay */}
          <div 
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative bg-cream-50 rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fade-in">
            
            {/* Close button — optimized with p-3 for 44x44px mobile touch target area */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/95 shadow-lg text-charcoal/60 hover:text-charcoal transition-all active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Product Image — full, no crop */}
            <div className="w-full md:w-1/2 bg-neutral-950 flex items-center justify-center p-0 h-56 sm:h-72 md:h-auto shrink-0">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title} 
                className="w-full h-full object-contain max-h-[25vh] md:max-h-[80vh]"
              />
            </div>

            {/* Product Info — clean & simple */}
            <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-start text-left overflow-y-auto max-h-[90vh]">
              
              <div className="space-y-5">
                <span className="inline-block text-[11px] font-bold tracking-widest uppercase text-terracotta bg-terracotta/10 px-3 py-1.5 rounded-lg">
                  {selectedProduct.category}
                </span>

                <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-charcoal leading-tight">{selectedProduct.title}</h2>
                
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed">
                  {lang === 'th' ? selectedProduct.descriptionTh : selectedProduct.descriptionEn}
                </p>

                {/* Lightbox link */}
                <button
                  onClick={() => setLightboxImage(selectedProduct.image)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-terracotta hover:underline cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {lang === 'th' ? 'กดเพื่อดูรูปภาพขนาดเต็ม' : 'Click to view full image'}
                </button>
              </div>

              {/* Product Features List */}
              {selectedProduct.featuresTh && lang === 'th' && (
                <div className="space-y-3 pt-6 mt-6 border-t border-neutral-200/60">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">สิ่งที่คุณจะได้รับ</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/80 font-medium">
                    {selectedProduct.featuresTh.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedProduct.featuresEn && lang === 'en' && (
                <div className="space-y-3 pt-6 mt-6 border-t border-neutral-200/60">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">What you will receive</h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal/80 font-medium">
                    {selectedProduct.featuresEn.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="flex-shrink-0 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Usage Instructions / วิธีการใช้งาน */}
              {selectedProduct.usageInstructionsTh && lang === 'th' && (
                <div className="space-y-2 pt-6 mt-6 border-t border-neutral-200/60">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {selectedProduct.usageHeaderTh || "รายละเอียดและคำแนะนำเพิ่มเติม"}
                  </h3>
                  <div className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-medium whitespace-pre-line">
                    {selectedProduct.usageInstructionsTh}
                  </div>
                </div>
              )}
              {selectedProduct.usageInstructionsEn && lang === 'en' && (
                <div className="space-y-2 pt-6 mt-6 border-t border-neutral-200/60">
                  <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {selectedProduct.usageHeaderEn || "Usage Details & Instructions"}
                  </h3>
                  <div className="text-xs sm:text-sm text-charcoal/70 leading-relaxed font-medium whitespace-pre-line">
                    {selectedProduct.usageInstructionsEn}
                  </div>
                </div>
              )}

              {/* Contact to Purchase */}
              <div className="pt-8 mt-6">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setContactOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-400 hover:to-indigo-400 font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
                >
                  <MessageSquare className="w-5 h-5" />
                  {t('addToBag')}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Contact Channels Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay backdrop */}
          <div 
            onClick={() => setContactOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal box */}
          <div className="relative bg-neutral-900 border border-neutral-800 text-white rounded-3xl shadow-2xl max-w-md w-full overflow-y-auto max-h-[95vh] sm:max-h-[90vh] p-6 sm:p-8 transform transition-all text-center animate-fade-in pb-safe">
            
            {/* Close Button */}
            <button 
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-sans text-xl font-extrabold mb-2 text-white">
              {t('contactTitle')}
            </h2>
            <p className="text-xs text-neutral-300 font-medium mb-6">
              {t('contactSubtitle')}
            </p>

            {/* LINE QR Code section */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 mb-6 flex flex-col items-center">
              {/* QR Code Container */}
              <div className="w-44 h-44 bg-white rounded-xl p-3 shadow-lg relative flex items-center justify-center mb-4">
                <img 
                  src="/assets/IMG_5631.jpg" 
                  alt="LINE QR Code" 
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* ID Display & Copy Button */}
              <button 
                onClick={() => {
                  navigator.clipboard.writeText("https://line.me/ti/p/72WxZJU876");
                  addToast(t('contactToastCopy'));
                }}
                className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-full px-4 py-1.5 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                {t('contactSaveQR')}
              </button>
            </div>

            {/* Actions Links */}
            <div className="space-y-3">
              {/* LINE button */}
              <a 
                href="https://line.me/ti/p/72WxZJU876" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* SVG LINE Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 10.3c0-4.3-4.8-7.8-10.7-7.8S2.7 6 2.7 10.3c0 3.9 3.8 7.1 9 7.7.4.1.8.4.9.8l.2 1.6c.1.4-.2.8-.5.9l-1.9 1.1c-.3.2-.4.6-.2.9.2.3.6.4.9.2l3.4-2.1c.3-.2.4-.6.2-.9-.1-.2-.2-.3-.4-.4-5.1-1.3-8.8-5.3-8.8-10 0-4.9 5-8.8 11.2-8.8s11.2 3.9 11.2 8.8c0 4.2-3.6 7.8-8.5 8.6-.4.1-.6.5-.5.9.1.4.5.6.9.5 5.5-.9 9.6-4.9 9.6-9.6z"/>
                </svg>
                {t('contactLine')}
              </a>

              {/* Facebook button */}
              <a 
                href="https://web.facebook.com/pratchayawut.thansri.2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {/* SVG Facebook Icon */}
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                {t('contactFacebook')}
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          {/* Dark blurred backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Close button */}
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image container */}
          <div 
            className="relative max-w-2xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Full view" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl animate-fade-in"
            />
          </div>

          {/* Hint text at bottom */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-wider">
            {lang === 'th' ? 'คลิกที่ใดก็ได้เพื่อปิด' : 'Click anywhere to close'}
          </p>
        </div>
      )}

      {/* Mobile Navigation Menu Drawer Overlay — styled exactly like user screenshot */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 animate-fade-in md:hidden">
          
          {/* Top Actions: TH/EN switcher, Moon toggle, Close button */}
          <div className="flex items-center justify-between w-full">
            {/* TH/EN switch — pill container */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-neutral-400 border border-neutral-850 bg-neutral-900/60 rounded-full px-3 py-1.5 backdrop-blur-md">
              <button 
                onClick={() => setLang('th')} 
                className={`hover:text-white transition-colors cursor-pointer ${lang === 'th' ? 'text-white font-extrabold underline underline-offset-4' : 'opacity-60'}`}
              >
                TH
              </button>
              <span className="opacity-20 text-neutral-700">/</span>
              <button 
                onClick={() => setLang('en')} 
                className={`hover:text-white transition-colors cursor-pointer ${lang === 'en' ? 'text-white font-extrabold underline underline-offset-4' : 'opacity-60'}`}
              >
                EN
              </button>
            </div>

            {/* Right Group: Close button */}
            <div className="flex items-center">
              {/* Close Button */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer shadow-md active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Navigation Content */}
          <div className="relative flex-grow flex items-center justify-center my-8">
            
            {/* Blurred portrait background card matching screenshot exactly */}
            <div className="absolute inset-0 max-w-sm mx-auto rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              {/* White-haired brand character portrait */}
              <img 
                src="/assets/IMG_5475.jpg" 
                alt="Brand portrait background" 
                className="w-full h-full object-cover opacity-20 filter grayscale scale-105 blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
            </div>

            {/* Menu Items Container */}
            <nav className="relative z-10 flex flex-col items-center justify-center gap-5 w-full">
              {[
                { id: 'home', label: t('navHome'), anchor: 'home' },
                { id: 'shop', label: t('navModels'), anchor: 'shop' },
                { id: 'about', label: t('navHowTo'), anchor: 'about' },
                { id: 'reviews', label: t('navReviews'), anchor: 'reviews' },
                { id: 'faq', label: t('navFaq'), anchor: 'faq' },
                { id: 'contact', label: t('navContact'), anchor: 'contact' }
              ].map(item => {
                const isActive = activeTab === item.id;
                const isShop = item.id === 'shop'; // Toggles collapsible mobile shop dropdown inside drawer

                if (isShop) {
                  return (
                    <div key={item.id} className="w-full flex flex-col items-center gap-2">
                      <button
                        onClick={() => setMobileShopOpen(!mobileShopOpen)}
                        className={`py-2 font-semibold text-base flex items-center gap-1.5 cursor-pointer transition-colors ${
                          isActive || mobileShopOpen ? 'text-white font-extrabold' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileShopOpen ? 'rotate-180 text-sky-400' : 'text-neutral-500'}`} />
                      </button>

                      {/* Mobile Products Submenu */}
                      {mobileShopOpen && (
                        <div className="flex flex-col items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 w-64 animate-fade-in my-1">
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileShopOpen(false);
                              setSelectedProduct(PRODUCTS[1]); // Gemini Pro is index 1
                            }}
                            className="w-full text-center py-1.5 text-[13px] font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                            <span>{lang === 'th' ? "รายละเอียด Gemini Pro" : "Gemini Pro"}</span>
                          </button>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileShopOpen(false);
                              setSelectedProduct(PRODUCTS[0]); // ChatGPT Plus is index 0
                            }}
                            className="w-full text-center py-1.5 text-[13px] font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#10a37f] rounded-full"></span>
                            <span>{lang === 'th' ? "รายละเอียด ChatGPT Plus" : "ChatGPT Plus"}</span>
                          </button>
                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileShopOpen(false);
                              setSelectedProduct(PRODUCTS[2]); // Super Grok is index 2
                            }}
                            className="w-full text-center py-1.5 text-[13px] font-bold text-neutral-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                            <span>{lang === 'th' ? "รายละเอียด Super GROK" : "Super GROK"}</span>
                          </button>
                          
                          {/* Divider line */}
                          <div className="w-full h-px bg-white/10 my-0.5"></div>

                          <button
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileShopOpen(false);
                              handleNavClick('shop', 'shop');
                            }}
                            className="w-full text-center py-1 text-[11px] font-bold text-[#d4af37] hover:text-[#e4be42] transition-colors cursor-pointer"
                          >
                            {lang === 'th' ? "ดูสินค้าทั้งหมด" : "View All Products"}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                if (isActive) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick(item.id, item.anchor);
                      }}
                      className="border border-[#d4af37]/30 bg-[#d4af37]/5 backdrop-blur-md px-6 py-2.5 rounded-full text-white font-black flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:border-[#d4af37]/50 transition-all"
                    >
                      <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
                      <span>{item.label}</span>
                    </button>
                  );
                } else {
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleNavClick(item.id, item.anchor);
                      }}
                      className="text-neutral-400 hover:text-white transition-colors py-2 font-semibold text-base cursor-pointer"
                    >
                      {item.label}
                    </button>
                  );
                }
              })}
            </nav>

          </div>

          {/* Bottom brand footer inside menu */}
          <div className="text-center pb-2 text-[10px] text-neutral-500 font-medium tracking-widest uppercase">
            FLUKE XD SHOP • premium ai advisor
          </div>

        </div>
      )}

    </div>
  );
}
