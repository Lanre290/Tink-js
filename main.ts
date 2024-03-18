
// import * as suzzy from '../suzzy/suzzy.js';

var core_id_main:number = 0; // initialized at main in html component
var parentsStream:any = {};
var Main_root: HTMLComponent | DIVComponent | any;

class Root{
    
    readonly core_id: number= 0;
    readonly element = document.createElement("main"); 
    root:any;
    value:string = "";
    readonly type:string = "HTMLComponent";
    child_count:number = 0;
    constructor(){
        core_id_main++;

        this.element.dataset.core_id = this.core_id.toString();
        
        // //console.log(this.root.dataset.child_count);
        this.child_count = 0;
        this.root = document.querySelector("body")
        // parentsStream[this.core_id] = this.element;
        this.root.insertBefore(this.element,document.querySelector("script"));
        
    }
}

Main_root = new Root();

export function getRoot():HTMLComponent | DIVComponent{
    return Main_root;
}

export function title(new_title:string):void{
    document.title = new_title;
}

export function linkStylesheet(style_path:string):boolean{
    let out;
    if(typeof style_path == "string"){
        let element = document.createElement("link");
        element.rel = "stylesheet";
        element.href = style_path;
        let head:any = document.querySelector("head");
        head.appendChild(element);
        out = true;
    }
    else{
        console.error("Only type of string allowed");
        out = false;
    }
    return out;
}

linkStylesheet("main.css");


var main:any = document.querySelector("main");
main.dataset.core_id = new Number().toString();//initialize main at home to fit the normal syntax for the sake of those that will be appended there
main.dataset.child_count = new Number(),toString();//initialize main at home to fit the normal syntax for the sake of those that will be appended there
main.dataset.type = "HTMLComponent";//initialize main at home to fit the normal syntax for the sake of those that will be appended there

interface buttonElementProperties extends HTMLButtonElement{
    root?: any;
    text?: string;
    content?: string;
}


export class Button{
    
    readonly core_id:number = core_id_main++;
    readonly element:HTMLButtonElement = document.createElement("button");
    root:HTMLComponent | DIVComponent;
    value: string = "";
    readonly position:any;
    packed: boolean;
    readonly type:string = "button";
    text:string = "";
    onpack:Function = null;

