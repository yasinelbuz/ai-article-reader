'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import { Info, X } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { storage } from '@/config/local-storage-naming';

export default function Alert() {
  const [extensionUrl, setExtensionUrl] = useState<string | null>(null);
  const [browserName, setBrowserName] = useState<string>('your browser');
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenAlertLocalStorage, setIsOpenAlertLocalStorage] = useLocalStorage<boolean>(
    storage.isOpenAlert,
    true
  );

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes('Firefox')) {
      setExtensionUrl('https://addons.mozilla.org/en-US/firefox/addon/to-google-translate/');
      setBrowserName('Mozilla Firefox');
    } else if (userAgent.includes('Edg')) {
      setExtensionUrl(
        'https://microsoftedge.microsoft.com/addons/detail/kkmlkkjojmombglmlpbpapmhcaljjkde'
      );
      setBrowserName('Microsoft Edge');
    } else if (userAgent.includes('Chrome')) {
      setExtensionUrl(
        'https://chrome.google.com/webstore/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb'
      );
      setBrowserName('Google Chrome');
    } else if (userAgent.includes('Safari')) {
      setExtensionUrl('https://apps.apple.com/us/app/translate-tab/id458725185');
      setBrowserName('Safari');
    } else {
      setExtensionUrl(null);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenAlertLocalStorage(false);
  };

  if (!isOpenAlertLocalStorage || !isOpen) {
    return null;
  }

  return (
    <div
      className="relative flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
      <Info className="w-5 h-5 mr-3 mt-1" />
      <div className="flex flex-col gap-2">
        <p className="font-semibold">
          To use translation features on this site, please install a browser extension for{' '}
          {browserName}.
        </p>
        <p>
          This extension will allow you to translate website content into your preferred language
          easily.
        </p>
        {extensionUrl ? (
          <a
            href={extensionUrl || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-semibold mt-1 w-fit"
          >
            <Button variant="gradientPurpleBlue">Install Extension</Button>
          </a>
        ) : (
          <p className="text-red-600 dark:text-red-400">
            We couldn’t detect a recommended extension for your browser. Please search manually for
            a translation add-on.
          </p>
        )}
      </div>
      <Button variant="gradientPurpleBlue" className="absolute top-2 right-2" onClick={handleClose}>
        <X />
      </Button>
    </div>
  );
}
