import React, { useRef, useState, useEffect, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { Icon } from 'antd';

const DropDownBox = (props) => {
    const container = useRef();
    const [open, setOpen] = useState(false);
    // const [listOpen, setListOpen] = useState(false);
    const fieldParams = props.fieldParams;
    useEffect(() => {
        console.log('mounted');       
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
      }, []);
    const handleClickOutside = event => {
        if (container.current && !container.current.contains(event.target)) {
            setOpen(false)
        }
    };
    const handleButtonClick = () => {
        setOpen(!open);
    };

    // const toggle = () => {
    //     setListOpen(!listOpen);
    // }

    const menuTable = () => {
        return (
            <ul className='m-0 pb-2 list-unstyled position-absolute text-left bg-white fieldBox card shadow'>
            {fieldParams.length !== 0 && fieldParams.map((fieldParam, i) => {
                return <li
                key={i}
                className='cursorDefault px-3 pt-2'
                >
                    <label className='mb-0 text-nowrap cursorPointer'>
                    <input type="checkbox" className='align-middle cursorPointer'
                    value={fieldParam.type} checked={fieldParam.check}
                    onChange={props.handleCheckBox.bind(null, i)} /> {fieldParam.type}
                    </label>
                    {/* <Icon type='down' className='iconList float-right'
                        onClick={toggle}
                        aria-controls={fieldParam.type}
                        aria-toggle
                        aria-expanded={listOpen}/>
                    <Collapse in={listOpen}> */}
                    {fieldParam.parameters && fieldParam.parameters.length > 0 && 
                    <ul className='m-0 p-0 list-unstyled' id={fieldParam.type}>
                    {fieldParam.parameters.map((param, j) => {
                        return <li className='cursorDefault px-3 pt-2' key={j}>
                            <label className='mb-0 text-nowrap cursorPointer'>
                                <input className='align-middle cursorPointer'
                                type="checkbox" value={param} checked={fieldParam.checked[j]}
                                disabled={fieldParam.check} onChange={props.handleCheckBoxChild.bind(null, i, j)} /> {param}
                            </label>
                        </li>
                    })
                    }</ul>}
                    {/* </Collapse> */}
                </li>
            })}
            </ul>
        )
      }

    return (
        <Fragment>
            <div className="mr-3 mBtmPx align-top position-relative d-inline-block" ref={container}>
                <Button disabled={props.disabled} size='sm' variant='light' className='shadow-sm bg-white rounded' onClick={handleButtonClick}>
                    {props.title} <Icon type="down" className='align-middle fontSize' />
                </Button>
                {open && menuTable()}
            </div>
        </Fragment>
    );
}

export default DropDownBox;