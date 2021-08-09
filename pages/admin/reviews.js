import React from 'react';
import { getSession } from 'next-auth/client'


import RoomReviews from "../../components/admin/RoomReviews";
import Layout from "../../components/layout/Layout";


export default function RoomReviewsPage() {
  return (
    <Layout title="E-booking | Room Reviews">
      <RoomReviews />
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


