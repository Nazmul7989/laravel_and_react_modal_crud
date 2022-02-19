import React, {Fragment,useState,useEffect} from 'react';


const AllData = () => {

    const [info,setInfo] = useState({
        name: '',
        age: '',
        class: ''
    })

    const onChangeHandler = (e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;

        setInfo({
            [inputName]: inputValue
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        const res = axios.post('/api/student/store',info);

        if (res.data === 200){

            console.log(res.data)

            setInfo({
                name: '',
                age: '',
                class: ''
            })

        }else {

        }

    }


    const [students,setStudents] = useState({
        infos: []
    });
    
    const getStudents = ()=>{
          axios.get('/api/student').then((response)=>{
            let studentsData = response.data.students;
            setStudents({
                infos: studentsData
            });

        }).catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        getStudents();
    },[]);


    const studentData = students.infos.map((student)=>{
        return <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.class }</td>
            <td>
                <button className="btn btn-success btn-sm ms">Edit</button>
                <button  className="btn btn-danger btn-sm ms-2">Delete</button>
            </td>
        </tr>
    });

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
                    {studentData}
                    </tbody>
                </table>

            </div>


        {/*  ========Modal ========*/}

            <div className="modal fade" id="addInfo" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Student</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={submitHandler}  method="post">
                                <div className="row">

                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input type="text" name="name" onChange={onChangeHandler} value={info.name}  id="name" className="form-control" placeholder="Your Name"/>
                                            {/*<span className="text-danger">{this.state.error_list.name}</span>*/}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input type="text" name="age" id="age" onChange={onChangeHandler} value={info.age}  className="form-control" placeholder="Your Age"/>
                                            {/*<span className="text-danger">{this.state.error_list.age}</span>*/}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group mb-3">
                                            <input type="text" name="class" id="class" onChange={onChangeHandler} value={info.class}  className="form-control" placeholder="Your Class"/>
                                            {/*<span className="text-danger">{this.state.error_list.class}</span>*/}
                                        </div>
                                    </div>

                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger btn-sm"
                                            data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="submit"
                                            className="btn btn-success btn-sm">Save
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
};

export default AllData;
