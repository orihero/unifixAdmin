import React from 'react'
import { useQuery } from 'react-apollo'
import { LIST_ORDER_BY_STATUS } from '../../../graphql/requests'
import { getObjectProperty } from '../../../utils/object'
import OrderItem from '../../../containers/pages/OrderItem'

const Orders = ({ match: { params } }) => {
    let { data, loading, error } = useQuery(LIST_ORDER_BY_STATUS, { variables: { status: params.status || "", pageSize: 10, next: 1 } })
    if (loading)
        return (
            <div className={"loading"} />
        )
    if (data) {
        let items = getObjectProperty(data, "getOrderBatchByStatus.orders");
        console.warn(items)
        return items.map((e) => {
            return <OrderItem item={e} />
        })
    }
    return null;
}

export default Orders
