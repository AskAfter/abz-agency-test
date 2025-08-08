import { User } from '../types';
import { useState, memo, useCallback } from 'react';

interface UserCardProps {
  user: User;
}

function UserCardComponent({ user }: UserCardProps) {
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowEmailTooltip(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowEmailTooltip(false);
  }, []);

  return (
    <div className="bg-white rounded-[10px] p-5 flex flex-col items-center gap-5 shadow-sm w-full max-w-[600px]">
      <div className="relative w-[70px] h-[70px] rounded-full overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-full" />
        )}
        {imageError ? (
          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        ) : (
          <img
            src={user.photo}
            alt={user.name}
            className={`w-full h-full rounded-full object-cover transition-opacity duration-200 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      <div className="text-center w-full">
        <h3
          className="text-black-87 font-nunito text-base leading-[26px] font-normal mb-5 truncate px-2"
          title={user.name}
        >
          {user.name}
        </h3>
        <div className="text-black-87 font-nunito text-base leading-[26px] font-normal">
          <div className="truncate px-0" title={user.position}>
            {user.position}
          </div>
          <div className="relative block w-full">
            <div
              className="truncate px-0 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {user.email}
            </div>
            {showEmailTooltip && (
              <div
                className="absolute bg-black text-white font-nunito text-base leading-[26px] font-normal whitespace-nowrap z-50"
                style={{
                  padding: '3px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#000000de',
                  top: 'calc(100% + 4px)',
                  right: '8px',
                  minWidth: 'max-content',
                }}
              >
                {user.email}
              </div>
            )}
          </div>
          <div className="truncate px-0" title={user.phone}>
            {user.phone}
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoize UserCard to prevent unnecessary re-renders
export const UserCard = memo(UserCardComponent);
