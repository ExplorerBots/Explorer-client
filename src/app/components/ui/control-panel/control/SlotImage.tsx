import Image from 'next/image';

const SlotImage: React.FC = () => {
   return (
      <Image
         src="/assets/hotbar-slot.png"
         height={54}
         width={55}
         alt=""
         style={{ userSelect: 'none' }}
      />
   );
};

export default SlotImage;
