import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const ThumbListView = ({ item, isSelect, collect, onCheckItem }) => {
    return (
        <Colxx xxs="12" key={item._id} className="mb-3">
            <ContextMenuTrigger id="menu_id" data={item._id} collect={collect}>
                <Card
                    className={classnames("d-flex flex-row", {
                        active: isSelect
                    })}
                >
                    <NavLink to={`?p=${item._id}`} className="d-flex">
                        <img
                            alt={item.title}
                            src={item.image}
                            className="list-thumbnail responsive border-0 card-img-left"
                        />
                    </NavLink>
                    <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                        <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                            <NavLink to={`?p=${item._id}`} className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate">
                                    {item.title}
                                </p>
                            </NavLink>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {item.qty}
                            </p>
                            <p className="mb-1 text-muted text-small w-15 w-sm-100">
                                {item.price}
                            </p>
                            <div className="w-15 w-sm-100">
                                <Badge color={item.statusColor} pill>
                                    {item.discount} %
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
