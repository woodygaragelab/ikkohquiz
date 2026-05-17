import { useState } from 'react';

const LANG_OPTIONS = [
  { value: 'jp', label: '日本語' },
  { value: 'id', label: 'Bahasa Indonesia' },
];

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '20px',
};

const labelStyle = { fontSize: '0.85rem', color: '#aaa' };

const inputStyle = {
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #555',
  background: '#333',
  color: '#fff',
  fontSize: '1rem',
};

const Settings = ({ userConfig, onSave, onClose }) => {
  const [form, setForm] = useState({ ...userConfig });

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    localStorage.setItem('userConfig', JSON.stringify(form));
    onSave(form);
  };

  return (
    <div className="main">
      <h3>設定 / Pengaturan</h3>

      <div style={fieldStyle}>
        <label style={labelStyle}>ユーザーID</label>
        <input
          style={inputStyle}
          value={form.userId}
          onChange={e => handleChange('userId', e.target.value)}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>母国語 / Bahasa ibu</label>
        <select
          style={inputStyle}
          value={form.native}
          onChange={e => handleChange('native', e.target.value)}
        >
          {LANG_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>学習対象語 / Bahasa target</label>
        <select
          style={inputStyle}
          value={form.target}
          onChange={e => handleChange('target', e.target.value)}
        >
          {LANG_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <button
          onClick={handleSave}
          style={{ flex: 1, padding: '10px', background: '#646cff', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          保存
        </button>
        <button
          onClick={onClose}
          style={{ flex: 1, padding: '10px', background: '#444', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default Settings;
