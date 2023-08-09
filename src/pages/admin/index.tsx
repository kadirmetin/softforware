import AdminLayout from "./_layout";

export default function Page(): JSX.Element {
  return <></>;
}

Page.getLayout = function getLayout(page: JSX.Element): JSX.Element {
  return <AdminLayout>{page}</AdminLayout>;
};
