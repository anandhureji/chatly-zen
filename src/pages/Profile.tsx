import { useState, useEffect } from "react";
import axios from "axios";

interface ProfileData {
  name: string;
  email: string;
  avatarUrl: string;
  themePreference: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setProfile(res.data))
    .catch(err => console.error(err));
  }, [token]);

  const saveProfile = () => {
    if (!profile) return;
    axios.put("/api/profile", profile, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => alert("Profile updated"))
    .catch(err => console.error(err));
  };

  if (!profile) {
    return <div>Loading profile…</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold">Your Profile</h1>
      <label>Name:</label>
      <input
        type="text"
        value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })}
      />
      <label>Avatar URL:</label>
      <input
        type="text"
        value={profile.avatarUrl}
        onChange={e => setProfile({ ...profile, avatarUrl: e.target.value })}
      />
      <label>Theme:</label>
      <select
        value={profile.themePreference}
        onChange={e => setProfile({ ...profile, themePreference: e.target.value })}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button onClick={saveProfile}>Save</button>
    </div>
  );
};

export default Profile;
