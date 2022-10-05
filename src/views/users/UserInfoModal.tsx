import React from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { removeActiveUser, selectActiveUser } from '../../redux/users/usersSlice'
import styles from './Users.module.css'

const UsersInfoModal = () => {
  const dispatch = useAppDispatch()
  const activeUser = useAppSelector(selectActiveUser)

  if(!activeUser) return null;

  const closeHandler = () => {
    dispatch(removeActiveUser())
    document.body.classList.remove("no-scroll")
  }
  const { address , company } = activeUser

  return (
    <div className={`${styles.userInfoModal} modal fade show`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-modal="true" role="dialog"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">User Info</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeHandler} />
          </div>
          <div className={`${styles.userInfoModalBody} modal-body`}>
            <h2>User address</h2>
            <p>Street: {address.street}</p>
            <p>Suite: {address.suite}</p>
            <p>City: {address.city}</p>
            <p>Zip code: {address.zipcode}</p>
            <h2>Company</h2>
            <p>Street: {company.name}</p>
            <p>About: {company.catchPhrase}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersInfoModal
