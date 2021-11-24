/* eslint-disable react/prop-types */
import React from 'react';
import Col from 'react-bootstrap/Col';
import ImageGallery from 'react-image-gallery';

const MyGallery = ({ styleInfo }) => {

  var styleImages = [];
  if (styleInfo.photos) {
    styleInfo.photos.forEach(photo => {
      var photoObj = {}
      photoObj['original'] = photo.url
      photoObj['thumbnail'] = photo.thumbnail_url
      photoObj['originalHeight'] = "700px"
      photoObj['originalClass'] = 'ov-gallery-original'
      photoObj['thumbnailClass'] = 'ov-gallery-thumbnail'
      styleImages.push(photoObj)
    })
  }
  // const defaultImages = [
  //   {
  //     original: 'https://picsum.photos/id/1018/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1018/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1015/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1015/250/150/',
  //   },
  //   {
  //     original: 'https://picsum.photos/id/1019/1000/600/',
  //     thumbnail: 'https://picsum.photos/id/1019/250/150/',
  //   },
  // ];

  const images = (styleImages || defaultImages);

  return (
    <Col className='col1' xs={8} data-testid="image-gallery-col">
      <div >
        <ImageGallery items={images} thumbnailPosition="left" className="image-gallery-slide" showBullets={true} useBrowserFullscreen={false} />
      </div>
    </Col>
  );
};

export default MyGallery;