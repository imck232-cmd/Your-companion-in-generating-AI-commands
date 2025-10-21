
import React, { useState, useEffect } from 'react';

interface ResultSectionProps {
    prompt: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ prompt }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const copyPrompt = () => {
        navigator.clipboard.writeText(prompt)
            .then(() => setToastMessage('✅ تم نسخ النص بنجاح!'))
            .catch(() => setToastMessage('⚠️ فشل نسخ النص.'));
    };

    const downloadPrompt = () => {
        const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prompt.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setToastMessage('💾 تم بدء تحميل الملف!');
    };

    const sharePrompt = () => {
        if (navigator.share) {
            navigator.share({
                title: 'AI Prompt',
                text: prompt,
            }).catch(() => setToastMessage('⚠️ فشلت المشاركة.'));
        } else {
            setToastMessage('⚠️ المشاركة غير مدعومة على هذا المتصفح.');
        }
    };

    return (
        <>
            <div id="result-section" className="mt-10 p-6 bg-gray-50 rounded-xl animate-fade-in-up">
                <div className="result-header flex flex-wrap justify-between items-center mb-5 gap-4">
                    <h3 className="text-2xl font-bold text-indigo-600">✨ البرومبت المُولَّد</h3>
                    <div className="flex gap-2">
                        <button onClick={copyPrompt} className="btn-secondary bg-white text-indigo-600 px-4 py-2 border-2 border-indigo-600 rounded-full cursor-pointer transition-all font-bold hover:bg-indigo-600 hover:text-white">📋 نسخ</button>
                        <button onClick={downloadPrompt} className="btn-secondary bg-white text-indigo-600 px-4 py-2 border-2 border-indigo-600 rounded-full cursor-pointer transition-all font-bold hover:bg-indigo-600 hover:text-white">💾 تحميل</button>
                        <button onClick={sharePrompt} className="btn-secondary bg-white text-indigo-600 px-4 py-2 border-2 border-indigo-600 rounded-full cursor-pointer transition-all font-bold hover:bg-indigo-600 hover:text-white">🔗 مشاركة</button>
                    </div>
                </div>
                <div className="result-content bg-white p-5 rounded-lg border-2 border-gray-200 leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto text-lg">
                    {prompt}
                </div>
            </div>

            {toastMessage && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-slide-up-fade">
                    {toastMessage}
                </div>
            )}
        </>
    );
};

export default ResultSection;
