import React from 'react';
import { getSession } from 'next-auth/client'


import AllRooms from "../../../components/admin/AllRooms";
import Layout from "../../../components/layout/Layout";


export default function AllRoomsPage() {
  return (
    <Layout title="E-booking | All Rooms">
      <AllRooms />
    </Layout>
  );
}


//redirect user to login page if not logged in


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if(!session ) {
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


