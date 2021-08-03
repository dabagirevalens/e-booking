import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, title = "BOOK BEST HOTELS FOR YOUR HOLIDAYS."}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
