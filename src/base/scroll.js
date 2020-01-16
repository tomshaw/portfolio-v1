// ==========================================================================
// DisableScroll
// ==========================================================================

class Scroll {

    constructor() {
        this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
    }

    preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;  
    }

    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            this.preventDefault(e);
            return false;
        }
    }

    disable() {
        if (window.addEventListener)  { // older FF
            window.addEventListener('DOMMouseScroll', this.preventDefault.bind(this), false);
        }
        window.onwheel = this.preventDefault.bind(this); // modern standard
        window.onmousewheel = document.onmousewheel = this.preventDefault.bind(this); // older browsers, IE
        window.ontouchmove  = this.preventDefault.bind(this); // mobile
        document.onkeydown  = this.preventDefaultForScrollKeys.bind(this);
    }

    enable() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', this.preventDefault.bind(this), false);
        }
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }

}

export default new Scroll();
