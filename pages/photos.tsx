import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import FsLightbox from 'fslightbox-react';
import { photos } from "../public/photos";
import { CalendarIcon, GeoIcon } from "../_assets/icons"

const PhotoGallery = () => {
    const [toggler, setToggler] = useState(false);
    const [productIndex, setProductIndex] = useState(0);

    const openLightbox = useCallback((event, { photo, index }) => {
        setProductIndex(index);
        setToggler(!toggler);
    }, []);

    const containerStyle = {
        width: '900px',
        margin: 'auto',
    }

    const post: PostAttributes = {
        date: "8/14/2020",
        geoLocation: "Dublin, Ireland",
        tags: [
            "Dublin",
            "Ireland",
        ]
    }

    return (
        <>
            <div style={containerStyle}>
                <h1>Example photo gallery title</h1>
                <p>Things to say about what these photos are. Maybe where we took them or something.</p>
            </div>
            <PostAttributes date={post.date} geoLocation={post.geoLocation} tags={post.tags} />
            <div style={containerStyle}>
                <Gallery photos={photos} onClick={openLightbox} />
                <FsLightbox
                    toggler={toggler}
                    sources={photos.map(photo => photo.src)}
                />
            </div>
        </>
    );
}

type PostAttributes = {
    date?: string,
    geoLocation?: string,
    tags?: string[],
};

const PostAttributes = (attrs: PostAttributes) => {
    const containerStyle = {
        width: '900px',
        margin: 'auto',
    };

    return (
        <div style={containerStyle}>
            <div>
                <CalendarIcon />
                <span>8/14/2020</span>
            </div>
            <div>
                <GeoIcon />
                Dublin, Ireland
            </div>
            <span>
                #Ireland, #Dublin, #Photography
            </span>
        </div>
    );
};

export default PhotoGallery;