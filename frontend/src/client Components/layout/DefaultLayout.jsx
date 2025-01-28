import React from 'react'
import Layout from './Layout'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
  return (
    <>
    <Layout/>
    <Outlet/>
    </>
  )
}

export default DefaultLayout