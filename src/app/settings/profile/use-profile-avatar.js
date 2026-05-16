import API_CONFIG from '@/config/api.config';
import useMutation from '@/lib/hooks/useMutation';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { useRef } from 'react';
import { toast } from 'sonner';

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

function useProfileAvatar() {
  const inputRef = useRef(null);
  const { mutate, pending } = useMutation(API_CONFIG.USER.PROFILE, 'PATCH');
  const { setAuthenticatedUser } = useAuthContext();

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file (JPG, PNG, or WebP).');
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      toast.error('Image must be 2MB or smaller.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const profileImage = reader.result;
      mutate(
        { profileImage },
        {
          onSuccess: (response) => {
            const updatedUser = response?.data ?? response;
            setAuthenticatedUser((prev) => ({
              ...prev,
              user: { ...prev.user, ...updatedUser },
            }));
            toast.success('Profile photo updated');
          },
          onError: (error) => {
            toast.error('Could not update photo', {
              description: error?.message || 'Something went wrong',
            });
          },
        }
      );
    };
    reader.onerror = () => {
      toast.error('Could not read the selected image.');
    };
    reader.readAsDataURL(file);
  };

  return { inputRef, openFilePicker, handleFileChange, pending };
}

export default useProfileAvatar;
