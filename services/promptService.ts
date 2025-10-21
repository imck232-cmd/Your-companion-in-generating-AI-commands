import type { FormType, AllFormTypes, LessonFormData, ExamFormData, ContentFormData, ResearchFormData, ClassroomFormData, BroadcastFormData, EventFormData, VideoFormData, ImageFormData, AppFormData, DigitalFormData, DevelopmentFormData } from '../types';

const generateLessonPrompt = (data: LessonFormData): string => {
    let prompt = `أنت معلم خبير ومتخصص في ${data.subject} ولديك خبرة في صياغة المعلومات بطريقة سهلة وجذابة.\n\n`;
    prompt += `أنشئ ${data.types.join(' و')} بعنوان "${data.title}" لمادة ${data.subject} للصف ${data.grade}`;
    if (data.method) prompt += `، باستخدام أسلوب ${data.method}`;
    prompt += `.\n\n**المواصفات المطلوبة:**\n`;

    if (data.types.includes('تحضير درس كامل') || data.types.includes('تحديد الأهداف')) {
        prompt += `\n**نواتج التعلم (الأهداف التعليمية):**\n- أهداف معرفية واضحة ومحددة (ماذا سيفهم الطالب؟)\n- أهداف مهارية قابلة للقياس (ماذا سيكون قادراً على فعله؟)\n- أهداف وجدانية تعزز القيم\n`;
    }
    if (data.types.includes('تحضير درس كامل') || data.types.includes('كتابة تمهيد')) {
        prompt += `\n**التمهيد:**\n- قدم فقرة قصيرة وجذابة لشد انتباه الطلاب\n- اربط الدرس بخبرات الطلاب السابقة\n- اطرح أسئلة تحفيزية تثير التفكير\n`;
    }
    if (data.types.includes('تحضير درس كامل') || data.types.includes('عرض تفصيلي')) {
        prompt += `\n**العرض:**\n- قسّم المعلومة إلى أجزاء صغيرة ومنطقية\n- اشرح كل مفهوم بلغة واضحة ومختصرة\n- قدم أمثلة واقعية وتطبيقات عملية لكل جزء\n`;
        if (data.duration) prompt += `- ضع توزيعاً زمنياً للحصة (${data.duration} دقيقة)\n`;
    }
    if (data.types.includes('تحضير درس كامل') || data.types.includes('أنشطة صفية')) {
        prompt += `\n**الأنشطة:**\n- صمم أنشطة تفاعلية قصيرة أثناء الشرح\n- اقترح أنشطة جماعية تعاونية\n- راعِ الفروق الفردية بين الطلاب\n`;
    }
    if (data.types.includes('تحضير درس كامل') || data.types.includes('أساليب التقويم')) {
        prompt += `\n**التقويم:**\n- أنشئ 3-5 أسئلة قصيرة لقياس الفهم الآني للطلاب\n- أسئلة متنوعة تقيس مستويات التفكير المختلفة\n`;
    }

    prompt += `\n**تأكد من:**\n- ملاءمة المحتوى للفئة العمرية\n- وضوح اللغة والأسلوب\n- تحفيز التفكير النقدي والإبداعي\n`;

    if (data.notes) prompt += `\n**ملاحظات إضافية:**\n${data.notes}\n`;

    prompt += `\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق، وأتطلع إلى عمل متقن وفعال يعكس فهمك العميق لمتطلبات الأمر السابق.`;
    return prompt;
};

