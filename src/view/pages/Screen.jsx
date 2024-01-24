import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import { FaChevronLeft } from "react-icons/fa";
import { schemaOptions } from "../dummy_datas/SchemaDatas"

import { LabelDatas } from "../../lang/en/LabelDatas";

import './Screen.css'; // Import the CSS file for styling

const Popup = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div>
            {/* Top Header */}
            <div className='top-header p-4 flex text-white'>
                <span className='inline mt-1 mr-2'><FaChevronLeft /></span>
                <p className=''>{LabelDatas.AudienceView}</p>
            </div>

            {/* Save Segment Button */}
            <button className='p-2 border border-gray-300 m-4' onClick={handleButtonClick}>{LabelDatas.SaveSegmentBtn}</button>

            {/* Popup screen */}
            <div className={`popup ${isPopupVisible ? 'visible' : ''}`}>
                {/* Content of your popup */}
                <div className='top-header p-4 flex text-white'>
                    <span className='inline mt-1 mr-2'><FaChevronLeft /></span>
                    <p className=''>{LabelDatas.SavingSegment}</p>
                </div>
                <div className="popup-content ">
                    <Dropdown handleButtonClick={handleButtonClick} schemaOptions={schemaOptions} />
                </div>
            </div>

            {/* Backdrop */}
            <div className={`backdrop ${isPopupVisible ? 'visible' : ''}`} onClick={handleButtonClick}></div>

        </div>

    );
};

export default Popup;
