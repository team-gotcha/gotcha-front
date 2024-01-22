import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/modal';

export function useToggleModal() {
  //modal 관리
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState);

  const openModal = () => {
    setIsModalOpen((cur) => !cur);
  };

  return { isModalOpen, openModal };
}
