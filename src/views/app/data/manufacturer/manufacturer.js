import withDataHOC from '../../../../layout/withDataHOC';
import { IMAGE_UPLOAD, LIST_CATEGORIES_NESTED, LIST_ADMIN_MANUFACTURER, UPDATE_MANUFACTURER, ADD_MANUFACTURER, REMOVE_MANUFACTURER } from '../../../../graphql/requests';
import ManufacturerItem from '../../../../containers/pages/ManufacturerItem';


export default withDataHOC(ManufacturerItem,
    {
        fetchQuery: LIST_ADMIN_MANUFACTURER,
        path: "listMyAttachedManufacturer.attachedManufacturers",
        fields: [
            { name: '_id' },
            { type: 'input', name: 'email', intlMessage: 'email' },
            { type: 'file', name: 'brand_picture', intlMessage: 'image' },
            // { type: 'select', name: 'bussiness_type', query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested' },
            { type: 'select', name: 'category_id', query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested' },
            { type: 'input', name: 'phone', intlMessage: 'phone' },
            {
                type: 'complex', name: 'legal_address', children: [
                    { type: 'input', name: 'region', intlMessage: 'region' },
                    { type: 'location', name: 'location', intlMessage: 'location' },
                    { type: 'input', name: 'others', intlMessage: 'others' },
                    { type: 'input', name: 'district', intlMessage: 'district' },]
            },
            { type: 'input', name: 'legal_name', intlMessage: 'legal_name' },
            { type: 'input', name: 'brand_name', intlMessage: 'brand_name' },
            { type: 'input', name: 'stir', intlMessage: 'stir' },
            { type: 'input', name: 'ifut', intlMessage: 'ifut' },
            { type: 'input', name: 'main_bank', intlMessage: 'main_bank' },
            { type: 'input', name: 'bank_account', intlMessage: 'bank_account' },
            { type: 'input', name: 'mfo', intlMessage: 'mfo' },
        ],
        updateQuery: UPDATE_MANUFACTURER,
        uploadQuery: IMAGE_UPLOAD,
        addQuery: ADD_MANUFACTURER,
        removeQuery: REMOVE_MANUFACTURER
    });