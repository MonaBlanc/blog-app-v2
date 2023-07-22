import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import Logo from "./Logo";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSED_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;
    if (visibility) {
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSED_WIDTH);
    } else {
      classList.remove(NAV_CLOSED_WIDTH);
      classList.add(NAV_OPEN_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem("nav-visibility", JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
        const newState = JSON.parse(navState);
        setVisible(newState);
        toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        {/** Logo */}
        <Link href="/admin" className="flex items-center space-x-2 p-3">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {visible && (
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
              Admin
            </span>
          )}
        </Link>
        {/** Nav Items */}
        <div className="space-y-6">
          <ul className="space-y-2">
            {navItems.map((item) => {
              return (
                <li className="flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition">
                  <item.icon
                    size={24}
                    className="fill-highlight-light dark:fill-highlight-dark w-5 h-5"
                  />
                  {visible && (
                    <Link key={item.href} href={item.href} className="ml-2 leading-none">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/** nav toggler (button) */}
      <button
        onClick={updateNavState}
        className="p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldLine size={25} />
        ) : (
          <RiMenuUnfoldLine size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
