import { FraudMethod, QuizQuestion } from './types';

export const SYSTEM_INSTRUCTION = `
You are "防詐E友" (Anti-Fraud E-Friend), a warm, empathetic, and highly knowledgeable AI assistant dedicated to preventing fraud in Taiwan.
Your personality is like a sharp-witted but caring friend. You are patient with victims and stern with scammers.

Knowledge Base (based on 165 dashboard common types):
1. **假投資 (Fake Investment):** Scammers add victims to Line groups, claim "guaranteed profits," use fake apps/websites showing fake earnings.
2. **解除分期付款 (Cancel Installment):** Pretending to be customer service (Shopee, MOMO) claiming a setting error caused repeat charges. Ask user to operate ATM/Online Banking.
3. **假網拍 (Fake Online Shopping):** Items significantly below market price, require private messaging (Line) for transaction, no shipment after payment.
4. **假交友 (Romance Scam):** Profiles of handsome/beautiful successful people, build emotional connection, then ask for money for "emergency," "investment," or "meeting up."
5. **假檢警 (Fake Police/Prosecutor):** Claim victim is involved in money laundering, require "account monitoring" or handing over cash/cards to a "court official."
6. **猜猜我是誰 (Guess Who I Am):** Pretend to be a relative/friend with a new number, asking for emergency money.

Your Tasks:
- **Analyze Scenarios:** If a user pastes a message, analyze if it's a scam based on keywords (ATM, Line ID, Guaranteed Profit).
- **Emotional Support:** If a user has been scammed, be comforting. Do not blame them. Guide them to call 165 or 110.
- **Roleplay:** If the user asks to practice, you can play the role of a scammer to help them train their "saying no" skills.
- **Style:** Use Traditional Chinese (zh-TW). Be concise but detailed when analyzing. Use emojis to be friendly.

Strict Rule: NEVER ask for real personal financial information. If a user shares sensitive data, tell them to delete it immediately.
`;

export const FRAUD_METHODS: FraudMethod[] = [
  {
    id: 'investment',
    title: '假投資詐騙',
    category: '高發詐欺',
    description: '詐騙集團透過簡訊、臉書、IG投放廣告，以「穩賺不賠」、「高獲利」話術，邀請加入LINE群組。初期可能讓受害者小額獲利，待投入大筆資金後，即封鎖消失。',
    indicators: ['標榜穩賺不賠', '要求加入LINE群組', '使用不明投資網站/APP', '要求匯款至個人帳戶'],
    prevention: ['不聽信來源不明資訊', '不加陌生投資群組', '使用合法交易管道', '撥打165查證'],
    icon: 'chart-line'
  },
  {
    id: 'atm',
    title: '解除分期付款',
    category: '高發詐欺',
    description: '冒充電商或銀行客服，謊稱訂單設定錯誤（如重複扣款、升級高級會員），要求民眾操作ATM或網銀來「解除設定」。',
    indicators: ['+號開頭來電', '要求操作ATM/網銀', '聽到「解除設定」關鍵字', '購買遊戲點數'],
    prevention: ['ATM無法解除設定', '掛斷電話，自行撥打官方客服查證', '不透露帳戶密碼'],
    icon: 'credit-card'
  },
  {
    id: 'love',
    title: '假交友(殺豬盤)',
    category: '情感詐欺',
    description: '透過交友軟體認識，盜用帥哥美女照。建立感情後，以「為了我們未來」、「緊急借錢」、「投資獲利」為由要求匯款。',
    indicators: ['沒見過面就談錢', '自稱外國軍官/醫生/富商', '拒絕視訊通話', '情緒勒索'],
    prevention: ['網路交友談錢必有詐', '善用以圖搜圖', '堅持見面確認身分'],
    icon: 'heart-crack'
  },
  {
    id: 'shopping',
    title: '假網拍/一頁式廣告',
    category: '消費詐欺',
    description: '商品價格遠低於市價，強調「限時搶購」、「貨到付款」。收到的商品常是假貨或與廣告不符，且求償無門。',
    indicators: ['售價低於行情太多', '網頁粗糙、只有單一頁面', '沒有公司地址電話', '只能用LINE聯繫'],
    prevention: ['選擇有第三方支付平台', '避免私下交易', '確認賣家商譽'],
    icon: 'shopping-bag'
  },
  {
    id: 'impersonate',
    title: '假檢警/公務員',
    category: '權力詐欺',
    description: '冒充檢察官或警察，指稱民眾帳戶涉及洗錢或刑案，要求「監管帳戶」或面交現金給「法院專員」。',
    indicators: ['偵查不公開', '要求監管帳戶', '傳真/Line傳送公文', '禁止掛斷電話'],
    prevention: ['檢警不會要求匯款', '不聽從電話指示製作筆錄', '直接掛斷並撥打110'],
    icon: 'siren'
  }
];

export const QUIZ_DATA: QuizQuestion[] = [
  {
    id: 1,
    scenario: "接到電話自稱是 Shopee 客服，說您的訂單因為系統錯誤被重複扣款 12 次，需要您去 ATM 解除設定。",
    options: ["趕快去 ATM 照做以免損失", "提供銀行帳號給對方查詢", "掛斷電話，直接撥打 165 或官方客服求證", "罵對方一頓"],
    correctIndex: 2,
    explanation: "這是標準的「解除分期付款」詐騙。ATM 只有提款和轉帳功能，無法解除任何設定。"
  },
  {
    id: 2,
    scenario: "在 Instagram 看到廣告「在家工作，輕鬆按讚就能日領 2000 元」，加入 Line 後對方要求先匯款「保證金」。",
    options: ["小額匯款試試看", "這是求職詐騙，拒絕並封鎖", "詢問是否有勞健保", "介紹朋友一起賺"],
    correctIndex: 1,
    explanation: "這是「假求職/假兼職」詐騙。合法的徵才不會要求求職者先支付保證金、材料費或訓練費。"
  },
  {
    id: 3,
    scenario: "網路上認識的「戰地軍醫」男友寄包裹給你，但海關說需要支付一筆「通關費」才能放行。",
    options: ["匯款救急，因為是真愛", "請他自己想辦法", "這是假交友詐騙，千萬別匯款", "跟親友借錢匯款"],
    correctIndex: 2,
    explanation: "這是典型的「假交友」詐騙（殺豬盤）。詐騙集團常利用寄送禮物卡關、生病等理由要求匯款。"
  }
];
