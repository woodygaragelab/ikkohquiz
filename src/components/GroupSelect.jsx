import { useState, useEffect } from 'react';
import { fetchGroups } from '../api/quizApi';

const GroupSelect = ({ onGroupSelect }) => {
  const [selected, setSelected] = useState(null);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups().then(setGroups);
  }, []);

  return (
    <div className="main">
      <h1>問題選択</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groups.map(group => (
          <li
            key={group}
            onClick={() => setSelected(group)}
            style={{
              padding: '12px 16px',
              margin: '6px 0',
              cursor: 'pointer',
              borderRadius: '6px',
              background: selected === group ? '#0044CC' : '#f0f0f0',
              color: selected === group ? '#fff' : '#000',
            }}
          >
            問題 {group}
          </li>
        ))}
      </ul>
      <button
        className="button"
        onClick={() => onGroupSelect(selected)}
        disabled={selected === null}
      >
        開始
      </button>
    </div>
  );
};

export default GroupSelect;
