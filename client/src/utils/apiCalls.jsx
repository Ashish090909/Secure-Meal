import React from 'react'
import axios from 'axios'

export const getAPIcalls = async (mid, email) =>{
      const baseURL = import.meta.env.VITE_API_URL
      const url = baseURL+mid+email ;
      const response = await axios.get(url) ;
      return response ;
  }

  export const postAPIcalls = async (mid, email, credentials) =>{
    const baseURL = import.meta.env.VITE_API_URL
    const url = baseURL+mid+email ;
    const response = await axios.post(url, credentials) ;
    return response ;
  }


