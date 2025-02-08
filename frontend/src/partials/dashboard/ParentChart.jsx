import React from 'react'
import DashboardCard01 from './DashboardCard01'
import DashboardCard02 from './DashboardCard02'
import DashboardCard03 from './DashboardCard03'

function ParentChart() {
  return (
   <>
   <div className="grid grid-cols-12 gap-6">
   <DashboardCard01/>
   <DashboardCard02/>
   <DashboardCard03/>
   </div>

   </>
  )
}

export default ParentChart