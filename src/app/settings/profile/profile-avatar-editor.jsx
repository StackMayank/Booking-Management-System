import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { getUserProfileImage } from '@/lib/utils';
import useProfileAvatar from './use-profile-avatar';

const ProfileAvatarEditor = ({ user, size = 'lg' }) => {
  const { inputRef, openFilePicker, handleFileChange, pending } =
    useProfileAvatar();

  const displayName = user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();
  const avatarSrc = getUserProfileImage(user);

  const sizeClass =
    size === 'sm' ? 'size-20' : size === 'md' ? 'size-24' : 'size-28 md:size-32';

  return (
    <div className="relative inline-flex">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden
      />
      <Avatar className={sizeClass}>
        <AvatarImage
          loading="lazy"
          src={avatarSrc}
          alt={`${displayName} profile`}
        />
        <AvatarFallback>{initial}</AvatarFallback>
      </Avatar>
      <Button
        type="button"
        size="icon"
        disabled={pending}
        onClick={openFilePicker}
        className="absolute w-7 h-7 p-1 rounded-full bottom-0 right-0"
        aria-label="Change profile photo"
      >
        <Icon icon="pen" size="12" />
      </Button>
    </div>
  );
};

export default ProfileAvatarEditor;
