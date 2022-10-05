import React, { useEffect, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  fetchUsers,
  selectHidedUsers,
  selectSearchQuery,
  selectUsers, selectUsersLoadingStatus
} from '../../redux/users/usersSlice'
import UsersElement from './UserElement'
import styles from './Users.module.css'
import Control from './Control'
import UsersInfoModal from './UserInfoModal'
import { LoadingStatuses } from '../../redux/users/types'

const UsersView = () => {
  const dispatch = useAppDispatch()
  const usersList = useAppSelector(selectUsers)
  const hidedUsers = useAppSelector(selectHidedUsers)
  const usersLoadingStatus = useAppSelector(selectUsersLoadingStatus)
  const searchQuery = useAppSelector(selectSearchQuery).trim().toLowerCase()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => !hidedUsers.includes(user.id) && (searchQuery === '' ||
      [user.name, user.username, user.email].some((text) => text.toLowerCase().includes(searchQuery))
    ))
  }, [usersList, hidedUsers, searchQuery])

  return (
    <main className={styles.usersMain}>
      <Control/>
      {usersLoadingStatus === LoadingStatuses.loaded && (filteredUsers.length
        ? (
          <ul className={styles.usersList}>
            {filteredUsers.map(user => <UsersElement key={user.id} user={user}/>)}
          </ul>
        )
        : <h1 className={styles.noUsersLabel}>No users to show</h1>
      )}
      {usersLoadingStatus === LoadingStatuses.loading && <h1 className={styles.noUsersLabel}>Loading...</h1>}
      {usersLoadingStatus === LoadingStatuses.error && <h1 className={styles.noUsersLabel}>Something went wrong</h1>}
      <UsersInfoModal />
    </main>
  )
}

export default UsersView
