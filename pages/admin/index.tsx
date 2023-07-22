import AdminNav from "@/components/common/AdminNav";
import { NextPage } from "next";
import {
    AiOutlineContacts,
    AiOutlineContainer,
    AiOutlineDashboard,
    AiOutlineMail,
    AiOutlineTeam,
} from "react-icons/ai";

interface Props {}

const navItems = [
  { label: "Dashboard", icon: AiOutlineDashboard, href: "/admin" },
  { label: "Posts", icon: AiOutlineContainer, href: "/admin/posts" },
  { label: "Users", icon: AiOutlineTeam, href: "/admin/users" },
  { label: "Comments", icon: AiOutlineMail, href: "/admin/comments" },
  { label: "Contact", icon: AiOutlineContacts, href: "/admin/contact" },
];

const Admin: NextPage<Props> = () => {
  return (
    <div>
      <AdminNav navItems={navItems} />
    </div>
  );
};

export default Admin;
