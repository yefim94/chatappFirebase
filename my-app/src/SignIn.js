import React, {useState} from 'react'
import {signIn} from "./firebase-config"
const SignIn = () => {
  return (
    <div style={{
      backgroundColor: "#fff",
      padding: "5em",
      borderRadius: "13px"
    }}>
      <p style={{
        color: "#000",
        fontWeight: "700",
        fontSize: "2rem"
      }}>Sign in to use app</p>
      <div class="google-btn" onClick={signIn}>
      <div class="google-icon-wrapper">
        <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
      </div>
      <p class="btn-text"><b>Sign in with google</b></p>
    </div>
    </div>
  )
}

export default SignIn
