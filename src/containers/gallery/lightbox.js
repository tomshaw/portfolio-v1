import React, { Component } from 'react';
import ImageLightbox from 'react-image-lightbox';

export default class Lightbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false
        };
    }

    onButtonClick(event) {
      event.preventDefault();
      this.setState({ isOpen: true })
    }

    render() {

        const {items} = this.props;

        const {
          photoIndex,
          isOpen,
        } = this.state;

        let images = [];
        let titles = [];
        let captions = [];
        for (let i = 0; i < items.length; i++) {
          let image = items[i].media_sets[0].breakpoints[0].source;
          let title = items[i].title;
          let description = items[i].description;
          images.push(image);
          titles.push(title);
          captions.push(description);
        }

        return (
          <div>
            
            <div className="box-button"> <a href="/" onClick={(e) => this.onButtonClick(e)}>Open Lightbox</a> </div>

            {isOpen &&
              <ImageLightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() => this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                })}
                onMoveNextRequest={() => this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                })}
                imageTitle={titles[photoIndex]}
                imageCaption={captions[photoIndex]}
              />
            }
          
          </div>

        );
    }
}
