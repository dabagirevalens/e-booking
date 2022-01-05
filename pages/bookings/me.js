import MyBookings from "../../components/booking/MyBookings";
import Layout from "../../components/layout/Layout";

import{ myBookings } from '../../redux/actions/bookingActions'
import { wrapper } from '../../redux/store'

import { getSession }from 'next-auth/client'

const MyBookingsPage = ()  =>{
  return (
    <Layout title="Umwezi | My Bookings">
      <MyBookings />
    </Layout>
  );
}



export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
      async ({ req, res, ...etc }) => {
    
    const session = await getSession({ req })
    
    if(!session) {
        return {
            redirect: {
                destination: '/login',
                parmanent: false,
            }
        }
    }
    
    await store.dispatch(myBookings(req.headers.cookie, req))
    
})

export default MyBookingsPage