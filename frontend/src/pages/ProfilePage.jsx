import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import  useAuthStore  from "../store/useAuthStore"; // Assuming you are using Zustand or similar state management for authUser

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [userData, setUserData] = useState({
    fullName: "",
    profilePic: "",
  });
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState(null);

  // Handle Profile Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setUserData({ ...userData, profilePic: base64Image });

      try {
        await updateProfile({ profilePic: base64Image, fullName: userData.fullName });
      } catch (err) {
        setError("Failed to update profile picture.");
      }
    };
  };

  // Handle name change
  const handleNameChange = (e) => {
    setUserData({ ...userData, fullName: e.target.value });
  };

  // Handle Profile Save
  const handleSaveProfile = async () => {
    try {
      await updateProfile(userData);
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Update your profile information</p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profile }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Name Update Section */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <input
                type="text"
                value={authUser?.fullName}
                onChange={handleNameChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Email Section */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSaveProfile}
              disabled={isUpdatingProfile}
              className={`px-6 py-3 rounded-xl text-white bg-blue-500 hover:bg-blue-600 ${isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </button>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
