let submit = document.getElementById("rating-submit");
let ratingForm = document.querySelector('rating-widget form');
let ratingButtons = document.querySelectorAll('.star');
let ratingOutputs = document.querySelectorAll('#delete-later output');
let radioButtons2 = document.querySelectorAll('input[name="rating"]');



submit.hidden = true;
let prev_ind = 0;

ratingButtons.forEach((button, index) => {
    button.addEventListener('mouseover', function() {
      ratingOutputs[prev_ind].classList.remove('hovered');
      let ind = 5 - index - 1
      ratingOutputs[ind].classList.add('hovered');
      prev_ind = ind;
      
    });
  });



  ratingButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const xhr = new XMLHttpRequest();
        const url = "https://httpbin.org/post";

        // Prepare form data
        const formData = new FormData(ratingForm);
        formData.set('sentBy', 'JS');  // Use set() to ensure the value is replaced or set explicitly
        formData.set('rating', index); 

        xhr.open("POST", url, true);

        // Set headers
        xhr.setRequestHeader('X-Sent-By', 'JS');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));

                // Loop through each radio button and set checked to false
                radioButtons2.forEach(function(radioButton) {
                    radioButton.checked = false;
                });
                ratingForm.submit();
            }
        };

        // Send the request
        xhr.send(formData);
       
       
    });
});
