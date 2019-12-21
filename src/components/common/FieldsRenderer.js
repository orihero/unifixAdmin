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
    let renderFields = (data, parent, config = {}) => {
        return data.map((e, i) => {
            switch (e.type) {
                case "input": {

                    let val = state[e.name];
                    if (parent) {
                        let temp = state[parent] || {}
                        val = temp[e.name]
                    }
                    if (config && config.list) {
                        val = lastItem[e.name]
                    }
                    return (<Fragment key={i}>
                        <Label className={'mt-4'}>
                            <IntlMessages id={`modal.${e.intlMessage}`} />
                        </Label>
                        <Input value={val || ""} onChange={({ target }) => {
                            // ! First convert the values
                            let converted = target.value;
                            if (e.float) {
                                converted = parseFloat(target.value);
                            }
                            if (e.int) {
                                converted = parseInt(target.value)
                            }
                            // ! Set the value in required depth
                            console.warn(val)
                            if (config.list) {
                                setLastItem({ ...lastItem, [e.name]: converted })
                                return
                            }
                            if (parent) {
                                setState({ type: SET_CHILD, name: e.name, data: converted || "", parent })
                                return
                            }
                            setState({ type: SET, name: e.name, data: converted || "" })
                        }} />
                    </Fragment>)
                }
                case "textarea":
                    {
                        let value = state[e.name];
                        if (config && config.list) {
                            value = lastItem[e.name]
                        }
                        if (parent) {
                            let temp = state[parent] || {}
                            value = temp[e.name]
                        }
                        return <Fragment key={i}>
                            <Label className="mt-4">
                                <IntlMessages id={`modal.${e.intlMessage}`} />
                            </Label>
                            <Input value={value || ""} onChange={({ target }) => {
                                let converted = target.value;
                                if (parent) {
                                    // ! Set the value in required depth
                                    if (config.list) {
                                        setLastItem({ ...lastItem, [e.name]: converted })
                                        return
                                    }
                                    if (parent) {
                                        setState({ type: SET_CHILD, name: e.name, data: converted || "", parent })
                                        return
                                    }
                                    setState({ type: SET, name: e.name, data: converted || "" })
                                }
                                setState({ type: SET, name: e.name, data: target.value })
                            }} type="textarea" name="text" id="exampleText" />
                        </Fragment>
                    }
                case "select":
                    {
                        if (!options[i.toString()]) {
                            client.query({ query: e.query }).then(({ data }) => {
                                let temp = getObjectProperty(data, e.path);
                                let parsed = JSON.parse(temp)
                                console.warn(parsed)
                                setOptions({ [i.toString()]: parsed });
                            });
                        }
                        // Options of a first select
                        let tempOptions = options[i] &&
                            options[i.toString()].childs &&
                            options[i.toString()].childs.map((e, index) => ({ value: e._id, label: e.name, key: e._id, index, ...e }))

                        // render first select
                        let items = [<ControlledInput {...{
                            title: e.intlMessage,
                            key: i, options: tempOptions, onChange: (el) => {
                                let value = el.value;
                                if (e.valuePath) {
                                    value = el[e.valuePath]
                                }
                                setState({ type: SET, name: e.name, value })
                                setValues([el])
                            }
                        }} />]
                        let counter = 0;
                        let selected = values[counter];
                        while (counter < values.length && selected.childs && selected.childs.length > 0) {
                            // !IMPORTANT Do not change the order
                            // eslint-disable-next-line no-loop-func
                            items.push(<ControlledInput key={selected._id} options={selected.childs.map(el => ({ value: el._id, label: el.name, key: el._id, ...el }))} onChange={(el) => {
                                if (el) {
                                    // ! Removing the child selects if parent is selected
                                    let vals = values.slice(0, counter);
                                    setValues([...vals, el])
                                    let v = el.value;
                                    if (e.valuePath) {
                                        v = el[e.valuePath]
                                    }
                                    setState({ type: SET, name: e.name, data: v })
                                }
                            }} />)
                            counter++
                            selected = values[counter];
                        }
                        return items
                    }
                case 'file':
                    {
                        return <div key={i} className={'mt-4'}><CustomFileUpload uploadQuery={uploadQuery} onComplete={(fileUrl) => {
                            if (state[e.name] !== fileUrl) {
                                if (config.list) {
                                    if (lastItem[e.name] !== fileUrl)
                                        setLastItem({ ...lastItem, [e.name]: fileUrl || "" })
                                    return
                                }
                                if (parent) {
                                    setState({ type: SET_CHILD, name: e.name, data: fileUrl, parent })
                                    return
                                }
                                setState({ type: SET, data: fileUrl, name: e.name })
                            }
                        }} /></div>
                    }
                case 'complex':
                    return renderFields(e.children, e.name)
                case 'complex-list':
                    // * List of previous objects
                    let temp = state[e.name];
                    let { component: Component } = e;
                    return <div className="p-5">
                        <h5><IntlMessages id={e.intlMessage} /></h5>
                        {temp && temp.map(e => {
                            return <Component item={e} />
                        })}
                        <div>
                            {renderFields(e.children, e.name, { list: true })}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                            <Button className={"mt-4"} title={'ADD'} onClick={() => {
                                let temp = state[e.name] || []
                                setState({ type: SET, data: [...temp, lastItem], name: e.name })
                                setLastItem({})
                            }} ><IntlMessages id={"product.add"} /></Button>
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