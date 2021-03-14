import React, {useState} from "react";
import ReactDOM from "react-dom";
import Products from "./products.js";
import Description from "./description.js";
import Shop from "./shop.js";
import Checkout from "./checkout.js";
import logo from "./screenshot.png";
import chip from "./chip.png";
import manual from "./manual.png";
import cart from "./cart.png";
import Axios from "axios";
import avatar1 from "./avatar1.jpeg";
import avatar2 from "./avatar2.jpeg";
import avatar3 from "./avatar3.jpeg";
import avatar4 from "./avatar4.jpeg";
import { useMediaQuery } from 'react-responsive';

function App() {

    const matches = useMediaQuery({query: '(min-width:600px)'});

    const initialsesionsave = JSON.parse(localStorage.getItem("savesesion")) || [""];

    
    const [technical, settechnical] = useState(false);
    const [concept, setconcept] = useState(matches ? true : false);
    const [shop, setshop] = useState(false);
    const [checkout, setcheckout] = useState(false);


    const bcrypt = require('bcryptjs');
    

    const technicalclick = () => {
        settechnical(true);
        setconcept(false);
        setshop(false);
    }

    const conceptclick = () => {
        settechnical(false);
        setconcept(true);
        setshop(false);
    }

    const shopclick = () => {
        settechnical(false);
        setconcept(false);
        setshop(true);
    }

    const [userNameReg, setuserNameReg] = useState ("");
    const [passReg, setpassReg] = useState ("");
    const [passReghash, setpassReghash] = useState("");
    const [responseReg, setresponseReg] = useState("null");

    const [userName, setuserName] = useState ("");
    const [pass, setpass] = useState ("");
    const [responseLog, setresponseLog] = useState("");
    
    const [text, settext]= useState("");

    const [user, setuser] = useState (initialsesionsave.usersave || "");
    const [sesion, setsesion] = useState (initialsesionsave.sesionsave || false);
    const [inputs, setinputs] = useState (initialsesionsave.inputssesion || false);
    const [inputsReg, setinputsReg] = useState (false);
    const [image, setimage] = useState ("");
    const [imageRes, setimageRes] = useState (initialsesionsave.imagensesion || "");
    const [menulogout, setmenulogout] = useState (false);
    const cuadro = ["", avatar1, avatar2, avatar3, avatar4];

    const login = () => {
        Axios.post("https://connectto.herokuapp.com/loginname", {username: userName}).then((response1)=> {
            if (response1.data=="done"){
                Axios.get("https://connectto.herokuapp.com/login").then((response2)=>{
                    if (response2.data.length>0){
                        let hash=response2.data[0].password;
                        bcrypt.compare(pass, hash, function(err, res) {
                        if (res==true){
                            setuser(userName);
                            setsesion(true);
                            setinputs(false); 
                            setimageRes(response2.data[0].avatar);                   
                            let myObj={usersave: userName, sesionsave: true, inputssesion: false, imagensesion: response2.data[0].avatar};
                            localStorage.setItem("savesesion", JSON.stringify(myObj));
                            setresponseLog("Welcome back!")
                            } else {
                                setresponseLog("Wrong password")
                                }  
                        })
                    }
                })
            }
        })
    }
              
                    
    const register = () => {
        if (userNameReg===""){
            alert("no")
        } else {
            bcrypt.hash(passReg, 10, function(err, hash) {
                Axios.post("https://connectto.herokuapp.com/register", {username: userNameReg, password: hash, avatar: image}).then((response)=>setresponseReg(response.data));
            
            }); 
        }
    }

    const IsRegister = () => {
        if (responseReg.rowCount==1){
            setinputsReg(false);
            return <div><p>You have successfully registered.</p></div>
        } else {
            if (responseReg.code=="23505") {
                return <div><p>Seems like somebody already have this username.</p></div>
            } else {
                return null;
            } 
        }
    }

    const IsLogin = () => {
        return <div>{responseLog}</div>
    }
    

    const seeinputs = () => {
        setinputs(true);
    }

    const seeinputsReg = () => {
        setinputsReg(true);
    }

    const logout = () => {
        let myObj={usersave: "", sesionsave: false, inputssesion: false, imagensesion: ""}
        localStorage.setItem("savesesion", JSON.stringify(myObj));
        window.location.reload();  
    }

    const actioncancel = () => {
        setinputs(false);
        setinputsReg(false);
    }

    const showmenulogout = () => {
        setmenulogout(!menulogout);
    }

    return (
        <div>
            <div className={"header"} style={{position: "relative"}}>
            <img src={logo} className={matches ? "logopc" : "logocell"} alt="logo"/><br/><br/> 

                <div className={sesion ? "out" : "sesionon"}> 
                    <div className={matches ? "issessionpc" : "issessioncell"}>
                        <button onClick={seeinputs}>Log in</button>
                        <button onClick={seeinputsReg}>Register</button>
                    </div>
                </div>

                <div className={sesion ? "sesionon" : "out"}>
                    <div className={matches ? "welcomepc" : "welcomecell"}> 
                        <div >
                            <h3 className={matches ? "salutationpc" : "salutationcell"}>Welcome back!</h3> 
                            <img src={cuadro[imageRes]} alt="" style={{height: "30px"}} />
                            <div onClick={showmenulogout} style={{display: "inline-block"}}>
                                <h3 style={{display: "inline-block"}} >{user}</h3>
                                <div style={{position: "absolute"}}>
                                    <button className={menulogout ? "on" : "out"} onClick={logout}>Log out</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                    

                <div className={inputs ? "inputson" : "out"}>
                    <div className={matches ? "header" : ""}>
                        <div>
                            <label style={{display: "block", padding: "8px"}}>uername</label>
                            <div className={matches ? "on" : "out"}><label style={{display: "block", padding: "8px"}}>password</label></div>
                        </div>
                        <div>
                            <input  type="text" onChange={(ev)=>{setuserName(ev.target.value)}}/><br/>
                            <div className={matches ? "out" : "on"}><label style={{display: "block", padding: "8px"}}>password</label></div>
                            <input  type="password" onChange={(ev)=>{setpass(ev.target.value)}}/>
                            <br/><br/>
                            <button onClick={login}>Log in</button>
                            <button onClick={actioncancel}>Cancel</button>
                        </div>
                    </div>
                    <IsLogin />
                </div>

                <div className={inputsReg ? "inputsRegon" : "out"}>
                    <div className={matches ? "header" : ""}>
                        <div>
                            <label style={{display: "block", padding: "8px"}}>uername</label>
                            <div className={matches ? "on" : "out"}><label style={{display: "block", padding: "8px"}}>password</label></div>
                        </div>
                        <div>  
                            <input type="text" onChange={(ev)=>{setuserNameReg(ev.target.value)}}/><br/>
                            <div className={matches ? "out" : "on"}><label style={{display: "block", padding: "8px"}}>password</label></div>
                            <input type="password" onChange={(ev)=>{setpassReg(ev.target.value)}}/>
                            <br/><br/> 
                        </div> 
                    </div>   
                    <div className={"header"}><div>Chose your Avatar</div></div> 
                    <br/>
                    <div className={matches ? "header" : ""}>
                        <div className={"header"}>
                            <img className={"avatar"} src={avatar1}/>
                            <input type="radio" name="select" onChange={(event)=>(setimage(1))}/>
                        </div>
                        <div className={"header"}>
                            <img className={"avatar"} src={avatar2}/>
                            <input type="radio" name="select" onChange={(event)=>(setimage(2))}/>
                        </div>
                        <div className={"header"}>
                            <img className={"avatar"} src={avatar3}/>
                            <input type="radio" name="select" onChange={(event)=>(setimage(3))}/>
                        </div>
                        <div className={"header"}>
                            <img className={"avatar"} src={avatar4}/>
                            <input type="radio" name="select" onChange={(event)=>(setimage(4))}/>                       
                        </div>
                    </div>
                    <br/>
                    <div className={"header"}>
                        <button onClick={register}>Register</button><br/><br/>
                        <button onClick={actioncancel}>Cancel</button>
                    </div>
                    <IsRegister />
                </div>
                
            </div>

            <div className={"header"}>
                <div className={matches ? "maintextpc" : "maintextcell"}><p className={matches ? "textstylepc" : "textstylecell"}> choseyourpic.com is a site that allows you to select the correct microcontroller for your project by listing the specifications of almost all available microcontroller in the market.   </p ></div>
            </div>

            <div className={matches ? "header" : ""}>
                <div className={matches ? "mainmenupc" : "mainmenucell"} onClick={technicalclick}>
                    <div className={"header"}>
                        <div className={matches ? "bandpc" : "bandcell"} style={{backgroundColor: "#f68d2e"}}></div>
                    </div>

                    <div className={matches ? "clicimages" : "out"}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={chip} alt=""/>
                    </div>
                    
                    <div className={matches ? "clictitlepc" : "clictitlecell"}> Technical</div>
                    <div className={matches ? "clictextpc" : "clictextcell"}> Search for an specific Item or make an Advanced Search to find what Pic meets your criteria</div>
                </div>

                <div className={matches ? "mainmenupc" : "mainmenucell"} onClick={conceptclick}>
                    <div className={"header"}>
                        <div className={matches ? "bandpc" : "bandcell"} style={{backgroundColor: "#41b6e6"}}></div>
                    </div>

                    <div className={matches ? "clicimages" : "out"}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={manual} alt=""/>
                    </div>
                    
                    <div className={matches ? "clictitlepc" : "clictitlecell"}> Manual</div>
                    <div className={matches ? "clictextpc" : "clictextcell"}> Find a quick description about some terms like RAM, ADC, etc. </div>
                </div>
                
                <div className={matches ? "mainmenupc" : "mainmenucell"} onClick={shopclick}>
                    <div className={"header"}>
                        <div className={matches ? "bandpc" : "bandcell"} style={{backgroundColor: "#6cc24a"}}></div>
                    </div>

                    <div className={matches ? "clicimages" : "out"}>
                            <img style={{display: "block", margin: "auto", paddingTop: "30px"}} src={cart} alt=""/>
                    </div>
                    
                    <div className={matches ? "clictitlepc" : "clictitlecell"}> Shop</div>
                    <div className={matches ? "clictextpc" : "clictextcell"}> Check which items are currently available to order. </div>
                </div>
            </div>

            <div className={technical ? "on" : "out"}>
                <Products />
            </div>

            <div className={concept ? "on" : "out"}>
                <Description />
            </div>

            <div className={shop ? "on" : "out"}>
                <Shop />
            </div>

            <div className={checkout ? "on" : "out"}>
                <Checkout />
            </div>            

            <div className={"header"}>
                <div className={matches ? "footerpc" : "footercell"}>
                        <div className={matches ? "navpc" : "navcell"}>
                            Software
                        </div>
                        <div className={matches ? "navpc" : "navcell"}>
                            Contact
                        </div>
                        <div className={matches ? "navpc" : "navcell"}>
                            About Us
                        </div>
                        <div className={matches ? "navpc" : "navcell"} onClick={seeinputsReg}>
                            Register
                        </div>
                </div>
            </div>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));
