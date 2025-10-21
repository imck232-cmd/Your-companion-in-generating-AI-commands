
export interface LessonFormData {
    types: string[];
    subject: string;
    grade: string;
    title: string;
    method: string;
    duration: string;
    notes: string;
}

export interface ExamFormData {
    examType: string;
    subject: string;
    grade: string;
    topic: string;
    questions: string;
    questionTypes: string[];
    difficulty: string;
    duration: string;
    notes: string;
}

export interface ContentFormData {
    type: string;
    topic: string;
    length: string;
    style: string;
    audience: string;
    notes: string;
}

export interface ResearchFormData {
    type: string;
    topic: string;
    scope: string;
    input: string;
    output: string;
    notes: string;
}

export interface ClassroomFormData {
    type: string;
    topic: string;
    grade: string;
    objective: string;
    duration: string;
    notes: string;
}

export interface BroadcastFormData {
    type: string;
    topic: string;
    occasion: string;
    grade: string;
    duration: string;
    notes: string;
}

export interface EventFormData {
    type: string;
    element: string;
    occasion: string;
    tone: string;
    duration: string;
    notes: string;
}

export interface VideoFormData {
    type: string;
    topic: string;
    duration: string;
    audience: string;
    style: string;
    notes: string;
}

export interface ImageFormData {
    type: string;
    subject: string;
    style: string;
    colors: string;
    elements: string;
    notes: string;
}

export interface AppFormData {
    type: string;
    purpose: string;
    features: string;
    users: string;
    tech: string;
    notes: string;
}

export interface DigitalFormData {
    type: string;
    topic: string;
    platform: string;
    audience: string;
    tone: string;
    posts: string;
    notes: string;
}

export interface DevelopmentFormData {
    type: string;
    target: string;
    focus: string;
    duration: string;
    outcome: string;
    notes: string;
}

export type AllFormTypes = LessonFormData | ExamFormData | ContentFormData | ResearchFormData | ClassroomFormData | BroadcastFormData | EventFormData | VideoFormData | ImageFormData | AppFormData | DigitalFormData | DevelopmentFormData;
export type FormType = 'lesson' | 'exam' | 'content' | 'research' | 'classroom' | 'broadcast' | 'event' | 'video' | 'image' | 'app' | 'digital' | 'development';
