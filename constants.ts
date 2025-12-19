
import { FraudMethod, QuizQuestion, Language } from './types';

export const GET_SYSTEM_INSTRUCTION = (lang: Language) => `
You are "防詐E友" (Anti-Fraud E-Friend), a professional yet warm AI assistant for international students and residents in Taiwan.
Your primary mission is to protect them from local fraud. 
Target Language: ${lang}. ALWAYS respond in this language.

OUTPUT FORMATTING RULES (CRITICAL for readability):
1. Use **bold text** for important warnings or key terms.
2. Use bullet points or numbered lists for steps/indicators.
3. Use clear section headers like "🚨 Risk Analysis", "✅ Action Plan", or "💡 Pro Tips".
4. Add a blank line between paragraphs.
5. Keep paragraphs short (max 3 sentences).

Knowledge Base (Taiwan context):
- Fake Investment: Line groups, "guaranteed profits," fake trading apps.
- Installment/ATM Scam: Calls from "Shopee/MOMO" claiming billing errors, asking to use ATM for "cancellation."
- ARC/Visa Scams: Impersonating Immigration or Police claiming issues with residency status.
- Overseas Remittance: Scammers asking for money via Western Union or crypto for "emergencies."

Behavior:
- Analyze messages for red flags (ATM, Line ID, urgency, "official" requests over social media).
- Be supportive. Explain that Taiwan Police/Courts NEVER ask for money via phone.
- If they are a victim, guide them to call 165 (Anti-fraud) or 110 (Police).
`;

