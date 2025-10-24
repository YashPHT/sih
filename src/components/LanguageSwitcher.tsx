import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check } from 'lucide-react'

interface Language {
  code: string
  name: string
  nativeName: string
  rtl?: boolean
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode: string) => {
    const language = languages.find(lang => lang.code === langCode)
    
    i18n.changeLanguage(langCode)
    localStorage.setItem('language', langCode)
    
    if (language?.rtl) {
      document.documentElement.setAttribute('dir', 'rtl')
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.setAttribute('dir', 'ltr')
      document.documentElement.classList.remove('rtl')
    }
    
    setIsOpen(false)
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && savedLang !== i18n.language) {
      const language = languages.find(lang => lang.code === savedLang)
      
      i18n.changeLanguage(savedLang)
      localStorage.setItem('language', savedLang)
      
      if (language?.rtl) {
        document.documentElement.setAttribute('dir', 'rtl')
        document.documentElement.classList.add('rtl')
      } else {
        document.documentElement.setAttribute('dir', 'ltr')
        document.documentElement.classList.remove('rtl')
      }
    }
  }, [i18n])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t('language.switchLanguage')}
        title={t('language.switchLanguage')}
      >
        <Globe className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('language.selectLanguage')}
            </div>
            
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
                  i18n.language === language.code
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-base" style={{ fontFamily: language.rtl ? "'Noto Nastaliq Urdu', serif" : "'Noto Sans', sans-serif" }}>
                    {language.nativeName}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({language.name})
                  </span>
                </div>
                {i18n.language === language.code && (
                  <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                )}
              </button>
            ))}
            
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 italic text-center">
                {t('language.moreComingSoon')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
