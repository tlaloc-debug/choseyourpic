import React, {useState, useEffect} from "react";
import reactDOM, { render } from "react-dom";
import axios from "axios";
import { useTable } from 'react-table';
import "./index.css";
import micro from "./microcontroller.jpeg";
import { useMediaQuery } from 'react-responsive';


function Shop () {

    const matches = useMediaQuery({query: '(min-width:600px)'});

    const initialCart = JSON.parse(localStorage.getItem("cart")) || [""];
    const [List, setList]= useState([]);
    const [i,seti] = useState(0);
    const pages = [1,2,3,4,5,6,7];
    const [cart, setcart] = useState (initialCart);
    const [show, setshow] = useState (false);
    const [x, setx]= useState (1);
    const [index,setindex] = useState (cart[0]=="" ? cart.length-1 : cart.length);
    const [amount,setamount] = useState (0);
    const [allproducts, setallproducts] = useState(true);
    const [picSearch, setpicSearch] = useState("");

    const [showcheckout, setshowcheckout] = useState (false);
    const [showalert, setshowalert] = useState (false);
    const [finish, setfinish] = useState (false);

    const searchPic = () => {
        axios.post("https://connectto.herokuapp.com/searchpicname", {picName: picSearch}).then((response1)=>{
            console.log(response1)
            if (response1.data=="done"){
                axios.get("https://connectto.herokuapp.com/searchpic").then((response2)=>{
                        setList(response2.data);
                    }) 
            }})
        }
         
   

    const view = () => {
        axios.get("https://connectto.herokuapp.com/shopall").then((response) => {
            setList(response.data)
        }); 
    }

    const previouspage = () => {
        seti(i-25);
    }

    const nextpage = () => {
        seti(i+25);
    }

    const pagination = (number) => {
        seti((number-1)*25)
    }

    const addcart = (item, price) => {
        let myObj={id: index, article: item, quantity: x, price: price, total: price}
        cart[index]=(myObj);
        console.log(cart);
        setindex(index+1);
        cart.map((dato)=>{
            setamount(amount+dato.total);
        })
    }

    const seecart = () => {
        setshow(!show);
        setcart(cart);
    }

    const less = (minus) =>{
        let counting=0;
        cart[minus].quantity = cart[minus].quantity-1;
        cart[minus].total = cart[minus].quantity * cart[minus].price;
        setcart(cart);

        cart.map((dato)=>{
            counting = counting+dato.total;
        })

        setamount(counting);     
          
    }

    const more = (plus) =>{
        let counting=0;
        cart[plus].quantity = cart[plus].quantity+1;
        cart[plus].total = cart[plus].quantity * cart[plus].price;
        setcart(cart);
        
        cart.map((dato)=>{
            counting = counting+dato.total;
        })

        setamount(counting);       
    }

    const delitem = (position) => {
        cart.splice(position, 1);
        cart.map((dato, numero)=>{
            numero *= 1;
            dato.id=numero;
            
        })
        setcart(cart);
        let counting=0; 
        cart.map((dato)=>{
            counting = counting+dato.total;
        })
        
        setamount(counting);  
        setindex(cart.length);   
    }

    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [amount],);

    const checkout = () => {
        if ((cart[0]=="") || cart.length==0){
            alert("Your cart is empty, please select some products before you ckeckout")
        } else {
            setshow(false);
            const user = JSON.parse(localStorage.getItem("savesesion"));
            if (user.usersave) {
                setallproducts(false);
                setshowcheckout(true);
            } else {
                setshowalert(true);
            }
        }
    }

    const gotoTop = () => {
        window.scrollTo(0, 0)
        setshowalert(false);
    }

    const guest = () => {
        setallproducts(false);
        setshowcheckout(true);
        setshowalert(false);
    }

    const order = () => {
        setfinish(true)
    }

    const gohome = () => {
        window.location.reload();  
    }
 
    return (
        <div>
            <div className={"header"}>
                <div style={{width: "85%"}}>
                <div className={allproducts ? "in" : "out"}>
                    <input  type="text" onChange={(ev)=>{setpicSearch(ev.target.value)}} />
                    <button onClick={searchPic} >search</button><br/><br/>
                    <button onClick={view}>All Products</button>
                    <div style={{position: "relative"}}>
                        <button onClick={seecart}>See cart</button>
                        <div className={show ? "showon" : "showoff"} style={{position: "absolute", backgroundColor: "white", padding: "30px 30px", boxShadow: "5px 10px 18px #888888"}}>
                            {cart.map((items)=>{
                                return (
                                    <div >
                                        <div className={"header"} style={{padding: "10px 10px"}}>
                                            <div style={{padding: "0px 10px"}}>{items.article}</div>
                                            <div>{items.quantity}</div>
                                        </div>
                                        <div className={"header"} style={{padding: "10px 10px"}}>
                                            <button id={items.id} onClick={(ev) => less(ev.target.id)} className={"push"}>↓</button>
                                            <button id={items.id} onClick={(ev) => more(ev.target.id)} className={"push"}>↑</button>
                                            <div style={{padding: "0px 10px"}}>$ {items.price}</div>
                                            <div style={{padding: "0px 10px"}}>$ {items.total}</div>
                                            <button id={items.id} onClick={(ev) => delitem(ev.target.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })} 
                            <div style={{display: "flex", justifyContent: "space-around", padding: "10px 0px"}}>
                                <label>Total Amount:</label>
                                <div>$ {amount}</div>   
                            </div>
                            <button onClick={checkout}>Check out</button>
                        </div>
                    </div>
                   

                   
                    <div className={matches ? "gallery" : ""}>
                        {List.slice(i,i+5).map((micros, key) => {
                        return (
                            <div style={{padding: "20px 0px"}}> 
                                <div className={matches ? "header" : "picImaCell"}><img src={micro} alt="" className={"micro"}/></div>
                                <div className={matches ? "header" : "picImaDesCell"}>
                                    <div >
                                        <div className={"galleryelement"}>{micros.productshop}</div><br/>
                                        <div className={"galleryelement"}>$ {micros.price}</div><br/>
                                        <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div><br/>  
                                    </div>  
                                </div>
                                <div className={"buttonCenter"}>
                                    <div className={"buttonGallery"}>
                                        <button id={micros.productshop}>Buy</button>
                                        <button id={micros.productshop} onClick={(ev) => addcart(ev.target.id, micros.price)}>Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={matches ? "gallery" : ""}>
                        {List.slice(i+5,i+10).map((micros, key) => {
                        return (
                            <div style={{padding: "20px 0px"}}> 
                                <div className={matches ? "header" : "picImaCell"}><img src={micro} alt="" className={"micro"}/></div>
                                <div className={matches ? "header" : "picImaDesCell"}>
                                    <div >
                                        <div className={"galleryelement"}>{micros.productshop}</div><br/>
                                        <div className={"galleryelement"}>$ {micros.price}</div><br/>
                                        <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div><br/>  
                                    </div>  
                                </div>
                                <div className={"buttonCenter"}>
                                    <div className={"buttonGallery"}>
                                        <button id={micros.productshop}>Buy</button>
                                        <button id={micros.productshop} onClick={(ev) => addcart(ev.target.id, micros.price)}>Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={matches ? "gallery" : ""}>
                        {List.slice(i+10,i+15).map((micros, key) => {
                        return (
                            <div style={{padding: "20px 0px"}}> 
                                <div className={matches ? "header" : "picImaCell"}><img src={micro} alt="" className={"micro"}/></div>
                                <div className={matches ? "header" : "picImaDesCell"}>
                                    <div >
                                        <div className={"galleryelement"}>{micros.productshop}</div><br/>
                                        <div className={"galleryelement"}>$ {micros.price}</div><br/>
                                        <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div><br/>  
                                    </div>  
                                </div>
                                <div className={"buttonCenter"}>
                                    <div className={"buttonGallery"}>
                                        <button id={micros.productshop}>Buy</button>
                                        <button id={micros.productshop} onClick={(ev) => addcart(ev.target.id, micros.price)}>Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={matches ? "gallery" : ""}>
                        {List.slice(i+15,i+20).map((micros, key) => {
                        return (
                            <div style={{padding: "20px 0px"}}> 
                                <div className={matches ? "header" : "picImaCell"}><img src={micro} alt="" className={"micro"}/></div>
                                <div className={matches ? "header" : "picImaDesCell"}>
                                    <div >
                                        <div className={"galleryelement"}>{micros.productshop}</div><br/>
                                        <div className={"galleryelement"}>$ {micros.price}</div><br/>
                                        <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div><br/>  
                                    </div>  
                                </div>
                                <div className={"buttonCenter"}>
                                    <div className={"buttonGallery"}>
                                        <button id={micros.productshop}>Buy</button>
                                        <button id={micros.productshop} onClick={(ev) => addcart(ev.target.id, micros.price)}>Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>

                    <div className={matches ? "gallery" : ""}>
                        {List.slice(i+20,i+25).map((micros, key) => {
                        return (
                            <div style={{padding: "20px 0px"}}> 
                                <div className={matches ? "header" : "picImaCell"}><img src={micro} alt="" className={"micro"}/></div>
                                <div className={matches ? "header" : "picImaDesCell"}>
                                    <div >
                                        <div className={"galleryelement"}>{micros.productshop}</div><br/>
                                        <div className={"galleryelement"}>$ {micros.price}</div><br/>
                                        <div className={"galleryelement"}>{micros.quantity >0 ? "available" : "not available"}</div><br/>  
                                    </div>  
                                </div>
                                <div className={"buttonCenter"}>
                                    <div className={"buttonGallery"}>
                                        <button id={micros.productshop}>Buy</button>
                                        <button id={micros.productshop} onClick={(ev) => addcart(ev.target.id, micros.price)}>Cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                        })} 
                    </div>
                    
                    <div className={List.length>25 ? "pagination" : "out"}>
                        <button onClick={previouspage}> previous page</button>
                        {pages.slice(0, (Math.trunc((List.length)/25))+1).map((page) => {
                            return <button id={page} onClick={(ev) => pagination(ev.target.id)} style={{padding: "0px 10px"}}>{page}</button>
                        })}
                        <button onClick={nextpage}>next page</button>
                    </div>
                </div>


                <div className={showalert ? "alerton" : "alertoff"} style={{backgroundColor: "white", padding: "30px 30px", boxShadow: "5px 10px 18px #888888"}}>
                    <h2>Seems like you havent Log in</h2>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div><button onClick={guest}>Continue as guest</button></div>
                        <div >
                            <button onClick={gotoTop}>Log in</button><br/>
                            <button onClick={gotoTop}>Register</button>  
                        </div>
                    </div>    
                </div>
                    
                <div className={showcheckout ? "checkoutformon" : "checkoutformoff"}>

                    
                    <div style={{ display: "flex", justifyContent: "space-around"}}>
                        <div >
                            <h3>Shopping Address</h3>
                            <label htmlFor="">Full Name</label><br/>
                            <input type="text"/><br/><br/>
                            <label htmlFor="">Email</label><br/>
                            <input type="text"/><br/><br/>
                            <label htmlFor="">Address</label><br/>
                            <input type="text"/><br/><br/>
                            <label htmlFor="">City</label><br/>
                            <input type="text"/><br/><br/>
                            <label htmlFor="">State</label><br/>
                            <input type="text"/><br/><br/>
                            <label htmlFor="">Zip Code</label><br/>
                            <input type="text"/><br/>
                        </div>

                        <div style={{position: "relative"}}>
                            <h3>Paying Method</h3><br/><br/>
                            <label htmlFor="">Name on Card</label><br/>
                            <input type="text"/><br/><br/><br/>
                            <label htmlFor="">Credit Card Number</label><br/>
                            <input type="text"/><br/><br/><br/>
                            <label htmlFor="">Expiration</label><br/>
                            <input type="text" style={{position: "absolute", width: "50%"}}/>
                            <input type="text"/><br/><br/><br/>
                            <label htmlFor="">CVV</label><br/>
                            <input type="text"/><br/>
                        
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "center", padding: "50px 0px"}}>
                        <button onClick={order}>Place Order</button>
                    </div>
                </div>

                <div className={finish ? "finishon" : "finishoff"} style={{backgroundColor: "white", padding: "30px 30px", boxShadow: "5px 10px 18px #888888"}}>
                    <h2>Your order has been placed successfully</h2>
                    <h3>We hope to see you back soon!</h3>
                    <button onClick={gohome}>Home</button>
                </div>

                </div>
            </div>
        </div>
        
    );
}

export default Shop;