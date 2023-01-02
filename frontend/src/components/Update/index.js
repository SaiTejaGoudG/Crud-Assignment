import React , {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert'
import './index.css'

const Update = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        address: '',
        showError: false,
    })
    const {firstName,lastName,phoneNo,email,address,showError} = {...data}

    const [isLoading,setIsLoading] = useState(false)

    const onChangeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
    }
    useEffect(()=>{
        if(id){
            setIsLoading(true)
            axios.get('http://localhost:4000/students/'+id).then((res)=>{
                data.firstName=res.data[0].first_name;
                data.lastName=res.data[0].last_name;
                data.phoneNo=res.data[0].contact;
                data.email=res.data[0].email;
                data.address=res.data[0].address;
                setIsLoading(false)
        }).catch(err=>{
            console.log(err)
        })
        }
    // eslint-disable-next-line
    },[id])
    const onSubmitHandler = (event) => {    
        event.preventDefault();
        
        if (phoneNo.length !== 10) {
            swal({
                text:"contact must be 10 digits",
                icon:'warning'
            })
        } else if (email.slice(-10) !== ("@gmail.com")) {
            swal({
                text:"Please enter a Valid Email",
                icon:'warning'
            })
        }else{
            axios.patch(`http://localhost:4000/students/${id}`,{
                firstName,
                lastName,
                phoneNo,
                email,
                address
            }).then(res=>{
                swal({
                    title: "Student details updated!",
                    text:"Student details updated successfully",
                    icon:'success',
                    button:'Ok'
                }).then(()=>{
                    navigate('/Home')
                })
            }).catch(err=>{
                swal({
                    title: "Already Exists",
                    text: "Enter Another Contact Or Email!",
                    icon:'error'
                })
            })
        }

        
    }

    return (
        <>
        {
            !isLoading && <div className='bgUpdate-container'>
            <h1 className='home-heading'>Enter Details</h1>
            <form className='form-container' onSubmit={onSubmitHandler}>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='firstName'>FirstName</label>
                    <input
                    className='register-inputs'
                    id='firstName'
                    value={firstName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                {showError === true ? ( <p className="errMsg">Required*</p> ) : null}
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>LastName</label>
                    <input
                    className='register-inputs'
                    id='lastName'
                    value={lastName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                {showError === true ? ( <p className="errMsg">Required*</p> ) : null}
                <div className='label-container'>
                    <label className='label-elements' htmlFor='phoneNo'>Contact</label>
                    <input
                    className='register-inputs'
                    id='phoneNo'
                    value={phoneNo}
                    onChange={onChangeHandler}
                    type="number"
                    required
                    />
                </div>
                {showError === true ? ( <p className="errMsg">Contact must be 10 digits*</p> ) : null}
                <div className='label-container'>
                    <label className='label-elements' htmlFor='email'>Email</label>
                    <input
                    className='register-inputs'
                    id='email'
                    value={email}
                    onChange={onChangeHandler}
                    type="email"
                    required
                    />
                </div>
                {showError === true ? ( <p className="errMsg">*Enter Valid Email</p> ) : null}
                <div className='label-container'>
                    <label className='label-elements' htmlFor='address'>Address</label>
                    <input
                    className='register-inputs'
                    id='address'
                    value={address}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                {showError === true ? ( <p className="errMsg">Required*</p> ) : null}
                <div className='btn-container'>
                    <button className='home-button'>Save</button>
                </div>
            </form>
        </div>
        }
        
        </>
    )

}

export default Update 
