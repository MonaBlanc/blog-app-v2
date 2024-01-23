import Editor from "@/components/editor";
import AdminLayout from "@/components/layout/AdminLayout";
import { NextPage } from "next";

interface Props {}

const Create: NextPage<Props> = (): JSX.Element => {
  return(
  <AdminLayout title="Create">
  <div className="max-w-4xl mx-auto">
    <Editor onSubmit={(post) => {
      console.log(post);
    }} />
  </div>
  </AdminLayout>
  );
};

export default Create;
