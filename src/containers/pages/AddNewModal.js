import React, { Fragment, useReducer, useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import CustomFileUpload from "../../components/common/CustomFileUpload/index";
import IntlMessages from "../../helpers/IntlMessages";
import { useApolloClient } from "react-apollo";
import { getObjectProperty } from '../../utils/object';


let SET = "SET"
let SET_CHILD = "SET_CHILD"
let UPDATE = "UPDATE"
const AddNewModal = ({ modalOpen, toggleModal, item = {}, fields, edit, add, uploadQuery, loading }) => {
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
  // * To store options of selects!
  const [options, setOptions] = useState({});
  // * To store values of selects
  const [values, setValues] = useState([])
  useEffect(() => {
    setState({ type: UPDATE, data: item || {} })
  }, [item])
  let client = useApolloClient();
  let renderFields = (data, parent) => {
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
              if (parent) {
                setState({ type: SET_CHILD, name: e.name, data: target.value, parent })
                return
              }
              setState({ type: SET, name: e.name, data: target.value })
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
        default:
          return null;
      }
    });
  }
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      {loading && <div className={'loading'} />}
      {!loading && <Fragment>
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="pages.add-new-modal-title" />
        </ModalHeader>
        <ModalBody>
          {fields && renderFields(fields)}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="pages.cancel" />
          </Button>
          {item && Object.keys(item).length > 0 ? <Button color="primary" onClick={() => {
            let input = {}
            fields.forEach(e => {
              input[e.name] = state[e.name]
            })
            edit({ variables: { input } })
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
    </Modal>
  );
};

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

export default AddNewModal;


/*

*/

// 