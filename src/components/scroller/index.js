// ==========================================================================
// Scroller
// ==========================================================================
import prefix from 'prefix'
import raf from 'raf';

class Scroller {

    constructor(settings) {

        this.onScrollCallback = (settings.onScroll) ? settings.onScroll : false;

        this.activeClass = (settings.el !== undefined) ? settings.activeClass : 'is-active';
        this.ease = (settings.ease !== undefined) ? settings.ease : 0.1;  // 0.1 is the slowest/smoothest], 0.9 

        window.onbeforeunload = () => {
            //window.scrollTo(0, 0);
        }
        
        this.transform = prefix('transform');

        this.initialized = false;

        this.winHeight = this.getWinHeight();
        this.winWidth = this.getWinWidth();

        this.items = [];

        this._currScrollTop = 0;
        this._scroller = 0;
        this._scrollTop = 0;

        window.addEventListener("resize", this.onResize.bind(this));
        document.addEventListener("scroll", this.onScroll.bind(this));
    }

    addItem(item) {
        if (typeof item.target.length !== 'number' || item.target.length !== 0) {
            item.isActive = false;
            item.isNode = item.target.jquery ? true : false;
            item.element = item.element || item.target;
            item.offset = item.offset || 50;
            item.axis = item.axis || 'y'; 
            item.ratio = item.ratio || .07;
            item.scale = item.scale || 1;
            item.isParallax = item.isParallax || false;
            this.items.push(item);
        }
    }

    addItems(items) {
        for (let i = 0; i < items.length; i++) {
            this.addItem(items[i]);
        }
    }

    ready() {
        this.onResize();
        this.onEnterFrame();
    }

    onResize(event) {
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            this.resizeItem(item);
        }
        this.winHeight = this.getWinHeight();
        this.winWidth = this.getWinWidth();
    }

    resizeItem(item) {
        if (item.isNode) {
            item.height = item.element.height();
            item.offsetY = item.element.offset().top;
            item.fullOffsetY = item.height + item.offsetY;
        } else {
            item.height = item.target.offsetHeight; // this._height = this.$el.offsetHeight;
            item.offsetY = item.target.getBoundingClientRect().top; // getAbsoluteBoundingRect
            item.fullOffsetY = item.height + item.offsetY;
        }
    }

    getWinHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }

    getWinWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    getScrollTop() {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    onScroll(event) {
        if (this.initialized === false) {
            this.onResize();
            this.onEnterFrame();
            this.initialized = true;
        }
        this._scrollTop = this.getScrollTop();
    }

    dispose() {
        // todo
    }

    onEnterFrame() {

        this._scroller += (this._scrollTop - this._scroller) * this.ease;

        for (let i = 0, totalItems = this.items.length; i < totalItems; i++) {
            let item = this.items[i];

            if (item.isParallax) {
                let diff = item.fullOffsetY - this._scroller - this.winHeight;
                this._currScrollTop += .1 * (diff - this._currScrollTop);
                if (this._scroller + this.winHeight >= item.offsetY && this._scroller <= item.fullOffsetY) {
                    if (!item.isActive) {
                        item.isActive = true;
                        if (item.onEnter) {
                            item.onEnter(item);
                        }
                        if (item.isNode) {
                            item.target.addClass(this.activeClass);
                        } else {
                            item.target.classList.add(this.activeClass);
                        }
                    }
                    if (item.isNode) {
                        if (item.axis === 'y') {
                            item.element[0].style[this.transform] = "translateY(" + -this._currScrollTop * item.ratio + "px) scale(" + item.scale + ") translateZ(0)";
                        } else {
                            item.element[0].style[this.transform] = "translateX(" + this._currScrollTop * item.ratio + "px) scale(" + item.scale + ") translateZ(0)";
                        }
                    } else {
                        if (item.axis === 'y') {
                            item.target.style[this.transform] = "translateY(" + -this._currScrollTop * item.ratio + "px) scale(" + item.scale + ") translateZ(0)";
                        } else {
                            item.target.style[this.transform] = "translateX(" + this._currScrollTop * item.ratio + "px) scale(" + item.scale + ") translateZ(0)";
                        }
                    }
                }
            } else {
                if (this._scroller + this.winHeight >= item.offsetY + item.offset && this._scroller <= item.fullOffsetY + item.height) {
                    if (item.onView) {
                        item.onView(item);
                    }
                    if (!item.isActive) {
                        item.isActive = true;
                        if (item.onEnter) {
                            item.onEnter(item);
                        }
                        if (item.isNode) {
                            item.target.addClass(this.activeClass);
                        } else {
                            item.target.classList.add(this.activeClass);
                        }
                    }
                }
            }

        }

        if (this.onScrollCallback) {
            this.onScrollCallback();
        }

        raf(this.onEnterFrame.bind(this));
    }

}

export default Scroller;
