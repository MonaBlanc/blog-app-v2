import Link from "next/link";
import { FC } from "react";
import {
    AiOutlineContacts,
    AiOutlineContainer,
    AiOutlineDashboard,
    AiOutlineMail,
    AiOutlinePlus,
    AiOutlineTeam,
} from "react-icons/ai";
import AdminNav from "../common/AdminNav";
import AppHead from "../common/AppHead";


interface Props {
    children: React.ReactNode;
    title?: string;
}

const navItems = [
    { label: "Dashboard", icon: AiOutlineDashboard, href: "/admin" },
    { label: "Posts", icon: AiOutlineContainer, href: "/admin/posts" },
    { label: "Users", icon: AiOutlineTeam, href: "/admin/users" },
    { label: "Comments", icon: AiOutlineMail, href: "/admin/comments" },
    { label: "Contact", icon: AiOutlineContacts, href: "/admin/contact" },
  ];
  

const AdminLayout: FC<Props> = ({title, children}): JSX.Element => {
    return (
        <>
        <AppHead title={title} />
        <div className="flex">
            <AdminNav navItems={navItems} />
            <div className="flex-1 p-4">
            {children}</div>
            {/*Create Button*/}
            <Link href="/admin/post/create" className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition">
                <AiOutlinePlus size={24} />
            </Link>
        </div>
        </>

    );
}

export default AdminLayout;