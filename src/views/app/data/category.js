import withDataHOC from '../../../layout/withDataHOC';
import ImageListView from '../../../containers/pages/ImageListView';
import { LIST_ADMIN_COURIERS, IMAGE_UPLOAD, UPDATE_COURIER, ADD_COURIER, LIST_CATEGORIES_NESTED, REMOVE_COURIER } from '../../../graphql/requests';


export default withDataHOC(ImageListView,
    {
        fetchQuery: LIST_ADMIN_COURIERS,
        path: "listAdminCourier.couriers",
        fields: [
            { name: '_id' },
            { type: 'input', name: 'email', intlMessage: 'email' },
            { type: 'input', name: 'username', intlMessage: 'username' },
            { type: 'input', name: 'password', intlMessage: 'password' },
            { type: 'file', name: 'profile_picture', intlMessage: 'image' },
            { type: 'select', name: 'courier_type', query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested' },
            { type: 'input', name: 'firstname', intlMessage: 'firstname' },
            { type: 'input', name: 'lastname', intlMessage: 'lastname' },
            { type: 'input', name: 'phone', intlMessage: 'phone' },
            {
                type: 'complex', name: 'address', children: [
                    { type: 'input', name: 'region', intlMessage: 'region' },
                    { type: 'location', name: 'location', intlMessage: 'location' },
                    { type: 'input', name: 'others', intlMessage: 'others' },
                    { type: 'input', name: 'district', intlMessage: 'district' },]
            },
            { type: 'input', name: 'passport_given_address', intlMessage: 'passport_given_address' },
            { type: 'input', name: 'passport_expiry_date', intlMessage: 'passport_expiry_date' },
            { type: 'input', name: 'passport_number', intlMessage: 'passport_number' },
        ],
        updateQuery: UPDATE_COURIER,
        uploadQuery: IMAGE_UPLOAD,
        addQuery: ADD_COURIER,
        removeQuery: REMOVE_COURIER
    });