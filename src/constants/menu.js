import { LIST_ORDER_STATUSES } from "../graphql/requests";
import OrderMenuItem from "../containers/navs/OrderMenuItems";

const data = [{
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: "/app/dashboards",
    subs: [{
        icon: "simple-icon-briefcase",
        label: "menu.default",
        to: "/app/dashboards/default"
    },
    {
        icon: "simple-icon-pie-chart",
        label: "menu.analytics",
        to: "/app/dashboards/analytics"
    },
    ]
},
{
    id: "data",
    icon: "iconsminds-data-center",
    label: "menu.data",
    to: "/app/data",
    subs: [
        {
            icon: "iconsminds-shop",
            label: "menu.shops",
            to: "/app/data/shops"
        },
        {
            icon: "iconsminds-scooter",
            label: "menu.couriers",
            to: "/app/data/couriers"
        },
        {
            icon: "iconsminds-factory",
            label: "menu.factories",
            to: "/app/data/manufacturers"
        },
        // {
        //     icon: "simple-icon-list",
        //     label: "menu.categories",
        //     to: "/app/data/categories"
        // }
    ]
},
{
    id: "orders",
    icon: "iconsminds-shopping-cart",
    label: "menu.orders",
    to: "/app/orders",
    subs: [
        {
            icon: "iconsminds-shop-2",
            label: "menu.shops",
            to: "/app/orders/shop_id"
        },
        {
            icon: "iconsminds-scooter",
            label: "menu.couriers",
            to: "/app/orders/courier_id"
        }
        // {
        //     dynamic: true,
        //     query: LIST_ORDER_STATUSES,
        //     path: "listOrderStatus.orderStatuses",
        //     component: OrderMenuItem,
        // }
    ]
},
];
export default data;
