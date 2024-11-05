// import useState(), useEffect() hooks from React library
import {useState, useEffect} from "react";

// create React functional component Form
function Form(props){
    
    // create state to track form value s.t. initial value is an object (key-value)
    const [formData, setFormData] = useState({
        searchterm: "",
    });

    // handleChange -- updates formData when we type into form
    const handleChange = (event) => {
        // uses the event obj to detect key & value to update
        // spread operator to make a copy (shallow?)
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    const handleSubmit = (event) => {
        // Prevent page from refreshing on form submission
        event.preventDefault();
        // Pass the search term to moviesearch prop, which is App's getMovie function
        props.moviesearch(formData.searchterm);
    };

    return(
        /* employ use of React fragments to group dif tags (similar to <div> in HTML/XML) 
        as JSX only allows 1 parent in return statement */
        <>  
            {/* // Form component return some JSX
            // initial check */}
            {/* <h1>The Form Component</h1> */}

            {/* // create a form w/ a text input & submit button */}
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="searchterm"
                onChange={handleChange}
                value={formData.searchterm}
                />
                <input type="submit" value="submit" />
            </form>
        </>
        
    );
}

export default Form;    // option: destructure? {}