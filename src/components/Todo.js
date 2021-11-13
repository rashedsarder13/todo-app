import React,{useEffect, useState} from 'react';
import todo from "../images/todo.svg";

//get the localstorage item
const getLocalItems = () => {
    let list = localStorage.getItem('list');
    if(list)
    {
        return JSON.parse(localStorage.getItem('list'));
    }
    else{
        return [];
    }
}

const Todo = () => {

    const [inputData,setInpuData] = useState('');
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [items,setItems] = useState(getLocalItems());
    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if(!inputData){
            alert('Please fill data');
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if(elem.id ===isEditItem)
                    {
                        return {...elem, name:inputData}
                    }
                    return elem;
                })
                )
                setToggleSubmit(true);
                setInpuData('');
                setIsEditItem(null);
        }
        else{
        const allInputData = { id: new Date().getTime().toString(), name:inputData }
        setItems([...items, allInputData]);
        setInpuData('');
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;
        });
        setItems(updatedItems);
    }

    //Edit item
    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        setToggleSubmit(false);
        setInpuData(newEditItem.name);
        setIsEditItem(id);
    }


    const removeAll = () => {
        setItems([]);
    }
    //add data to localStorage
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(items));
    },[items]);


    return (
      <>
        <div className="main-div">
            <div className="child-div">
                <figure>
                    <img src={todo} alt="todologo" title="Todo-App" />
                    <figcaption>Add Your List Here ✌️ </figcaption>
                </figure>

                <div className="addItems">
                    <input type="text" placeholder="✍️ Add Items... " 
                    value={inputData}
                    onChange = {(r) => setInpuData(r.target.value)}
                    />
                    {
                        toggleSubmit?<i className="fa fa-plus add-btn" title="Add Item" onClick = {addItem} /> : 
                            <i className="far fa-edit add-btn" title="Update Item" onClick = {addItem} />
                    }
                    
                </div>
                <div className="showItems">

                    {
                        items.map((elem) => {
                            return(
                                <div className="eachItem" key={elem.id}>
                                    <h3>{elem.name}</h3>
                                    <div className="todo-btn">
                                    <i className="far fa-edit add-btn" title="Edit Item" 
                                    onClick = { () => editItem(elem.id)}
                                    />
                                    <i className="far fa-trash-alt add-btn" title="Delete Item" 
                                    onClick = { () => deleteItem(elem.id)}
                                    />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" 
                    onClick={removeAll}
                    ><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
      </>
    )
}

export default Todo;
