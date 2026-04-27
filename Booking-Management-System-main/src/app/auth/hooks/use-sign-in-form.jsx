import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import useMutation from '@/lib/hooks/useMutation';
import { signInSchema } from '@/lib/validators/auth-form-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const useSignInForm = () => {
  const navigate = useNavigate();

  const { pending, mutate } = useMutation(API_CONFIG.AUTH.SIGN_IN, 'POST');

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSignInSubmit(data) {
    mutate(data, {
      onSuccess: () => {
        toast('Logged in successfully');
        navigate(PATHS.LANDING);
      },
      onError: (err) => {
        toast('Error: ' + (err.status || ''), {
          description: err.message,
        });
      },
    });
  }

  return { form, handleSignInSubmit, pending };
};

export { useSignInForm };
