import React, { Fragment, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Row } from 'reactstrap';
import IntlMessages from "../../../helpers/IntlMessages";
import { NotificationManager } from '../react-notifications'
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import Sortable from "react-sortablejs";

const CustomDropzone = ({ onlyImage, onSubmit, files, dispatchFiles, loading, status, mainImage, setMainImage, multiple = true, }) => {
    // const [progress, setProgress] = useState(50);
    // const [status, setStatus] = useState('');
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onabort = () => NotificationManager.warning('File upload aborted!', 'Attention', 3000, null, null, 'filled');

            reader.onerror = () => NotificationManager.error('File upload failed!', 'Error', 3000, null, null, 'filled');

            reader.onload = () => {
                // Do whatever you want with the file contents
                const uri = reader.result;
                console.warn(uri)
                dispatchFiles({ type: 'add', data: uri });
            };
            reader.readAsDataURL(file)
        })
    }, [dispatchFiles]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: onlyImage ? 'image/*' : null,
        multiple,
        onDrop
    });
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div style={{
                    color: 'lightGray',
                    borderColor: 'lightGray',
                    borderStyle: 'dashed',
                    height: 100,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    display: 'flex'
                }}>
                    {
                        isDragActive ?
                            <p style={{
                                fontSize: '2rem',
                            }}>Drop the files here ...</p> :
                            <p>Drag and drop some {onlyImage ? 'images' : `files`} here, or click to
                                select {onlyImage ? 'images' : `files`}</p>
                    }
                </div>
            </div>
            {/*Preview images*/}
            <div>
                <Row>
                    <Sortable onChange={(order) => {
                        let obj = { ...files };
                        let orderedList = order.map(e => {
                            return obj[parseInt(e)]
                        });
                        dispatchFiles({ type: 'reOrder', data: orderedList })
                    }} key={2} tag={'div'} style={{ width: '100%' }}>
                        {files.map((file, i) => {
                            return <div key={i} data-id={i} style={{ borderRadius: 30, display: 'inline-block' }}>
                                <img src={file} key={i} alt=""
                                    style={{
                                        width: null,
                                        height: 200,
                                        flex: 1,
                                        padding: 15,
                                        borderRadius: 20,
                                    }} />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <i onClick={() => {
                                        dispatchFiles({ type: 'remove', index: i })
                                    }} id={`trash${i}`} className='simple-icon-trash'
                                        style={{ margin: 10, fontSize: 20 }}>
                                        <CustomTooltip target={`trash${i}`} placement={'bottom'} text={'Delete'} />
                                    </i>
                                    {multiple && <Fragment>
                                        <i className='iconsmind-Arrow-Cross handle' id={`move${i}`}
                                            style={{ margin: 10, fontSize: 20 }}>
                                            <CustomTooltip target={`move${i}`} placement={'bottom'} text={'Move'} />
                                        </i>
                                        <div style={{
                                            backgroundColor: mainImage === i ? 'green' : 'transparent',
                                            borderRadius: 40,
                                            width: 40, height: 40,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <i id={`frame${i}`} className='simple-icon-home'
                                                onClick={() => setMainImage(i)}
                                                style={{
                                                    margin: 10,
                                                    color: mainImage === i ? 'white' : 'black',
                                                    fontSize: 20
                                                }}
                                            >
                                                <CustomTooltip target={`frame${i}`} placement={'bottom'}
                                                    text={'Set as default'} />
                                            </i>
                                        </div>
                                    </Fragment>}
                                </div>
                            </div>
                        })}
                    </Sortable>
                </Row>
            </div>
            {status !== 'success' &&
                <Fragment>
                    {files.length > 0 && <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                        <Button outline color="primary" style={{ marginRight: 15 }} onClick={() => {
                            dispatchFiles({ type: 'removeAll' });
                        }} className="mb-2">
                            <IntlMessages id="dropzone.removeAll" />
                        </Button>
                        <Button color="primary" onClick={onSubmit} className="mb-2" style={{ marginRight: 15 }}>
                            <IntlMessages id="dropzone.upload" />
                        </Button>{" "}
                    </div>}
                </Fragment>}
            {loading && <div className={"loading"} />}
        </div>
    )
};
export default CustomDropzone;
