import API_CONFIG from '@/config/api.config';
import useMutation from '@/lib/hooks/useMutation';
import { useAuthContext } from '@/lib/providers/auth-context-provider';
import { editProfileSchema } from '@/lib/validators/profile-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

function formatDobForInput(dateOfBirth) {
  if (!dateOfBirth) return '';
  return dayjs(dateOfBirth).format('YYYYMMDD');
}

function useProfileForm() {
  const { mutate, pending } = useMutation(API_CONFIG.USER.PROFILE, 'PATCH');
  const { authenticatedUser, setAuthenticatedUser } = useAuthContext();
  const user = authenticatedUser.user;

  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name ?? '',
      dateOfBirth: formatDobForInput(user?.dateOfBirth),
      gender: user?.gender?.toUpperCase?.() ?? undefined,
    },
  });

  useEffect(() => {
    if (!user) return;
    form.reset({
      name: user.name ?? '',
      dateOfBirth: formatDobForInput(user.dateOfBirth),
      gender: user.gender?.toUpperCase?.() ?? undefined,
    });
  }, [user?.id, user?.name, user?.dateOfBirth, user?.gender]);

  const updateProfileHandler = async (values) => {
    const payload = { name: values.name };
    if (values.dateOfBirth) payload.dateOfBirth = values.dateOfBirth;
    if (values.gender) payload.gender = values.gender;

    await mutate(payload, {
      onSuccess: (response) => {
        const updatedUser = response?.data ?? response;
        setAuthenticatedUser((prev) => ({
          ...prev,
          user: { ...prev.user, ...updatedUser },
        }));
        toast.success('Profile updated successfully');
      },
      onError: (error) => {
        toast.error('Could not update profile', {
          description: error?.message || 'Something went wrong',
        });
      },
    });
  };

  return { form, updateProfileHandler, pending, user };
}

export default useProfileForm;
