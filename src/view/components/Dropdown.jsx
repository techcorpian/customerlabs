import React, { useState } from 'react';
import axios from 'axios';
import { FaCircle } from "react-icons/fa";
import { CiSquareMinus } from "react-icons/ci";

import { LabelDatas } from "../../lang/en/LabelDatas";
import './Dropdown.css';

const Dropdown = ({ handleButtonClick, schemaOptions }) => {

    const [dropdowns, setDropdowns] = useState([]);
    const [selectedSchema, setSelectedSchema] = useState('default');

    const handleAddDropdown = () => {
        if (selectedSchema !== 'default' && !dropdowns.some((dropdown) => dropdown.value === selectedSchema)) {
            const newDropdowns = [...dropdowns, { id: dropdowns.length + 1, value: selectedSchema }];
            setDropdowns(newDropdowns);
            setSelectedSchema('default');
        }
    };

    const handleDeleteDropdown = (id) => {
        const newDropdowns = dropdowns.filter((dropdown) => dropdown.id !== id);
        setDropdowns(newDropdowns);
    };

    const handleDropdownChange = (id, selectedValue) => {
        const updatedDropdowns = dropdowns.map((dropdown) =>
            dropdown.id === id ? { ...dropdown, value: selectedValue } : dropdown
        );
        setDropdowns(updatedDropdowns);
    };

    const handleSchemaChange = (e) => {
        setSelectedSchema(e.target.value);
    };

    const [segmentName, setSegmentName] = useState('');

    const handleSegmentNameChange = (event) => {
        setSegmentName(event.target.value);
    };

    const saveSegment = () => {
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const segmentData = {
            segment_name: segmentName,
            schema: dropdowns.map((dropdown) => ({ [dropdown.value]: dropdown.label })),
        };
        console.log(segmentData)

        axios.post(`${apiUrl}`, segmentData, {

        })
            .then((response) => {
                console.log('Segment data sent successfully:', response.data);
                // Optionally handle response or perform other actions
            })
            .catch((error) => {
                console.error('Error sending segment data:', error);
                // Optionally handle errors or perform other actions
            });
    };

    return (
        <>
            {/* Save Segment Header & Top container */}
            <div className='top-container'>
                <span>{LabelDatas.SegmentLabel}</span><br />
                <input type="text" value={segmentName} onChange={handleSegmentNameChange} className='mt-3 p-1 pl-2 border rounded-md w-full placeholder:text-sm text-gray-700 border-gray-300 placeholder:text-gray-300' />
                <div className='mt-6'>{LabelDatas.SegmentDesc}</div>
            </div>

            {/* Inside the blue box */}
            <div className="middle-container">
                <div>
                    {dropdowns.map((dropdown) => (
                        <div key={dropdown.id}>
                            <FaCircle className='inline mt-2 m-2 text-green-500 text-xs'></FaCircle>
                            <select
                                value={dropdown.value}
                                onChange={(e) => handleDropdownChange(dropdown.id, e.target.value)}
                                className='p-2 text-sm my-2'
                            >
                                <option value="default" disabled>
                                    {LabelDatas.SelectOption}
                                </option>
                                {schemaOptions
                                    .filter((schema) => !dropdowns.some((d) => d.id !== dropdown.id && d.value === schema.value))
                                    .map((schema) => (
                                        <option key={schema.value} value={schema.value}>
                                            {schema.label}
                                        </option>
                                    ))}
                            </select>
                            <CiSquareMinus onClick={() => handleDeleteDropdown(dropdown.id)} className='delete-button text-4xl inline mb-1 text-sky-700'></CiSquareMinus>
                        </div>

                    ))}
                </div>
            </div>

            {/* bottom container */}
            <div className="bottom-container relative">
                <div className="schema-container ">
                    <div className='flex'>
                        <FaCircle className='inline mt-3 m-2 text-cyan-500 text-xs'></FaCircle>
                        <select value={selectedSchema} onChange={handleSchemaChange} className='p-2 text-sm'>
                            <option value="default" disabled>
                                {LabelDatas.SelectSchema}
                            </option>
                            {schemaOptions.map((schema) => (
                                <option key={schema.value} value={schema.value}>
                                    {schema.label}
                                </option>
                            ))}
                        </select>
                    </div><br />
                    <button onClick={handleAddDropdown} className='text-xs underline text-gray-400 mt-1 ml-6'>{LabelDatas.AddNewSchema}</button>
                </div>

            </div>

            {/* Bottom buttons container */}
            <div>
                <div className='absolute bottom-0 left-0 flex save-container '>
                    <button className="save-button" onClick={saveSegment}>{LabelDatas.SaveTheSegment}</button>
                    {/* Close button */}
                    <button onClick={handleButtonClick} className="close-button flex flex-row ml-2 bg-white text-gray-700 float-left ">
                        {LabelDatas.CancelBtn}
                    </button>
                </div>
            </div>

        </>
    );
};

export default Dropdown;