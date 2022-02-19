import React, {Fragment,useState,useEffect} from 'react';
// import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'



const AllData = () => {


    //modal
    const [modalShow, setModalShow] = useState(false);

    const handleClose = ()=>setModalShow(false)


    //changing inner text of add and edit button
    const [addNew,setAddNew] = useState(true)

    //add new student info
    const [info,setInfo] = useState({
        name: '',
        age: '',
        class: '',
        id: ''
    })

    //validation error
    const [error,setError] = useState({
        error_list: []
    })

    //click on add student button
    const addStudent = ()=>{
        setModalShow(true)
        setAddNew(true)
        setInfo({
            name: '',
            age: '',
            class: '',
            id: ''
        })
        setError({
            error_list: []
        });
    }


    //handle input value
    const onChangeHandler = (e)=>{
        let inputName = e.target.name;
        let inputValue = e.target.value;

        setInfo(prev=>({...prev,[inputName]: inputValue}))
    }




    //add form data


    const saveStudent = async (e)=>{
        e.preventDefault();

        const res = await axios.post('/api/student/store',info);

        if (res.data.status === 200){

            getStudents();

            setModalShow(false)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            await Toast.fire( {
                icon: 'success',
                title: 'Student Info Added successfully'
            })


            setInfo({
                name: '',
                age: '',
                class: '',
                id: ''
            })
            setError({
                error_list: []
            });


            // let history = useHistory();
            // history.push('/');

        }else {

            setError({
                error_list: res.data.validation_error
            });

        }


    }

    //set data from fetched student info
    const [students,setStudents] = useState({
        infos: []
    });

    //fetch all student info
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

    //clear form
    const closBtnHandler = ()=>{

        setModalShow(false)
        setInfo({
            name: '',
            age: '',
            class: '',
            id: ''
        })
        setError({
            error_list: []
        });

    }



    //call the get info function when app is mounted
    useEffect(()=>{
        getStudents();
    },[]);



    //edit student info
    const editStudent = (student)=>{
        setModalShow(true)
        setAddNew(false);

        setInfo({
            name: student.name,
            age: student.age,
            class: student.class,
            id: student.id
        })
        setError({
            error_list: []
        });
    }

    //update student
    const updateStudent = async (e)=>{

        e.preventDefault();

        const res = await axios.put('/api/student/update/'+ info.id,info);

        if (res.data.status === 200){

            getStudents();
            setModalShow(false)

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            await Toast.fire( {
                icon: 'success',
                title: 'Student Info Updated successfully'
            })


            setInfo({
                name: '',
                age: '',
                class: '',
                id: ''
            })
            setError({
                error_list: []
            });

        }else {

            setError({
                error_list: res.data.validation_error
            });

        }

    }

    //delete student
    const deleteStudent = async (e,id)=>{

        const currenTargetButton = e.currentTarget;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete('/api/student/delete/'+id).then((response)=>{

                    currenTargetButton.closest('tr').remove();

                }).catch((error)=>{
                    console.log(error);
                })

                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Student Info Deleted Successfully.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe )',
                    'error'
                )
            }
        })

    }

    //looping the fetched students info
    const studentData = students.infos.map((student)=>{
        return <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.age}</td>
            <td>{student.class }</td>
            <td>
                <button onClick={(e)=>editStudent(student,e)} className="btn btn-success btn-sm ms">Edit</button>
                <button onClick={(e)=>deleteStudent(e,student.id)}  className="btn btn-danger btn-sm ms-2">Delete</button>
            </td>
        </tr>
    });

    return (
        <Fragment>

            <div className="col-8">
                <div className="clearfix mb-3">
                    <h4 className="float-start">Students Information</h4>

                    <button onClick={addStudent} className="float-end btn btn-sm btn-success">Add new</button>

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

            <Modal show={modalShow} onHide={handleClose} centered>

                <Modal.Header closeButton>
                    <Modal.Title>{addNew === true ? 'Add New Student': 'Edit Student'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <form method="post">
                        <div className="row">

                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <input type="text" name="name" onChange={onChangeHandler} value={info.name}  id="name" className="form-control" placeholder="Your Name"/>
                                    <span className="text-danger">{error.error_list.name}</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <input type="text" name="age" id="age" onChange={onChangeHandler} value={info.age}  className="form-control" placeholder="Your Age"/>
                                    <span className="text-danger">{error.error_list.age}</span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <input type="text" name="class" id="class" onChange={onChangeHandler} value={info.class}  className="form-control" placeholder="Your Class"/>
                                    <span className="text-danger">{error.error_list.class}</span>
                                </div>
                            </div>

                        </div>

                        <Modal.Footer>
                            <button type="button" className="btn btn-danger btn-sm" onClick={closBtnHandler}>Close</button>
                            {addNew === true? (
                                <button type="submit" onClick={saveStudent} className="btn btn-success btn-sm">
                                    Save
                                </button>
                            ) : (
                                <button type="submit" onClick={updateStudent} className="btn btn-success btn-sm">
                                   Update
                                </button>
                            )}

                        </Modal.Footer>

                    </form>
                </Modal.Body>


            </Modal>

        </Fragment>
    );
};

export default AllData;