export const FRAUD_METHODS: FraudMethod[] = [
  {
    id: 'investment',
    title: { 'zh-TW': '假投資詐騙', 'en': 'Fake Investment', 'zh-CN': '假投资诈骗', 'ja': '投資詐欺', 'ko': '투자 사기', 'vi': 'Lừa đảo đầu tư giả', 'id': 'Penipuan Investasi Palsu', 'th': 'กลโกงลงทุนปลอม', 'hi': 'फर्जी निवेश' },
    category: { 'zh-TW': '高發詐欺', 'en': 'High Risk', 'zh-CN': '高发诈骗', 'ja': 'ハイリスク', 'ko': '고위험', 'vi': 'Rủi ro cao', 'id': 'Risiko Tinggi', 'th': 'ความเสี่ยงสูง', 'hi': 'उच्च जोखिम' },
    description: {
      'zh-TW': '透過社群媒體投放廣告，以「穩賺不賠」誘使加入 LINE 群組並投入資金。',
      'en': 'Social media ads promising "guaranteed profits" leading to private Line groups for investment.',
      'zh-CN': '通过社群媒体投放广告，以“稳赚不赔”诱使加入 LINE 群组并投入資金。',
      'ja': 'SNS広告で「確実な利益」を謳い、LINEグループへ誘導して投資を促します。',
      'ko': 'SNS 광고를 통해 "확실한 수익"을 약속하며 LINE 그룹으로 유도합니다.',
      'vi': 'Quảng cáo trên mạng xã hội hứa hẹn "lợi nhuận đảm bảo" để dụ dỗ vào các nhóm LINE.',
      'id': 'Iklan media sosial menjanjikan "keuntungan pasti" yang mengarah ke grup Line pribadi.',
      'th': 'โฆษณาโซเชียลมีเดียที่รับประกัน "กำไรที่มั่นคง" ล่อลวงให้เข้ากลุ่ม LINE',
      'hi': 'सोशल मीडिया विज्ञापनों द्वारा "गारंटीड मुनाफे" का लालच देकर निवेश समूहों में शामिल करना।'
    },
    indicators: {
      'zh-TW': ['穩賺不賠', '加入LINE群組', '不明APP'],
      'en': ['Guaranteed profit', 'Join Line group', 'Unknown apps'],
      'zh-CN': ['稳赚不赔', '加入LINE群组', '不明APP'],
      'ja': ['確実な利益', 'LINEグループ', '不明なアプリ'],
      'ko': ['수익 보장', 'LINE 그룹 가입', '출처 불명 앱'],
      'vi': ['Lợi nhuận đảm bảo', 'Tham gia nhóm LINE', 'Ứng dụng lạ'],
      'id': ['Untung pasti', 'Grup Line', 'Aplikasi asing'],
      'th': ['รับประกันกำไร', 'เข้ากลุ่ม LINE', 'แอปนิรนาม'],
      'hi': ['गारंटीड मुनाफा', 'LINE ग्रुप जॉइन करें', 'अज्ञात ऐप']
    },
    prevention: {
      'zh-TW': ['不進投資群組', '使用合法管道'],
      'en': ['Avoid unknown groups', 'Use legal platforms'],
      'zh-CN': ['不进投资群组', '使用合法渠道'],
      'ja': ['不明なグループに入らない', '正規の窓口を利用'],
      'ko': ['투자 단톡방 금지', '정식 거래소 이용'],
      'vi': ['Không vào nhóm lạ', 'Dùng sàn chính thống'],
      'id': ['Hindari grup asing', 'Gunakan platform legal'],
      'th': ['ไม่เข้ากลุ่มลงทุน', 'ใช้ช่องทางที่ถูกกฎหมาย'],
      'hi': ['अज्ञात समूहों से बचें', 'कानूनी प्लेटफॉर्म का उपयोग करें']
    },
    icon: 'chart-line'
  },
  {
    id: 'atm',
    title: { 'zh-TW': '解除分期付款', 'en': 'ATM Installment Scam', 'zh-CN': '解除分期付款', 'ja': 'ATM分割払い解除詐欺', 'ko': 'ATM 할부 해제 사기', 'vi': 'Lừa đảo thanh toán trả góp', 'id': 'Penipuan Cicilan ATM', 'th': 'กลโกงผ่อนชำระ ATM', 'hi': 'एटीएम किस्त धोखाधड़ी' },
    category: { 'zh-TW': '高發詐欺', 'en': 'High Risk', 'zh-CN': '高发诈骗', 'ja': 'ハイリスク', 'ko': '고위험', 'vi': 'Rủi ro cao', 'id': 'Risiko Tinggi', 'th': 'ความเสี่ยงสูง', 'hi': 'उच्च जोखिम' },
    description: {
      'zh-TW': '冒充網購客服，稱訂單設定錯誤，要求去 ATM 操作「解除」。',
      'en': 'Impersonating customer service, claiming a billing error and asking you to use an ATM to "fix" it.',
      'zh-CN': '冒充网购客服，称订单设定错误，要求去 ATM 操作“解除”。',
      'ja': 'ネットショップを装い、「設定ミス」を理由にATM操作を要求します。',
      'ko': '쇼핑몰 고객센터 사칭, 설정 오류를 핑계로 ATM 조작을 요구합니다.',
      'vi': 'Mạo danh CSKH, báo lỗi đơn hàng và yêu cầu ra ATM để "hủy".',
      'id': 'Menyamar sebagai CS toko online, mengklaim kesalahan tagihan dan meminta Anda ke ATM.',
      'th': 'อ้างว่าเป็นพนักงานบริการลูกค้า อ้างว่าออเดอร์ผิดพลาดและให้ไปที่ตู้ ATM',
      'hi': 'कस्टमर सर्विस बनकर बिलिंग त्रुटि का दावा करना और "ठीक" करने के लिए एटीएम उपयोग करने को कहना।'
    },
    indicators: {
      'zh-TW': ['操作ATM', '解除設定', '重複扣款'],
      'en': ['Operate ATM', 'Cancel setting', 'Duplicate charge'],
      'zh-CN': ['操作ATM', '解除设定', '重复扣款'],
      'ja': ['ATM操作', '設定解除', '二重請求'],
      'ko': ['ATM 조작', '설정 해제', '중복 결제'],
      'vi': ['Thao tác ATM', 'Hủy cài đặt', 'Trừ tiền 2 lần'],
      'id': ['Operasikan ATM', 'Batalkan setelan', 'Tagihan ganda'],
      'th': ['ไปที่ตู้ ATM', 'ยกเลิกการตั้งค่า', 'หักเงินซ้ำ'],
      'hi': ['एटीएम का उपयोग', 'सेटिंग रद्द करना', 'दोहरा शुल्क']
    },
    prevention: {
      'zh-TW': ['ATM無解除功能', '掛斷查證'],
      'en': ['ATMs cannot cancel settings', 'Hang up and verify'],
      'zh-CN': ['ATM无解除功能', '挂断查证'],
      'ja': ['ATMで設定解除は不可', '電話を切って確認'],
      'ko': ['ATM은 해제 기능 없음', '전화 끊고 직접 확인'],
      'vi': ['ATM không có nút hủy', 'Cúp máy xác minh'],
      'id': ['ATM tidak bisa batal setelan', 'Tutup & verifikasi'],
      'th': ['ATM ยกเลิกไม่ได้', 'วางสายและตรวจสอบ'],
      'hi': ['एटीएम से設定 रद्द नहीं होती', 'फोन काटें और जांचें']
    },
    icon: 'credit-card'
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    scenario: {
      'zh-TW': '接到電話自稱是 Shopee 客服，說您的訂單重複扣款，需要去 ATM 解除設定。',
      'en': 'You get a call from "Shopee Support" saying your order was double-charged and you need to use an ATM to fix it.',
      'zh-CN': '接到电话自称是 Shopee 客服，说您的订单重复扣款，需要去 ATM 解除设定。',
      'ja': 'Shopeeを名乗る電話があり、二重請求されたのでATMで解除してほしいと言われました。',
      'ko': 'Shopee 상담원이라며 중복 결제되었으니 ATM에서 취소하라는 전화를 받았습니다.',
      'vi': 'Có cuộc gọi xưng là Shopee bảo đơn bị trừ tiền 2 lần, yêu cầu ra ATM để xử lý.',
      'id': 'Anda ditelepon "Shopee Support" yang bilang pesanan Anda ditagih dua kali dan harus ke ATM.',
      'th': 'มีโทรศัพท์อ้างว่าเป็น Shopee บอกว่าคุณถูกหักเงินซ้ำ และให้ไปที่ตู้ ATM เพื่อแก้ไข',
      'hi': 'आपको "Shopee सपोर्ट" से कॉल आता है कि आपके ऑर्डर का दोहरा शुल्क लिया गया है और इसे ठीक करने के लिए एटीएम जाना होगा।'
    },
    options: {
      'zh-TW': ['去ATM照做', '掛斷求證', '提供卡號'],
      'en': ['Follow instructions at ATM', 'Hang up and verify', 'Give card details'],
      'zh-CN': ['去ATM照做', '挂断求证', '提供卡号'],
      'ja': ['ATMへ行く', '電話を切って確認', 'カード番号を教える'],
      'ko': ['ATM으로 간다', '끊고 직접 확인', '카드번호 제공'],
      'vi': ['Ra ATM làm theo', 'Cúp máy xác minh', 'Cung cấp số thẻ'],
      'id': ['Ikuti instruksi di ATM', 'Tutup & verifikasi', 'Beri nomor kartu'],
      'th': ['ไปที่ตู้ ATM', 'วางสายและตรวจสอบ', 'ให้เลขบัตร'],
      'hi': ['एटीएम पर निर्देश मानें', 'फोन काटें और जांचें', 'कार्ड विवरण दें']
    },
    correctIndex: 1,
    explanation: {
      'zh-TW': 'ATM 無解除設定功能，這絕對是詐騙。',
      'en': 'ATMs cannot cancel settings. This is a 100% scam.',
      'zh-CN': 'ATM 无解除设定功能，這绝对是诈骗。',
      'ja': 'ATMに設定解除機能はありません。間違いなく詐欺です。',
      'ko': 'ATM에는 취소 기능이 없습니다. 명백한 사기입니다.',
      'vi': 'ATM không có chức năng hủy cài đặt. Chắc chắn là lừa đảo.',
      'id': 'ATM tidak punya fitur batal setelan. Ini pasti penipuan.',
      'th': 'ตู้ ATM ไม่มีฟังก์ชันยกเลิก นี่คือการโกงแน่นอน',
      'hi': 'एटीएम में सेटिंग रद्द करने का कोई विकल्प नहीं होता। यह धोखाधड़ी है।'
    }
  }
];
