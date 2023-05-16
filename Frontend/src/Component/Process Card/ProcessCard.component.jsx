import React, { Component } from 'react';
import './ProcessCard.css';
import List from '../List/List.jsx';
import CustomButton from '../Button/button.component';
//import { useEffect } from 'react';

class ProcessCard extends Component {
    state = {
        items: [],
        processName: "",
        processPriority: ""
    };
    handleProcessNameChange = e => {
        this.setState({ processName: e.target.value })
    }
    handleProcessPriorityChange = e => {
        this.setState({ processPriority: e.target.value })
    }
    handleAdd = (e) => {
        if (this.state.processName !== "" && this.state.processPriority !== "") {
            const newItems = {
                name: this.state.processName,
                priority: this.state.processPriority
            };
            const items = [...this.state.items, newItems];
            this.setState({ items: items, processName: "", processPriority: "" });
        }
    };
    handleDelete = (id) => {
        const olditems = [...this.state.items]
        const items = olditems.filter((element, i) => {
            return i !== id;
        });
        this.setState({ items: items });
    };
    handleclose = () => {
        this.state(false);
    }
    render() {
        //add data to localstorage
        // useEffect(() => {
        //     localStorage.setItem('lists', JSON.stringify(this.state.items))
        // }, [this.state.items]);
        return (
            //container ke liye
            <div>
                {/* <div className="button">
                <CustomButton className="cross_button" 
                onClick={this.handleclose}>X</CustomButton>
                </div> */}
                <div className='process-card'>
                    <div className='container'>
                        <div className='process-card-inner'>
                            <h2 className='process-card-title'>Process Card</h2>
                            <div className='process-card-form'>
                                <div>
                                    <br />
                                    <label className='process-card-label'>Process Name</label>
                                    <br />
                                    <input
                                        type="text"
                                        className='form-control'
                                        placeholder='Process Name'
                                        value={this.state.processName}
                                        onChange={this.handleProcessNameChange} />
                                    <br />
                                    <label className='process-card-label'>Priority</label>
                                    <br />
                                    <input
                                        type="number"
                                        className='form-control2'
                                        placeholder='Process Prority'
                                        value={this.state.processPriority}
                                        onChange={this.handleProcessPriorityChange} />
                                    <br />
                                    <CustomButton className='process-card-button'
                                        onClick={this.handleAdd}>Add Process</CustomButton>
                                </div>
                            </div>
                        </div>
                        <div className="process-card-list">
                        <ul>
                            {this.state.items.map((item, i) => (
                                <List key={i}
                                    id={i}
                                    name={item.name}
                                    priority={item.priority}
                                    sendData={this.handleDelete} />
                            ))
                            }
                        </ul>
                    </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default ProcessCard;
