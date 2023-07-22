import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineContainer, AiOutlineDashboard, AiOutlineMail, AiOutlineTeam } from 'react-icons/ai';
import Logo from './Logo';


interface Props {}

const AdminNav: FC<Props> = (props): JSX.Element => {
    return <nav className='h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark'>
        {/** Logo */}
        <Link href='/admin' className='flex items-center space-x-2 p-3'>
            <Logo className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
            <span className='text-highlight-light dark:text-highlight-dark text-xl font-semibold'>Admin</span>
        </Link>
        {/** Nav Items */}
        <div className="space-y-6">
        <ul className='space-y-2'>
            <li className='flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition'>
                <AiOutlineDashboard size={24} className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
                <Link href='/admin'>Dashboard</Link>
            </li>
            <li className='flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition'>
                <AiOutlineContainer className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
                <Link href='/admin/posts'>Posts</Link>
            </li>
            <li className='flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition'>
                <AiOutlineTeam className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
                <Link href='/admin/users'>Users</Link>
            </li>
            <li className='flex items-center space-x-2 p-3 text-highlight-light dark:text-highlight-dark hover:scale-[0.98] transition'>
                <AiOutlineMail className='fill-highlight-light dark:fill-highlight-dark w-5 h-5'/>
                <Link href='/admin/comments'>Comments</Link>
            </li>
        </ul>
        </div>
    </nav>;
    };

export default AdminNav;