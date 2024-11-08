import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Notice = () => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div className='h-8 w-full overflow-hidden'>
      <div className='text-red-700'>
        <div className='marquee'>
          <span>
            Please wait while we fetch the data if there is loading. Thank you
            for your patience.
          </span>
        </div>
        <div className='absolute top-0 right-0 mt-1 mr-1'>
          <FaTimes className='cursor-pointer' onClick={handleClose} />
        </div>
      </div>
    </div>
  );
};

export default Notice;
