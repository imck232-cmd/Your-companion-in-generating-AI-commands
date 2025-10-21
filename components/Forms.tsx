import React, { useState, FormEvent, ChangeEvent } from 'react';
import type { LessonFormData, ExamFormData, ContentFormData, ResearchFormData, ClassroomFormData, BroadcastFormData, EventFormData, VideoFormData, ImageFormData, AppFormData, DigitalFormData, DevelopmentFormData } from '../types';
import * as C from '../constants';

// --- Reusable Form Components ---
interface FormComponentProps {
    onGenerate: (data: any) => void;
}

const InfoBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-indigo-50 p-5 rounded-lg border-r-4 border-indigo-500 mb-6">
        <h4 className="text-indigo-700 text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600">{children}</p>
    </div>
);

const SuggestionsBox: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-yellow-50 p-5 rounded-lg border-r-4 border-yellow-500 mb-6">
        <h5 className="text-yellow-700 text-lg font-bold mb-3">{title}</h5>
        <ul className="list-disc pr-5 space-y-2 text-gray-700">{children}</ul>
    </div>
);

const FormGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="mb-6">
        <label className="block mb-2 font-bold text-gray-700 text-lg">{label}</label>
        {children}
    </div>
);

const commonInputClasses = "w-full p-3 border-2 border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200";

const DatalistInput: React.FC<{ id: string; name: string; list: string; options: string[]; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; placeholder: string; required?: boolean; }> = 
({ id, list, options, ...props }) => (
    <>
        <input id={id} list={list} className={commonInputClasses} {...props} />
        <datalist id={list}>
            {options.map(opt => <option key={opt} value={opt} />)}
        </datalist>
    </>
);

const CheckboxGroup: React.FC<{ name: string; options: { id: string; value: string; label: string; }[]; selected: string[]; onChange: (values: string[]) => void; }> = 
({ name, options, selected, onChange }) => {
    const handleChange = (value: string) => {
        const newSelection = selected.includes(value)
            ? selected.filter(item => item !== value)
            : [...selected, value];
        onChange(newSelection);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {options.map(opt => (
                <div key={opt.id} className="flex items-center p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100 cursor-pointer" onClick={() => handleChange(opt.value)}>
                    <input type="checkbox" id={opt.id} name={name} value={opt.value} checked={selected.includes(opt.value)} onChange={() => {}} className="w-5 h-5 ml-3 cursor-pointer accent-indigo-600"/>
                    <label htmlFor={opt.id} className="cursor-pointer flex-1">{opt.label}</label>
                </div>
            ))}
        </div>
    );
};

const SubmitButton: React.FC = () => (
     <button type="submit" className="w-full sm:w-auto bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-12 py-3 border-none rounded-full text-lg font-bold cursor-pointer transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 block mx-auto mt-8">
        🚀 إنشاء البرومبت
    </button>
);


// --- Specific Form Implementations ---

