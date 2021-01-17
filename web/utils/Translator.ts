export enum Language {
  ar = "ar",
  en = "en",
}

const translator = (language: Language) => {
  const ar = {
    allFieldsRequired: "*جميع الحقول مطلوبة و يجب تأكيد رقم الهاتف",
    youMustLogin: "يجب عليك تسجيل الدخول",
    onlyMinute: "لا يتطلب الامر سواء دقيقة",
    signInOrRegister: "تسجيل الدخول أو الاشتراك",
    cart: "عربة التسوق",
    account: "حسابي",
    logout: "تسجيل الخروج",
    main: "الرئيسية",
    addToCart: "اضافة للعربة",
    freeShipping: "عند شرائك بأكثر من ٢٠٠ ريال التوصيل و التغليف مجاناُ",
    easyReturn: "ارجاع مجاني للمنتجات القابلة للترجيع",
    secureShipping: "معلوماتك و بياناتك دائما آمنة و سرية",
    validate: "تأكيد",
    validationCode: "كود التأكيد",
    changeNumber: "تغيير الرقم",
    sendCode: "ارسال كود التأكيد",
    validationSuccess: "تم التأكيد بنجاح",
    wrongCode: "الكود خطأ",
    shippingCost: "مصاريف الشحن",
    ordersCanReturn: "طلبات يمكن ارجاعها",
    selectOrder: "اختر طلب",
    reason: "السبب",
    applyReturn: "تقديم طلب ارجاع",
    noOrdersForReturn: "لا يوجد طلبات يمكن ارجاعها",
    all: "طلبات الارجاع",
    accepted: "تم القبول",
    refused: "تم الرفض",
    rights: "جميع الحقوق محفوظة",
    warrantyExplain: `الضمان على جميع الاجهزة الالكترونية مدة : سنتين من تاريخ الشراء وذلك بالذهاب لمراكز الخدمة وتقديم فاتوره الشراء. 
    الضمان لايشمل سوء الإستخدام او الكسر  .
    
    ملاحضة : الضمان لايشمل الاكسسوارات مثل الكفرات والاستكرات  وغيرها من المنتجات غير الالكترونية  .
    
    ، علماً بأن الضمان لا يغطي كافة المنتجات، وينبغي عليك مراجعة إدراج المنتجات لتعرف ما إذا كان المنتج يشمل ضمانا.
    
    في الحالات التي تقوم ويباي  ببيع المنتج مباشرة إليك، سيتم تقديم ضمان لمدة أربع وعشرون (24) شهراً للمنتجات التي تباع للمشترين في المملكة العربية السعودية. لا يشكل إصلاح المنتج أو إستبداله بموجب شروط هذا الضمان أي حق لتمديد أو تجديد الضمان، وتكون شروط الضمان وفقا لصانع المنتج. في حالة عدم إمكانية إصلاح منتجك ولكن لا يزال قيد الضمان، سنقوم باستبدال المنتج، وإذا كان الاستبدال غير متوفر، سيتم رد المبلغ بالكامل.
    
    يتوجب على العميل تسليم المنتج الواقع تحت الضمان بحالته الأصلية وبغلافه الأصلي ويتضمن جميع الملحقات وبطاقة الضمان.`,
    warranty: "سياسة الضمان",
    returnsPolicyExplain: `يمكنك التواصل من خلال البريد الالكتروني support@webaystore.com

    في حالة استلامك منتج تالف أو به خلل من أول أستخدام للمنتج نرجو التواصل معنا مباشرة خلال 3 أيام كحد أقصى من تاريخ أستلام الطلب عبر الرقم الموحد أو الأيميل : support@webaystore.com ويتحمل ويباي تكاليف الشحن 
    
     في حالة وجود عطل خلال فترة الضمان المحددة بعد الاستخدام للمنتج يتم استبدال المنتج التالف بمنتج جديد من نفس نوعه مباشرة في حالة عدم توفر المنتج يتم تعويض العميل بمنتج اخر بديل له في حال رغب العميل بهذا الخيار او اعطائة قسيمة شرائية بنفس قيمة المنتج يتم استخدامة في اي وقت من خلال موقعنا الالكتروني . بعد ذالك يتم شحن المنتج البديل من قبل ويباي  ويتحمل العميل تكاليف الشحن بالكامل 
    
    في حالة وصول منتج غير الطلب الذي تم طلبة من المتجر وكان الخطاء من قبل ويباي في تحضير الطلب سوف يتحمل ويباي جميع تكاليف الشحن واستبدال المنتج 
    
    اذا قمت بالطلب بأستخدام بطاقة ائتمان , فسوف نقوم برد سعر المنتج ( السلعة ) فقط . يرجى الملاحظة أن الأمر قد يستغرق مابين 7 الى 14 يوم عمل حتى يظهر المبلغ في كشف حسابك المصرفي بمجرد معالجة الدفع من الإدارة المالية.`,
    returnsPolicy: "سياسة الارجاع",
    privacyExplain: `سياسة الخصوصية
    يلتزم موقع wetopstore إلى أقصى درجة بحماية بياناتك الشخصية، ومن خلال قبولكم لسياسة الخصوصية الخاصة بعملاء موقع wetopstore فإنكم تسمحون لنا بجمع واستخدام والكشف عن المعلومات الشخصية الخاصة بك فقط وفقاً لسياسة الخصوصية وبشكل محدود جداً. يرجى العلم بأنه لن يتم أبداً بيع أو إستخدام أو عرض بياناتك الشخصية إلى أية جهة بمقابل أو بدون.
    
    كيفية حصول متجر wetopstore.com على المعلومات الشخصية للعملاء
    
    عند فتح حساب جديد على موقع متجر wetopstore نقوم بطلب مجموعة من البيانات الشخصية للعميل، حيث يجب إكمال تلك البيانات بطريقة صحيحة لإتمام عملية التسجيل على الموقع وللتأكد من عدم وجود أي معلومات كاذبة أو مضللة.
    
    المعلومات الشخصية التي نجمعها
    
    اسمك، العنوان، البريد الإلكتروني، رقم الهاتف، وغيرها من المعلومات الأساسية.
    
    معلومات مالية مثل: بطاقة الائتمان/الخصم، أو تفاصيل الحساب المصرفي في بعض المعاملات.
    
    الإجراءات الأمنية
    
    عند إتمام عملية التسجيل، يمكنك البدء في الشراء من موقع wetopstore  المحمي بشكل صارم ضد عمليات الاحتيال والإيذاء من خلال الإجراءات التالية:
    
    تسجيل وتخزين عنوان الـ اي بي الخاص بك وعدد مرات دخولك على الموقع.
    
    تجميع بيانات الاستخدام والوصول التي تسمح لنا بمنع فتح الحسابات المتعددة أو السلوكيات الاحتيالية أو لحماية أنظمتنا ضد الاعتداءات الغير مشروعة.
    
    يجوز لنا مشاركة هذه البيانات مع خدمات إدارة الاحتيال المتخصصة والجديرة بالثقة التي تساعدنا على تحليل هذه البيانات.
    
    نحن نستخدم الكوكيز؛ وهي عبارة عن ملفات نصية صغيرة يتم تخزينها على جهاز الكمبيوتر الخاص بالعميل لأغراض حفظ السجلات. وقد تكون المعلومات التي تم تجميعها وتخزينها من خلال الكوكيز ضد البيانات الشخصية التي نحتفظ بها على أنظمتنا.
    
    نقوم بالحصول على تلك المعلومات الشخصية والسرية من خلال المصادر التالية:
    
    معلومات تقوم بتزويدنا بها على الموقع، من خلال استمارات ونماذج مكتوبة وغيرها من أشكال إدخال البيانات.
    
    معلومات يتم إدخالها على الموقع، من خلال تخزين معلوماتك الشخصية من غير استكمال أو تقديم نموذج.`,
    privacy: "سياسة الخصوصية",
    buyCardTitle: "شروط شراء بطائق الشحن",
    cardRules: `شروط بطائق الشحن
    شروط الاستخدام

    يمكنك استخدام كود البطاقة مرة واحدة فقط
    يجب إدخال رمز الكود بالشكل الصحيح لحساسية حالة الاحرف .
    التأكد من نوع وفئة البطاقة قبل اتمام عملية الشراء .
    التحويلات الخاطئة يتم استرجاعها لنفس الحساب المحول منه خلال ثلاث أيام عمل .
    البطاقات التي تصل اليكم عبر قنواتنا بعد الشراء غير قابلة للاسترجاع او التبديل إذا لم يكن بها خطأ أو مشكلة .
    لا يتحمل ويباي  أي مسؤولية لمشتريات خاطئة قمت بها بذاتك بسبب الاهمال او ادخال معلومات خاطئة مما قد يؤدي الى اضرار/ خسارة . من خلال شراء بطاقة .
    أي مشاكل تظهر بالبطاقة بعد شراءها وأدخالها من قبل العميل لجهازه ( كاخطأ بالكود أو تظهر بأنه سبق شحنها .. سيتم مراسلة الشركة الأم للبطاقة لمعرفة سبب الخطأ وتاريخ ووقت شحن الكود .. وتستغرق العملية من يوم الى ٥ أيام ) ويكون مراسلتنا خلال اول ثلاث ايام من شراء البطاقة .
    تطبيق ويباي  غير مسؤول عن أي تأخير لتأكيد المبالغ المحولة إذا تجاوزت المدة 3 ايام .
    هناك رسوم إدارية عند استخدام البطاقات الائتمانية .
    أي عملية شراء تكون تحت أي شك سيتم إيقافها مباشرة ولن يتم تنفيذها , وإرسال جميع معلوماته إلى قسم الجرائم الالكترونية في وزارة التجارة لاستكمال الإجراءات القانونية حيال ذلك .
    
    هذه الشروط محل تغيير دائم وتطوير لذلك يجب على العميل مراجعتها بشكل دوري وإذا لاحظت أي جزئية مبهمة أو خطأ في تفاصيل هذه السياسة نرجو تنبيهنا لذلك .`,
    buyCardExplain:
      "بإمكانك شراء بطائق الشحن عن طريق التحويل لأحد حساباتنا البنكية وذلك بالضغط على أيقونة الواتس أب",
    cancel: "الغاء",
    emptyOrders: "عذرا لم نتمكن من العثور على اى طلبات",
    search: "بحث",

    updatedSuccess: "تم التعديل بنجاح",
    editAccount: "تعديل الحساب",
    changeName: "تغيير الاسم",
    newName: "الاسم الجديد",
    changePassword: "تغيير الرقم السرى",
    newPassword: "الرقم السرى الجديد",
    under499: "منتجات اقل من ٤٩٩ ريال",
    under999: "منتجات اقل من ٩٩٩ ريال",

    contactUs: "تواصل معنا",
    hello: "هلا",
    contactWhats: "تواصل معنا عبر الواتساب",
    contactPhone: "اتصل بنا",

    verifiedShip: "شحن موثوق به",
    safeShop: "تسوق آمن",
    verifiedShipDetails: "عند شرائك بأكثر من ٢٠٠ ريال التوصيل والتغليف مجاناً",
    easyReturnDetails: "ارجاع مجانى للمنتجات القابلة للترجيع",
    safeShopDetails: "معلوماتك و بياناتك دائما آمنة و سرية",

    productDetails: "عند شرائك بأكثر من ٢٠٠ ريال التوصيل والتغليف مجاناً",
    offerDetails: "تفاصيل العرض",
    how: "كيف تريد بيضتك يا سيدي",
    test: "اخبارك يباشا",
    welcome: "مرحبا",
    ourCategories: "فئاتنا",
    discount: "خصم",
    currency: "ر.س",
    viewProduct: "مشاهدة المنتج",
    featuredProducts: "أحدث المنتجات",
    bestSeller: "الاكثر مبيعاً",
    back: "رجوع",
    viewMore: "مشاهدة المزيد",
    viewLess: "مشاهدة اقل",
    specifications: "المواصفات",
    overview: "نظرة عامة",
    discountEnds: "سينتهي التخفيض",
    searchText: "انا ابحث عن...",
    choosePiece: "من فضلك اختر قطعتك المناسبة",

    // navigation
    home: "الرئيسية",
    categories: "الفئات",
    offers: "العروض",

    allCategories: "كافة الفئات",
    item: "قطعة",
    inStock: "في المخزون",
    selectPiece: "اختيار هذه القطعة",
    pieceSelected: "تم اختيار هذه القطعة",

    pleaseSelectPiece: "من فضلك اختر قطعة",
    emptyProducts: "عذرا لم نستطيع ايجاد منتجات",
    emptyCategories: "عذرا لم نستطيع ايجاد فئات",
    chargeCards: "بطائق الشحن",
    filter: "ترتيب حسب",
    results: "النتائج",
    applyFilter: "فرز",

    // User Fields
    name: "الاسم بالكامل",
    username: "اسم المستخدم",
    email: "البريد الالكتروني",
    password: "الرقم السري",
    loginUserOrEmail: "اسم المستخدم او البريد الالكتروني",
    register: "إنشاء حساب",
    login: "تسجيل الدخول",
    phone: "رقم هاتفك",

    // registration errors
    errorEmail: "البريد المدخل مستخدم من قبل",
    errorUsername: "اسم المستخدم المدخل مستخدم من قبل",
    errorPhone: "رقم الهاتف المدخل مستخدم من قبل",
    unknownError: "حدث خطأ ما برجاء التحقق من البيانات و المحاولة مرة اخرى",

    // login errors
    usernameNotFound: "خطأ في اسم المستخدم او البريد الالكتروني",
    errorPassword: "الرقم السري غير صحيح",

    // Account screen
    orders: "طلباتي",
    credits: "رصيدي",
    favorite: "المفضلة",
    points: "النقاط",
    address: "عنواني",
    returns: "المرتجعات",
    language: "اللغة",
    setting: "الاعدادات",
    noAddress: "لا يوجد عناوين لديك من فضلك اضف عنوان",
    addAddress: "اضافة عنوان",
    chooseCity: "اختر مدينة",
    searchForCity: "ابحث عن مدينة",
    street: "اسم الشارع",
    details: "تفاصيل تسهل الوصول",
    reload: "اعادة تحميل",

    outOfStock: "تم نفاذ الكمية",
    delayOrder: "اخطارك عند توفر المنتج",
    delayedOrder: "الطلبات المؤجلة",
    addedToDelayed: "تم بنجاح الاضافة للطلبات المؤجلة",
    addedToCart: "تم اضافة المنتج للعربة بنجاح",
    publicError: "حدث خطأ ما برجاء المحاولة لاحقاً",

    // cart
    myAddress: "عنواني",
    summary: "كوبون الخصم",
    paymentMethod: "وسيلة الدفع",
    complete: "انهاء",
    emptyCart: "عربة تسوقك فارغة",
    whatsAppBuy: "شراء عبر الواتساب",
    total: "المجموع الكلي:",
    next: "التالي",
    offer: "عرض خاص",
    // coupon
    couponError412: "لا يوجد منتجات في عربة التسوق صالحة لهذا الكوبون",
    couponError410: "المجموع الكلي غير كافي لتطبيق هذا الكوبون",
    couponError411: "لقد استخدمت هذا الكوبون بالفعل",
    couponError404: "الكوبون غير صحيح",
    couponSuccess: "تم تطبيق الكوبون بنجاح",

    // payment
    availablePayments:
      "هذه هي وسائل الدفع المتاحة للمدينة المختارة في عنوان الشحن",
    notAvailable: "غير متاح",
    available: "متاح",
    pay: "الخطوه التالية",
    makeOrder: "دفع",
    orderReceived: "تم استلام طلبك",
    goOrders: "طلباتي",
    // order status
    review: "قيد المراجعة",
    processing: "قيد التنفيذ",
    shipped: "تم الشحن",
    delivered: "تم الاستلام",
    reviewForReturn: "مراجعة للارجاع",
    returned: "مرتجع",
    notReturned: "تم رفض الارجاع",
  };
  const en: typeof ar = {
    freeShipping: "Free Shipping when buy with 200 SAR or more",
    easyReturn: "Free return for returnable products",
    secureShipping: "Your information always secure",
    addToCart: "ADD TO CART",
    main: "Home",
    allFieldsRequired: "*All fields required and must verify phone",
    onlyMinute: "It's quick and easy",
    signInOrRegister: "Sign in or Sign up",
    cart: "Shopping Cart",
    account: "My Account",
    logout: "Logout",
    how: "How do you want your egg today?",
    test: "hi man",
    welcome: "Welcome",
    ourCategories: "Our categories",
    discount: "Discount",
    offer: "Special offer",
    currency: "SAR",
    viewProduct: "View Product",
    featuredProducts: "Latest Products",
    bestSeller: "Best Seller",
    back: "Back",
    viewMore: "View More",
    viewLess: "View Less",
    specifications: "Specifications",
    overview: "Overview",
    discountEnds: "Discount Ends",
    searchText: "I am searching for...",
    search: "search",
    choosePiece: "Please choose your suitable piece",

    // navigation
    home: "Home",
    categories: "Categories",
    offers: "Offers",

    allCategories: "All Categories",
    item: "items",
    inStock: "in stock",

    selectPiece: "SELECT PIECE",
    pieceSelected: "PIECE SELECTED",

    pleaseSelectPiece: "Please Select Piece",
    emptyProducts: "Sorry We couldn't find products",
    emptyOrders: "Sorry We couldn't find orders",
    emptyCategories: "Sorry We couldn't find categories",
    chargeCards: "Charge Cards",
    filter: "Filter By",
    results: "Results",
    applyFilter: "Filter",

    // User Fields
    name: "Full Name",
    username: "Username",
    email: "Email",
    password: "Password",
    loginUserOrEmail: "Username or Email",
    register: "Register",
    login: "Login",
    phone: "Phone",

    // registration errors
    errorEmail: "The email you entered is already taken",
    errorUsername: "The username you entered is already taken",
    errorPhone: "The phone you entered is already taken",
    unknownError: "Unknown error please check inputs and try again",

    // login errors
    usernameNotFound: "Username or Email not found",
    errorPassword: "Incorrect password",

    // Account screen
    orders: "Orders",
    credits: "Credits",
    favorite: "Favorites",
    points: "Points",
    address: "Addresses",
    returns: "Returns",
    language: "Language",
    setting: "Settings",

    outOfStock: "Out of stock",
    delayOrder: "Notify you when available",
    delayedOrder: "Delayed Orders",
    addedToDelayed: "Successfully added to delayed orders",
    addedToCart: "Successfully added to cart",
    publicError: "Some error happens please try again",
    noAddress: "There are no addresses found",
    addAddress: "ِAdd Address",
    reload: "Reload",
    chooseCity: "Choose a City",
    searchForCity: "Search for City",
    street: "Street Name",
    details: "Details",
    // cart
    myAddress: "My Address",
    summary: "Coupon",
    paymentMethod: "Payment Method",
    complete: "Complete",
    emptyCart: "Your cart is empty",
    whatsAppBuy: "WhatsApp Buy",
    total: "Total Cost:",
    next: "Next",
    ordersCanReturn: "Orders can be returned",
    selectOrder: "Select Order",
    reason: "Reason",
    applyReturn: "Apply return form",
    noOrdersForReturn: "There are no orders can be returned",

    // coupon
    couponError412: "Your cart products not have a valid product for coupon",
    couponError410: "Total cost not enough to use this coupon",
    couponError411: "You already used this coupon",
    couponError404: "Invalid coupon",
    couponSuccess: "coupon success applied",

    availablePayments: "This is available payment methods in your city",
    notAvailable: "Not Available",
    available: "Available",
    pay: "CONFIRM",
    makeOrder: "PAY",
    orderReceived: "Order Received",
    goOrders: "My Orders",
    youMustLogin: "You must login",

    // order status
    review: "In review",
    processing: "Processing",
    shipped: "In delivery",
    delivered: "Delivered",
    reviewForReturn: "Review for return",
    returned: "Returned",
    notReturned: "Not returned",
    offerDetails: "Offer Details",
    productDetails: "Free shipping for orders with more than 200 SAR",
    hello: "Hello",

    // product 3 sections
    verifiedShip: "Verified Ship",
    safeShop: "Secure pay",
    verifiedShipDetails: "Free ship when order more than 200 SAR",
    easyReturnDetails: "Free return on product can be returned",
    safeShopDetails: "Your information is secure and safe always",
    contactUs: "Contact Us",
    contactWhats: "Contact us via whatsapp",
    contactPhone: "Call us",
    under499: "Products under 499 SAR",
    under999: "Products under 999 SAR",
    editAccount: "Edit Account",
    changeName: "Change Name",
    newName: "New Name",
    changePassword: "Change Password",
    newPassword: "New Password",
    updatedSuccess: "Updated Successfully",
    cancel: "Cancel",
    buyCardExplain:
      "You can buy cards via bank transfer buy clicking on buy via whatsapp",
    cardRules: `Terms of use

    You can use the card code only once
    The code code must be entered correctly for case-sensitive letters.
    Check the type and category of the card before completing the purchase.
    Wrong transfers are returned to the same account from within three business days.
    Cards that arrive via our channels after purchase are non-refundable or non-refundable.
    EBay accepts no responsibility for wrong purchases made by yourself due to negligence or misrepresentation which may result in damage / loss. By buying a card.
    Any problems that appear with the card after purchased and inserted by the customer for his device (such as error code or show that it has already been shipped .. will be the parent of the card company to find out the cause of the error and the date and time of charging the code .. The process takes from one to five days) and be emailed within the first three days Buy the card.
    The eBay application is not responsible for any delay to confirm the amounts transferred if the period exceeds 3 days.
    There is an administrative fee when using credit cards.
    Any purchase that is under any doubt will be stopped immediately and will not be carried out, and send all his information to the Department of Cybercrime in the Ministry of Commerce to complete the legal proceedings about it.
    
    These terms are subject to permanent change and development, so the customer should review them periodically and if you notice any vague part or error in the details of this policy, please let us know.
    
    `,
    buyCardTitle: "Buy Cards Terms",
    privacy: "Privacy and Policies",
    privacyExplain: `Privacy policy
    The webaystore website is committed to the utmost protection of your personal data. By accepting the privacy policy of webaystore customers, you allow us to collect, use and disclose your personal information only in accordance with this privacy policy and to a very limited extent. Please be aware that your personal data will never be sold, used or displayed to anyone with or without payment.
    
    How webaystore.com obtains personal information for customers
    
    When opening a new account on the webaystore store, we request a set of personal data of the customer, which must be completed correctly to complete the registration process on the site and to ensure that there is no false or misleading information.
    
    Personal information we collect
    
    Your name, address, email, phone number, and other basic information.
    
    Financial information such as credit / debit card, or bank account details in certain transactions.
    
    Security measures
    
    When you complete the registration process, you can start purchasing from the strictly protected webaystore site against fraud and abuse through the following procedures:
    
    Register and store your IP address and the number of times you access the site.
    
    Collect usage and access data that allows us to prevent multiple accounts from opening or fraudulent behavior or to protect our systems against unlawful attacks.
    
    We may share this data with specialized and trustworthy fraud management services that help us analyze this data.
    
    We use cookies; these are small text files that are stored on the client's computer for record-keeping purposes. The information collected and stored through cookies may be against the personal data we hold on our systems.
    
    We obtain such personal and confidential information through the following sources:
    
    Information you provide to us on the website, through written forms, forms and other forms of data entry.
    
    Information entered on the Site, by storing your personal information without completing or submitting a form.
    
    `,
    returnsPolicy: "Returns Policy",
    returnsPolicyExplain: `You can contact by email support@webaystore .com

    If you receive a damaged or defective product from the first use of the product, please contact us directly within a maximum of 3 days from the date of receipt of the application via the unified number or email: support@webaystore.com.
    
    In the event of a malfunction within the specified warranty period after use of the product, the damaged product will be replaced with a new product of the same type directly. Time through our website. The replacement product will then be shipped by eBay and the customer will bear the entire shipping cost
    
    In the event of a non-order product arrival that has been ordered from the store and was mistaken by eBay in preparing the order, eBay will bear all shipping costs and product replacement
    
    If you place an order using a credit card, we will only refund the price of the product. Please note that it may take 7 to 14 business days for the payment to appear on your bank statement once the payment has been processed by the Finance Department.
    
    `,
    warranty: "Warranty Policy",
    warrantyExplain: `Warranty on all electronic devices Duration: 2 years from the date of purchase by going to the service centers and provide the purchase invoice.
    Warranty does not include misuse or breakage.
    
    Note: The warranty does not include accessories such as tires, stickers and other non-electronic products.
    
    The warranty does not cover all products, and you should check the product listing to see if the product includes a warranty.
    
    In cases where eBay sells the product directly to you, a 24-month warranty will be offered to products sold to buyers in Saudi Arabia. Repair or replacement of the product under the terms of this warranty shall not constitute any right to extend or renew the warranty, and the warranty terms shall be in accordance with the manufacturer of the product. If your product cannot be repaired but is still under warranty, we will replace the product, and if a replacement is not available, a full refund will be given.
    
    The customer must deliver the product under warranty in its original condition and original packaging and includes all accessories and warranty card.
  
    `,
    rights: "All Rights Reserved",
    accepted: "Accepted Requests",
    refused: "Refused",
    all: "Return Requests",
    shippingCost: "Shipping Cost",
    sendCode: "Send Validation Code",
    validationSuccess: "Validation Success",
    wrongCode: "Wrong Code",
    changeNumber: "Change Number",
    validationCode: "Validation Code",
    validate: "Validate",
  };

  return { ar, en }[language];
};


export default translator;
