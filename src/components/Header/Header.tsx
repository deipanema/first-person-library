import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import ToggleDarkMode from './ToggleDarkMode';
import DarkModeIcon from '../UI/DarkModeIcon';
import { useAuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { user, login } = useAuthContext();
  const dropdownRef = useRef(null);
  const profileImgRef = useRef(null);

  window.addEventListener('click', (e) => {
    if (e.target !== dropdownRef.current && e.target !== profileImgRef.current)
      setShowDropdown(false);
  });

  const handleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-white dark:bg-dark-bg border-dusty-gray dark:border-dusty-black text-sm backdrop-blur-lg bg-opacity-90">
        <div className="h-16 md:h-20 flex mx-auto justify-between items-center w-full lg:w-5/6 px-4">
          <Link to="/">
            <DarkModeIcon src="brand.png" alt="브랜드" className="h-7 md:h-9" />
          </Link>
          <nav className="flex">
            <div className="flex items-center gap-4 lg:gap-10 mr-4 lg:mr-8">
              {user && (
                <>
                  <Link to="/comment/new" className="hidden md:flex btn-header">
                    코멘트 등록하기
                  </Link>
                  <Link to="/comment/new" className="flex md:hidden">
                    <DarkModeIcon
                      src="add.png"
                      alt="코멘트 등록하기"
                      className="icon h-6"
                    />
                  </Link>
                </>
              )}
              <ToggleDarkMode />
            </div>
            <div className="relative">
              {!user && (
                <button type="button" onClick={login} className="btn-header">
                  로그인
                </button>
              )}
              <>
                {user?.photoURL && (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName!}
                    title={user?.displayName!}
                    ref={profileImgRef}
                    onClick={handleDropdown}
                    className="icon w-8 md:w-9 rounded-full"
                  />
                )}
                {showDropdown && <ProfileDropdown dropdownRef={dropdownRef} />}
              </>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
