import { useEffect, useState } from 'react';
import { fetchGroups } from '../api/quizApi';

const GroupSelect = ({ onGroupSelect }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups().then(setGroups);
  }, []);

  return (
    <div className="main">
      <h2>問題選択</h2>
      <h3>Silakan pilih pertanyaan</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groups.map(group => (
          <li
            key={group}
            onClick={() => onGroupSelect(group)}
            style={{
              padding: '12px 16px',
              margin: '6px 0',
              cursor: 'pointer',
              borderRadius: '6px',
              background: '#f0f0f0',
              color: '#000',
            }}
          >
            {group}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSelect;