const generateExamPrompt = (data: ExamFormData): string => {
    let prompt = `أنت مختص في القياس والتقويم التربوي.\n\n`;
    prompt += `أنشئ ${data.examType} في مادة ${data.subject} للصف ${data.grade}`;
    if (data.topic) prompt += ` عن "${data.topic}"`;
    prompt += `.\n\n**المواصفات:**\n- عدد الأسئلة: ${data.questions}\n- أنواع الأسئلة: ${data.questionTypes.join('، ')}\n- مستوى الصعوبة: ${data.difficulty}`;
    if (data.duration) prompt += `\n- المدة: ${data.duration} دقيقة`;

    prompt += `\n\n**المتطلبات:**\n- توزيع متوازن للأسئلة حسب الأنواع المختارة\n- تغطية شاملة لجميع أجزاء ${data.topic || 'المادة'}\n- تنوع في مستويات التفكير (تذكر، فهم، تطبيق، تحليل)\n- اكتب تعليمات واضحة للطالب في بداية الاختبار\n- إرفاق إجابات نموذجية كاملة\n- جدول توزيع الدرجات\n- تقديم الاختبار في جدول منظم وواضح`;

    if (data.notes) prompt += `\n\n**ملاحظات:**\n${data.notes}`;
    
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق، وأتطلع إلى عمل متقن وفعال يعكس فهمك العميق لمتطلبات الأمر السابق.`;

    return prompt;
};

const generateContentPrompt = (data: ContentFormData): string => {
    let prompt = `أنت كاتب محتوى محترف متخصص في كتابة ${data.type}.\n\n`;
    prompt += `اكتب ${data.type} بعنوان "${data.topic}"`;
    if (data.length) prompt += ` بطول ${data.length} كلمة تقريباً`;
    prompt += `.\n\n**المواصفات:**`;
    if (data.style) prompt += `\n- الأسلوب: ${data.style}`;
    if (data.audience) prompt += `\n- الجمهور المستهدف: ${data.audience}`;

    prompt += `\n\n**المتطلبات:**\n- محتوى عالي الجودة ومنظم (مقدمة، عرض، خاتمة)\n- لغة واضحة ومؤثرة مناسبة للجمهور\n- أفكار متسلسلة ومترابطة بشكل منطقي`;

    if (data.notes) prompt += `\n\n**تفاصيل إضافية:**\n${data.notes}`;

    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق، وأتطلع إلى عمل متقن وفعال يعكس فهمك العميق لمتطلبات الأمر السابق.`;

    return prompt;
};

