import React from 'react'
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap'
import IntlMessages from '../../helpers/IntlMessages';


const OrderMenuItem = ({ sub }) => {
    return (
        <NavItem
            key={`${sub._id}`}
        >
            <NavLink to={`/app/orders/${sub.status}`}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                    <IntlMessages id={sub.status} />
                    <div style={{
                        borderRadius: 10,
                        backgroundColor: '#922c88',
                        width: 20,
                        height: 20,
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <p>{sub.count}</p>
                    </div>
                </div>
            </NavLink>
        </NavItem>
    )
}

export default OrderMenuItem
