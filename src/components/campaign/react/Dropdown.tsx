import { useState } from 'react';

type DropdownProps = {
  title: string | null;
  content: string | null;
};

const Dropdown = ({ title, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b pb-4 relative'>
      <div
        className='flex justify-between items-center cursor-pointer text-black hover:text-green-500 fill-black hover:fill-green-500'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className='text-xl font-medium'>{title}</h2>
        <button
          className={`transition-all duration-350 ${
            isOpen ? '-rotate-90' : 'rotate-90'
          }`}
          type='button'
          aria-expanded={isOpen}
          aria-label='Toggle dropdown'
        >
          <svg
            width='48'
            height='80'
            viewBox='0 0 48 80'
            xmlns='http://www.w3.org/2000/svg'
            className='h-4'
          >
            <path d='M0.960022 72.3458L8.04002 79.4258L47.64 39.8258L8.04002 0.22583L0.960022 7.30583L33.48 39.8258L0.960022 72.3458Z' />
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-max-h transition-all duration-500 ease-in-out ${
          isOpen ? ` min-h-fit max-h-[100px] py-4` : 'max-h-0 py-0'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Dropdown;
