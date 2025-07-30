import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', avatarUrl: '', themePreference: 'light' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get<{ name: string; email: string; avatarUrl: string; themePreference: string }>('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const saveProfile = () => {
    axios.put('/api/profile', profile, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => alert('Profile updated!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="profile-form">
      <h2>Your Profile</h2>
      <input
        type="text" value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })} />
      <input
        type="text" value={profile.avatarUrl}
        onChange={e => setProfile({ ...profile, avatarUrl: e.target.value })} />
      <select
        value={profile.themePreference}
        onChange={e => setProfile({ ...profile, themePreference: e.target.value })}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default Profile;
