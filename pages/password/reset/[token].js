import React  from "react";

import NewPassword from "../../../components/user/NewPassword";
import Layout from "../../../components/layout/Layout";


export default function NewPasswordPage() {
  return (
    <Layout title='E-booking | Reset Password'>
      <NewPassword />
    </Layout>
  );
}