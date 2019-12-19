import React, { useState } from "react";
import { Card, Badge, Collapse, ModalFooter, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";
import StockItem from "./StockItem";
import IntlMessages from "../../helpers/IntlMessages";

const DataListView = ({ item }) => {
  const [expanded, setExpanded] = useState(false)
  let { product } = item || {}
  let date = new Date(parseInt(item.created_at));
  let time = `${date.getHours()} : ${date.getMinutes()}`
  return (
    <Colxx xxs="12" className="mb-3">
      <ContextMenuTrigger id="menu_id" data={item._id}>
        <Card
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`?p=${item._id}`} className="w-40 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {product.name}
                </p>
              </NavLink>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.totalQty}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {time}
              </p>
              <div className="w-15 w-sm-100">
                <Badge style={{ backgroundColor: '#922c88', borderRadius: 16, padding: 8 }} pill>
                  <i>{item.status}</i>
                </Badge>
              </div>
            </div>
            <div onClick={() => setExpanded(!expanded)} className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <i className={`iconsminds-arrow-${expanded ? "up" : "down"}-in-circle`} />
            </div>
          </div>
          <Collapse isOpen={expanded} className={"p-2"}>
            {product && product.stock && product.stock.length > 0 && product.stock.map(e => {
              return <StockItem item={e} />
            })}
            <ModalFooter>
              <div className="align-self-right m-4">
                <Button outline color="danger" className="mr-2"><IntlMessages id={"order.decline"} /></Button>
                <Button><IntlMessages id={"order.accept"} /></Button>
              </div>
            </ModalFooter>
          </Collapse>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
