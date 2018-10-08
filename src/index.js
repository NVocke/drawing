"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var Controller = /** @class */ (function () {
    function Controller() {
        this.clickObservable = null;
        console.log('was created');
        this.init();
        this.incrementWhenClicked();
    }
    Controller.prototype.init = function () {
        this.container = document.getElementById('container');
        this.counterElement = document.getElementById('counter');
        this.clickObservable = rxjs_1.fromEvent(this.container, 'click');
    };
    Controller.prototype.incrementWhenClicked = function () {
        var _this = this;
        this.clickObservable.subscribe(function (event) {
            console.log(event);
            _this.counterElement.value = "" + (+_this.counterElement.value + 1);
        });
    };
    return Controller;
}());
var controller = new Controller();
