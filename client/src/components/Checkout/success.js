import { useLocation } from 'react';

const Success = () => {
  const location = useLocation();
  console.log(location);
  return <div className='bg-slate-600 h-10 w-40'>success</div>;
};

export default Success;
