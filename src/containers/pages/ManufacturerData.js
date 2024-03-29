import React from "react";
import {
    Row,
    Card,
    CardBody,
    CardSubtitle,
    CardImg,
    CardText,
    Badge
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../components/common/CustomBootstrap";

const ManufacturerItem = ({ item: product, isSelect, collect, onClick = () => { }, onRemove = () => { }, history }) => {
    return (
        <Colxx sm="6" lg="4" xl="3" className="mb-3" key={product.id}>
            <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
                <Card
                    className={classnames({
                        active: isSelect
                    })}
                >
                    <div onClick={event => onClick(product)}>
                        <div className="position-relative">
                            <NavLink to={`?p=${product.id}`} className="w-40 w-sm-100">
                                <CardImg top alt={product.legal_name} style={{ height: 200, objectFit: 'cover' }} src={product.brand_picture} />
                            </NavLink>
                            <Badge
                                color={product.statusColor}
                                pill
                                className="position-absolute badge-top-right"
                            >
                                {product.sales}
                            </Badge>
                        </div>
                        <CardBody>
                            <Row>
                                <Colxx xxs="10" className="mb-3">
                                    <CardSubtitle>{product.legal_name}</CardSubtitle>
                                    <CardText className="text-muted text-small mb-0 font-weight-light">
                                        {product.phone}
                                    </CardText>
                                </Colxx>
                            </Row>
                        </CardBody>
                    </div>
                </Card>
            </ContextMenuTrigger>
        </Colxx>
    );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ManufacturerItem);
