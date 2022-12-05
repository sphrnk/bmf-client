import classes from "./Select.module.css";
import React,{useEffect, useState} from "react";

const Select = (props) => {
    const [showContainer, setShowContainer] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const inputHandler = (e) => {
        setInputValue(e.target.value);
    }
    const toggleContainerHandler = () => {
        setShowContainer((prevState) => !prevState);
    }
    const selectValueHandler = (el) => {
        console.log(el);
        const inputEl = el.target.id;
        const inputName = inputEl.split('|')[0];
        const inputValue = inputEl.split('|')[1];
        setSelectedValue(inputName);
        toggleContainerHandler();
        props.onSelect(inputValue);
    }
    const containerClasses = showContainer ? `${classes["options-container"]}` : `${classes["options-container"]} hidden`;
    const searchBoxClasses = showContainer ? `${classes["search-box"]}` : `${classes["search-box"]} hidden`;

    return (
        <>
            <div className={classes['select-box']}>
                <div className={containerClasses}>
                    <div className="mt-14">
                        {inputValue.length === 0 ?
                            props.options.map((option) =>
                                <div key={option.id}
                                     className={classes.option}
                                     onClick={selectValueHandler} id={option.text + '|' + option.id}>
                                    <span
                                        id={option.text + '|' + option.id}>{option.text}</span>
                                </div>) :
                            props.options.map((filteredOption) => filteredOption.text.includes(inputValue) ?
                                <div key={filteredOption.id} onClick={selectValueHandler} className={classes.option} id={filteredOption.id}>
                                    <input type="radio" className={classes.radio}
                                           value={filteredOption.text + '|' + filteredOption.id}/>
                                    <label htmlFor={filteredOption.id}>{filteredOption.text}</label>
                                </div> : '')}
                    </div>
                </div>

                <div onClick={toggleContainerHandler} className={classes.selected}>
                    {selectedValue.length === 0 ? `Select ${props.object}` : selectedValue}
                    {showContainer ?
                        <i className="fa-regular fa-chevron-up"></i> :
                        <i className="fa-regular fa-chevron-down"></i>
                    }
                </div>

                <div className={searchBoxClasses}>
                    <input type="text" placeholder="Search.." onChange={inputHandler} value={inputValue}/>
                </div>
            </div>
        </>
    );
};
export default React.memo(Select);