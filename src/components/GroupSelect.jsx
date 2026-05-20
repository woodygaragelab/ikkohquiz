import { useEffect, useState } from 'react';
import { fetchGroups } from '../api/groupApi';

const getGroupRate = (groupId, stats) => {
  const keys = Object.keys(stats).filter(k => k.startsWith(`${groupId}-`));
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
        {groups.map(g => {
          const rate = getGroupRate(g.group, stats);
          return (
            <li
              key={g.group}
              onClick={() => onGroupSelect(g.group)}
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
              <div>
                <div style={{ fontWeight: 'bold' }}>{g.group}. {g.gname}</div>
                <div style={{ fontSize: '0.85rem', color: '#444' }}>native: {g.native} / target: {g.target}</div>
              </div>
              {rate !== null && (
                <span style={{ fontSize: '0.8rem', color: '#555', whiteSpace: 'nowrap', marginLeft: '8px' }}>正答率 {rate}%</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupSelect;
