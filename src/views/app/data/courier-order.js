import withReadHOC from '../../../layout/withReadHOC'
import OrderItem from '../../../containers/pages/OrderItem';
import { GET_COURIER_ORDERS } from '../../../graphql/requests';



export default withReadHOC(OrderItem, { fetchQuery: GET_COURIER_ORDERS, path: "getOrderBatchByCourierId.orders" });