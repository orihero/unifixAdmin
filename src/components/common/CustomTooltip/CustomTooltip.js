import React, {useState} from 'react';
import {Tooltip} from 'reactstrap'

const CustomTooltip = ({placement, target, children, text}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Tooltip  {...{placement, isOpen, toggle: () => setIsOpen(!isOpen), target}}>
            {text}
        </Tooltip>
    );
};
export default CustomTooltip;
