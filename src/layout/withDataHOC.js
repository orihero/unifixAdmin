import React, { useCallback, useReducer, useEffect, Fragment } from 'react'
import mouseTrap from 'mousetrap';
import { Row } from "reactstrap";

import Pagination from "../containers/pages/Pagination";
import ContextMenuContainer from "../containers/pages/ContextMenuContainer";
import ListPageHeading from "../containers/pages/ListPageHeading";
import AddNewModal from "../containers/pages/AddNewModal";
import { useLazyQuery, useMutation, } from '@apollo/react-hooks';
import { NotificationManager } from '../components/common/react-notifications';
import { getObjectProperty } from '../utils/object';
import PromptModal from '../components/common/PromptModal'


const SET = "SET";

function collect(props) {
    return { data: props.data };
};

const withDataHOC = (Component, { fetchQuery, path, fields, addQuery, updateQuery, removeQuery, uploadQuery }) => ({ match, history, ...props }) => {
    let reducer = (state, action) => {
        switch (action.type) {
            case SET:
                return { ...state, [action.name]: action.data }
            default:
                break;
        }
    }
    const [state, setState] = useReducer(reducer, {
        displayMode: "imagelist",
        selectedPageSize: 8,
        orderOptions: [
            { column: "title", label: "Product Name" },
            { column: "category", label: "Category" },
            { column: "status", label: "Status" }
        ],
        pageSizes: [8, 12, 24],

        categories: [
            { label: "Cakes", value: "Cakes", key: 0 },
            { label: "Cupcakes", value: "Cupcakes", key: 1 },
            { label: "Desserts", value: "Desserts", key: 2 }
        ],

        selectedOrderOption: { column: "title", label: "Product Name" },
        dropdownSplitOpen: false,
        modalOpen: false,
        currentPage: 1,
        totalItemCount: 0,
        totalPage: 1,
        search: "",
        selectedItems: [],
        lastChecked: null,
        isLoading: false,
        items: [],
        item: null,
        isEdit: false,

    })
    const [fetchData, { loading, data, error }] = useLazyQuery(fetchQuery, { variables: { pageSize: state.selectedPageSize, next: 1 } });
    const [add, { loading: addLoading, data: addData, error: addError }] = useMutation(addQuery, { variables: { pageSize: state.selectedPageSize, next: 1 }, refetchQueries: () => ([{ query: fetchQuery, variables: { pageSize: state.selectedPageSize, next: 1 } }]) });
    const [update, { loading: updateLoading, data: updateData, error: updateError }] = useMutation(updateQuery, { refetchQueries: [{ query: fetchQuery, variables: { pageSize: state.selectedPageSize, next: 1 } }] });
    const [remove, { loading: removeLoading, data: removeData, error: removeError }] = useMutation(removeQuery, { refetchQueries: [{ query: fetchQuery, variables: { pageSize: state.selectedPageSize, next: 1 } }] });

    let modalLoading = addLoading || updateLoading || removeLoading;
    useEffect(() => {
        let showError = addError || updateError || removeError || error;
        if (showError)
            NotificationManager.error(showError.message)
    }, [addError, updateError, removeError, error])
    useEffect(() => {
        let showSuccess = removeData || updateData || addData;
        if (showSuccess) {
            NotificationManager.success("Task completed", "Success");
        }
    }, [updateData, addData, removeData, fetchData]);

    if (data) {
        let temp = getObjectProperty(data, path);
        if (temp !== state.items)
            setState({ type: SET, name: 'items', data: temp })
    }

    let onEditItem = (item) => {
        setState({ type: SET, data: item, name: "item" });
        toggleModal();
    }
    let toggleModal = useCallback(() => {
        if (state.modalOpen) {
            setState({
                type: SET,
                name: "isEdit",
                data: false
            });
            setState({
                type: SET,
                name: "item",
                data: {}
            });
        }
        setState({
            type: SET,
            name: "modalOpen",
            data: !state.modalOpen
        });
    }, [state.modalOpen]);

    let changeOrderBy = column => {
        setState(
            {
                type: SET,
                name: "selectedOrderOption",
                data: state.orderOptions.find(
                    x => x.column === column
                )
            },
        );
    };

    let onContextMenuClick = (e, data, target) => {
        console.log(
            "onContextMenuClick - selected items",
            state.selectedItems
        );
        console.log("onContextMenuClick - action : ", data.action);
    };

    let onContextMenu = (e, data) => {
        const clickedProductId = data.data;
        if (state.selectedItems && !state.selectedItems.includes(clickedProductId)) {
            setState({
                type: SET,
                name: 'selectedItems',
                data: [clickedProductId]
            });
        }

        return true;
    };
    let onChangePage = page => {
        setState(
            {
                type: SET,
                name: 'currentPage',
                data: page
            },
        );
        fetchData();
    };

    let onSearchKey = e => {
        if (e.key === "Enter") {
            setState(
                {
                    type: SET,
                    nane: 'search',
                    data: e.target.value.toLowerCase()
                },
            );
            fetchData();
        }
    };

    useEffect(() => {
        fetchData()
        // mouseTrap.bind(["ctrl+a", "command+a"], () =>
        // handleChangeSelectAll(false)
        // );
        mouseTrap.bind(["ctrl+d", "command+d"], () => {
            setState({ type: SET, name: 'selectedItems', data: [] });
            return false;
        });
        return () => {
            mouseTrap.unbind("ctrl+a");
            mouseTrap.unbind("command+a");
            mouseTrap.unbind("ctrl+d");
            mouseTrap.unbind("command+d");
        }
    }, [fetchData])
    let confirmRemove = () => {
        let { item: { _id } = {} } = state
        remove({ variables: { id: _id } });
        setState({ type: SET, name: 'promptOpen', data: false })
        setState({ type: SET, name: 'modalOpen', data: false })
        fetchData();
    }
    let { items, totalItemCount, startIndex, endIndex, selectedItems, modalOpen, pageSizes, orderOptions, selectedOrderOption, categories, promptOpen } = state;
    let togglePrompt = () => {
        setState({ type: SET, name: 'item', data: null })
        setState({ type: SET, name: 'promptOpen', data: !promptOpen })
    }
    return loading ? (
        <div className="loading" />
    ) : (
            <Fragment>
                <PromptModal isOpen={promptOpen} confirm={confirmRemove} toggle={togglePrompt} />
                <div className="disable-text-selection">
                    <ListPageHeading
                        heading="menu.all-shops"
                        changeOrderBy={changeOrderBy}
                        totalItemCount={totalItemCount}
                        selectedOrderOption={selectedOrderOption}
                        match={match}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        selectedItemsLength={selectedItems ? selectedItems.length : 0}
                        itemsLength={items ? items.length : 0}
                        onSearchKey={onSearchKey}
                        orderOptions={orderOptions}
                        pageSizes={pageSizes}
                        toggleModal={toggleModal}
                    />
                    <AddNewModal
                        modalOpen={modalOpen}
                        toggleModal={toggleModal}
                        categories={categories}
                        isEdit={state.isEdit}
                        item={state.item}
                        fields={fields}
                        edit={update}
                        add={add}
                        uploadQuery={uploadQuery}
                        loading={modalLoading}
                    />
                    <Row>
                        {state.items && state.items.map(item => {
                            return (
                                <Component
                                    key={item.id}
                                    item={item}
                                    isSelect={state.selected && state.selectedItems.includes(item.id)}
                                    collect={collect}
                                    onClick={onEditItem}
                                    onRemove={() => {
                                        togglePrompt();
                                        setState({ type: SET, name: 'item', data: item });
                                    }}
                                    history={history}
                                />
                            );
                        })}{" "}
                        <Pagination
                            currentPage={state.currentPage}
                            totalPage={state.totalPage}
                            onChangePage={i => onChangePage(i)}
                        />
                        <ContextMenuContainer
                            onContextMenuClick={onContextMenuClick}
                            onContextMenu={onContextMenu}
                        />
                    </Row>
                </div>
            </Fragment>
        );
}

export default withDataHOC;
