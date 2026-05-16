import { SEARCH_PARAMS_KEYS } from '@/config/app.config';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(name) {
  return `/assets/${name}`;
}

export const getEncodedRedirectUrl = (next) => {
  return `${SEARCH_PARAMS_KEYS.NEXT_REDIRECT}=${encodeURIComponent(
    next || '/'
  )}`;
};

export function getDefaultProfile(initials) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${initials}`;
}

export function getUserProfileImage(user) {
  if (user?.profileImage) {
    return user.profileImage;
  }
  const seed = user?.name?.trim()?.charAt(0) || 'U';
  return getDefaultProfile(seed);
}

export const isAdmin = (user) => user.roles.includes('HOTEL_MANAGER');
