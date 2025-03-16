import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import useMutation from '@/lib/hooks/useMutation';
import { signInSchema } from '@/lib/validators/auth-form-validator';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_TOKEN_KEY, setStorageItem } from '@/lib/storage-manager';

const useSignInForm = () => {
  const navigate = useNavigate();

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_IN, 'POST');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    // resolver: zodResolver(signInSchema)
  });

  function handleSignInSubmit(data) {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast('Logged in successfully', {
          type: 'success',
        });
        setStorageItem(AUTH_TOKEN_KEY, response.data.accessToken);
        navigate(PATHS.LANDING);
      },
      onError: (err) => {
        console.log(err);
        toast('Error: ' + (err.status || ''), {
          description: err.message,
          type: 'error',
        });
      },
    });
  }

  return { form, handleSignInSubmit, pending };
};

export { useSignInForm };
