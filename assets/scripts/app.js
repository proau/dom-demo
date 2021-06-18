/**
 * In JavaScript, select the add movie modal 
 * and assign it to a constant
 * 
 * Select the add movie button which is in the navigation 
 * and assign it to a constant
 * 
 * Add a click event listener to the add movie button. 
 * Create a function to handle the click ofthe button.
 * 
 * Whenever the add movie button is clicked, the modal should show. 
 * Hint: Go through the CSSrules to see how you can display the modal.
 * 
 * Create a function which will toggle the backdrop. 
 * The backdrop should add an overlay to yourpage. 
 * It should show whenever the modal shows.
 * 
 * Create two functions. 
 * The first should be called when the cancel button on the modal is clicked. 
 * The second should be called when the backdrop is clicked. 
 * Both functions should do
 * the same thing. They should close the modal and also hide the backdrop
 * 
 * Select the add movie button on the modal and assign it to a constant.
 * 
 * Create a function to handle when a movie is added.
 *This function should get the values of all the user inputs and assign it to constants.
 *
*/

const add_modal = document.getElementById('add-modal');
const btn_add_movie = document.getElementsByTagName('header')[0].lastElementChild;
const backdrop = document.getElementById('backdrop');

const modal_btn_cancel = add_modal.lastElementChild.firstElementChild;
const modal_btn_add = add_modal.lastElementChild.lastElementChild;
let isBD_show = false;

//------------------------------- Input Fields -----------------------------------//
    const modal_content = document.querySelector('.modal__content');
    let input_title = '';
    let input_image = '';
    let input_rating = '';
//------------------------------- End of input fields ---------------------------//

/**
 * Create a new function to clear the movie inputs after it has been added successfully.
 * This function should also be called when the cancel modal button is clicked
*/

clearInputs = () =>{
     modal_content.children["title"].value = '';
     modal_content.children["image-url"].value = '';
     modal_content.children["rating"].value = '';
}

// console.log(btn_add_movie)
btn_add_movie.addEventListener('click',()=>{
    add_modal.style.display = 'block'   
    toggleBackDrop();
})

toggleBackDrop=()=>{
    backdrop.style.display = 'block'    
    isBD_show = true;
    backdrop.style.pointerEvents = 'all'
}

unToggleBackDrop=()=>{
    backdrop.style.display = 'none' 
    backdrop.style.pointerEvents = 'all'   
    isBD_show = false;
    clearInputs();
}

unToggleModal=()=>{
    add_modal.style.display = 'none'   
}

modal_btn_cancel.addEventListener('click',()=>{
    unToggleBackDrop();
    unToggleModal();
})

backdrop.addEventListener('click',()=>{
    unToggleBackDrop();
    unToggleModal();  
})

/**
 *
    Create a function to handle when a movie is added.
    This function should get the values of all the user inputs and assign it to constants.
    Check if any of the values of the inputs are empty (trim the values) 
    or the rating is less than 1or greater than 5. 
    If the check fails, show an alert telling the user to enter valid values 
    and break out of the function.
*/

let checkData=(title,image_url,rating)=>{
    let dataObj={};
    if(title.trim().length == 0 || image_url.trim().length == 0){
        alert('Please out all input')
        return;
    }else{
        if(isNaN(Number(rating))){
            alert('Invalid number')
            return
        }else{
            alert('is number')
            if(!(Number(rating) < 1 || Number(rating) > 5)){               
                dataObj = {
                    'title': title,
                    'image': image_url,
                    'rating': rating
                }
            }else{
                alert('number is not valid')
                return
            }
            
        }
        
    }
    
    return dataObj;
}

modal_btn_add.addEventListener('click',()=>{
     input_title = modal_content.children["title"];
     input_image = modal_content.children["image-url"];
     input_rating = modal_content.children["rating"];
     colData = checkData(input_title.value,input_image.value,input_rating.value);
     
     let moviesData = [];    
     moviesData = localStorage.getItem('movies') === null ? [] :
         JSON.parse(localStorage.getItem('movies'));
    
         moviesData.push(colData);
    localStorage.setItem('movies',JSON.stringify(moviesData))
    clearInputs();
});

