import { useLocation } from 'react-router-dom';
import { Book } from '../../types';

type BookSelectionResultProps = {
  book: Book;
  handleOpen?: () => void;
};

export default function BookSelectionResult({
  book,
  handleOpen,
}: BookSelectionResultProps) {
  const location = useLocation();
  const { pathname } = location;
  const isUpdate = pathname.includes('/my/');
  const NOT_AVAILABLE = '해당 정보가 없습니다.';
  const { title, publisher, datetime, authors } = book;
  let date;

  if (datetime) {
    new Date(datetime);
    const year = new Date(datetime).getFullYear();
    const month = new Date(datetime).getMonth() + 1;
    date = `${year}년 ${month}월`;
  }

  return (
    <div className="md:flex my-7 md:my-8 lg:my-10">
      <div className="md:w-1/4 flex justify-between md:justify-normal">
        <label className="dark:text-dusty-white md:text-left text-base md:text-xl mb-3 md:mb-0">
          도서 선택완료
        </label>
        {!isUpdate && (
          <span
            onClick={handleOpen}
            className="block md:hidden text-sm text-normal-gray cursor-pointer shrink-0"
          >
            다시 선택하기
          </span>
        )}
      </div>
      <div className="md:w-3/4 flex flex-col items-center justify-start mt-8 md:mt-0">
        <div className="flex justify-between w-full">
          <span className="text-base md:text-xl line-clamp-1">{title}</span>
          {!isUpdate && (
            <span
              onClick={handleOpen}
              className="hidden md:block text-sm text-normal-gray cursor-pointer shrink-0"
            >
              다시 선택하기
            </span>
          )}
        </div>
        <div className="flex flex-col w-full mt-2 text-base md:text-lg space-y-2 border-t md:border-b border-light-gray dark:border-dusty-black py-4">
          <div className="flex items-center w-full">
            <span className="w-1/6 flex items-center text-normal-gray dark:text-modal-black">
              저자
            </span>
            <span>{authors[0] || NOT_AVAILABLE}</span>
          </div>
          <div className="flex items-center w-full">
            <span className="w-1/6 flex items-center text-normal-gray dark:text-modal-black">
              출판사
            </span>
            <span>{publisher || NOT_AVAILABLE}</span>
          </div>
          <div className="flex items-center w-full">
            <span className="w-1/6 flex items-center text-normal-gray dark:text-modal-black">
              출간일
            </span>
            <span>{date || NOT_AVAILABLE}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
