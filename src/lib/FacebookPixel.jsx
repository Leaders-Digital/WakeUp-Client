// components/FacebookPixel.js
import React, { useEffect } from 'react';

const FacebookPixel = () => {
  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window !== 'undefined') {
      const ReactPixel = require('react-facebook-pixel').default;
      ReactPixel.init('YOUR_PIXEL_ID'); // Replace with your Facebook Pixel ID
      ReactPixel.pageView();
    }
  }, []);

  return null; // This component doesn't render anything
};

export default FacebookPixel;