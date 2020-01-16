// ==========================================================================
// Picture
// <img className="lazyload responsive" data-sizes="auto" data-src={src} data-srcset={set} alt={title} />
// ==========================================================================
import React, { Component } from 'react';
import PropTypes from "prop-types";

class Picture extends Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        title: '',
        srcset: []
    }

    static propTypes = {
        title: PropTypes.string,
        srcset: PropTypes.array.isRequired
    }

    createSource(set) {
        return set[set.length-1].source;
    }

    createSourceSet(set) {
        const setString = set.source + ' ' + set.width; 
        return (
            <source media={set.media}  srcSet={setString} />
        );
    }

    render() {
        const {title, srcset} = this.props;
        const src = this.createSource(srcset);
        return (
            <picture>
              { srcset.map(this.createSourceSet, this) } 
              <img className="js-media" src={src} alt={title} />
            </picture>
        );
    }
}

export default Picture;
