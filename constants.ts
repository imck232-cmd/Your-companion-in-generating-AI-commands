export const TABS = [
    { id: 0, label: "📚 تحضير الدروس", formType: 'lesson', component: 'LessonForm' },
    { id: 1, label: "📝 إنشاء الاختبارات", formType: 'exam', component: 'ExamForm' },
    { id: 2, label: "📄 النصوص والمحتوى", formType: 'content', component: 'ContentForm' },
    { id: 3, label: "🔍 التحليل والبحث", formType: 'research', component: 'ResearchForm' },
    { id: 4, label: "👨‍🏫 تنفيذ الدرس", formType: 'classroom', component: 'ClassroomForm' },
    { id: 5, label: "📻 الإذاعة المدرسية", formType: 'broadcast', component: 'BroadcastForm' },
    { id: 6, label: "🏆 حفلات التكريم", formType: 'event', component: 'EventForm' },
    { id: 7, label: "🎬 إنشاء فيديو", formType: 'video', component: 'VideoForm' },
    { id: 8, label: "🖼️ إنشاء صور", formType: 'image', component: 'ImageForm' },
    { id: 9, label: "💻 البرامج والتطبيقات", formType: 'app', component: 'AppForm' },
    { id: 10, label: "📱 المحتوى الرقمي", formType: 'digital', component: 'DigitalForm' },
    { id: 11, label: "🌟 التطوير الشخصي", formType: 'development', component: 'DevelopmentForm' },
];

export const SUBJECTS = [
    "اللغة العربية", "اللغة الإنجليزية", "الرياضيات", "الفيزياء", "الكيمياء", "الأحياء",
    "العلوم", "التربية الإسلامية", "الدراسات الاجتماعية", "التاريخ", "الجغرافيا", "الحاسوب", "التربية الفنية"
];

export const GRADES = [
    "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس",
    "السابع", "الثامن", "التاسع", "العاشر", "الحادي عشر", "الثاني عشر"
];

export const LESSON_METHODS = [
    "التعلم النشط", "العصف الذهني", "التعلم التعاوني", "حل المشكلات", "التعلم بالاستقصاء",
    "التعلم بالمشاريع", "القصة التعليمية", "التعلم باللعب", "التعلم بالاكتشاف"
];

export const EXAM_TYPES = [
    "اختبار تحصيلي شامل", "اختبار قصير (Quiz)", "اختبار نصف فصلي", "اختبار نهائي", "اختبار تشخيصي", "اختبار تكويني"
];

export const DIFFICULTIES = ["سهل", "متوسط", "صعب", "متدرج (سهل - متوسط - صعب)"];

export const CONTENT_TYPES = [
    "مقال أكاديمي", "مقال صحفي", "محتوى تسويقي", "تقرير رسمي", "رسالة بريد إلكتروني",
    "سيرة ذاتية", "محتوى سوشيال ميديا", "قصة تعليمية", "خطاب رسمي"
];

export const CONTENT_STYLES = [
    "رسمي", "أكاديمي", "إبداعي", "تسويقي", "بسيط ومباشر", "تحفيزي", "وصفي", "سردي"
];

export const RESEARCH_TYPES = [
    "تحليل نصوص", "تحليل بيانات إحصائية", "مقارنة بين مفاهيم", "تلخيص دراسة علمية",
    "تحليل SWOT", "استخراج نتائج بحثية", "تحليل نقدي"
];

export const CLASSROOM_TYPES = [
    "استراتيجية تدريس", "نشاط صفي تفاعلي", "بطاقة تقييم أداء",
    "وسيلة تعليمية", "لعبة تعليمية", "خطة إدارة صفية", "سيناريو تنفيذ حصة"
];

export const BROADCAST_TYPES = [
    "برنامج إذاعي متكامل", "مقدمة إذاعية", "كلمة صباحية",
    "فقرة هل تعلم", "فقرة شعرية", "حوار تمثيلي"
];

export const EVENT_TYPES = [
    "حفل تكريم الطلاب المتفوقين", "حفل التخرج", "حفل يوم المعلم",
    "حفل نهاية العام", "حفل استقبال طلاب جدد", "حفل تكريم المتقاعدين"
];

export const EVENT_ELEMENTS = [
    "كلمة افتتاحية", "سيناريو كامل للحفل", "كلمة المدير",
    "كلمة الطلاب", "فقرة شعرية", "كلمة شكر", "دعوة رسمية"
];

export const EVENT_TONES = ["رسمي", "احتفالي", "مؤثر وعاطفي", "تحفيزي"];

export const VIDEO_TYPES = [
    "فيديو تعليمي", "فيديو توعوي", "فيديو تسويقي", "فيديو تحفيزي",
    "فيديو Reels قصير", "فيديو رسوم متحركة", "فيديو موشن جرافيك"
];

export const VIDEO_STYLES = ["رسمي", "كرتوني", "سردي", "حواري", "عملي تطبيقي"];

export const IMAGE_TYPES = [
    "صورة تعليمية توضيحية", "غلاف درس", "ملصق توعوي",
    "خلفية عرض تقديمي", "شعار (Logo)", "لوحة فنية", "إنفوجرافيك"
];

export const IMAGE_STYLES = ["واقعي", "كرتوني", "مبسط", "فني احترافي", "ثلاثي الأبعاد", "minimalistic"];

export const APP_TYPES = [
    "تطبيق ويب", "تطبيق موبايل", "برنامج سطح المكتب",
    "أداة ذكية (Tool)", "نظام إدارة", "لعبة تعليمية"
];

export const APP_TECHS = ["HTML/CSS/JavaScript", "Python", "Flutter", "React", "Java", "PHP", "Node.js"];

export const DIGITAL_TYPES = [
    "منشورات سوشيال ميديا", "حملة تسويقية رقمية", "خطة محتوى أسبوعية",
    "وسوم (Hashtags)", "نصوص إعلانية", "محتوى تفاعلي"
];

export const DIGITAL_PLATFORMS = [
    "فيسبوك", "إنستغرام", "تويتر (X)", "تيك توك", "لينكد إن", "يوتيوب", "جميع المنصات"
];

export const DIGITAL_TONES = ["احترافي", "ودي وقريب", "تحفيزي", "تعليمي", "ترفيهي"];

export const DEV_TYPES = [
    "خطة تطوير مهني", "برنامج تدريبي", "خطة تحفيزية", "استراتيجية قيادية",
    "أداة تقييم أداء", "خطة إدارة وقت", "خطة تعلم مهارة جديدة"
];
