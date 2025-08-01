import { User } from '../types';
import { useState } from 'react';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);

  return (
    <div className="bg-white rounded-[10px] p-5 flex flex-col items-center gap-5 shadow-sm w-full max-w-[600px]">
      <img
        src={user.photo}
        alt={user.name}
        className="w-[70px] h-[70px] rounded-full object-cover"
      />
      <div className="text-center w-full">
        <h3
          className="text-black-87 font-nunito text-base leading-[26px] font-normal mb-5 truncate px-2"
          title={user.name}
        >
          {user.name}
        </h3>
        <div className="text-black-87 font-nunito text-base leading-[26px] font-normal">
          <div className="truncate px-2" title={user.position}>
            {user.position}
          </div>
          <div className="relative inline-block w-full">
            <div 
              className="truncate px-2 cursor-pointer"
              onMouseEnter={() => setShowEmailTooltip(true)}
              onMouseLeave={() => setShowEmailTooltip(false)}
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
                  minWidth: 'max-content'
                }}
              >
                {user.email}
              </div>
            )}
          </div>
          <div className="truncate px-2" title={user.phone}>
            {user.phone}
          </div>
        </div>
      </div>
    </div>
  );
}
