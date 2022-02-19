import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const AllData = () => {
    return (
        <Fragment>

            <div className="col-8">
                <div className="clearfix mb-3">
                    <h4 className="float-start">Students Information</h4>

                    <button className="float-end btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#addInfo"
                                data-bs-whatever="@mdo">Add new</button>

                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Class</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>01</td>
                        <td>Nazmul</td>
                        <td>28</td>
                        <td>MBA</td>
                        <td>
                            <Link to=""><button className="btn btn-success btn-sm ms">Edit</button></Link>
                            <button  className="btn btn-danger btn-sm ms-2">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>


        {/*  ========Modal ========*/}
        
            <div className="modal fade" id="addInfo" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name"
                                           className="col-form-label">Recipient:</label>
                                    <input type="text" className="form-control"
                                           id="recipient-name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text"
                                           className="col-form-label">Message:</label>
                                    <textarea className="form-control"
                                              id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button"
                                    className="btn btn-primary">Send message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default AllData;
