import React, { useState, ChangeEvent, useCallback } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import loading spinner

interface StoredUser {
  id: string;
  username: string;
  quote?: string;
  profilePhoto?: string;
}

const ProfilePhoto: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    const imageDataUrl = await readFile(file);
    setImageSrc(imageDataUrl);
  };

  const readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImageBlob = useCallback(async (): Promise<Blob | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const croppedCanvas = await getCroppedCanvas(imageSrc, croppedAreaPixels);
    if (!croppedCanvas) return null;

    return new Promise((resolve) => {
      croppedCanvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    });
  }, [imageSrc, croppedAreaPixels]);

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select image");
      return;
    }
    setLoading(true);

    try {
      const blob = await getCroppedImageBlob();
      if (!blob) {
        alert("Could not crop the image.");
        return;
      }
      const formData = new FormData();
      formData.append("photo", blob, selectedFile.name);

      const response = await axios.post(
        "http://localhost:3001/user/photo",
        formData,
        { withCredentials: true }
      );

      const updatedUser: StoredUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setMessage("✅ Upload successful!");
      navigate("/profile/profilephoto");
    } catch (error: any) {
      console.error("Upload error:", error?.response?.data || error);
      setMessage("❌ Failed to upload photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-center">Update Profile Photo</h1>

      {message && (
        <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4 border border-blue-200 text-center">
          {message}
        </div>
      )}

      <label className="block w-full text-center">
        <span className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
          Choose Image
        </span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {imageSrc && (
        <div className="relative w-full h-64 mt-4 bg-gray-200 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleUpload}
        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex justify-center items-center"
      >
        {loading ? <ClipLoader size={20} color="white" /> : "Upload"}
      </button>
    </div>
  );
};

export default ProfilePhoto;

async function getCroppedCanvas(imageSrc: string, pixelCrop: Area): Promise<HTMLCanvasElement | null> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous"); // avoid CORS issues
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}
