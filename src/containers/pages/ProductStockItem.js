import React from "react";
import { ContextMenuTrigger } from "react-contextmenu";
import { NavLink } from "react-router-dom";
import { Badge, Card, CustomInput } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";

const ThumbListView = ({ item: product, isSelect, collect, onCheckItem }) => {
    console.warn(product)
    return (
        <Colxx xxs="12" key={product.id} className="mb-3">
            <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
                <Card
                >
                    <NavLink to={`?p=${product.id}`} className="d-flex">
                        <img
                            alt={product.title}
                            src={product.image}
                            className="list-thumbnail responsive border-0 card-img-left"
                        />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {product.title}
                                </p>
                            </NavLink>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.price}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {product.count}
                            </p>
                            <div className="w-15 w-sm-100">
                                <Badge color={"inkBlue"} pill>
                                    {product.discount}
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
