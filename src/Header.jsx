const Header = ({ onBack, onSettings, userConfig }) => {
  return (
    <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span>Ikkoh Quiz</span>
      {userConfig && (
        <span style={{ fontSize: '12px', color: '#ccc', lineHeight: 1.4, textAlign: 'center' }}>
          {userConfig.userId}<br />
          {userConfig.native} → {userConfig.target}
        </span>
      )}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ fontSize: '14px', padding: '4px 12px', cursor: 'pointer' }}
          >
            戻る
          </button>
        )}
        {onSettings && (
          <button
            onClick={onSettings}
            style={{ fontSize: '18px', padding: '4px 8px', cursor: 'pointer', background: 'transparent', border: 'none' }}
            title="設定"
          >
            ⚙
          </button>
        )}
      </div>
    </div>
  );
};
export default Header;
