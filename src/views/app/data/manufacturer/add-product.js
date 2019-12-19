import React, { Fragment, useReducer, useEffect, useState } from "react";
import {
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Card
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../../components/common/CustomSelectInput";
import CustomFileUpload from "../../../../components/common/CustomFileUpload/index";
import IntlMessages from "../../../../helpers/IntlMessages";
import { getObjectProperty } from '../../../../utils/object';
import { useApolloClient, useMutation } from "react-apollo";
import { LIST_CATEGORIES_NESTED, ADD_PRODUCT, UPDATE_PRODUCT, REMOVE_PRODUCT, IMAGE_UPLOAD } from "../../../../graphql/requests";
import FieldsRenderer from "../../../../components/common/FieldsRenderer";
import ProductStockItem from '../../../../containers/pages/ProductStockItem'

let productOptions = {
    fields: [
        { name: '_id' },
        { type: 'select', name: 'categoryPath', intlMessage: "category", query: LIST_CATEGORIES_NESTED, path: 'getAllCategoriesNested', valuePath: "path" },
        { type: 'input', name: 'name', intlMessage: 'name' },
        { type: 'input', name: 'short_desc', intlMessage: 'short_desc' },
        { type: 'textarea', name: 'long_desc', intlMessage: 'long_desc' },
        { type: 'multiple-select', name: 'tags', intlMessage: 'tags' },
        { type: 'files', name: 'images', intlMessage: 'images' },
        { type: 'file', name: 'thumbnail', intlMessage: 'thumbnail' },
        { type: 'input', name: 'price', intlMessage: 'price', float: true },
        { type: 'input', name: 'discount', intlMessage: 'discount', float: true },
        // {
        //     type: 'complex', name: 'stock', children: [
        //         { type: 'input', name: 'title', intlMessage: 'title' },
        //         { type: 'input', name: 'value', intlMessage: 'value' },
        //         { type: 'input', name: 'price', intlMessage: 'price' },
        //         { type: 'input', name: 'discount', intlMessage: 'discount' },
        //         { type: 'file', name: 'image', intlMessage: 'image' },
        //         { type: 'input', name: 'count', intlMessage: 'count' },
        //         { type: 'input', name: 'sold', intlMessage: 'sold' },
        //     ]
        // },
        { type: 'input', name: 'count_measurement', intlMessage: 'count_measurement' },
        { type: 'input', name: 'min_order', intlMessage: 'min_order', float: true },
        { type: 'input', name: 'max_order', intlMessage: 'max_order', float: true },
        { type: 'input', name: 'weight', intlMessage: 'weight', float: true },
        {
            type: 'complex', name: 'size', children: [
                { type: 'input', name: 'x', intlMessage: 'x', int: true },
                { type: 'input', name: 'y', intlMessage: 'y', int: true },
                { type: 'input', name: 'z', intlMessage: 'z', int: true },
            ]
        },
        { type: 'switch', name: 'is_hot', intlMessage: 'is_hot' },
        { type: 'switch', name: 'is_promoting', intlMessage: 'is_promoting' },
        { type: 'switch', name: 'approved', intlMessage: 'approved' },
        { type: 'input', name: 'disapproval_message', intlMessage: 'disapproval_message' },
        {
            type: 'complex-list', name: 'stock', intlMessage: 'stocks',
            children: [
                { type: 'input', name: 'title', intlMessage: 'title' },
                { type: 'input', name: 'value', intlMessage: 'value' },
                { type: 'input', name: 'price', intlMessage: 'price' },
                { type: 'input', name: 'discount', intlMessage: 'discount' },
                { type: 'file', name: 'image', intlMessage: 'image' },
                { type: 'input', name: 'count', intlMessage: 'count' },
                { type: 'input', name: 'sold', intlMessage: 'sold' },
            ],
            component: ProductStockItem
        }
    ],
    updateQuery: UPDATE_PRODUCT,
    uploadQuery: IMAGE_UPLOAD,
    addQuery: ADD_PRODUCT,
    removeQuery: REMOVE_PRODUCT
}


let SET = "SET"
let SET_CHILD = "SET_CHILD"
let UPDATE = "UPDATE"
const AddNewModal = ({ item = {}, fields = productOptions.fields, uploadQuery = productOptions.uploadQuery, loading, history }) => {
    let reducer = (state, action) => {
        switch (action.type) {
            case SET_CHILD:
                let child = state[action.parent]
                return { ...state, [action.parent]: { ...child, [action.name]: action.data } }
            case SET:
                return { ...state, [action.name]: action.data }
            case UPDATE:
                return action.data
            default:
                return state;
        }
    }
    // * To store the values of item
    const [state, setState] = useReducer(reducer, item ? item : {})
    let [add, { loading: addLoading, data: addData, error: addError }] = useMutation(productOptions.addQuery)
    let [update, { loading: updateLoading, data: updateData, error: updateError }] = useMutation(productOptions.updateQuery)
    let [remove, { loading: removeLoading, data: removeData, error: removeError }] = useMutation(productOptions.removeQuery)
    return (
        <div>
            {loading && <div className={'loading'} />}
            {!loading && <Fragment>
                <div>
                    <h1>
                        <IntlMessages id="pages.add-new-modal-title" />
                    </h1>
                    <div className="text-zero top-right-button-container">
                        <Button
                            color="primary"
                            size="lg"
                            className="top-right-button"
                            onClick={history.goBack}>
                            <IntlMessages id="product.goback" />
                        </Button>
                    </div>
                </div>
                <ModalBody>
                    <Card className={"p-4"}>
                        {fields && <FieldsRenderer fields={fields} state={state} setState={setState} />}
                    </Card>
                </ModalBody>
                <ModalFooter>
                    {item && Object.keys(item).length > 0 && <Button color="danger" outline onClick={() => { }}>
                        <IntlMessages id="pages.remove" />
                    </Button>}
                    <Button color="secondary" outline onClick={() => { }}>
                        <IntlMessages id="pages.cancel" />
                    </Button>
                    {item && Object.keys(item).length > 0 ? <Button color="primary" onClick={() => {
                        let input = {}
                        fields.forEach(e => {
                            input[e.name] = state[e.name]
                        })
                        update({ variables: { input } })
                    }}>
                        <IntlMessages id="pages.save" />
                    </Button> : <Button color="primary" onClick={() => {
                        let input = {}
                        fields.forEach(e => {
                            input[e.name] = state[e.name]
                        })
                        console.warn(input)
                        add({ variables: { input } })
                    }}>
                            <IntlMessages id="pages.submit" />
                        </Button>}
                </ModalFooter>
            </Fragment>}
        </div>
    );
};


export default AddNewModal;


/*

*/

// 