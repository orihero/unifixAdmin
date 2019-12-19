import withReadHOC from '../../../layout/withReadHOC';
import { GROUP_ORDER } from '../../../graphql/requests';
import ShopItem from '../../../containers/pages/ShopItem';


export default withReadHOC(ShopItem,
    {
        fetchQuery: GROUP_ORDER,
        path: "getGroupedOrderBatch.groupedOrders",
    });