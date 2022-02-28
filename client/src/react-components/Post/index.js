import React from "react";
import toys from "../../toys.png"

class Post extends React.Component {

      ///  React 'state'.
    // Allows us to keep track of changing data in this component.
    state = {
        img_src: "",
        delivery_option: "",
        header: "",
        location: "",
        description: "",
        categories: {"clothing": 0, "Toys, Kids, Parents": 0, "Art": 0, "Furniture": 0, "Books": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
        newCategory: "",
        posts: [
            { img_src={toys}, 
            delivery_option: "Pickup",
            header: "Toys for Kids 5-6 Year Olds",
            location: "Toronto, ON",
            description: "I bought the toys 2 years ago for my son, almost as new. He has new toys now and we wish to give away to kids who may like it. " +
            "Please request only if you can pick it up in Toronto DT, thanks.",
            categories: {"clothing": 0, "Toys, Kids, Parents": 0, "Art": 0, "Furniture": 0, "Books": 0, "Shoes & Bags": 0, "Sports" :0, "Music": 0},
            newCategory: ""
            },
        ]
    };
    render() {
        return (
            <div>
                <AppBar/>
            </div>
        );
    }

}


export default Post;