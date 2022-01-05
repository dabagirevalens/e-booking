import React from 'react';
import { getSession } from 'next-auth/client'


import NewRoom from "../../../components/admin/NewRoom";
import Layout from "../../../components/layout/Layout";


export default function NewRoomPage() {
  return (
    <Layout title="Umwezi | New Room">
      <NewRoom />
    </Layout>
  );
}


//redirect user to login page if not logged in


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if(!session || session.user.role !== "admin" ) {
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


