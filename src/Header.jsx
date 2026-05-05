const Header = ({ onBack }) => {
    return (
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>Ikkoh Quiz</span>
        {onBack && (
          <button
            onClick={onBack}
            style={{ fontSize: '14px', padding: '4px 12px', cursor: 'pointer' }}
          >
            戻る
          </button>
        )}
      </div>
    );
  };
  export default Header;