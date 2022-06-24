import React from 'react'


const RevenueCalc = (props) => {
    return (
        <div>
        <h1>{props.totrevenue}</h1>
        <h1>{props.bookings}</h1>
        </div>
    )
}

export default RevenueCalc