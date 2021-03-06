import Home from "../components/Home";
import Layout from "../components/layout/Layout";

import { wrapper } from "../redux/store";
import { getRooms } from "../redux/actions/roomActions";

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     await store.dispatch(getRooms(req));
//   }
// );
// 'Droid Sans Mono', 'monospace', monospace, 'Droid Sans Fallback'

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query, ...etc }) => {
      await store.dispatch(
        getRooms(req, query.page, query.location, query.guests, query.category)
      );
    }
);
