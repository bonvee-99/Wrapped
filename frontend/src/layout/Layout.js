import React from 'react'
import MenuBar from '../components/navigations/MenuBar'
import Footer from '../components/navigations/Footer'

import './Layout.css'

const Layout = (props) => {
    return(
        <>
            <MenuBar />
            <main className="main-content">
                {props.children}
            </main>
            <Footer/>
        </>
    );
}

export default Layout;