export const LessonForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<LessonFormData>({
        types: [], subject: '', grade: '', title: '', method: '', duration: '', notes: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleCheckboxChange = (values: string[]) => {
        setFormData({ ...formData, types: values });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.types.length === 0) {
            alert('الرجاء اختيار نوع الطلب على الأقل');
            return;
        }
        onGenerate(formData);
    };

    return (
        <div className="animate-fade-in">
            <InfoBox title="📚 قسم تحضير الدروس">اختر نوع التحضير المطلوب وأدخل التفاصيل للحصول على برومبت احترافي</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت تحضير الدروس:">
                <li><strong>الدور:</strong> أنت معلم خبير ومتخصص في [المادة]</li>
                <li><strong>الهدف:</strong> تحضير درس تعليمي كامل عن [الموضوع]</li>
                <li><strong>الأنشطة:</strong> أنشطة تفاعلية قصيرة أثناء الشرح</li>
                <li><strong>التقييم:</strong> 3-5 أسئلة قصيرة لقياس الفهم</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع الطلب (يمكن اختيار أكثر من خيار):">
                     <CheckboxGroup name="types" selected={formData.types} onChange={handleCheckboxChange} options={[
                        { id: 'lesson-full', value: 'تحضير درس كامل', label: 'إنشاء تحضير درس كامل' },
                        { id: 'lesson-objectives', value: 'تحديد الأهداف', label: 'تحديد الأهداف العامة والخاصة' },
                        { id: 'lesson-intro', value: 'كتابة تمهيد', label: 'كتابة تمهيد شيّق' },
                        { id: 'lesson-presentation', value: 'عرض تفصيلي', label: 'إعداد عرض تفصيلي للدرس' },
                        { id: 'lesson-activities', value: 'أنشطة صفية', label: 'وضع أنشطة صفية متنوعة' },
                        { id: 'lesson-evaluation', value: 'أساليب التقويم', label: 'تحديد أساليب التقويم' },
                    ]} />
                </FormGroup>
                <FormGroup label="المادة الدراسية:">
                    <DatalistInput id="subject" name="subject" list="subjects" options={C.SUBJECTS} value={formData.subject} onChange={handleChange} placeholder="اختر أو اكتب المادة" required />
                </FormGroup>
                 <FormGroup label="الصف الدراسي:">
                    <DatalistInput id="grade" name="grade" list="grades" options={C.GRADES} value={formData.grade} onChange={handleChange} placeholder="اختر أو اكتب الصف" required />
                </FormGroup>
                <FormGroup label="عنوان الدرس:">
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="مثال: دورة الماء في الطبيعة" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="الأسلوب التعليمي:">
                     <DatalistInput id="method" name="method" list="methods" options={C.LESSON_METHODS} value={formData.method} onChange={handleChange} placeholder="اختر أو اكتب الأسلوب" />
                </FormGroup>
                <FormGroup label="مدة الحصة (بالدقائق):">
                     <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="45" min="1" step="1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                     <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف أي متطلبات أو ملاحظات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const ExamForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<ExamFormData>({
        examType: '', subject: '', grade: '', topic: '', questions: '', questionTypes: [], difficulty: '', duration: '', notes: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (values: string[]) => {
        setFormData({ ...formData, questionTypes: values });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
         if (formData.questionTypes.length === 0) {
            alert('الرجاء اختيار نوع الأسئلة على الأقل');
            return;
        }
        onGenerate(formData);
    };

    return (
        <div className="animate-fade-in">
            <InfoBox title="📝 قسم إنشاء الاختبارات">صمم اختباراتك التعليمية بكل احترافية</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت الاختبارات:">
                <li><strong>الدور:</strong> أنت مختص في القياس والتقويم التربوي</li>
                <li><strong>أنماط الأسئلة:</strong> حدد أنواع الأسئلة وعدد كل نوع</li>
                <li><strong>مستويات التفكير:</strong> تنوع بين التذكر والفهم والتطبيق والتحليل</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع الاختبار:">
                    <DatalistInput id="examType" name="examType" list="exam-types" options={C.EXAM_TYPES} value={formData.examType} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="المادة الدراسية:">
                    <DatalistInput id="subject" name="subject" list="subjects" options={C.SUBJECTS} value={formData.subject} onChange={handleChange} placeholder="اختر أو اكتب المادة" required />
                </FormGroup>
                 <FormGroup label="الصف الدراسي:">
                    <DatalistInput id="grade" name="grade" list="grades" options={C.GRADES} value={formData.grade} onChange={handleChange} placeholder="اختر أو اكتب الصف" required />
                </FormGroup>
                 <FormGroup label="الموضوع أو الوحدة:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: الوحدة الثالثة - الطاقة" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="عدد الأسئلة:">
                     <input type="number" id="questions" name="questions" value={formData.questions} onChange={handleChange} placeholder="10" min="1" max="100" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="نوع الأسئلة (يمكن اختيار أكثر من نوع):">
                    <CheckboxGroup name="questionTypes" selected={formData.questionTypes} onChange={handleCheckboxChange} options={[
                        { id: 'exam-mcq', value: 'اختيار من متعدد', label: 'اختيار من متعدد' },
                        { id: 'exam-tf', value: 'صح أو خطأ', label: 'صح أو خطأ' },
                        { id: 'exam-essay', value: 'مقالي', label: 'مقالي' },
                        { id: 'exam-short', value: 'إجابة قصيرة', label: 'إجابة قصيرة' },
                        { id: 'exam-matching', value: 'مطابقة', label: 'مطابقة' },
                        { id: 'exam-fill', value: 'ملء الفراغات', label: 'ملء الفراغات' },
                    ]} />
                </FormGroup>
                <FormGroup label="مستوى الصعوبة:">
                    <DatalistInput id="difficulty" name="difficulty" list="difficulties" options={C.DIFFICULTIES} value={formData.difficulty} onChange={handleChange} placeholder="اختر المستوى" required />
                </FormGroup>
                <FormGroup label="مدة الاختبار (بالدقائق):">
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="60" min="1" step="1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const ContentForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<ContentFormData>({
        type: '', topic: '', length: '', style: '', audience: '', notes: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onGenerate(formData);
    };

    return (
        <div className="animate-fade-in">
            <InfoBox title="📄 قسم إنشاء النصوص والمحتوى">أنشئ محتوى نصي احترافي لأي غرض</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت المحتوى:">
                <li><strong>الدور:</strong> أنت كاتب محتوى محترف</li>
                <li><strong>الجمهور:</strong> من سيقرأ هذا المحتوى؟</li>
                <li><strong>النبرة:</strong> الأسلوب المطلوب (جادة، مرحة، رسمية)</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                 <FormGroup label="نوع المحتوى:">
                    <DatalistInput id="type" name="type" list="content-types" options={C.CONTENT_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="الموضوع:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: أهمية التفكير النقدي في التعليم" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="طول المحتوى (بالكلمات):">
                    <input type="number" id="length" name="length" value={formData.length} onChange={handleChange} placeholder="500" min="1" step="50" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="الأسلوب:">
                    <DatalistInput id="style" name="style" list="content-styles" options={C.CONTENT_STYLES} value={formData.style} onChange={handleChange} placeholder="اختر أو اكتب الأسلوب" />
                </FormGroup>
                <FormGroup label="الجمهور المستهدف:">
                    <input type="text" id="audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="مثال: طلاب جامعيين، معلمين، عموم الناس" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف أي متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const ResearchForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<ResearchFormData>({ type: '', topic: '', scope: '', input: '', output: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="🔍 قسم التحليل والبحث">أدوات قوية للبحث والتحليل العلمي</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت التحليل:">
                 <li><strong>الدور:</strong> أنت محلل أبحاث محايد وموضوعي</li>
                 <li><strong>المنهجية:</strong> كيف تريد التحليل؟ (SWOT، مقارن، إحصائي)</li>
                 <li><strong>الهيكل:</strong> ملخص تنفيذي، مقدمة، منهجية، نتائج، توصيات</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                 <FormGroup label="نوع التحليل:">
                    <DatalistInput id="type" name="type" list="research-types" options={C.RESEARCH_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                 <FormGroup label="موضوع البحث أو التحليل:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: أثر الذكاء الاصطناعي في التعليم" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="نطاق التحليل:">
                    <input type="text" id="scope" name="scope" value={formData.scope} onChange={handleChange} placeholder="مثال: مدارس المرحلة الثانوية" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="النص أو البيانات للتحليل (اختياري):">
                    <textarea id="input" name="input" value={formData.input} onChange={handleChange} placeholder="ضع النص أو البيانات هنا إن وُجدت..." className={`${commonInputClasses} min-h-[120px]`}></textarea>
                </FormGroup>
                 <FormGroup label="الناتج المطلوب:">
                    <input type="text" id="output" name="output" value={formData.output} onChange={handleChange} placeholder="مثال: تقرير مفصل، جدول مقارنة، خريطة ذهنية" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const ClassroomForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<ClassroomFormData>({ type: '', topic: '', grade: '', objective: '', duration: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="👨‍🏫 قسم تنفيذ الدرس والإدارة الصفية">استراتيجيات وأدوات لتنفيذ فعّال داخل الصف</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لتنفيذ الدرس:">
                <li><strong>الدور:</strong> أنت معلم ديناميكي ومتمكن</li>
                <li><strong>التوقيت الزمني:</strong> تقسيم الحصة إلى فقرات زمنية</li>
                <li><strong>أنشطة الطلاب:</strong> ماذا سيفعل الطلاب؟</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع الأداة المطلوبة:">
                    <DatalistInput id="type" name="type" list="classroom-types" options={C.CLASSROOM_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="موضوع الدرس:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: التنفس عند الكائنات الحية" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="الصف الدراسي:">
                    <DatalistInput id="grade" name="grade" list="grades" options={C.GRADES} value={formData.grade} onChange={handleChange} placeholder="اختر أو اكتب الصف" />
                </FormGroup>
                <FormGroup label="الهدف من الأداة:">
                    <input type="text" id="objective" name="objective" value={formData.objective} onChange={handleChange} placeholder="مثال: تعزيز المشاركة الفعالة، قياس الفهم" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="مدة التنفيذ (بالدقائق):">
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="45" min="1" step="1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const BroadcastForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<BroadcastFormData>({ type: '', topic: '', occasion: '', grade: '', duration: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="📻 قسم الإذاعة المدرسية">أنشئ برامج إذاعية متكاملة ومؤثرة</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت الإذاعة:">
                <li><strong>الدور:</strong> أنت منسق فعاليات ومعد برامج إذاعية</li>
                <li><strong>الهيكل الزمني:</strong> قرآن، حديث، كلمة الصباح، هل تعلم، سؤال وجواب</li>
                <li><strong>النبرة:</strong> حماسية، تحفيزية، وواضحة</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع البرنامج:">
                    <DatalistInput id="type" name="type" list="broadcast-types" options={C.BROADCAST_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="موضوع الإذاعة:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: أهمية الوقت، النظافة، التسامح" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="المناسبة (إن وُجدت):">
                    <input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} placeholder="مثال: يوم المعلم، اليوم الوطني" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="الفئة المستهدفة:">
                    <input type="text" id="grade" name="grade" value={formData.grade} onChange={handleChange} placeholder="مثال: المرحلة الابتدائية، الثانوية" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="مدة البرنامج (بالدقائق):">
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="15" min="1" step="1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const EventForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<EventFormData>({ type: '', element: '', occasion: '', tone: '', duration: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="🏆 قسم حفلات التكريم والمناسبات">صمم حفلاتك المدرسية بشكل احترافي</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت حفلات التكريم:">
                <li><strong>الدور:</strong> أنت مدير فعاليات ومناسبات محترف</li>
                <li><strong>برنامج الحفل:</strong> بدء، ترحيب، فقرة فنية، تكريم، ختام</li>
                <li><strong>الكلمات:</strong> نص كلمة الترحيب والكلمة الرئيسية</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع الحفل:">
                    <DatalistInput id="type" name="type" list="event-types" options={C.EVENT_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="العنصر المطلوب:">
                    <DatalistInput id="element" name="element" list="event-elements" options={C.EVENT_ELEMENTS} value={formData.element} onChange={handleChange} placeholder="اختر العنصر" required />
                </FormGroup>
                <FormGroup label="المناسبة:">
                    <input type="text" id="occasion" name="occasion" value={formData.occasion} onChange={handleChange} placeholder="مثال: تكريم المتفوقين، تخرج الصف الثاني عشر" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="الأسلوب المطلوب:">
                    <DatalistInput id="tone" name="tone" list="event-tones" options={C.EVENT_TONES} value={formData.tone} onChange={handleChange} placeholder="اختر الأسلوب" />
                </FormGroup>
                <FormGroup label="مدة الحفل (بالدقائق):">
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="60" min="1" step="5" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const VideoForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<VideoFormData>({ type: '', topic: '', duration: '', audience: '', style: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="🎬 قسم إنشاء الفيديو">صمم سيناريوهات فيديو احترافية</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت الفيديو:">
                <li><strong>الدور:</strong> أنت صانع محتوى فيديو وكاتب سيناريو</li>
                <li><strong>الهيكل:</strong> افتتاحية، مشكلة، حل، خلاصة، نداء للعمل</li>
                <li><strong>النص المرئي والمسموع:</strong> وصف ما سيراه المشاهد وما سيسمعه</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع الفيديو:">
                    <DatalistInput id="type" name="type" list="video-types" options={C.VIDEO_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="موضوع الفيديو:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: الأمن السيبراني للطلاب" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="مدة الفيديو (بالدقائق):">
                    <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="2" min="0.1" step="0.1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="الجمهور المستهدف:">
                    <input type="text" id="audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="مثال: طلاب المرحلة الابتدائية" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="الأسلوب:">
                    <DatalistInput id="style" name="style" list="video-styles" options={C.VIDEO_STYLES} value={formData.style} onChange={handleChange} placeholder="اختر الأسلوب" />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const ImageForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<ImageFormData>({ type: '', subject: '', style: '', colors: '', elements: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="🖼️ قسم إنشاء الصور">صمم صوراً احترافية بالذكاء الاصطناعي</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت الصور:">
                <li><strong>الدور:</strong> أنت مصمم جرافيك ومخرج فني مبدع</li>
                <li><strong>النمط:</strong> واقعي، كارتون، 3D، minimalistic</li>
                <li><strong>التكوين:</strong> صورة مقربة، منظر واسع، عنصر في المنتصف</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                 <FormGroup label="نوع الصورة:">
                    <DatalistInput id="type" name="type" list="image-types" options={C.IMAGE_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="موضوع الصورة:">
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="مثال: دورة الماء في الطبيعة" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="الأسلوب الفني:">
                     <DatalistInput id="style" name="style" list="image-styles" options={C.IMAGE_STYLES} value={formData.style} onChange={handleChange} placeholder="اختر أو اكتب الأسلوب" />
                </FormGroup>
                <FormGroup label="الألوان المفضلة:">
                    <input type="text" id="colors" name="colors" value={formData.colors} onChange={handleChange} placeholder="مثال: أزرق وأخضر، ألوان دافئة" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="العناصر المطلوبة:">
                    <textarea id="elements" name="elements" value={formData.elements} onChange={handleChange} placeholder="صف العناصر التي تريد رؤيتها في الصورة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const AppForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<AppFormData>({ type: '', purpose: '', features: '', users: '', tech: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="💻 قسم صناعة البرامج والتطبيقات">طور أفكار وأكواد تطبيقات ذكية</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت البرمجة:">
                <li><strong>الدور:</strong> أنت مبرمج محترف ومتخصص في [اللغة]</li>
                <li><strong>المتطلبات الوظيفية:</strong> ماذا يجب أن يفعل البرنامج؟</li>
                <li><strong>التعليقات:</strong> شرح المنطق داخل الكود</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع التطبيق:">
                    <DatalistInput id="type" name="type" list="app-types" options={C.APP_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="الغرض من التطبيق:">
                    <input type="text" id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} placeholder="مثال: إدارة المهام اليومية، تطبيق اختبارات" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="الميزات الرئيسية:">
                    <textarea id="features" name="features" value={formData.features} onChange={handleChange} placeholder="اذكر الميزات المطلوبة في التطبيق..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <FormGroup label="المستخدمون المستهدفون:">
                    <input type="text" id="users" name="users" value={formData.users} onChange={handleChange} placeholder="مثال: معلمين، طلاب، مدراء" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="التقنية المفضلة (اختياري):">
                    <DatalistInput id="tech" name="tech" list="app-techs" options={C.APP_TECHS} value={formData.tech} onChange={handleChange} placeholder="مثال: Python, JavaScript, Flutter" />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const DigitalForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<DigitalFormData>({ type: '', topic: '', platform: '', audience: '', tone: '', posts: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="📱 قسم المحتوى الرقمي والإعلامي">أنشئ محتوى تسويقي وإعلامي للمنصات الرقمية</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت المحتوى الرقمي:">
                <li><strong>الدور:</strong> أنت استراتيجي محتوى رقمي</li>
                <li><strong>الهدف الاستراتيجي:</strong> زيادة الوعي، جذب عملاء، بناء الولاء</li>
                <li><strong>المنصة:</strong> إنستقرام، يوتيوب، تيك توك</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع المحتوى:">
                    <DatalistInput id="type" name="type" list="digital-types" options={C.DIGITAL_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="الموضوع أو الحملة:">
                    <input type="text" id="topic" name="topic" value={formData.topic} onChange={handleChange} placeholder="مثال: حملة القراءة للجميع" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="المنصة المستهدفة:">
                    <DatalistInput id="platform" name="platform" list="digital-platforms" options={C.DIGITAL_PLATFORMS} value={formData.platform} onChange={handleChange} placeholder="اختر المنصة" />
                </FormGroup>
                <FormGroup label="الجمهور المستهدف:">
                    <input type="text" id="audience" name="audience" value={formData.audience} onChange={handleChange} placeholder="مثال: معلمين، طلاب، أولياء أمور" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="أسلوب المحتوى:">
                    <DatalistInput id="tone" name="tone" list="digital-tones" options={C.DIGITAL_TONES} value={formData.tone} onChange={handleChange} placeholder="اختر الأسلوب" />
                </FormGroup>
                <FormGroup label="عدد المنشورات المطلوبة:">
                    <input type="number" id="posts" name="posts" value={formData.posts} onChange={handleChange} placeholder="7" min="1" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};

export const DevelopmentForm: React.FC<FormComponentProps> = ({ onGenerate }) => {
    const [formData, setFormData] = useState<DevelopmentFormData>({ type: '', target: '', focus: '', duration: '', outcome: '', notes: '' });
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: FormEvent) => { e.preventDefault(); onGenerate(formData); };
    return (
        <div className="animate-fade-in">
            <InfoBox title="🌟 قسم التطوير الشخصي والإداري والإبداعي">طور نفسك وفريقك بأدوات ذكية</InfoBox>
            <SuggestionsBox title="🔑 العناصر الأساسية لبرومبت التطوير:">
                <li><strong>الدور:</strong> أنت مدرب حياة ومرشد شخصي محترف</li>
                <li><strong>الهدف SMART:</strong> محدد، قابل للقياس، قابل للتحقيق، واقعي، مرتبط بزمن</li>
                <li><strong>الخطوات الإجرائية:</strong> خطوات صغيرة يومية أو أسبوعية</li>
            </SuggestionsBox>
            <form onSubmit={handleSubmit}>
                <FormGroup label="نوع التطوير:">
                    <DatalistInput id="type" name="type" list="dev-types" options={C.DEV_TYPES} value={formData.type} onChange={handleChange} placeholder="اختر أو اكتب النوع" required />
                </FormGroup>
                <FormGroup label="الفئة المستهدفة:">
                    <input type="text" id="target" name="target" value={formData.target} onChange={handleChange} placeholder="مثال: معلمين، إداريين، قادة تربويين" className={commonInputClasses} required />
                </FormGroup>
                <FormGroup label="محور التطوير:">
                    <input type="text" id="focus" name="focus" value={formData.focus} onChange={handleChange} placeholder="مثال: القيادة الذكية، الإبداع، التواصل الفعال" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="المدة الزمنية:">
                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleChange} placeholder="مثال: أسبوع، شهر، فصل دراسي" className={commonInputClasses} />
                </FormGroup>
                <FormGroup label="النتائج المتوقعة:">
                    <textarea id="outcome" name="outcome" value={formData.outcome} onChange={handleChange} placeholder="صف النتائج التي تريد تحقيقها..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <FormGroup label="تفاصيل إضافية:">
                    <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="أضف متطلبات خاصة..." className={`${commonInputClasses} min-h-[100px]`}></textarea>
                </FormGroup>
                <SubmitButton />
            </form>
        </div>
    );
};
