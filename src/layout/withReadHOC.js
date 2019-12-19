import React, { useReducer, useEffect, Fragment } from 'react'
import mouseTrap from 'mousetrap';
import { Row } from "reactstrap";

import Pagination from "../containers/pages/Pagination";
import ContextMenuContainer from "../containers/pages/ContextMenuContainer";
import ListPageHeading from "../containers/pages/ListPageHeading";
import { useLazyQuery, } from '@apollo/react-hooks';
import { NotificationManager } from '../components/common/react-notifications';
import { getObjectProperty } from '../utils/object';


const SET = "SET";

function collect(props) {
    return { data: props.data };
};

const withDataHOC = (Component, { fetchQuery, path, }) => ({ match, ...props }) => {
    let { params } = match;
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
    const [fetchData, { loading, data, error }] = useLazyQuery(fetchQuery, { variables: { pageSize: state.selectedPageSize, next: 1, groupBy: params.groupBy } });

    useEffect(() => {
        let showError = error;
        if (showError)
            NotificationManager.error(showError.message)
    }, [error])

    if (data) {
        console.warn(data)
        let temp = getObjectProperty(data, path);
        if (temp !== state.items)
            setState({ type: SET, name: 'items', data: temp })
    }

    let onEditItem = (item) => {
        setState({ type: SET, data: item, name: "item" });
    }

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
    let { items, totalItemCount, startIndex, endIndex, selectedItems, pageSizes, orderOptions, selectedOrderOption, } = state;
    return loading ? (
        <div className="loading" />
    ) : (
            <Fragment>
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
                                        setState({ type: SET, name: 'item', data: item });
                                    }}
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
