import React, {useState} from "react";
import { useMediaQuery } from 'react-responsive';


function Products() {

  const matches = useMediaQuery({query: '(min-width:600px)'});

  return (
    <div>
      <div className={"header"}>
        <div className={matches ? "spaceproductspc" : "spaceproductscell"}>
          <object type="text/html" data="https://loscoversdeltlaloc.000webhostapp.com/" width="100%" height="600px" ></object>
        </div>
      </div>
    </div>
  )
}

export default Products;