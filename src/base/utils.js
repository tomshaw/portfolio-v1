// ==========================================================================
// Utils
// ==========================================================================

/*export function bindAll(...methods) {
    methods.forEach(m => this[m] = ::this[m]);
}*/

// setPrefixedValue(this.$el, "background", "linear-gradient(" + background.start + ", " + background.end + ")");
export function setPrefixedValue(elm, prop, value) {
    var prefixes = ['-moz-', '-webkit-', '-o-', '-ms-', '-khtml-'];
    var i, v, starting;

    elm.style[prop] = "";
    starting = elm.style[prop];

    try {
        elm.style[prop] = value;
        if (elm.style[prop] !== starting) {
            console.log("No prefix");
            return;
        }
    } catch (e) {}

    for (i = 0; i < prefixes.length; ++i) {
        v = prefixes[i] + value;
        try {
            elm.style[prop] = v;
            if (elm.style[prop] !== starting) {
                console.log("Prefix: " + prefixes[i]);
                return;
            }
        } catch (e2) {
        }
    }
}

export function vpsize() {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

export const getSlugFromPath = pathname => {
    let result = '/';
    if (typeof pathname === 'string') {
        const split = pathname.split('/');
        if (split[split.length - 1].length > 0) {
            result = split[split.length - 1];
        }
    }
    return result;
};

export function getDevice() {

    let device = window.getComputedStyle(document.body, '::after').getPropertyValue('content');

    device = device.replace(/('|")/g, '');

    return device;
}

/**
 * pad(1);  // 01
 * pad(9);  // 09
 * pad(10); // 10
 * @return {string}
 */
export function pad(d) {
    return (d < 10) ? `0${d.toString()}` : d.toString();
}

export function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getUniqueID(prefix) {
    return 'prefix_' + Math.floor(Math.random() * (new Date()).getTime());
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

export function getAbsoluteBoundingRect(el) {
    var doc  = document,
        win  = window,
        body = doc.body,

        // pageXOffset and pageYOffset work everywhere except IE <9.
        offsetX = win.pageXOffset !== undefined ? win.pageXOffset : (doc.documentElement || body.parentNode || body).scrollLeft,
        offsetY = win.pageYOffset !== undefined ? win.pageYOffset : (doc.documentElement || body.parentNode || body).scrollTop,

        rect = el.getBoundingClientRect();

    if (el !== body) {
        var parent = el.parentNode;

        // The element's rect will be affected by the scroll positions of
        // *all* of its scrollable parents, not just the window, so we have
        // to walk up the tree and collect every scroll offset. Good times.
        while (parent !== body) {
            offsetX += parent.scrollLeft;
            offsetY += parent.scrollTop;
            parent   = parent.parentNode;
        }
    }

    return {
        bottom: rect.bottom + offsetY,
        height: rect.height,
        left  : rect.left + offsetX,
        right : rect.right + offsetX,
        top   : rect.top + offsetY,
        width : rect.width
    };
}

//
// REDUX
//

export function createSides(array) {
    //const data = array.slice(0); // shallow clone.
    const data = JSON.parse(JSON.stringify(array)); // deep clone

    let half = Math.ceil(data.length / 2);
    let left = data.splice(half);
    let right = data.splice(0, half);

    array['left'] = left;
    array['right'] = right;

    return array;
}

export function loadEnabled(array) {
    return array.filter(item => {
        return item.enabled === true;
    });
}

export function reduceEnabled(array) {
    return array.reduce((enabled, data) => {
        if (data.enabled === true) {
            enabled.push(data);
        }
        return enabled;
    }, []);
}

export function LoadByPropKey(rows, property, key) {
    if (!rows.length) {
        return rows;
    }
    const ret = rows.filter(row => row[property] === key);
    if (ret) {
        return ret[0];
    }
    return null;
}

export function immutablePush(arr, newEntry) {
    return [...arr, newEntry]
}

export function immutablePop(arr) {
    return arr.slice(0, -1);
}

export function immutableShift(arr) {
    return arr.slice(1);
}

export function immutableUnshift(arr, newEntry) {
    return [newEntry, ...arr];
}

export function immutableReverse(arr) {
    return [...arr].reverse();
}

export function immutableSort(arr, compareFunction) {
    return [...arr].sort(compareFunction);
}

/**
 * Reverses an array.
 * @param {array} array 
 */
export function temporarySwap(array) {
    var left = null;
    var right = null;
    var length = array.length;
    for (left = 0, right = length - 1; left < right; left += 1, right -= 1)
    {
        var temporary = array[left];
        array[left] = array[right];
        array[right] = temporary;
    }
    return array;
}
