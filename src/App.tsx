import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <h1>{t("welcome")}</h1>
      <p>{t('description')}</p>
      <div>
        <button onClick={() => changeLanguage('en')}> 
          {t('english')}
        </button>
        <button onClick={() => changeLanguage('zh')}>
          {t('chinese')}
        </button>
      </div>
    </>
  )
}

export default App
