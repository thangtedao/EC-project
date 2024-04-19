// import React from 'react'

import { useParams } from "react-router-dom"
import Search from "../components/Search"

import { HelmetProvider } from 'react-helmet-async'
// import styled from "styled-components";


const SearchPage = ({match}) => {
    // const keyword = match.params.keyword;
    const {keyword} = useParams()
  return (

    <HelmetProvider>
        <Search keyword={keyword}/>

    </HelmetProvider>

  )
}

export default SearchPage