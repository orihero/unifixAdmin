import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const ThumbListView = ({ item: product, isSelect, collect, onCheckItem, onClick }) => {
    console.warn(product)
    return (
        <Colxx xxs="12" key={product.id} className="mb-3">
            <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
                <Card
                    onClick={() => onClick(product)}
                    className={classnames("d-flex flex-row", {
                        active: isSelect
                    })}
                >
                    <NavLink to={`?p=${product.id}`} className="d-flex">
                        <img
                            alt={product.name}
                            src={product.image}
                            className="list-thumbnail responsive border-0 card-img-left"
                        />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {product.name}
                                </p>
                            </NavLink>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.parent}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.path}
                            </p>
                            <div className="w-15 w-sm-100">
                                <Badge color={product.statusColor} pill>
                                    {product.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Card>
            </ContextMenuTrigger>
        </Colxx>
    );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
