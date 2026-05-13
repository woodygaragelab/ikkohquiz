import { useEffect, useState } from 'react';
import { fetchGroups } from '../api/quizApi';

const getGroupRate = (group, stats) => {
  const keys = Object.keys(stats).filter(k => k.startsWith(`${group}-`));
  const answered = keys.filter(k => stats[k].count > 0);
  if (answered.length === 0) return null;
  const avg = answered.reduce((sum, k) => sum + stats[k].correct / stats[k].count, 0) / answered.length;
  return Math.round(avg * 100);
};

const GroupSelect = ({ onGroupSelect, stats = {} }) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroups().then(setGroups);
  }, []);

  return (
    <div className="main">
      <h3>問題選択</h3>
      <h3 style={{ padding: '0 16px' }}>Silakan pilih pertanyaan</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {groups.map(group => {
          const rate = getGroupRate(group, stats);
          return (
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{group}</span>
              {rate !== null && (
                <span style={{ fontSize: '0.8rem', color: '#555' }}>正答率 {rate}%</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupSelect;
