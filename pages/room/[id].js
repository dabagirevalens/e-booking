import RoomDetails from "../../components/room/RoomDetails";
import Layout from "../../components/layout/Layout";

import { wrapper } from "../../redux/store";
import { getRoomDetails } from "../../redux/actions/roomActions";

export default function RoomDetailsPage() {
  return (
    <Layout title='Umwezi | Room Details'>
      <RoomDetails />
    </Layout>
  );
}



export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, params, ...etc }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
