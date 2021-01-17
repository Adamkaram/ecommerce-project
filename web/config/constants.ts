export const paymentMethods = {
  delivery: 1,
  bank: 2,
  creditCard: 3,
  wallet: 4,
};
// export const url = "http://localhost:3000";
export const url = "http://54.198.186.106";
// export const url = "https://webaystore.com";

export const phoneNumber = 966550571723;

export const currency = {
  ar: "ر.س",
  en: "SAR",
};
export const messageCodes = {
  emailFound: 1,
  usernameFound: 2,
  phoneFound: 3,
  registerSuccess: 4,
  unknownError: 5,
  usernameNotFound: 6,
  incorrectPassword: 7,
  loginSuccess: 8,
  validCode: 9,
  wrongCode: 10,
};
export const userAuthMessages = {
  1: { ar: "تم استخدام هذا البريد من قبل", en: "Email already used" },
  2: { ar: "اسم المستخدم تم استخدامه من قبل", en: "username already used" },
  3: { ar: "رقم الهاتف تم استخدامه من قبل", en: "phone already used" },
  4: { ar: "تم التسجيل بنجاح", en: "registered successfully" },
  5: { ar: "خطأ غير معروف", en: "unknown error" },
  6: { ar: "اسم المستخدم غير موجود", en: "username not found" },
  7: { ar: "الرقم السري غير صحيح", en: "wrong password" },
  8: { ar: "تم تسجيل الدخول بنجاح", en: "login successfully" },
  9: { ar: "تم التحقق الهاتف بنجاح", en: "phone validated" },
  10: { ar: "الكود خطأ", en: "wrong code" },
};

export const cartMessageCodes = {
  addedToCart: 1,
  addedToDelayed: 2,
  unknownError: 3,
};
export const orderStatus = {
  review: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
  reviewForReturn: 4,
  returned: 5,
  notReturned: 6,
};

export const sort = {
  LATEST: {
    label: {
      ar: "الاحدث",
      en: "Newest",
    },
    value: "latest",
  },
  OLDEST: {
    label: {
      ar: "الأقدم",
      en: "Oldest",
    },
    value: "oldest",
  },
  HIGH_PRICE: {
    label: {
      ar: "الأعلى سعراً",
      en: "High Price",
    },
    value: "high",
  },
  LOW_PRICE: {
    label: {
      ar: "الأقل سعراً",
      en: "Low Price",
    },
    value: "low",
  },
  TOP: {
    label: {
      ar: "الأكثر مبيعاً",
      en: "Best Seller",
    },
    value: "top",
  },
};
