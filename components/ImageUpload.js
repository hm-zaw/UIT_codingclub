'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload({ onImageUpload }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(null);

    const uploadImage = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            // Show preview
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);

            setUploading(true);

            // Create form data
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'codingclub-uploads'); // Using the default unsigned upload preset

            // Upload to Cloudinary
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dxmqfapo7/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Upload failed with status: ${response.status}. Details: ${errorData}`);
            }

            const data = await response.json();
            
            if (!data.secure_url) {
                throw new Error('No secure URL received from Cloudinary');
            }
            
            // Pass the URL back to parent component
            onImageUpload(data.secure_url);
            
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer text-slate-950 px-4 py-2 rounded">
                {uploading ? 'Uploading...' : 'Upload Profile Picture'}
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={uploadImage}
                    disabled={uploading}
                />
            </label>
        </div>
    );
} 