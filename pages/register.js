import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";

import { getSession } from 'next-auth/client'


export default function RegisterPage() {
  return (
    <Layout title='Umwezi | Register'>
      <Register />
    </Layout>
  );
}


//redirect use to home page if logged in

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        parmanent: false,
      },
    };
  }

  return {
    props: {},
  };
}