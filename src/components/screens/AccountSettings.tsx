
"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

function getDisplayName(email: string | null, name: string | null): string {
  if (name) return name;
  if (email) {
    const emailName = email.split('@')[0];
    // Capitalize first letter and ensure it's a reasonable length or default
    return emailName.charAt(0).toUpperCase() + emailName.slice(1) || "User";
  }
  return "Marry Doe"; // Fallback
}

export default function AccountSettings() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const nameParam = searchParams.get('name');
  
  const [userName, setUserName] = React.useState("Marry Doe");
  const [userEmail, setUserEmail] = React.useState("Marry@Gmail.Com");

  React.useEffect(() => {
    const newEmail = emailParam || "Marry@Gmail.Com";
    const newName = nameParam || (emailParam ? getDisplayName(emailParam, null) : "Marry Doe");
    
    setUserEmail(newEmail);
    setUserName(newName);
  }, [emailParam, nameParam]);

  const user = {
    name: userName,
    email: userEmail,
    avatarUrl: "https://placehold.co/64x64.png", 
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  return (
    <div className="flex flex-col min-h-full bg-popx-bg"> 
      <header className="bg-popx-white h-[56px] shadow-sm flex items-center px-4 sm:px-6 sticky top-0 z-10">
        <h2 className="font-inter font-medium text-[16px] text-popx-header-text">
          Account Settings
        </h2>
      </header>

      {/* Profile Section */}
      <main className="p-4 sm:p-6 flex-grow"> 
        <div className="max-w-3xl mx-auto"> 
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* Avatar Section */}
            <div className="relative mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <Image
                src={user.avatarUrl}
                alt="User Avatar"
                width={64}
                height={64}
                className="rounded-full"
                data-ai-hint="profile man"
              />
              <button
                aria-label="Change profile picture"
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-popx-primary rounded-full flex items-center justify-center text-popx-white shadow hover:bg-popx-primary-hover"
              >
                <Camera size={14} />
              </button>
            </div>

            {/* Name & Email Section */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="font-inter font-semibold text-[18px] text-popx-heading">
                {user.name}
              </h3>
              <p className="font-inter text-[14px] text-popx-paragraph">
                {user.email}
              </p>
            </div>
          </div>

          {/* Bio Text */}
          <p className="font-inter text-[14px] text-popx-header-text mt-4 text-center md:text-left">
            {user.bio}
          </p>

          {/* Section Divider */}
          <hr className="border-t border-dashed border-popx-gray my-6" />
          
           <div className="text-center text-popx-paragraph py-4">
            More settings content would go here.
          </div>
        </div>
      </main>
    </div>
  );
}
