import React, { Fragment } from 'react'
import MainNavigate from './MainNavigate'

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigate />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout