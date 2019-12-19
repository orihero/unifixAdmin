import withDataHOC from '../../../layout/withDataHOC';
import ImageListView from '../../../containers/pages/ImageListView';
import { LIST_ADMIN_SHOPS, UPDATE_SHOP, IMAGE_UPLOAD, ADD_SHOP, REMOVE_SHOP, LIST_CATEGORIES_NESTED } from '../../../graphql/requests';


export default withDataHOC(ImageListView,
    {
        fetchQuery: LIST_ADMIN_SHOPS,
        path: "listAdminShop.shops",
        fields: [
            { name: '_id' },
            { type: 'input', name: 'legal_name', intlMessage: 'legal-name' },
            { type: 'input', name: 'email', intlMessage: 'email' },
            { type: 'input', name: 'business_type', intlMessage: 'businnes-type' },
            {
                type: 'complex', name: 'legal_address', children: [
                    { type: 'input', name: 'region', intlMessage: 'region' },
                    { type: 'location', name: 'location', intlMessage: 'location' },
                    { type: 'input', name: 'others', intlMessage: 'others' },
                    { type: 'input', name: 'district', intlMessage: 'district' },]
            },
            { type: 'file', name: 'shop_image', intlMessage: 'image' },
            { type: 'input', name: 'username', intlMessage: 'username' },
            { type: 'input', name: 'password', intlMessage: 'password' },
            { type: 'select', name: 'category_id', query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested' }
        ],
        updateQuery: UPDATE_SHOP,
        uploadQuery: IMAGE_UPLOAD,
        addQuery: ADD_SHOP,
        removeQuery: REMOVE_SHOP
    });