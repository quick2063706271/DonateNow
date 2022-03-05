import React from "react";


class PostImage extends React.Component {

    render() {
        const {imageSrc} = this.props
        return (
            <div classname="postImageDiv" >
                <img src={imageSrc} classname="postImage" alt="postImage"/>
            </div>
        );
    }

}

export default PostImage;
