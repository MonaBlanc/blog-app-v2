import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';
import Logo from './Logo';

interface Props {
    navItems: {label: string, icon: IconType, href: string}[]
}

const AdminNav: FC<Props> = ({navItems}): JSX.Element => {
    return <nav className='h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark'>
        {/** Logo */}
        <Link href='/admin' className='flex items-center space-x-2 p-3'>
            <Logo className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
            <span className='text-highlight-light dark:text-highlight-dark text-xl font-semibold'>Admin</span>
        </Link>
        {/** Nav Items */}
        <div className="space-y-6">
        <ul className='space-y-2'>

            {navItems.map(item => {
                return <li className='flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition'>
                <item.icon size={24} className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
                <Link key={item.href} href={item.href}>{item.label}</Link>
            </li>
            })}
        </ul>
        </div>
    </nav>;
    };

export default AdminNav;