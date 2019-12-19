import React, { useReducer, useState } from 'react';
// import {getToken, url} from 'Api/api'
import CustomDropzone from "./dropzone";
// import { NotificationManager } from "Components/ReactNotifications";
import { useMutation } from '@apollo/react-hooks';

const CustomFileUpload = ({
    onComplete = () => {
    }, onlyImage, multiple,
    files: propFiles = [], uploadQuery,
    url,
    getToken = () => { },
    ...rest
}) => {
    let reducer = (state = [], action) => {
        switch (action.type) {
            case 'add':
                return [...state, action.data];
            case 'remove':
                return state.filter((e, i) => i !== action.index);
            case 'removeAll':
                return [];
            case 'setMain':
                return state.map((e, i) => i === action.index ? { ...e, isMain: true } : e);
            case 'reOrder':
                return action.data;
            default:
                return state;
        }
    };
    const [files, dispatchFiles] = useReducer(reducer, propFiles);
    const [mainImage, setMainImage] = useState(0);
    let [mutate, { data,  loading }] = useMutation(uploadQuery)
    if (data) {
        onComplete(data.uploadImage)
    }
    const [state, ] = useState(0);
    const [status, ] = useState('');
    let dataUriToFile = (dataURI) => {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], `file.png`, { type: mimeString });
    };
    let onSubmit = () => {
        if (multiple) {
            return
        }
        mutate({ variables: { file: dataUriToFile(files[0]) } })
    }

    return (
        <CustomDropzone
            {...{
                onSubmit,
                dispatchFiles,
                files,
                status,
                onlyImage,
                progress: state,
                mainImage,
                setMainImage,
                multiple: false,
                loading
            }}

        />
    )
};

export default CustomFileUpload;
