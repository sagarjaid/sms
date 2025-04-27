/** @format */
import Image from 'next/image';
import hero from '@/app/hero-2.png';

const Copy = () => {
  return (
    <div className='flex flex-col gap-16 w-full justify-between items-center max-w-7xl mx-auto p-6  my-10 md:my-40'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className='font-extrabold text-3xl lg:text-4xl '>
          Stay Updated 🚀
        </h1>
        <div className='text-center md:text-left'>
          Compare Asset Prices with Bitcoin’s Value Today
        </div>
      </div>
      <Image
        src={hero}
        alt='Product Demo'
        className=' w-11/12 md:w-2/3 rounded-lg shadow-sm'
        priority={true}
        width={500}
        height={500}
      />
      <button className=' hidden w-fit md:flex gap-3 items-center text-lg px-4 py-2 text-gray-900 font-semibold border border-gray-700 rounded-lg'>
        <span> Get Started</span>
        <span>🚀</span>
      </button>
    </div>
  );
};

export default Copy;
