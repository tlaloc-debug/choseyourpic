import React, {useState} from "react";
import ReactDOM from "react-dom";
import blocks from './blocks.png';
import pic from "./pic.png";
import './index.css';
import ReactImageMagnify from 'react-image-magnify';
import lcd from "./lcd.png";

class Description extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            x: 0,
            y: 0,
            position: true,
            textvalueX: [20, 40, 70, 20, 40, 100, 100, 80, 80, 40, 20],
            textvalueY: [15, 18, 30, 40, 40, 55, 75, 85, 100, 110, 140],
            index: -1
          }
          
        this.onMouseMove = this.onMouseMove.bind(this);
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        
        
        this.imageProps = {
          enlargedImageContainerDimensions: {width: "200%", height: "200%"},
            smallImage: {
                alt: '',
                isFluidWidth: true,
                src: blocks,
            },

            largeImage: {
                src: blocks,
                width: 800,
                height: 800,
                
            },
            enlargedImageContainerStyle: { background: "black" },
            enlargedImagePosition: 'over',
            hintTextMouse: "hi"
        }

    }

    onMouseMove(e) {
        this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, position: !this.state.position});
      }

    previous(e) {
      if(this.state.index>0){this.setState({index: this.state.index - 1, x: this.state.textvalueX[this.state.index - 1], y: this.state.textvalueY[this.state.index - 1]})}
    }

    next(e) {
      if(this.state.index<10){this.setState({index: this.state.index + 1, x: this.state.textvalueX[this.state.index + 1], y: this.state.textvalueY[this.state.index + 1]})}
    }

    render (){

      const matches = window.innerWidth;

      let {x, y, position} = this.state;

      var text;
      var head;

      if (matches>600) {
        head="";
        text="Hover the mouse over the PIC on te left and click inside any green box. You will see a quick description about the selected term in this screen.";
      } else {
        head="";
        text="Click on the \"Next\" button to search for a specific term and see its description on this screen. You can go back by clicking on \"Previous\".";
      }

        if (x>16 && x<30 && y>12 && y<20){
            head="ADC";
            text="Analog-Digital Converter. A PIC can only read a low signal (0v) or a high signal (5v). Any voltage between 0v-5v has to be converted into a number using binary code so it can be used by the PIC.";
        }
        if (x>35 && x<50 && y>15 && y<20){
          head="RES";
          text="(See ADC) Resolution means how big can the binary number be once the PIC receive a signal between 0v-5v. The more bits you have in your resolution, the more precise is your AD Conversion.";
        }
        if (x>65 && x<82 && y>25 && y<32){
          head="Timer";
          text="A timer counts time. It can be used to measure how much time a process takes, or it can be used to tell the PIC to wait certain time before continue with the program.";
        }
        if (x>15 && x<30 && y>38 && y<45){
          head="Memory";
          text="This tells you how much space you have in your PIC to store your program. Basically, it tells you how big your program can be.";
        }
        if (x>35 && x<50 && y>38 && y<45){
          head="RAM";
          text="Random Access Memory. The PIC uses this memory to store temporal data. The main program will use this data which means that this data will change according to the main program behavior";
        }
        if (x>88 && x<104 && y>50 && y<58){
          head="Max Speed";
          text="A PIC works with a frequency the same way than a human works with a heartbeat. The Maximum Speed is the higher frequency than a PIC can work with, using an external signal called Clock (clk).";
        }
        if (x>86 && x<104 && y>72 && y<80){
          head="IntOSC";
          text="(See Max Speed) Some PICs are equipped with Internal Oscillator (clocks) so you can chose between using it at a establish frequency or working with a different frequncy using an External Oscilator.";
        }
        if (x>65 && x<82 && y>84 && y<192){
          head="EEPROM";
          text="Electrically Erasable Programmable Read-Only Memory. The data stored in this memory will always be there, even when the PIC is off, or the main program have change.";
        }
        if (x>65 && x<82 && y>96 && y<102){
          head="Serial Comm";
          text="Serial Communication. Basically, if a PIC has Serial Comminucation available, it means that it can send and receive information through the USB port of a computer using a cable.";
        }
        if (x>36 && x<52 && y>108 && y<115){
          head="Comp";
          text="The comparator takes two signals (voltages) and tells the PIC which one is higher. These voltages can be in the form of any wave.";
        }
        if (x>15 && x<104 && y>138 && y<146){
          head="I/O Pins";
          text="Those are the physical terminals that you can see in a PIC. Depending on your program you can take data from the PIC, or send data from the exterior to the PIC.";
        }

        return (
          <div>

            <div className={matches<600 ? "header" : "out"}>
                <button onClick={this.previous}>Previous</button>
                <button onClick={this.next}>Next</button>
            </div>

            <div className={"header"}>

              <div className={matches>600 ? "lcdEffectpc" : "lcdEffectcell"}> 
                
                <div className={matches>600 ? "showPicEffectpc" : "out"}>
                    
                  <div style={{position: "relative", alignItems: "center"}}> 
                    <img src={pic} alt="" className={"picEffectpc"}/>                           
                    <a className={"effect"} onClick={this.onMouseMove}>
                      <ReactImageMagnify {...this.imageProps} className={"vanish"} style={{position: "absolute", margin: "100px 10px"}}/>
                    </a>
                  </div>
                   
                </div>

                <div className={matches>600 ? "boxforlcdpc" : "boxforlcdcell"}>

                  <img src={lcd} alt="" className={matches>600 ? "showlcdeffectpc" : "showlcdeffectcell"}/>
                  <div className={matches>600 ? "textinlcdpc" : "textinlcdcell"}>
                    <div style={{fontWeight: "bold"}}>{head}</div>
                    <p>{text}</p>
                  </div>

                  <div className={matches>600 ? "bluebar" : "out"}>
                    <div className={position ?  "transleft" : "transrigth"} style={{backgroundColor: "red", width: "20px", height: "40px"}}></div>
                  </div>
                </div>

              </div>
            </div>
            {/*<h1>{x} {y}</h1>*/} 

          </div>
        );

    }
}

export default Description;