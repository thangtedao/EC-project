// import React from 'react'

import { useEffect, useState } from "react"
import styled from "styled-components"
import customFetch from "../utils/customFetch"
import ProductCard from "./ProductCard"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;
`
const Search = (props) => {
    const {keyword} = props
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await customFetch.get(`/product/searchproducts/?name=${keyword}`);
          setProducts(response.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      if (keyword) {
        fetchData();
      }
    }, [keyword]);
  return (
    <Wrapper>
        { products && products.length > 0 ?(
            products.map((product)=>{
                return <ProductCard key={product._id} product={product} />;
            })):(<h2>Không tìm thấy sản phẩm</h2>)
        }
        

    </Wrapper>
  )
}

export default Search