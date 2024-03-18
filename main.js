// import * as suzzy from '../suzzy/suzzy.js';
var core_id_main = 0; // initialized at main in html component
var parentsStream = {};
var Main_root;
var Root = /** @class */ (function () {
    function Root() {
        this.core_id = 0;
        this.element = document.createElement("main");
        this.value = "";
        this.type = "HTMLComponent";
        this.child_count = 0;
        core_id_main++;
        this.element.dataset.core_id = this.core_id.toString();
        // //console.log(this.root.dataset.child_count);
        this.child_count = 0;
        this.root = document.querySelector("body");
        // parentsStream[this.core_id] = this.element;
        this.root.insertBefore(this.element, document.querySelector("script"));
    }
    return Root;
}());
Main_root = new Root();
export function getRoot() {
    return Main_root;
}
export function title(new_title) {
    document.title = new_title;
}
export function linkStylesheet(style_path) {
    var out;
    if (typeof style_path == "string") {
        var element = document.createElement("link");
        element.rel = "stylesheet";
        element.href = style_path;
        var head = document.querySelector("head");
        head.appendChild(element);
        out = true;
    }
    else {
        console.error("Only type of string allowed");
        out = false;
    }
    return out;
}
linkStylesheet("main.css");
var main = document.querySelector("main");
main.dataset.core_id = new Number().toString(); //initialize main at home to fit the normal syntax for the sake of those that will be appended there
main.dataset.child_count = new Number(), toString(); //initialize main at home to fit the normal syntax for the sake of those that will be appended there
main.dataset.type = "HTMLComponent"; //initialize main at home to fit the normal syntax for the sake of those that will be appended there
var Button = /** @class */ (function () {
    function Button(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("button");
        this.value = "";
        this.type = "button";
        this.text = "";
        this.onpack = null;
        values = values || {};
        var isTrue = false;
        var isRoot = false;
        this.packed = false;
        this.root = Main_root;
        this.element.dataset.core_id = this.core_id.toString();
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "content" && key != "text") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "content") {
                this.value = value;
                this.element.innerHTML = this.value;
            }
            else if (key == "text") {
                this.element.innerText = value;
                this.text = value;
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id.toString());
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else {
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
    Button.prototype.pack = function () {
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
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    Button.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    Button.prototype.forget = function () {
        /**
         * unpacks the this.element from the screen
         */
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element but still keeps in the DOM tree
     */
    Button.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element
     */
    Button.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    Button.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    Button.prototype.setText = function (new_value) {
        try {
            this.value = new_value;
            this.element.innerText = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    Button.prototype.setContent = function (new_value) {
        try {
            this.value = new_value;
            this.element.innerHTML = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    Button.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    Button.prototype.destroy = function () {
        this.element.remove();
    };
    return Button;
}());
export { Button };
var Entry = /** @class */ (function () {
    function Entry(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("input");
        this.value = "";
        this.packed = false;
        this.type = "entry";
        this.onpack = null;
        values = values || {};
        var isTrue = false;
        var isRoot = false;
        this.root = Main_root;
        this.element.dataset.core_id = this.core_id.toString();
        ;
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "value") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "value") {
                this.value = value;
                this.element.value = this.value;
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id.toString());
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else {
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
    Entry.prototype.pack = function () {
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    Entry.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    Entry.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hide the element from the screen but keeps it in the DOM tree
     */
    Entry.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * Unhides the element
     */
    Entry.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the element on the screen.. if packeed, it forgets and otherwise
     */
    Entry.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    Entry.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    Entry.prototype.destroy = function () {
        this.element.remove();
    };
    return Entry;
}());
export { Entry };
var OptionMenu = /** @class */ (function () {
    function OptionMenu(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("select");
        this.value = "";
        this.packed = false;
        this.type = "OptionMenu";
        this.options = [];
        this.selected = "";
        this.onpack = null;
        values = values || {};
        var isTrue = false;
        var isRoot = false;
        var isList = false;
        this.root = Main_root;
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "value" && key != "list" && key != "options" && key != "selected") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "value") {
                this.value = value;
                this.element.value = this.value;
            }
            else if (key == "options" || key == "list") {
                try {
                    this.options = value;
                    isList = true;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (key == "selected") {
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
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else {
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
    OptionMenu.prototype.pack = function () {
        var _this = this;
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                var list = this.options;
                list.forEach(function (element) {
                    var el = document.createElement("option");
                    el.value = element;
                    el.innerHTML = element;
                    _this.selected.toString().toUpperCase() == element.toString().toUpperCase() ? el.selected = true : null;
                    _this.element.appendChild(el);
                });
                for (var i = 0; i < this.root.element.children.length; i++) {
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    OptionMenu.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    OptionMenu.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps it in the DOM tre
     */
    OptionMenu.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * Unhides the element from the screen
     */
    OptionMenu.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    OptionMenu.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    OptionMenu.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    OptionMenu.prototype.destroy = function () {
        this.element.remove();
    };
    return OptionMenu;
}());
export { OptionMenu };
var ListOption = /** @class */ (function () {
    function ListOption(values) {
        var _this = this;
        this.core_id = core_id_main++;
        this.content = "&Congruent;";
        this.packed = false;
        this.type = "ListOption";
        this.options = [];
        this.children = [];
        this.child = []; //still refers to this.children
        this.onpack = null;
        values = values || {};
        var isTrue = false;
        var isRoot = false;
        var isList = false;
        var isText = "unset";
        this.root = Main_root;
        this.DISPLAY_OPTION_BUTTON = new Button();
        //create the mother div
        this.element = new DIVComponent({ root: this.root });
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "value" && key != "list" && key != "options" && key != "text" && key != "content" && key != "anchor") {
                this.element.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "value" || key == "content") {
                isText = "set";
                this.content = value;
            }
            else if (key == "text") {
                isText = "text";
                this.content = value;
            }
            else if (key == "options") {
                try {
                    this.options = value;
                    isList = true;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (key == "anchor") {
                if (value == "bottom") {
                    this.element.element.classList.add("---vault---bottom---list---option");
                }
                if (value == "left") {
                    this.element.element.classList.add("---vault---left---list---option");
                }
                if (value == "center-left") {
                    this.element.element.classList.add("---vault---center---left---list---option");
                }
                if (value == "bottom-left") {
                    this.element.element.classList.add("---vault---bottom---left---list---option");
                }
                if (value == "right") {
                    this.element.element.classList.add("---vault---right---list---option");
                }
                if (value == "center-right") {
                    this.element.element.classList.add("---vault---center---right---list---option");
                }
                if (value == "bottom-right") {
                    this.element.element.classList.add("---vault---bottom---right---list---option");
                }
            }
        }
        //start creating the inner components
        if (isText == "unset" || isText == "set") {
            this.DISPLAY_OPTION_BUTTON = new Button({ root: this.element, content: this.content, class: "---vault---list---option---btn---" });
        }
        else if (isText == "text") {
            this.DISPLAY_OPTION_BUTTON = new Button({ root: this.element, text: this.content, class: "---vault---list---option---btn---" });
        }
        //create the menu buton for the drop down
        this.DISPLAY_OPTION_BUTTON.element.style.marginTop = "calc(50% - ".concat(this.DISPLAY_OPTION_BUTTON.element.clientHeight / 2, ")");
        this.DISPLAY_OPTION_BUTTON.pack();
        var options_container = new DIVComponent({ root: this.element, class: "---vault---list---option---container---" });
        options_container.element.style.zIndex = "9999999999999999999999999999999999999999999999999999999999999999999";
        var list = this.options;
        list.forEach(function (element) {
            var el = new Button({ root: options_container, content: element, class: "---vault---list---option---button---" });
            el.pack();
            el.bindEvent("click", function () {
                _this.value = el.value;
                options_container.forget();
            });
            _this.children.push(el);
            _this.child.push(el);
        });
        try {
            this.value = this.children[0].value;
        }
        catch (error) {
        }
        // for(let i = 0; i< list.length; i++){
        //     let el = document.createElement("option");
        //     el.value = list[i];
        //     this.datalist.appendChild(el);
        //     console.log(list[i])
        // }
        this.DISPLAY_OPTION_BUTTON.bindEvent("click", function (event) {
            if (options_container.packed) {
                options_container.forget();
            }
            else {
                options_container.pack();
            }
            event.stopPropagation();
        });
        options_container.bindEvent("click", function (event) {
            event.stopPropagation();
        });
        if (isTrue) {
            this.element.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.element.dataset.position = this.position.toString();
            this.element.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.element.dataset.position = this.position.toString();
            this.element.element.dataset.type = this.type;
        }
        //console.log(this.position);
        document.addEventListener("click", function (event) {
            options_container.forget();
            event.stopPropagation();
        });
        this.element.pack();
        this.element.element.style.height = "".concat(this.DISPLAY_OPTION_BUTTON.element.clientHeight + 10, "px");
    }
    /**
     * puts the element onto the document
     */
    ListOption.prototype.pack = function () {
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
        if (this.onpack != null) { }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    ListOption.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    ListOption.prototype.forget = function () {
        /**
         * unpacks the this.element from the screen
         */
        if (this.packed) {
            this.root.element.removeChild(this.element.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps the element in the DOM tree
     */
    ListOption.prototype.hide = function () {
        this.element.element.hidden = true;
    };
    /**
     * unhides the element
     */
    ListOption.prototype.show = function () {
        this.element.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    ListOption.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    ListOption.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element.element);
        this.root.child_count++;
    };
    ListOption.prototype.destroy = function () {
        this.element.remove();
    };
    return ListOption;
}());
export { ListOption };
var ComboBox = /** @class */ (function () {
    function ComboBox(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("input");
        this.value = "";
        this.packed = false;
        this.type = "comboBox";
        this.list = [];
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        var isList = false;
        this.element.dataset.core_id = this.core_id.toString();
        this.datalist = document.createElement("datalist");
        this.datalist.id = this.core_id.toString();
        this.root = Main_root;
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "value" && key != "list" && key == "type") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "value") {
                this.value = value;
                this.element.value = this.value;
            }
            else if (key == "list") {
                try {
                    this.list = value;
                    this.element.setAttribute("list", this.datalist.id);
                    isList = true;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else if (key == "type") {
                try {
                    throw new Error("Cannot set type for combobox");
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                this.element.setAttribute(key, value);
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
        this.element.setAttribute("list", this.datalist.id);
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else {
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
    ComboBox.prototype.pack = function () {
        var _this = this;
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                var list = this.list;
                list.forEach(function (element) {
                    var el = document.createElement("option");
                    el.value = element;
                    _this.datalist.appendChild(el);
                });
                for (var i = 0; i < this.root.element.children.length; i++) {
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            this.root.element.insertBefore(this.datalist, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                    this.root.element.appendChild(this.datalist);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    ComboBox.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    ComboBox.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    ComboBox.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhidees the element
     */
    ComboBox.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    ComboBox.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    ComboBox.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    ComboBox.prototype.destroy = function () {
        this.element.remove();
    };
    return ComboBox;
}());
export { ComboBox };
var HTMLComponent = /** @class */ (function () {
    function HTMLComponent(values) {
        this.content = "";
        this.root = Main_root;
        this.core_id = core_id_main++;
        this.packed = false;
        this.type = "HTMLComponent";
        this.child_count = 0;
        this.element = document.createElement("div");
        this.onpack = null;
        var has_content = false;
        var isParentElement = false;
        var isRoot = false;
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key == "content") {
                has_content = true;
                this.content = value;
            }
            if (key == "parentElement" || key == "root") {
                isParentElement = true;
                this.root = value;
                isRoot = true;
            }
            if (key == "type") {
                this.element = document.createElement(value);
            }
            if (key != "content" && key != "parentElement" && key != "root" && key != "type") {
                this.element.setAttribute(key, value);
            }
        }
        // this.element.hidden;
        this.element.innerHTML = this.content;
        parentsStream[this.core_id] = this.element;
        // this.element = //console.log(new DOMParser().parseFromString((new DOMParser().parseFromString(this.content,'text/html').querySelector("body").innerHTML),'text/html'));
        if (isRoot == false) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.core_id = this.core_id.toString();
            this.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.core_id = this.core_id.toString();
            this.element.dataset.type = this.type;
        }
    }
    HTMLComponent.prototype.pack = function () {
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    HTMLComponent.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    HTMLComponent.prototype.parse = function () {
        return this.element;
    };
    /**
     * hides the element from thee screen but keeps it in the DOM tree
     */
    HTMLComponent.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the elemeent from the screen
     */
    HTMLComponent.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    HTMLComponent.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    HTMLComponent.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    HTMLComponent.prototype.empty = function () {
        this.element.innerHTML = "";
    };
    HTMLComponent.prototype.isEmpty = function () {
        return this.element.innerHTML.trim() == "";
    };
    HTMLComponent.prototype.destroy = function () {
        this.element.remove();
    };
    return HTMLComponent;
}());
export { HTMLComponent };
var DIVComponent = /** @class */ (function () {
    function DIVComponent(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("div");
        this.packed = false;
        this.value = "";
        this.type = "DIVComponent";
        this.child_count = 0;
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        this.element.id = this.core_id.toString();
        this.root = Main_root;
        this.element.dataset.core_id = this.core_id.toString();
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "content" && key != "text") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "content") {
                this.value = value;
                this.element.innerHTML = this.value;
            }
            else if (key == "text") {
                this.element.innerText = value;
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id);
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        // //console.log(this.root.dataset.child_count);
        this.child_count = 0;
        parentsStream[this.core_id] = this.element;
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }
    DIVComponent.prototype.pack = function () {
        /**
         * puts the element onto the document
         */
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    DIVComponent.prototype.bindEvent = function (event, callbackFunction) {
        try {
            this.element.addEventListener(event, callbackFunction);
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    DIVComponent.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    DIVComponent.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element
     */
    DIVComponent.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    DIVComponent.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    DIVComponent.prototype.setText = function (new_value) {
        this.value = new_value;
        this.element.innerText = new_value;
    };
    DIVComponent.prototype.setContent = function (new_value) {
        this.value = new_value;
        this.element.innerHTML = new_value;
    };
    DIVComponent.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    DIVComponent.prototype.empty = function () {
        this.element.innerHTML = "";
    };
    DIVComponent.prototype.isEmpty = function () {
        return this.element.innerHTML.trim() == "";
    };
    DIVComponent.prototype.destroy = function () {
        this.element.remove();
    };
    return DIVComponent;
}());
export { DIVComponent };
var DialogBox = /** @class */ (function () {
    function DialogBox(values) {
        var _this = this;
        this.core_id = core_id_main++;
        this.element = document.createElement("dialog");
        this.packed = false;
        this.value = "";
        this.type = "HTMLComponent";
        this.child_count = 0;
        this.innerElement = new DIVComponent({ root: this });
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        this.element.id = this.core_id.toString();
        this.element.dataset.core_id = this.core_id.toString();
        this.element.classList.add("---dialog---box---");
        this.element.open = true;
        this.root = Main_root;
        this.innerElement.pack();
        var button_comp = new HTMLComponent({ root: this, type: "span", method: "dialog" });
        button_comp.pack();
        var dia_btn = new Button({ root: button_comp, text: "OK", class: "---dialog---close---btn---" });
        dia_btn.pack();
        dia_btn.bindEvent("click", function () {
            _this.close();
        });
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "content" && key != "text") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "content" || key == "text") {
                this.value = value;
                if (typeof value == "string") {
                    this.innerElement.element.innerHTML = this.value;
                }
                else {
                    this.innerElement.element.appendChild(value.element);
                }
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id.toString());
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        // //console.log(this.root.dataset.child_count);
        this.child_count = 0;
        parentsStream[this.core_id] = this.element;
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }
    /**
     * puts the element onto the document
     */
    DialogBox.prototype.open = function () {
        try {
            if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
            }
            var notFound = true;
            //console.log(this.root.children);
            // document.ins
            for (var i = 0; i < this.root.element.children.length; i++) {
                if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                    //find the index with the dataset and insertbefore at the right place
                    if (this.root.element.children[i].dataset.core_id != this.core_id) {
                        this.root.element.insertBefore(this.element, this.root.element.children[i]);
                        notFound = false;
                        break;
                    }
                }
            }
            if (notFound) {
                this.root.element.appendChild(this.element);
            }
            this.onpack != null && this.onpack();
            this.packed = true;
            this.element.open = true;
        }
        catch (error) {
            console.error(error);
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    DialogBox.prototype.bindEvent = function (event, callbackFunction) {
        try {
            this.element.addEventListener(event, callbackFunction);
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    DialogBox.prototype.close = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
        this.element.open = false;
    };
    DialogBox.prototype.setText = function (new_value) {
        try {
            this.innerElement.element.innerText = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    DialogBox.prototype.setContent = function (new_value) {
        try {
            this.innerElement.element.innerHTML = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    DialogBox.prototype.switchParent = function (param) {
        this.close();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    DialogBox.prototype.destroy = function () {
        this.element.remove();
    };
    return DialogBox;
}());
export { DialogBox };
var Notebook = /** @class */ (function () {
    function Notebook(values) {
        var _this = this;
        this.core_id = core_id_main++;
        this.element = document.createElement("div");
        this.packed = false;
        this.root = Main_root;
        this.value = "";
        this.type = "Notebook";
        this.child_count = 0;
        this.state = null;
        this.accentColor = "#0a0a0a";
        this.children = [];
        this.pages = [];
        this.position = 0;
        this.onpack = null;
        try {
            var isTrue = false;
            var isRoot = false;
            this.element.id = this.core_id;
            this.element.dataset.core_id = this.core_id;
            this.element.classList.add("---webkit-notebook");
            for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (key == "root") {
                    //let val = `#${values["root"]}`;
                    //this.root = document.querySelector(values["root"]);
                    this.root = value;
                    isRoot = true;
                }
                else if (key == "accentColor") {
                    this.accentColor = value;
                }
                else {
                    throw new Error("Keyword \"".concat(key, "\" is not recognised"));
                }
            }
            if (!(this.element.hasAttribute("id"))) {
                this.element.setAttribute("id", this.core_id);
            }
            if (isTrue) {
                this.element.disabled = true;
            }
            // //console.log(this.root.dataset.child_count);
            this.child_count = 0;
            parentsStream[this.core_id] = this.element;
            if (!(isRoot)) {
                this.root = Main_root;
                this.root.element.dataset.child_count++;
                this.position = this.root.element.dataset.child_count;
                this.element.dataset.position = this.position.toString();
                this.element.dataset.type = this.type;
            }
            else {
                this.root.child_count++;
                this.position = this.root.child_count;
                this.element.dataset.position = this.position.toString();
                this.element.dataset.type = this.type;
            }
        }
        catch (error) {
            console.error(error);
        }
        try {
            console.log(this.pages);
            for (var _c = 0, _d = this.pages; _c < _d.length; _c++) {
                var page = _d[_c];
                page.style.width = "".concat(Math.floor(100 / this.pages.length), "%");
                page.style.borderBottom = "none";
                page.style.filter = "brightness(0.8)";
            }
            this.pages[0].style.borderBottom = "3px solid ".concat(this.accentColor);
            this.pages[0].style.filter = "none";
        }
        catch (error) {
            console.error(error);
        }
        this.element.onload = function () {
            console.log(_this.pages);
            try {
                for (var _i = 0, _a = _this.pages; _i < _a.length; _i++) {
                    var page = _a[_i];
                    page.style.width = "".concat(Math.floor(100 / _this.pages.length), "%");
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                _this.pages[0].style.borderBottom = "3px solid ".concat(_this.accentColor);
                _this.pages[0].style.filter = "none";
            }
            catch (error) {
                //error handling code...
                console.error(error);
            }
        };
        document.addEventListener("DOMContentLoaded", function () {
            try {
                for (var _i = 0, _a = _this.pages; _i < _a.length; _i++) {
                    var page = _a[_i];
                    page.style.width = "".concat(Math.floor(100 / _this.pages.length), "%");
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                _this.pages[0].style.borderBottom = "3px solid ".concat(_this.accentColor);
                _this.pages[0].style.filter = "none";
            }
            catch (error) {
                //error handling code...
                console.error(error);
            }
        });
    }
    /**
     * switches to the index provided on a zero based index
     */
    Notebook.prototype.switchTab = function (index) {
        if (index > this.pages.length - 1) {
            throw new SyntaxError("Index Out of bounds");
        }
        else {
            for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
                var page = _a[_i];
                page.style.width = "".concat(Math.floor(100 / this.pages.length), "%");
                page.style.borderBottom = "none";
                page.style.filter = "brightness(0.8)";
            }
            this.pages[index].style.borderBottom = "3px solid ".concat(this.accentColor);
            this.pages[index].style.filter = "none";
            for (var _b = 0, _c = this.children; _b < _c.length; _b++) {
                var child = _c[_b];
                child.forget();
            }
            this.children[index].pack();
        }
    };
    /**
     * puts the element onto the document
     */
    Notebook.prototype.pack = function () {
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
                for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
                    var page = _a[_i];
                    page.style.width = "".concat(Math.floor(100 / this.pages.length), "%");
                    page.style.borderBottom = "none";
                    page.style.filter = "brightness(0.8)";
                }
                this.pages[0].style.borderBottom = "3px solid ".concat(this.accentColor);
                this.pages[0].style.filter = "none";
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * add a new sub-element to the notebook widget, use ".---webkit-notebook-sub-element" to override styling
     */
    Notebook.prototype.add = function (element, text) {
        var _this = this;
        var pages = this.pages;
        var children = this.children;
        function changeInterface() {
            for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
                var page = pages_1[_i];
                page.style.borderBottom = "none";
                page.style.filter = "brightness(0.8)";
            }
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                child.forget();
            }
            element.pack();
        }
        if (typeof text == "string" || typeof text == "object") {
            if (typeof text == "string") {
                var elem_1 = document.createElement("div");
                elem_1.classList.add("---webkit-notebook-sub-element");
                elem_1.innerText = text;
                this.element.appendChild(elem_1);
                this.pages.push(elem_1);
                this.children.push(element);
                elem_1.addEventListener("click", function () {
                    changeInterface();
                    elem_1.style.borderBottom = "3px solid ".concat(_this.accentColor);
                    elem_1.style.filter = "none";
                });
            }
            else {
                try {
                    var elem_2 = text.element;
                    elem_2.classList.add("---webkit-notebook-sub-element");
                    this.element.appendChild(elem_2);
                    this.pages.push(elem_2);
                    this.children.push(element);
                    elem_2.addEventListener("click", function () {
                        changeInterface();
                        elem_2.style.borderBottom = "3px solid ".concat(_this.accentColor);
                        elem_2.style.filter = "none";
                    });
                }
                catch (error) {
                    throw new Error(error);
                }
            }
        }
    };
    Notebook.prototype.remove = function () {
        //code...
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    // addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLAnchorElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions)
    Notebook.prototype.bindEvent = function (event, callbackFunction) {
        this.element.addEventListener(event, callbackFunction);
    };
    /**
     * unpacks the this.element from the screen
     */
    Notebook.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps it in the DOM treee
     */
    Notebook.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element
     */
    Notebook.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packed, it forgets and otherwise
     */
    Notebook.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    Notebook.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    Notebook.prototype.destroy = function () {
        this.element.remove();
    };
    return Notebook;
}());
export { Notebook };
var Label = /** @class */ (function () {
    function Label(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("label");
        // this.element.id="fdf";
        this.root = Main_root;
        this.value = "";
        this.packed = false;
        this.type = "Label";
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        this.element.dataset.core_id = this.core_id.toString();
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "content" && key != "text" && key != "value") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "content" || key == "value") {
                this.value = value;
                this.element.innerHTML = this.value;
            }
            else if (key == "text") {
                this.element.innerText = value;
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id.toString());
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        //console.log("label: ",this.root.dataset.child_count);
        parentsStream[this.core_id] = this.element;
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
    }
    /**
     * puts the element onto the document
     */
    Label.prototype.pack = function () {
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                // console.log(this.element,notFound);
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    Label.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    Label.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeeps it in the DOM tree
     */
    Label.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element
     */
    Label.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    Label.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    Label.prototype.setText = function (new_value) {
        try {
            this.value = new_value;
            this.element.innerText = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    Label.prototype.setContent = function (new_value) {
        try {
            this.value = new_value;
            this.element.innerHTML = new_value;
        }
        catch (error) {
            console.error(error);
        }
    };
    Label.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    Label.prototype.destroy = function () {
        this.element.remove();
    };
    return Label;
}());
export { Label };
var ProgressBar = /** @class */ (function () {
    function ProgressBar(values) {
        var _this = this;
        this.core_id = core_id_main++;
        this.element = document.createElement("div");
        this.root = Main_root;
        this.packed = false;
        this.type = "progressBar";
        this.value = 0;
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        this.element.classList.add("---progress--bar--container---");
        this.progressBar = document.createElement("div");
        this.progressBar.classList.add("---progress---bar---");
        this.element.dataset.core_id = this.core_id;
        this.progressBar.style.width = "".concat(this.value, "%"); //updating the width of the progressbar
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root" && key != "value") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
            else if (key == "value") {
                this.progressBar.style.width = "".concat(value, "%");
            }
        }
        setInterval(function () {
            _this.progressBar.style.width = "".concat(_this.value, "%");
        }, 300);
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id);
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        // document.getElementById("fdu").children
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position.toString();
            this.element.dataset.type = this.type;
        }
        else {
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
    ProgressBar.prototype.pack = function () {
        // if((eval(this.position +1)) == this.root.childElementCount || this.root.childElementCount === 0){
        //     this.root.appendChild(this.element);
        // }
        // else{
        //     this.root.insertBefore(this.root.children[eval(this.position+1)],this.element);
        // }
        //console.log(this.root);
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    ProgressBar.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    ProgressBar.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the creen but keeps it in the DOM tre
     */
    ProgressBar.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element from the screen
     */
    ProgressBar.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    ProgressBar.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    ProgressBar.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    ProgressBar.prototype.destroy = function () {
        this.element.remove();
    };
    return ProgressBar;
}());
export { ProgressBar };
var Video = /** @class */ (function () {
    function Video(values) {
        this.core_id = core_id_main++;
        this.element = document.createElement("video");
        this.root = Main_root;
        this.value = "";
        this.packed = false;
        this.type = "Video";
        this.onpack = null;
        var isTrue = false;
        var isRoot = false;
        this.element.dataset.core_id = this.core_id;
        for (var _i = 0, _a = Object.entries(values); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (key != "root") {
                this.element.setAttribute(key, value);
            }
            else if (key == "root") {
                //let val = `#${values["root"]}`;
                //this.root = document.querySelector(values["root"]);
                this.root = value;
                isRoot = true;
            }
        }
        if (!(this.element.hasAttribute("id"))) {
            this.element.setAttribute("id", this.core_id);
        }
        if (isTrue) {
            this.element.disabled = true;
        }
        parentsStream[this.core_id] = this.element;
        if (!(this.element.hasAttribute("src"))) {
            console.error("Video src attribute not specified");
        }
        this.paused = this.element.paused;
        this.playbackRate = this.element.playbackRate;
        if (!(isRoot)) {
            this.root = Main_root;
            this.root.element.dataset.child_count++;
            this.position = this.root.element.dataset.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
        else {
            this.root.child_count++;
            this.position = this.root.child_count;
            this.element.dataset.position = this.position;
            this.element.dataset.type = this.type;
        }
    }
    Video.prototype.pack = function () {
        /**
         * puts the element onto the document
         */
        if (!this.packed) {
            try {
                if (this.root.type !== "HTMLComponent" && this.root.type !== "DIVComponent") {
                    throw new Error("Cannot set element type of ".concat(this.root.type, " as parent"));
                }
                var notFound = true;
                //console.log(this.root.children);
                // document.ins
                for (var i = 0; i < this.root.element.children.length; i++) {
                    //console.log("elemeent",this,"\n\n\nis: ",this.root.element.children[i].dataset.position > this.element.dataset.position)
                    if (parseInt(this.root.element.children[i].dataset.position) > parseInt(this.element.dataset.position)) {
                        //find the index with the dataset and insertbefore at the right place
                        if (this.root.element.children[i].dataset.core_id != this.core_id) {
                            this.root.element.insertBefore(this.element, this.root.element.children[i]);
                            notFound = false;
                            break;
                        }
                    }
                }
                if (notFound) {
                    this.root.element.appendChild(this.element);
                }
                this.onpack != null && this.onpack();
                this.packed = true;
            }
            catch (error) {
                console.error(error);
            }
        }
    };
    /**
     * Similar to addEventListener in vanilla javascript
     */
    Video.prototype.bindEvent = function (event, callbackFunction) {
        var out = false;
        try {
            this.element.addEventListener(event, callbackFunction);
            out = true;
        }
        catch (error) {
            console.error("TypeError: Cannot read properties of null (reading 'bindEvent')");
        }
    };
    /**
     * unpacks the this.element from the screen
     */
    Video.prototype.forget = function () {
        if (this.packed) {
            this.root.element.removeChild(this.element);
        }
        this.packed = false;
    };
    /**
     * hides the element from the screen but keeps it in the DOM tree
     */
    Video.prototype.hide = function () {
        this.element.hidden = true;
    };
    /**
     * unhides the element from the screen
     */
    Video.prototype.show = function () {
        this.element.hidden = false;
    };
    /**
     * toggles the elemeent on the screen.. if packeed, it forgets and otherwise
     */
    Video.prototype.toggle = function () {
        this.packed ? this.forget() : this.pack();
    };
    Video.prototype.switchParent = function (param) {
        this.forget();
        this.root.child_count--;
        this.root = param;
        this.root.element.appendChild(this.element);
        this.root.child_count++;
    };
    Video.prototype.requestFullScreen = function () {
        this.element.requestFullscreen();
    };
    Video.prototype.requestPictureInPicture = function () {
        this.element.requestPictureInPicture();
    };
    Video.prototype.requestPointerLock = function () {
        this.element.requestPointerLock();
    };
    Video.prototype.requestVideoFrameCallback = function (callback) {
        try {
            this.element.requestVideoFrameCallback();
        }
        catch (error) {
            console.error(error);
        }
    };
    Video.prototype.closeFullScreen = function () {
        document.exitFullscreen();
    };
    Video.prototype.exitPictureInPicture = function () {
        document.exitPictureInPicture();
    };
    Video.prototype.exitPointerLock = function () {
        document.exitPointerLock();
    };
    Video.prototype.play = function () {
        try {
            this.element.play();
        }
        catch (error) {
            console.error(error);
        }
    };
    Video.prototype.pause = function () {
        try {
            this.element.pause();
        }
        catch (error) {
            console.error(error);
        }
    };
    Video.prototype.destroy = function () {
        this.element.remove();
    };
    return Video;
}());
export { Video };
export function Notification(value) {
    var style = "\n    position: fixed;\n    bottom: 20px;\n    left: 50%;\n    margin: 0 auto;\n    transform: translate(-50%, -50%);\n    border-radius: 16px;\n    background: #000000aa;\n    font-size: 15px;\n    color: #fbfbfb;\n    z-index: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999;\n    min-width: 100px;\n    width: fit-content;\n    height: fit-content;\n    padding: 5px 6px;\n    max-width: 100%;\n    transition: all ease 0.2s;\n    transition-duration: 0.2s;\n    text-align: center;\n    margin-bottom: -10000%;\n    ";
    var notif = new DIVComponent({ text: value, style: style });
    notif.pack();
    notif.element.style.marginBottom = "0px";
    setTimeout(function () {
        notif.forget();
    }, 4000);
}
console.log(document.readyState);
document.addEventListener("readystatechange", function () {
    console.log(document.readyState);
});
