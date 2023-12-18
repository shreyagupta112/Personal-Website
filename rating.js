class FeedbackWidget extends HTMLElement {
    constructor() {
        super();

        

        // Create a shadow root to encapsulate styles and elements.
        this.attachShadow({ mode: 'open' });

        // Create elements inside the shadow root.
        this.h2 = document.createElement('h2');
        this.h2.textContent = 'Feedback';
        this.shadowRoot.appendChild(this.h2);

        this.form = document.createElement('form');
        this.form.action = 'https://httpbin.org/post';
        this.form.method = 'POST';
        this.shadowRoot.appendChild(this.form);

        // Add hidden inputs
        this.createHiddenInput('question', 'How satisfied are you?');
        this.createHiddenInput('sentBy', 'Web Component');

        // Create rating div with stars
        this.ratingDiv = document.createElement('div');
        this.ratingDiv.className = 'rating';
        this.form.appendChild(this.ratingDiv);

        for (let i = 5; i >= 1; i--) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `star${i}`;
            input.name = 'rating';
            input.value = i;
            this.ratingDiv.appendChild(input);

            const label = document.createElement('label');
            label.htmlFor = `star${i}`;
            label.className = 'star';
            this.ratingDiv.appendChild(label);
        }


        // Create submit button
        

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles.css');
        this.shadowRoot.appendChild(linkElem);

        // Attach event listeners
        this.ratingButtons = this.shadowRoot.querySelectorAll('.star');
        this.ratingOutputs = this.shadowRoot.querySelectorAll('output');
        this.radioButtons2 = this.shadowRoot.querySelectorAll('input[name="rating"]');

    
        this.prev_ind = 0;

        this.ratingButtons.forEach((button, index) => {
            button.addEventListener('mouseover', () => this.handleRatingHover(index));
            button.addEventListener('click', () => this.handleRatingClick(index));
        });
    }

    connectedCallback(){
        // Access the rating-widget element inside the connectedCallback
        var ratingWidget = document.querySelector('feedback-widget');

        // Check if the rating-widget element is present
        if (ratingWidget) {
            // Iterate through child elements and hide them
            for (var i = 0; i < ratingWidget.children.length; i++) {
                ratingWidget.children[i].style.display = 'none';
            }
        }
    }

    createHiddenInput(name, value) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        this.form.appendChild(input);
    }

    handleRatingHover(index) {
        // Hide all outputs\

        const existingOutputs = this.form.querySelectorAll('output');
        existingOutputs.forEach(output => output.remove());

        index = 5 - index
        const output = document.createElement('output');
        output.class = "star"
        output.htmlFor = `star${index}`;
        if (index === 1){
            output.textContent = `Thanks for your feedback of ${index} star. We'll try to do better`;
        }
        else if (index < 4) {
            output.textContent = `Thanks for your feedback of ${index} stars. We'll try to do better`;
        } else {
            output.textContent = `Thanks for your feedback of ${index} star.`;
        }
    
        this.form.appendChild(output);
        
    }
    
    handleRatingClick(index) {
        const xhr = new XMLHttpRequest();
        const url = "https://httpbin.org/post";
    
        // Prepare form data
        const formData = new FormData(this.form);
        formData.set('sentBy', 'Web Component');
        formData.set('rating', index + 1);
    
        xhr.open("POST", url, true);
    
        // Set headers
        xhr.setRequestHeader('X-Sent-By', 'Web Component');
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(JSON.parse(xhr.responseText));
    
                // Reset the form
                this.form.reset();
    
                // Log a message or perform other actions after successful submission
                console.log(`Feedback submitted successfully!`);
            }
        };
    
        // Send the request
        xhr.send(formData);
        this.form.submit()
    }
}

// Define the custom element
customElements.define('feedback-widget', FeedbackWidget);
