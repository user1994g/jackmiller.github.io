import React from 'react';
import { Navigate } from 'react-router-dom';
import PhotographyGallery from '../components/PhotographyGallery';
import { photoCollections } from '../content/photoCollections';

const PhotoCollectionPage = ({ collectionKey }) => (
  photoCollections[collectionKey]
    ? <PhotographyGallery key={collectionKey} collectionKey={collectionKey} />
    : <Navigate to="/photos" replace />
);

export default PhotoCollectionPage;