const generateResearchPrompt = (data: ResearchFormData): string => {
    let prompt = `أنت محلل أبحاث محايد وموضوعي.\n\nقم بـ ${data.type} حول "${data.topic}".\n`;
    if (data.input) {
        prompt += `\n**البيانات أو النص المدخل للتحليل:**\n${data.input}\n`;
    }
    prompt += `\n**المطلوب:**\n- ${data.output || 'تحليل دقيق وشامل'}\n- ذكر نقاط القوة والضعف بشكل متوازن\n- استنتاجات واضحة ومبنية على الأدلة\n- عرض منظم للنتائج\n- تقديم 3 توصيات عملية بناءً على التحليل`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب.`;
    return prompt;
};

const generateClassroomPrompt = (data: ClassroomFormData): string => {
    let prompt = `أنت معلم ديناميكي ومتمكن، ولديك مهارات ممتازة في إدارة الصف وإشراك الطلاب.\n\n`;
    prompt += `أنشئ ${data.type} لموضوع "${data.topic}"`;
    if (data.grade) prompt += ` للصف ${data.grade}`;
    prompt += `.\n\n**المواصفات:**\n`;
    if (data.objective) prompt += `- الهدف: ${data.objective}\n`;
    if (data.duration) prompt += `- المدة المقترحة للتنفيذ: ${data.duration} دقيقة\n`;

    prompt += `\n**المتطلبات:**\n`;
    prompt += `- قدم شرحًا تفصيليًا وخطوات واضحة للتنفيذ.\n`;
    prompt += `- تأكد من أن الأداة تفاعلية، مبتكرة، وجذابة للطلاب.\n`;
    if (data.type.includes("سيناريو") || data.type.includes("خطة")) {
         prompt += `- إذا كان المطلوب خطة أو سيناريو، قسم الوقت إلى فقرات زمنية (مثال: 0-5 دقائق: تمهيد، 5-20 دقيقة: شرح...) مع تحديد دور كل من المعلم والطلاب في كل فترة.\n`;
    }
   
    if (data.notes) prompt += `\n**ملاحظات إضافية:**\n${data.notes}\n`;

    prompt += `\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق، وأتطلع إلى عمل متقن وفعال.`;
    return prompt;
};

const generateBroadcastPrompt = (data: BroadcastFormData): string => {
    let prompt = `أنت منسق فعاليات ومعد برامج إذاعية محترف.\n\n`;
    prompt += `أنشئ ${data.type} حول موضوع "${data.topic}"`;
    if (data.occasion) prompt += ` بمناسبة ${data.occasion}`;
    prompt += `.\n\n**المواصفات:**\n`;
    if (data.grade) prompt += `- الفئة المستهدفة: ${data.grade}\n`;
    if (data.duration) prompt += `- مدة البرنامج: ${data.duration} دقيقة\n`;
    prompt += `\n**المتطلبات:**\n- يجب أن يكون المحتوى مناسبًا ومؤثرًا للفئة المستهدفة.\n- إذا كان برنامجًا متكاملًا، قم بتضمين هيكل زمني (قرآن، حديث، كلمة الصباح، هل تعلم...).`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

const generateEventPrompt = (data: EventFormData): string => {
    let prompt = `أنت مدير فعاليات ومناسبات محترف.\n\n`;
    prompt += `قم بإعداد ${data.element} لـ ${data.type}`;
    if (data.occasion) prompt += ` بمناسبة "${data.occasion}"`;
    prompt += `.\n\n**المواصفات:**\n`;
    if (data.tone) prompt += `- الأسلوب المطلوب: ${data.tone}\n`;
    if (data.duration) prompt += `- مدة الحفل التقريبية: ${data.duration} دقيقة\n`;
    prompt += `\n**المتطلبات:**\n- يجب أن يكون المحتوى مناسبًا للمناسبة وراقياً.\n- إذا كان سيناريو كامل، قم بتضمين برنامج الحفل (بدء، ترحيب، فقرات، تكريم، ختام).`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

const generateVideoPrompt = (data: VideoFormData): string => {
    let prompt = `أنت صانع محتوى فيديو وكاتب سيناريو محترف.\n\n`;
    prompt += `اكتب سيناريو لـ ${data.type} حول موضوع "${data.topic}".\n\n**المواصفات:**\n`;
    if (data.duration) prompt += `- مدة الفيديو: ${data.duration} دقيقة\n`;
    if (data.audience) prompt += `- الجمهور المستهدف: ${data.audience}\n`;
    if (data.style) prompt += `- الأسلوب: ${data.style}\n`;
    prompt += `\n**المتطلبات:**\n- قم بتقسيم السيناريو إلى مشاهد (Scene).\n- لكل مشهد، صف النص المرئي (ما سيراه المشاهد) والنص المسموع (الحوار أو السرد).\n- يجب أن يكون السيناريو جذابًا ويوصل الرسالة بفعالية.`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

const generateImagePrompt = (data: ImageFormData): string => {
    let prompt = `أنت مصمم جرافيك ومخرج فني مبدع. أنشئ ${data.type} حول "${data.subject}".\n`;
    prompt += `\n**المواصفات:**\n`;
    if (data.style) prompt += `- النمط الفني: ${data.style}\n`;
    if (data.colors) prompt += `- لوحة الألوان: ${data.colors}\n`;
    if (data.elements) prompt += `- العناصر المرئية الرئيسية: ${data.elements}\n`;
    if (data.notes) prompt += `- ملاحظات إضافية: ${data.notes}\n`;
    prompt += `\nتأكد من أن الصورة عالية الجودة، جذابة بصريًا، وتوصل الرسالة بوضوح.`;
    return prompt;
};

const generateAppPrompt = (data: AppFormData): string => {
    let prompt = `أنت مهندس برمجيات ومطور تطبيقات محترف.`;
    if (data.tech) prompt += ` متخصص في ${data.tech}`;
    prompt += `.\n\nقم بإنشاء برومبت لوصف أو كتابة كود أساسي لـ ${data.type} الغرض منه هو "${data.purpose}".\n\n**المواصفات:**\n`;
    if (data.features) prompt += `- الميزات الرئيسية المطلوبة:\n${data.features}\n`;
    if (data.users) prompt += `- المستخدمون المستهدفون: ${data.users}\n`;
    prompt += `\n**المتطلبات:**\n- صف الهيكل العام للتطبيق.\n- قدم الخطوات الرئيسية للتطوير أو الكود المبدئي.\n- يجب أن يكون الحل منطقيًا وقابلًا للتنفيذ.`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

const generateDigitalPrompt = (data: DigitalFormData): string => {
    let prompt = `أنت استراتيجي محتوى رقمي وخبير في التسويق عبر وسائل التواصل الاجتماعي.\n\n`;
    prompt += `قم بإنشاء ${data.type} حول "${data.topic}".\n\n**المواصفات:**\n`;
    if (data.platform) prompt += `- المنصة المستهدفة: ${data.platform}\n`;
    if (data.audience) prompt += `- الجمهور المستهدف: ${data.audience}\n`;
    if (data.tone) prompt += `- أسلوب المحتوى: ${data.tone}\n`;
    if (data.posts) prompt += `- عدد المنشورات المطلوبة: ${data.posts}\n`;
    prompt += `\n**المتطلبات:**\n- يجب أن يكون المحتوى جذابًا ومناسبًا للمنصة المحددة.\n- اقترح وسوم (Hashtags) ذات صلة.\n- قدم أفكارًا مبتكرة للتفاعل مع الجمهور.`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

const generateDevelopmentPrompt = (data: DevelopmentFormData): string => {
    let prompt = `أنت مدرب حياة ومرشد شخصي محترف وخبير في التطوير الإداري.\n\n`;
    prompt += `قم بإنشاء ${data.type} لـ ${data.target}.\n\n**المواصفات:**\n`;
    if (data.focus) prompt += `- محور التطوير: ${data.focus}\n`;
    if (data.duration) prompt += `- المدة الزمنية: ${data.duration}\n`;
    if (data.outcome) prompt += `- النتائج المتوقعة:\n${data.outcome}\n`;
    prompt += `\n**المتطلبات:**\n- يجب أن تكون الخطة عملية وقابلة للتطبيق.\n- قسم الخطة إلى خطوات إجرائية واضحة.\n- اقترح آليات للمتابعة وقياس التقدم.`;
    if (data.notes) prompt += `\n\n**ملاحظات إضافية:**\n${data.notes}`;
    prompt += `\n\nأثق بخبرتك المتقدمة في تطوير العمل المطلوب بصورة تفاعلية والبحث النصي الدقيق.`;
    return prompt;
};

export const generatePrompt = (formType: FormType, formData: AllFormTypes): string => {
    switch (formType) {
        case 'lesson':
            return generateLessonPrompt(formData as LessonFormData);
        case 'exam':
            return generateExamPrompt(formData as ExamFormData);
        case 'content':
            return generateContentPrompt(formData as ContentFormData);
        case 'research':
            return generateResearchPrompt(formData as ResearchFormData);
        case 'classroom':
            return generateClassroomPrompt(formData as ClassroomFormData);
        case 'broadcast':
            return generateBroadcastPrompt(formData as BroadcastFormData);
        case 'event':
            return generateEventPrompt(formData as EventFormData);
        case 'video':
            return generateVideoPrompt(formData as VideoFormData);
        case 'image':
            return generateImagePrompt(formData as ImageFormData);
        case 'app':
            return generateAppPrompt(formData as AppFormData);
        case 'digital':
            return generateDigitalPrompt(formData as DigitalFormData);
        case 'development':
            return generateDevelopmentPrompt(formData as DevelopmentFormData);
        default:
            return `تم إنشاء برومبت لنوع "${formType}" مع البيانات التالية:\n\n${JSON.stringify(formData, null, 2)}`;
    }
};
