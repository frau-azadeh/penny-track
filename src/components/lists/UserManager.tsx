import React from 'react'
import { Button, Modal } from '../ui'
import { UserForm } from '../forms'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/featcher/userSlice'
import { useState} from 'react'
import type {UserFormValues} from "../forms/UserForm"

const UserManager:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = ()=> setIsOpen(true);
  const handleClose = ()=> setIsOpen(false);

  const handleSubmit =(data: UserFormValues) =>{
    dispatch(addUser(data));
    handleClose();
  }

  return (
    <div>
      <div>
        <h2 className='text-xl font-bold'>User Manager</h2>
        <Button variant='primary' onClick={handleOpen}>
          ثبت کاربر
        </Button>
        <Modal isOpen= {isOpen} onClose={handleClose}>
          <UserForm onSubmit={handleSubmit}/>
        </Modal>
      </div>
    </div>
  )
}

export default UserManager