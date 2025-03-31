import '@src/NewTab.css';
import '@src/NewTab.scss';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { CompareURLStorage, exampleThemeStorage } from '@extension/storage';
import { t } from '@extension/i18n';

const NewTab = () => {
  const theme = useStorage(exampleThemeStorage);
  const urls = useStorage(CompareURLStorage);
  const isLight = theme === 'light';
  if (!Array.isArray(urls)) {
    console.error('urls prop must be an array');
    return <div>Error: URLs must be provided as an array</div>;
  }
  return (
    <div className="multi-iframe-container">
      {urls.length === 0 ? (
        <div>No URLs provided</div>
      ) : (
        urls.map((url, index) => (
          <div key={index} className="iframe-wrapper" style={{ margin: '16px 0' }}>
            <h3>
              Frame {index + 1}: {url}
            </h3>
          </div>
        ))
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div> Error Occur </div>);
