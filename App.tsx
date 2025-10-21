
import React, { useState } from 'react';
import { TABS } from './constants';
import * as Forms from './components/Forms';
import ResultSection from './components/ResultSection';
import { generatePrompt } from './services/promptService';
import type { FormType } from './types';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

    const handleFormSubmit = (formData: any) => {
        const formType = TABS[activeTab].formType as FormType;
        const prompt = generatePrompt(formType, formData);
        setGeneratedPrompt(prompt);
        
        // Scroll to the result section smoothly
        setTimeout(() => {
            const resultSection = document.getElementById('result-section');
            if (resultSection) {
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const ActiveFormComponent = Forms[TABS[activeTab].component as keyof typeof Forms];

    return (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen p-2 sm:p-5">
            <div className="container max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
                <header className="header bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 sm:p-10 text-center relative">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-shadow-lg">🎯 رفيقك في إنشاء الأوامر للذكاء الاصطناعي</h1>
                    <p className="text-lg sm:text-xl opacity-95 mb-4">برنامج شامل ومتقدم لتوليد برومبتات احترافية في جميع المجالات</p>
                    <div className="trainer-info bg-white/20 p-4 rounded-xl inline-flex flex-wrap justify-center items-center gap-4 mt-3 text-sm">
                        <span>إعداد المستشار الإداري والتربوي: إبراهيم دُخَّان</span>
                        <a href="https://wa.me/967780804012" target="_blank" rel="noopener noreferrer" className="whatsapp-btn inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer transition-all hover:bg-green-600 hover:scale-105 hover:shadow-lg font-bold">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <span>للتواصل: 967780804012</span>
                        </a>
                    </div>
                </header>

                <nav className="main-tabs grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 bg-gray-100 border-b-2 border-gray-200 gap-2 p-2">
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(index);
                                setGeneratedPrompt('');
                            }}
                            className={`main-tab p-3 text-center cursor-pointer text-sm font-bold transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg outline-none hover:bg-gray-200 hover:-translate-y-0.5 focus:ring-2 focus:ring-indigo-400 ${activeTab === index ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-500' : 'text-gray-700'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <main className="content p-5 sm:p-10">
                    <ActiveFormComponent onGenerate={handleFormSubmit} />
                    {generatedPrompt && <ResultSection prompt={generatedPrompt} />}
                </main>

                <footer className="footer bg-gray-800 text-white p-8 text-center">
                    <h3 className="text-lg font-bold mb-3">جميع الحقوق محفوظة</h3>
                    <p><strong>المدرب المستشار إبراهيم دخان</strong></p>
                    <p>للتواصل عبر الواتس: <a href="https://wa.me/967780804012" target="_blank" rel="noopener noreferrer" className="text-indigo-400 font-bold transition-colors hover:text-purple-400">967780804012+</a></p>
                </footer>
            </div>
        </div>
    );
};

export default App;
