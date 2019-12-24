import withDataHOC from '../../../layout/withDataHOC';
import CategoryItem from '../../../containers/pages/CategoryItem';
import { LIST_CATEGORIES, IMAGE_UPLOAD, UPDATE_CATEGORY, CREATE_CATEGORY, LIST_CATEGORIES_NESTED, REMOVE_COURIER } from '../../../graphql/requests';


export default withDataHOC(CategoryItem,
    {
        fetchQuery: LIST_CATEGORIES,
        path: "getCategoryList",
        fields: [
            { name: '_id' },
            { type: 'input', name: 'name', intlMessage: 'name' },
            { type: 'select', name: 'parent', query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested' },
            { type: 'file', name: 'image', intlMessage: 'image' },
        ],
        updateQuery: UPDATE_CATEGORY,
        uploadQuery: IMAGE_UPLOAD,
        addQuery: CREATE_CATEGORY,
        removeQuery: REMOVE_COURIER
    });