    constructor(values?:buttonElementProperties | object){
        values = values || {};
        var isTrue:boolean = false;
        var isRoot:boolean = false;
        this.packed = false;
        this.root = Main_root;


        this.element.dataset.core_id = this.core_id.toString();
        for(const[key , value] of Object.entries(values)){
                if(key != "root" && key != "content" && key != "text"){
                    this.element.setAttribute(key,value);
                }
                else if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value;
                    isRoot = true;
                }
                else if(key == "content"){
                    this.value = value;
                    this.element.innerHTML = this.value;
                }
                else if(key == "text"){
                    this.element.innerText = value;
                    this.text = value;
                }
            }

        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id.toString());
        }
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        
        //console.log(this.position);

        // setInterval(() => {
        //     this.element.innerHTML = this.value;
        //     this.element.innerText = this.text;
        //     this.element.parentElement =this.root.element;
        // },300)
    }  

    pack():void{
        /**
         * puts the element onto the document
         */

        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
    }
    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    forget():void{
        /**
         * unpacks the this.element from the screen
         */
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }

    /**
     * hides the element but still keeps in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element
     */
    show():void{
        this.element.hidden = false;
    }


    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    setText(new_value:string):void{
        try {
            this.value =new_value;
            this.element.innerText = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    setContent(new_value:string):void{
        try {
            this.value =new_value;
            this.element.innerHTML = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }
    destroy(){
        this.element.remove();
    }

}

interface EntryElementProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: HTMLInputElement;
}

export class Entry{

    
    readonly core_id= core_id_main++;
    readonly element:HTMLInputElement = document.createElement("input");
    root: HTMLComponent | DIVComponent;
    value:string = "";
    packed:boolean =false;
    readonly type:string = "entry";
    position: number;
    onpack:Function = null;

    constructor(values?:EntryElementProperties | object){
        values = values || {};
        var isTrue:boolean = false;
        var isRoot:boolean = false;
        this.root = Main_root;


        this.element.dataset.core_id = this.core_id.toString();;

        for(const[key , value] of Object.entries(values)){
            if(key != "root" && key != "value"){
                this.element.setAttribute(key,value);
            }
            else if(key == "root"){
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if(key == "value"){
                this.value = value;
                this.element.value = this.value;
            }
        } 

        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id.toString());
        }
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        
        //console.log(this.position);
    }  

    /**
     * puts the element onto the document
     */
    pack():void{
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }

    /**
     * hide the element from the screen but keeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * Unhides the element
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the element on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface OptionMenuProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    options?:string[];
}

export class OptionMenu{
    
    readonly core_id:number = core_id_main++;
    readonly element:HTMLSelectElement | any = document.createElement("select");
    root: HTMLComponent | DIVComponent;
    value:string = "";
    packed:boolean =false;
    type:string = "OptionMenu";
    options:string[] =[];
    position:number;
    selected:string = "";
    onpack:Function = null;

    constructor(values?:OptionMenuProperties | object){
        values = values || {};
        var isTrue = false;
        var isRoot = false;
        var isList = false;
        this.root = Main_root;



            for(const[key , value] of Object.entries(values)){
                if(key != "root" && key != "value" && key != "list" && key != "options" && key != "selected"){
                    this.element.setAttribute(key,value);
                }
                else if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value;
                    isRoot = true;
                }
                else if(key == "value"){
                    this.value = value;
                    this.element.value = this.value;
                }
                else if(key == "options" || key == "list"){
                    try {
                        this.options = value;
                        isList = true;
                    } catch (error) {
                        console.error(error);
                    }
                }
                else if(key == "selected"){
                    this.selected = value;
                }
            } 

            // let list = this.options;
            // list.forEach(element => {
            //     let el = document.createElement("option");
            //     el.value = element;
            //     el.innerHTML = element;
            //     this.selected.length > 0 ? el.selected = true : null;
            //     console.log(this.selected.length > 0)
            //     console.log(el);
            //     this.element.appendChild(el);
            // });
            // for(let i = 0; i< list.length; i++){
            //     let el = document.createElement("option");
            //     el.value = list[i];
            //     this.datalist.appendChild(el);
            //     console.log(list[i])
            // }
        
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        
        //console.log(this.position);
    
    }
    
    /**
     * puts the element onto the document
     */
    pack():void{
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins
                let list = this.options;
                list.forEach(element => {
                    let el = document.createElement("option");
                    el.value = element;
                    el.innerHTML = element;
                    this.selected.toString().toUpperCase() == element.toString().toUpperCase() ? el.selected = true : null;
                    this.element.appendChild(el);
                });

                for(let i = 0; i < this.root.element.children.length; i++){
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    
    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the screen but keeps it in the DOM tre
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * Unhides the element from the screen
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface ListOptionProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    options?:string[];
    anchor?: "bottom" | "left" | "center-left" | "bottom-left" | "right" | "center-right" | "bottom-right";
}

export class ListOption{

        core_id:number = core_id_main++;
        root:HTMLComponent | DIVComponent;
        value:string;
        content:string = "&Congruent;";
        packed:boolean =false;
        readonly type:string = "ListOption";
        options:string[] =[];
        children:Button[] = [];
        child:Button[] =[]; //still refers to this.children
        DISPLAY_OPTION_BUTTON:Button;
        element: DIVComponent
        position:number;
        onpack:Function = null;

    constructor(values?: ListOptionProperties | object){
        values = values || {};
        var isTrue:boolean = false;
        var isRoot:boolean = false;
        var isList:boolean = false;
        var isText:string = "unset";
        this.root = Main_root;
        this.DISPLAY_OPTION_BUTTON = new Button();


        //create the mother div
        this.element = new DIVComponent({root: this.root});

        for(const[key , value] of Object.entries(values)){
            if(key != "root" && key != "value" && key != "list" && key != "options" && key != "text" && key != "content" && key != "anchor"){
                this.element.element.setAttribute(key,value);
            }
            else if(key == "root"){
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if(key == "value" || key == "content"){
                isText = "set";
                this.content = value;
            }

            else if(key == "text"){
                isText = "text";
                this.content = value;
            }

            else if(key == "options"){
                try {
                    this.options = value;
                    isList = true;
                } catch (error) {
                    console.error(error);
                }
            }

            else if(key == "anchor"){
                if(value == "bottom"){
                    this.element.element.classList.add("---vault---bottom---list---option");
                }
                if(value == "left"){
                    this.element.element.classList.add("---vault---left---list---option");
                }
                if(value == "center-left"){
                    this.element.element.classList.add("---vault---center---left---list---option");
                }
                if(value == "bottom-left"){
                    this.element.element.classList.add("---vault---bottom---left---list---option");
                }
                if(value == "right"){
                    this.element.element.classList.add("---vault---right---list---option");
                }
                if(value == "center-right"){
                    this.element.element.classList.add("---vault---center---right---list---option");
                }
                if(value == "bottom-right"){
                    this.element.element.classList.add("---vault---bottom---right---list---option");
                }
            }
        } 

        //start creating the inner components

        if(isText == "unset" || isText == "set"){
            this.DISPLAY_OPTION_BUTTON = new Button({root: this.element,content: this.content, class: "---vault---list---option---btn---"});
        }
        else if(isText == "text"){
            this.DISPLAY_OPTION_BUTTON = new Button({root: this.element,text: this.content, class: "---vault---list---option---btn---"});
        }
        //create the menu buton for the drop down
        this.DISPLAY_OPTION_BUTTON.element.style.marginTop = `calc(50% - ${this.DISPLAY_OPTION_BUTTON.element.clientHeight/2})`;
        this.DISPLAY_OPTION_BUTTON.pack();

        var options_container = new DIVComponent({root: this.element, class: "---vault---list---option---container---"});
        options_container.element.style.zIndex = "9999999999999999999999999999999999999999999999999999999999999999999";

        let list = this.options;
        list.forEach(element => {
            let el = new Button({root: options_container, content: element, class: "---vault---list---option---button---"});
            el.pack();

            el.bindEvent("click",() => {
                this.value = el.value;
                options_container.forget();
            });

            this.children.push(el);
            this.child.push(el); 
        });

        try {
            this.value = this.children[0].value;
        } catch (error) {
            
        }
        // for(let i = 0; i< list.length; i++){
        //     let el = document.createElement("option");
        //     el.value = list[i];
        //     this.datalist.appendChild(el);
        //     console.log(list[i])
        // }
        this.DISPLAY_OPTION_BUTTON.bindEvent("click", (event:Event) => {
            if(options_container.packed){
                options_container.forget();
            }
            else{
                options_container.pack();
            }
            event.stopPropagation();
        });

        options_container.bindEvent("click", (event:Event) => {
            event.stopPropagation();
        });

        if(isTrue){
            this.element.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.element.dataset.position = this.position.toString();
            this.element.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.element.dataset.position = this.position.toString();
            this.element.element.dataset.type = this.type;
        }
        
        //console.log(this.position);

        document.addEventListener("click", (event) => {
            options_container.forget();
            event.stopPropagation();
        });

        this.element.pack();
        this.element.element.style.height = `${this.DISPLAY_OPTION_BUTTON.element.clientHeight + 10}px`;

    }  

    /**
     * puts the element onto the document
     */
    pack():void{

        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }

                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        if(this.onpack != null){}
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    forget():void{
        /**
         * unpacks the this.element from the screen
         */
        if(this.packed){
            this.root.element.removeChild(this.element.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the screen but keeps the element in the DOM tree
     */
    hide():void{
        this.element.element.hidden = true;
    }

    /**
     * unhides the element
     */
    show():void{
        this.element.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param: HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface ComboBoxProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    options?:string[];
    list?:string[];
}

export class ComboBox{

    core_id:number= core_id_main++;
    element:HTMLInputElement | any = document.createElement("input");
    root: HTMLComponent | DIVComponent;
    value:string = "";
    packed:boolean =false;
    type:string = "comboBox";
    list:string[] =[];
    datalist:HTMLDataListElement | any;
    position:number;
    onpack:Function = null;

    constructor(values: ComboBoxProperties | Object){
        var isTrue:boolean = false;
        var isRoot:boolean = false;
        var isList:boolean = false;


        this.element.dataset.core_id = this.core_id.toString();
        this.datalist = document.createElement("datalist");
        this.datalist.id = this.core_id.toString();
        this.root = Main_root;

           for(const[key , value] of Object.entries(values)){
                if(key != "root" && key != "value" && key != "list" && key == "type"){
                    this.element.setAttribute(key,value);
                }
                else if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value;
                    isRoot = true;
                }
                else if(key == "value"){
                    this.value = value;
                    this.element.value = this.value;
                }

                else if(key == "list"){
                    try {
                        this.list = value;
                        this.element.setAttribute("list",this.datalist.id);
                        isList = true;
                    } catch (error) {
                        console.error(error);
                    }
                }
                else if(key == "type"){
                    try {
                        throw new Error("Cannot set type for combobox");
                    } catch (error) {
                        console.error(error);
                    }
                }
                else{
                    this.element.setAttribute(key,value);
                }
            } 

        // let list = this.list;
        // list.forEach(element => {
        //     let el = document.createElement("option");
        //     el.value = element;
        //     this.datalist.appendChild(el);
        // });
        // for(let i = 0; i< list.length; i++){
        //     let el = document.createElement("option");
        //     el.value = list[i];
        //     this.datalist.appendChild(el);
        //     console.log(list[i])
        // }
        console.log(this.datalist);
        this.element.setAttribute("list",this.datalist.id);
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        
        //console.log(this.position);
    }  

    /**
     * puts the element onto the document
     */
    pack():void{
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins
                let list = this.list;
                list.forEach(element => {
                    let el = document.createElement("option");
                    el.value = element;
                    this.datalist.appendChild(el);
                });

                for(let i = 0; i < this.root.element.children.length; i++){
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            this.root.element.insertBefore(this.datalist,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                    this.root.element.appendChild(this.datalist)
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
         
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhidees the element
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface HTMLComponentProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    parentElement?:HTMLComponent | DIVComponent
}

export class HTMLComponent{

    content:string = "";
    root:HTMLComponent | DIVComponent = Main_root
    core_id:number = core_id_main++;
    packed:boolean = false;
    readonly type:string = "HTMLComponent";
    child_count:number = 0;
    element:HTMLDivElement = document.createElement("div");
    position:number;
    onpack:Function = null;

    constructor(values: HTMLComponentProperties | object){
        var has_content:boolean = false;
        var isParentElement:boolean = false;
        var isRoot:boolean = false;


        for(const[key,value] of Object.entries(values)){
            if(key == "content"){
                has_content = true;
                this.content=value;
            }
            if(key == "parentElement" || key == "root"){
                isParentElement = true;
                this.root = value;
                isRoot = true;
            }
            if(key == "type"){
                this.element = document.createElement(value);
            }
            if(key != "content" && key != "parentElement" && key != "root" && key != "type"){
                this.element.setAttribute(key, value);
            }
        }
        
        // this.element.hidden;
        this.element.innerHTML = this.content;

        parentsStream[this.core_id] = this.element;
        // this.element = //console.log(new DOMParser().parseFromString((new DOMParser().parseFromString(this.content,'text/html').querySelector("body").innerHTML),'text/html'));

        if(isRoot == false){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.core_id = this.core_id.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.core_id = this.core_id.toString();
            this.element.dataset.type = this.type;
        }

    }

    pack():void{
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        
    }
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    }

    parse():HTMLElement{
        return this.element;
    }
    
    /**
     * hides the element from thee screen but keeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the elemeent from the screen
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param:HTMLComponent | DIVComponent){
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    empty():void{
        this.element.innerHTML = "";
    }

    isEmpty():boolean{
        return this.element.innerHTML.trim() == "";
    }

    destroy(){
        this.element.remove();
    }
}

interface DIVComponentProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    parentElement?:HTMLComponent | DIVComponent
}

export class DIVComponent{
    
    readonly core_id:number = core_id_main++;
    element:HTMLDivElement = document.createElement("div");
    packed:boolean =false;
    root: HTMLComponent | DIVComponent;
    value:string = "";
    readonly type:string = "DIVComponent";
    child_count:number = 0;
    position:number;
    onpack:Function = null;

    constructor(values:DIVComponentProperties | object){
        var isTrue:boolean = false;
        var isRoot:boolean = false;
        this.element.id = this.core_id.toString();
        this.root = Main_root;

        this.element.dataset.core_id = this.core_id.toString();

        for(const[key , value] of Object.entries(values)){
            if(key != "root" && key != "content" && key != "text"){
                this.element.setAttribute(key,value);
            }
            else if(key == "root"){
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value
                isRoot = true;
            }
            else if(key == "content"){
                this.value = value;
                this.element.innerHTML = this.value;
            }
            else if(key == "text"){
                this.element.innerText = value;
            }
        } 


        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id);
        }
        if(isTrue){
            this.element.disabled = true;
        }
        // //console.log(this.root.dataset.child_count);
        this.child_count= 0;
        parentsStream[this.core_id] = this.element;
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }  

    pack():void{
        /**
         * puts the element onto the document
         */
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
    
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        try {
            this.element.addEventListener(event,callbackFunction);
        } catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    }
    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    }
    
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    setText(new_value:string):void{
        this.value =new_value;
        this.element.innerText = new_value;
    }

    setContent(new_value:string):void{
        this.value =new_value;
        this.element.innerHTML = new_value;
    }

    switchParent(param: HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }
    
    empty():void{
        this.element.innerHTML = "";
    }

    isEmpty():boolean{
        return this.element.innerHTML.trim() == "";
    }

    destroy(){
        this.element.remove();
    }

}

interface DialogBoxProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    parentElement?:HTMLComponent | DIVComponent
}

export class DialogBox{

    core_id:number = core_id_main++;
    element:HTMLDialogElement = document.createElement("dialog");
    packed:boolean =false;
    root: HTMLComponent | DIVComponent;
    value:string = "";
    type:string = "HTMLComponent";
    child_count:number = 0;
    innerElement:DIVComponent = new DIVComponent({root: this});
    position: number;
    onpack:Function = null;

    constructor(values:DialogBoxProperties | object){
        var isTrue = false;
        var isRoot = false;
        this.element.id = this.core_id.toString();

        this.element.dataset.core_id = this.core_id.toString();
        this.element.classList.add("---dialog---box---");
        this.element.open = true;
        this.root = Main_root;

        this.innerElement.pack();


        let button_comp = new HTMLComponent({root: this,type: "span", method: "dialog"});
        button_comp.pack();

        let dia_btn = new Button({root: button_comp, text: "OK", class: "---dialog---close---btn---"});
        dia_btn.pack();

        dia_btn.bindEvent("click", () => {
            this.close();
        });

           for(const[key , value] of Object.entries(values)){
                if(key != "root" && key != "content" && key != "text"){
                    this.element.setAttribute(key,value);
                }
                else if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value
                    isRoot = true;
                }
                else if(key == "content" || key == "text"){
                    this.value = value;
                    if(typeof value == "string"){
                        this.innerElement.element.innerHTML = this.value;
                    }
                    else{
                        this.innerElement.element.appendChild(value.element);
                    }
                    
                }
            } 


        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id.toString());
        }
        if(isTrue){
            this.element.disabled = true;
        }
        // //console.log(this.root.dataset.child_count);
        this.child_count= 0;
        parentsStream[this.core_id] = this.element;
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }  

    /**
     * puts the element onto the document
     */
    open():void{
        try {
            if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                throw new Error(`Cannot set element type of ${this.root.type} as parent`);
            }
            let notFound = true;
            //console.log(this.root.children);

            // document.ins

            for(let i = 0; i < this.root.element.children.length; i++){
                if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                    //find the index with the dataset and insertbefore at the right place
                    if(this.root.element.children[i].dataset.core_id != this.core_id){
                        this.root.element.insertBefore(this.element,this.root.element.children[i]);
                        notFound = false;
                        break
                    }

                }
            }

            if(notFound){
                this.root.element.appendChild(this.element);
            }
            this.onpack != null && this.onpack()
            this.packed = true;
            this.element.open = true;
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
            try {
                this.element.addEventListener(event,callbackFunction);
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }
    /**
     * unpacks the this.element from the screen
     */
    close():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        this.element.open = false;
    }

    setText(new_value:string):void{
        try {
            this.innerElement.element.innerText = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    setContent(new_value:string):void{
        try {
            this.innerElement.element.innerHTML = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.close();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }
}

interface NotebookProperties extends HTMLAllCollection{
    root?: any;
    accentColor?: string;
}

export class Notebook{

    core_id:number = core_id_main++;
    element: HTMLDivElement = document.createElement("div");
    packed:boolean =false;
    root:HTMLComponent | DIVComponent = Main_root;
    value:string = "";
    readonly type:string = "Notebook";
    child_count:number = 0;
    readonly state:any = null;
    accentColor:string = "#0a0a0a";
    children: HTMLComponent[] | DIVComponent[] | any[] = [];
    pages:any[] = [];
    position: number = 0;
    onpack:Function = null;

    constructor(values:NotebookProperties | object){
        try {
            var isTrue = false;
            var isRoot = false;

            
            this.element.id=this.core_id;

            this.element.dataset.core_id = this.core_id;

            this.element.classList.add("---webkit-notebook");

            for(const[key , value] of Object.entries(values)){
                if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value
                    isRoot = true;
                }
                else if(key == "accentColor"){
                    this.accentColor = value;
                }
                else{
                    throw new Error(`Keyword "${key}" is not recognised`);
                }
            }


            if(!(this.element.hasAttribute("id"))){
                this.element.setAttribute("id",this.core_id);
            }
            if(isTrue){
                this.element.disabled = true;
            }
            // //console.log(this.root.dataset.child_count);
            this.child_count= 0;
            parentsStream[this.core_id] = this.element;
            if(!(isRoot)){
                this.root = Main_root
                this.root.element.dataset.child_count++;
                this.position = this.root.element.dataset.child_count;
                this.element.dataset.position = this.position.toString();
                this.element.dataset.type = this.type;
            }
            else{
                this.root.child_count++;
                this.position = this.root.child_count;
                this.element.dataset.position = this.position.toString();
                this.element.dataset.type = this.type;
            }
        } catch (error) {
            console.error(error);
        }
        try {
            console.log(this.pages);
            for(let page of this.pages){
                page.style.width = `${Math.floor(100/this.pages.length)}%`;
                page.style.borderBottom = "none";
                page.style.filter = "brightness(0.8)";
            }
            this.pages[0].style.borderBottom = `3px solid ${this.accentColor}`;
            this.pages[0].style.filter = "none";
        } catch (error) {
            console.error(error);
        }
        this.element.onload = () => {
            console.log(this.pages);
            try {
                for(let page of this.pages){
                    page.style.width = `${Math.floor(100/this.pages.length)}%`;
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                this.pages[0].style.borderBottom = `3px solid ${this.accentColor}`;
                this.pages[0].style.filter = "none";
            } catch (error) {
                //error handling code...
                console.error(error);
            }
        }
        document.addEventListener("DOMContentLoaded", () => {
            try {
                for(let page of this.pages){
                    page.style.width = `${Math.floor(100/this.pages.length)}%`;
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                this.pages[0].style.borderBottom = `3px solid ${this.accentColor}`;
                this.pages[0].style.filter = "none";
            } catch (error) {
                //error handling code...
                console.error(error);
            }
        });
    }  
    /**
     * switches to the index provided on a zero based index
     */
    switchTab(index:number):void{
        if(index > this.pages.length - 1){
            throw new SyntaxError("Index Out of bounds");
        }
        else{
            for(let page of this.pages){
                    page.style.width = `${Math.floor(100/this.pages.length)}%`;
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                this.pages[index].style.borderBottom = `3px solid ${this.accentColor}`;
                this.pages[index].style.filter = "none";
                for(let child of this.children){
                    child.forget();
                }
                this.children[index].pack();
        }
    }
    /**
     * puts the element onto the document
     */
    pack():void{
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
                for(let page of this.pages){
                    page.style.width = `${Math.floor(100/this.pages.length)}%`;
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                this.pages[0].style.borderBottom = `3px solid ${this.accentColor}`;
                this.pages[0].style.filter = "none";
            } catch (error) {
                console.error(error);
            }
        }
        
    }
    /**
     * add a new sub-element to the notebook widget, use ".---webkit-notebook-sub-element" to override styling
     */
    add(element:HTMLComponent | DIVComponent,text: HTMLComponent | DIVComponent |string):void{
        var pages = this.pages;
        var children = this.children;
        function changeInterface(){
            for(let page of pages){
                page.style.borderBottom = "none";
                page.style.filter = "brightness(0.8)";   
            }

            for(let child of children){
                child.forget();
            }

            element.pack();
        }
        if(typeof text == "string" || typeof text == "object"){
            if(typeof text == "string"){
                let elem = document.createElement("div");
                elem.classList.add("---webkit-notebook-sub-element");
                elem.innerText = text;
                this.element.appendChild(elem);
                this.pages.push(elem);
                this.children.push(element);
                elem.addEventListener("click",() => {
                    changeInterface();
                    elem.style.borderBottom = `3px solid ${this.accentColor}`;
                    elem.style.filter = "none";
                });
            }
            else{
                try {
                    let elem = text.element;
                    elem.classList.add("---webkit-notebook-sub-element");
                    this.element.appendChild(elem);
                    this.pages.push(elem);
                    this.children.push(element);
                    elem.addEventListener("click",() => {
                        changeInterface();
                        elem.style.borderBottom = `3px solid ${this.accentColor}`;
                        elem.style.filter = "none";
                    });
                } catch (error:any) {
                    throw new Error(error);
                }
            }
        }
    }
    remove():void{
        //code...
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    // addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions)
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        this.element.addEventListener(event,callbackFunction);
        
    }
    

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    }
    
    /**
     * hides the element from the screen but keeps it in the DOM treee
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param: HTMLComponent | DIVComponent | any):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }
}

interface LabelProperties extends HTMLLabelElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
    parentElement?:HTMLComponent | DIVComponent;
}

export class Label{
    
    core_id:number = core_id_main++;
    element:HTMLLabelElement = document.createElement("label");
    // this.element.id="fdf";
    root: HTMLComponent | DIVComponent = Main_root;
    value:string = "";
    packed=false;
    type:string = "Label";
    position:number;
    onpack:Function = null;

    constructor(values: LabelProperties | object){
        var isTrue = false;
        var isRoot = false;


        this.element.dataset.core_id = this.core_id.toString();

        for(const[key , value] of Object.entries(values)){
            if(key != "root" && key != "content" && key != "text" && key != "value"){
                this.element.setAttribute(key,value);
            }
            else if(key == "root"){
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if(key == "content" || key == "value"){
                this.value = value;
                this.element.innerHTML = this.value;
            }
            else if(key == "text"){
                this.element.innerText = value;
            }
        } 


        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id.toString());
        }
        if(isTrue){
            this.element.disabled = true;
        }
        //console.log("label: ",this.root.dataset.child_count);
        parentsStream[this.core_id] = this.element;
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
    }  

    /**
     * puts the element onto the document
     */
    pack():void{
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }
                // console.log(this.element,notFound);
                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the screen but keeeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    setText(new_value:string):void{
        try {
            this.value =new_value;
            this.element.innerText = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    setContent(new_value:string):void{
        try {
            this.value =new_value;
            this.element.innerHTML = new_value;
        } catch (error) {
            console.error(error);
        }
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface ProgressBarProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
    type?: string;
}

export class ProgressBar{

    core_id:number= core_id_main++;
    element:HTMLDivElement = document.createElement("div");
    root:HTMLComponent | DIVComponent = Main_root;
    packed:boolean =false;
    readonly type:string = "progressBar";
    value:number = 0;
    progressBar: HTMLElement | any;
    position:number;
    onpack:Function = null;

    constructor(values: ProgressBarProperties | object){
        var isTrue = false;
        var isRoot = false;

        this.element.classList.add("---progress--bar--container---");

        this.progressBar = document.createElement("div");
        this.progressBar.classList.add("---progress---bar---");
        this.element.dataset.core_id = this.core_id;

            this.progressBar.style.width = `${this.value}%`; //updating the width of the progressbar

            for(const[key , value] of Object.entries(values)){
                if(key != "root" && key != "value"){
                    this.element.setAttribute(key,value);
                }
                else if(key == "root"){
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value;
                    isRoot = true;
                }
                else if(key == "value"){
                    this.progressBar.style.width = `${value}%`;
                }
            } 

            setInterval(() => {
               this.progressBar.style.width = `${this.value}%` 
            }, 300);

        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id);
        }
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        // document.getElementById("fdu").children
        
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }

        this.element.appendChild(this.progressBar);
        
        //console.log(this.position);
    }  
     /**
     * puts the element onto the document
     */
    pack():void{

        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        
    }
    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }
    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the creen but keeps it in the DOM tre
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element from the screen
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param:HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    destroy(){
        this.element.remove();
    }

}

interface VideoProperties extends HTMLElement{
    root?: any;
    text?: string;
    content?: string;
}

export class Video{

    core_id:number= core_id_main++;
    element:HTMLVideoElement = document.createElement("video");
    root:HTMLComponent | DIVComponent = Main_root;
    value:string = "";
    packed:boolean =false;
    readonly type:string = "Video";
    paused:boolean;
    playbackRate:any;
    position:number;
    onpack:Function = null;

    constructor(values:VideoProperties | object){
        var isTrue = false;
        var isRoot = false;


        this.element.dataset.core_id = this.core_id;

        for(const[key , value] of Object.entries(values)){
            if(key != "root"){
                this.element.setAttribute(key,value);
            }
            else if(key == "root"){
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
        } 


        if(!(this.element.hasAttribute("id"))){
            this.element.setAttribute("id",this.core_id);
        }
        if(isTrue){
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;

        if(!(this.element.hasAttribute("src"))){
            console.error("Video src attribute not specified");
        }

        this.paused = this.element.paused;
        this.playbackRate = this.element.playbackRate;
        if(!(isRoot)){
            this.root = Main_root
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else{
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }  

    pack():void{
        /**
         * puts the element onto the document
         */
        if(!this.packed){
            try {
                if(this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent"){
                    throw new Error(`Cannot set element type of ${this.root.type} as parent`);
                }
                let notFound = true;
                //console.log(this.root.children);

                // document.ins

                for(let i = 0; i < this.root.element.children.length; i++){
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if(parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)){
                        //find the index with the dataset and insertbefore at the right place
                        if(this.root.element.children[i].dataset.core_id != this.core_id){
                            this.root.element.insertBefore(this.element,this.root.element.children[i]);
                            notFound = false;
                            break
                        }

                    }
                }

                if(notFound){
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack()
                this.packed = true;
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    /**
     * Similar to addEventListener in vanilla javascript
     */
    bindEvent<b extends keyof HTMLElementEventMap>(event:b,callbackFunction: (this: HTMLAnchorElement, ev: HTMLElementEventMap[b]) => any):void{
        let out = false;

            try {
                this.element.addEventListener(event,callbackFunction);
                out = true;
            } catch (error) {
                console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
            }
        
    }

    /**
     * unpacks the this.element from the screen
     */
    forget():void{
        if(this.packed){
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        
    }
    
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    hide():void{
        this.element.hidden = true;
    }

    /**
     * unhides the element from the screen
     */
    show():void{
        this.element.hidden = false;
    }

    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    toggle():void{
        this.packed ? this.forget() : this.pack();
    }

    switchParent(param: HTMLComponent | DIVComponent):void{
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    }

    requestFullScreen():void{
        this.element.requestFullscreen();
    }

    requestPictureInPicture():void{
        this.element.requestPictureInPicture();
    }

    requestPointerLock():void{
        this.element.requestPointerLock();
    }

    requestVideoFrameCallback(callback:any):void{
        try {
            this.element.requestVideoFrameCallback();
        } catch (error) {
            console.error(error);
        }
    }

    closeFullScreen():void{
        document.exitFullscreen();
    }

    exitPictureInPicture():void{
        document.exitPictureInPicture();
    }

    exitPointerLock():void{
        document.exitPointerLock();
    }

    play():void{
        try {
            this.element.play();
        } catch (error) {
            console.error(error);
        }
    }

    pause():void{
        try {
            this.element.pause();
        } catch (error) {
            console.error(error);
        }
    }

    destroy(){
        this.element.remove();
    }

}

export function Notification(value:string):void{
    let style =`
    position: fixed;
    bottom: 20px;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background: #000000aa;
    font-size: 15px;
    color: #fbfbfb;
    z-index: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999;
    min-width: 100px;
    width: fit-content;
    height: fit-content;
    padding: 5px 6px;
    max-width: 100%;
    transition: all ease 0.2s;
    transition-duration: 0.2s;
    text-align: center;
    margin-bottom: -10000%;
    `
    let notif = new DIVComponent({text: value,style: style});
    notif.pack();
    notif.element.style.marginBottom = "0px";
    setTimeout(() => {
       notif.forget(); 
    }, 4000);
}


console.log(document.readyState);
document.addEventListener("readystatechange", () => {
    console.log(document.readyState)
})


