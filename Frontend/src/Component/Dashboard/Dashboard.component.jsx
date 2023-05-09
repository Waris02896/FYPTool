import React, { Component } from 'react';
import './Dashboard.css';
import List from '../List/List.jsx';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    
    state = {
        items: [],
        text: ""
    }
    render() {

        return (
            //container ke liye
            <div>
                <div className='dashboard_comp'>
                    <div className='row'>
                        <div className='col-sm-6 mx-auto shadow-lg p-3'>
                            <h2 className='text-center'>Dash Board</h2>
                            <div className='row'>
                                <div className='col-9'>
                                        <Link to = "/createproject">Create Project</Link>
                                </div>
                                <div className="container-fluid">
                                    <h4 className='heading'>Projects List</h4>
                                    <ul className='list-unstyled row m-5'>
                                        {
                                            this.state.items.map((value, i) => {
                                                return <List key={i} id={i} value={value} />
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;