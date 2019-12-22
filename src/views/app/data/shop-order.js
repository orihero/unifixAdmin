import withReadHOC from '../../../layout/withReadHOC'
import OrderItem from '../../../containers/pages/OrderItem';
import { GET_SHOP_ORDERS } from '../../../graphql/requests';



export default withReadHOC(OrderItem, { fetchQuery: GET_SHOP_ORDERS, path: "getOrderBatchByShopId.orders" });