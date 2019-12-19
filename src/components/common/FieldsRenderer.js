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
import CustomSelectInput from "./CustomSelectInput";
import CustomFileUpload from "./CustomFileUpload/index";
import IntlMessages from "../../helpers/IntlMessages";
import { getObjectProperty } from '../../utils/object';
import { useApolloClient, useMutation } from "react-apollo";
import { IMAGE_UPLOAD } from "../../graphql/requests";


let SET = "SET"
let SET_CHILD = "SET_CHILD"
let UPDATE = "UPDATE"

let ControlledInput = ({ title, options, onChange }) => <Fragment>
    <Label className="mt-4">
        <IntlMessages id={`modal.${title}`} />
    </Label>
    <Select
        components={{ Input: CustomSelectInput }}
        className="react-select"
        classNamePrefix="react-select"
        name="form-field-name"
        options={options}
        onChange={onChange}
    />
</Fragment>

let FieldsRenderer = ({ fields, state, setState, uploadQuery = IMAGE_UPLOAD }) => {
    let client = useApolloClient();
    // * To store options of selects!
    const [options, setOptions] = useState({});
    // * To store values of selects
    const [values, setValues] = useState([]);
    // * To store last list item of `complex-list`
    const [lastItem, setLastItem] = useState({})
    let renderFields = (data, parent, config) => {
        return data.map((e, i) => {
            switch (e.type) {
                case "input":
                    let value = state[e.name];
                    if (parent) {
                        let temp = state[parent] || {}
                        value = temp[e.name]
                    }
                    return (<Fragment key={i}>
                        <Label className={'mt-4'}>
                            <IntlMessages id={`modal.${e.intlMessage}`} />
                        </Label>
                        <Input value={value} onChange={({ target }) => {
                            let converted = target.value;
                            if (e.float) {
                                converted = parseFloat(target.value);
                            }
                            if (e.int) {
                                converted = parseInt(target.value)
                            }
                            if (parent) {
                                setState({ type: SET_CHILD, name: e.name, data: converted || "", parent })
                                return
                            }
                            setState({ type: SET, name: e.name, data: converted || "" })
                        }} />
                    </Fragment>)
                case "textarea":
                    return <Fragment key={i}>
                        <Label className="mt-4">
                            <IntlMessages id={`modal.${e.intlMessage}`} />
                        </Label>
                        <Input value={state[e.name]} onChange={({ target }) => {
                            if (parent) {
                                setState({ type: SET_CHILD, name: e.name, data: target.value, parent })
                                return
                            }
                            setState({ type: SET, name: e.name, data: target.value })
                        }} type="textarea" name="text" id="exampleText" />
                    </Fragment>
                case "select":
                    if (!options[i.toString()]) {
                        client.query({ query: e.query }).then(({ data }) => {
                            let temp = getObjectProperty(data, e.path);
                            let parsed = JSON.parse(temp)
                            console.warn(parsed)
                            setOptions({ ...options, [i.toString()]: parsed });
                        });
                    }
                    // Options of a first select
                    let tempOptions = options[i] &&
                        options[i.toString()].childs &&
                        options[i.toString()].childs.map((e, index) => ({ value: e._id, label: e.name, key: e._id, index }))

                    // render first select
                    let items = [<ControlledInput {...{
                        title: e.intlMessage,
                        key: i, options: tempOptions, onChange: (el) => {
                            console.warn(e)
                            setState({ type: SET, name: e.name, value: el.value })
                            setValues([el])
                        }
                    }} />]
                    let focus = options[i] || {};
                    let counter = 0;
                    let selected = values[counter];
                    while (selected) {
                        // !IMPORTANT Do not change the order
                        focus = focus.childs[values[counter].index] || {};
                        tempOptions = focus.childs && focus.childs.map((e, index) => ({ value: e._id, label: e.name, key: e._id, index }))
                        // eslint-disable-next-line no-loop-func
                        items.push(<ControlledInput key={focus._id} options={tempOptions} onChange={(e) => {
                            let tempValues = values.slice(0, counter);
                            console.warn(tempValues)
                            console.warn(counter)
                            tempValues[counter] = e;
                            setValues(tempValues);
                        }} />)
                        counter++;
                        selected = values[counter];
                    }
                    return items
                case 'file':
                    return <div key={i} className={'mt-4'}><CustomFileUpload uploadQuery={uploadQuery} onComplete={(fileUrl) => {
                        if (state[e.name] !== fileUrl) {
                            if (parent) {
                                setState({ type: SET_CHILD, name: e.name, data: fileUrl, parent })
                                return
                            }
                            setState({ type: SET, data: fileUrl, name: e.name })
                        }
                    }} /></div>
                case 'complex':
                    return renderFields(e.children, e.name)
                case 'complex-list':
                    // * List of previous objects
                    let temp = state[e.name];
                    let { component: Component } = e;
                    return <div className="p-5">
                        <h5><IntlMessages id={e.intlMessage} /></h5>
                        {temp && temp.map(e => {
                            return <Component {...e} />
                        })}
                        <div>
                            {renderFields(e.children, e.name, { list: true })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Button className={"mt-4"} title={'ADD'}><IntlMessages id={"product.add"} onClick={() => {
                                let temp = state[e.name] || []
                                setState({ type: SET, data: [...temp, lastItem] })
                            }} /></Button>
                        </div>
                    </div>
                default:
                    return null;
            }
        });
    }

    return renderFields(fields)
}

export default FieldsRenderer