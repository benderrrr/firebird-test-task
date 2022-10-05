import React from 'react'

import styles from './Users.module.css'
import { useAppDispatch } from "../../redux/hooks"
import { IUser } from '../../redux/users/types';
import { hideUser, setActiveUser } from '../../redux/users/usersSlice'
import HighlightedText from '../../components/HighlightedText'

const UsersElement: React.FC<{ user: IUser }> = ({ user}) => {
  const dispatch = useAppDispatch();
  const removeHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dispatch(hideUser(user.id))
  }
  const setActiveUserHandle = () => {
    document.body.classList.add("no-scroll")
    dispatch(setActiveUser(user))
  }

  return (
    <li className={styles.userElement} onClick={setActiveUserHandle}>
      <p>Name: <HighlightedText text={user.name} /></p>
      <p>User name:  <HighlightedText text={user.username} /></p>
      <p>Email:  <HighlightedText text={user.email} /></p>
      <button
        onClick={removeHandle}
        className={`${styles.userRemoveButton} btn btn-sm btn-warning`}
      >
        Remove
      </button>
    </li>
  )
}

export default UsersElement
