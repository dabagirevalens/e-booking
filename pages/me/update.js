import Profile from "../../components/user/Profile";
import Layout from "../../components/layout/Layout";

import { getSession } from 'next-auth/client'

export default function UpdateUserProfilePage() {
  return (
    <Layout title="Umwezi | Profile">
      <Profile />
    </Layout>
  );
}


//redirect user to login page if not logged in


export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if(!session) {
        return {
            redirect: {
                destination: '/login',
                parmanent: false,
            }
        }
    }

    return {
        props : {
            session
        }
    }

}


