import { FC } from "react";
import {
    AiOutlineContacts,
    AiOutlineContainer,
    AiOutlineDashboard,
    AiOutlineMail,
    AiOutlineTeam,
} from "react-icons/ai";
import AdminNav from "../common/AdminNav";


interface Props {
    children: React.ReactNode;
}

const navItems = [
    { label: "Dashboard", icon: AiOutlineDashboard, href: "/admin" },
    { label: "Posts", icon: AiOutlineContainer, href: "/admin/posts" },
    { label: "Users", icon: AiOutlineTeam, href: "/admin/users" },
    { label: "Comments", icon: AiOutlineMail, href: "/admin/comments" },
    { label: "Contact", icon: AiOutlineContacts, href: "/admin/contact" },
  ];
  

const AdminLayout: FC<Props> = ({children}): JSX.Element => {
    return (
        <div className="flex">
            <AdminNav navItems={navItems} />
            <div className="flex-1 p-4">
            {children}
            </div>
        </div>
    );
}

export default AdminLayout;