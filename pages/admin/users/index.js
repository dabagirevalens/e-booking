import React from 'react';
import { getSession } from 'next-auth/client'


import AllUsers from "../../../components/admin/AllUsers";
import Layout from "../../../components/layout/Layout";


export default function AllUsersPage() {
  return (
    <Layout title="Umwezi | All Users">
      <AllUsers />
    </Layout>
  );
}


//redirect user to login page if unauthorized


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if(!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: '/login',
                parmanent: false,
            }
        }
    }

    return {
        props : {}
    }

}


