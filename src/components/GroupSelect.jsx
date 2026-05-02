const GroupSelect = ({ onGroupSelect }) => {
  return (
    <div className="main">
      <h1>問題選択</h1>
      <div className="answer">
        {[1, 2, 3].map(group => (
          <button key={group} className="button" onClick={() => onGroupSelect(group)}>
            問題 {group}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupSelect;
