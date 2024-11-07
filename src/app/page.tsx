"use client";

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
// import Image from 'next/image';

export default function Page() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-red-500 p-4 tablet:h-52">
        {/* Header or Branding */}
      </div>
      <div className="mt-4 flex grow flex-col gap-4 tablet:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 tablet:w-2/5 tablet:px-20">
          <p className="text-xl text-gray-800 tablet:text-3xl tablet:leading-normal">
            <strong>Welcome to Gate Pass.</strong>
          </p>
          {!showLoginForm && (
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-5 self-start rounded-lg bg-gray-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 tablet:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 tablet:w-6" />
            </button>
          )}
          {showLoginForm && (
            <div className="flex flex-col gap-4 mt-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="rounded-lg bg-gray-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 tablet:text-base"
              >
                Log in
              </button>
              <button
                className="mt-2 text-gray-500 underline text-sm"
              >
                Change Password
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center p-6 tablet:w-3/5 tablet:px-28 tablet:py-12">
          {/* Hero Images */}
          {/* <Image src="/hero-desktop.png" width={1000} height={760} className="hidden tablet:block" alt="Screenshots of the dashboard project showing desktop version" /> */}
          {/* <Image src="/hero-mobile.png" width={560} height={620} className="block tablet:hidden" alt="Screenshot of the dashboard project showing mobile version" /> */}
        </div>
      </div>
    </main>
  );
}
