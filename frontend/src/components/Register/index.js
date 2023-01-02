import axios from 'axios'
import React , {useState} from 'react'
import swal from 'sweetalert'
import { useNavigate } from "react-router-dom";
import './index.css'

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        address: '',
    })


    const onChangeHandler = (event) => {
        setData({...data, [event.target.id]: event.target.value})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();


        if(phoneNo.length!==10){
            swal({
                text:"contact must be 10 digits",
                icon:'warning',
            })
        } else if (email.slice(-10) !== ("@gmail.com")) {
            swal({
                text:"please enter a valid email",
                icon:'warning'
            })
        } else{
            axios.post('http://localhost:4000/student/register',{
            firstName,
            lastName,
            phoneNo,
            email,
            address
        }).then(res=>{
            swal({
                title: "Student Added!",
                text:"Student registered successfully",
                icon:'success',
                button:'Goto Home'
            }).then(()=>{
                navigate('/Home')
            })
        }).catch(err=>{
            swal({
                text: "Something went wrong!",
                icon:'error'
            })
        })
        }
    }

    const {firstName,lastName,phoneNo,email,address} = {...data}
    return (
        <>
        <div className='bgHome-container'>
            <h1 className='home-heading'>Enter Details</h1>
            <form className='form-container' onSubmit={onSubmitHandler}>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='firstName'>First  Name</label>
                    <input
                    className='register-inputs'
                    id='firstName'
                    value={firstName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='lastName'>Last  Name</label>
                    <input
                    className='register-inputs'
                    id='lastName'
                    value={lastName}
                    onChange={onChangeHandler}
                    type="text"
                    required
                    />
                </div>
                <div className='label-container'>
                    <label className='label-elements' htmlFor='phoneNo'>Contact</label>
                    <input
                    className='register-inputs'
                    id='phoneNo'
                    value={phoneNo}
                    onChange={onChangeHandler}
                    type="number"
                    maxLength={10}
                    required
                    />
                </div>
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
                <div className='btn-container'>
                    <button className='home-button'>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register 
