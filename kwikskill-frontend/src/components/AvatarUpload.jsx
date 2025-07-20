import React, { useState } from "react";

const AvatarUpload = () => {
  const [preview, setPreview] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="avatar-upload">
      <div className="avatar-preview rounded-full bg-gray-100 mx-auto" style={{ backgroundImage: `url(${preview})`, width: "100px", height: "100px", backgroundSize: "cover" }}></div>
      <input type="file" id="avatarInput" accept="image/*" onChange={handlePreview} className="hidden" />
      <label htmlFor="avatarInput" className="block text-center mt-2 text-sm text-indigo-600 cursor-pointer hover:text-indigo-500">Upload photo</label>
    </div>
  );
};

export default AvatarUpload;
