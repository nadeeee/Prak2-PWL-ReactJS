import React, { useState, useEffect } from "react";
import axios from 'axios'
import { contact, } from '../../portfolio'
import useStyles from "./contact.jsx";
import './Contact.css'


const Contact = () => {

  const classes = useStyles();
  const [dataUser, setDataUser] = useState({
		name: "",
		email: "",
		comment: ""
	})

  
  const [countComment, setCountComment] = useState()


  const [users, setUsers] = useState([])

 
  const getUsers = async () => {
      const response = await axios.get(
          "https://server-auriga.herokuapp.com/api/komentars"
      )
      console.log(response.data)
      setCountComment(response.data.length)
      setUsers(response.data)
      console.log(countComment)
  }

  const postComment = async (e) => {
      e.preventDefault()
      try{
    if (dataUser.name.length === 0) dataUser.name = "Anonymous"

          const response = await axios.post(
              "https://server-auriga.herokuapp.com/api/komentars",
              dataUser
          )   
          console.log(response.data)
    window.location.reload()
      }catch(err){
          console.log(err)
      }
  }

  useEffect(() => {
      getUsers()
  }, [])
  
  return (
    
      <div className={classes.main}>
          <div className={classes.boxComment}>
             <h4>Leave a Comment</h4>
      <form onSubmit={postComment} className={classes.form}>
        <input
          className={classes.input}
          type="text"
          placeholder="Name (Optional)"
          value={dataUser.name}
          onChange={(e) => {
            setDataUser({ ...dataUser, name: e.target.value })
          }}
        />
        <input
          className={classes.input}
          type="email"
          placeholder="Email"
          value={dataUser.email}
          onChange={(e) => {
            setDataUser({ ...dataUser, email: e.target.value })
          }}
          required
        />
        <textarea
          className={classes.textarea}
          placeholder="Message"
          value={dataUser.comment}
          onChange={(e) => {
            setDataUser({
              ...dataUser,
              comment: e.target.value,
            })
          }}
          required
        />
        <button type="submit" className='btn btn--outline'>
          Send
        </button>
      </form>
      <div className={classes.commentarea}>
          <h4 className={classes.jumlah}>{countComment} Comments</h4>
          {users.map((user) => (
            <div className={classes.comment}>
              <div className={classes.commentUser}>
                <div className={classes.userInfo}>
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
              <p>{user.comment}</p>
            </div>
          ))}
        </div>
   </div>
   </div>
  
  )
   
  // )
}

export default Contact
