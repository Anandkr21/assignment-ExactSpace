// Initialize an empty container for holding JSON data
let bag = "";

// Getting the form element and attach a submit event listener
const Form = document.getElementById("Form");
Form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Retrieve the input data from the form
    const inputData = document.getElementById("inputData").value;

    try {
        // Parseing the input data as JSON
        const parseData = JSON.parse(inputData);

        // POST the parsed JSON data and receive a response
        const res = await fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parseData)
        });
        const response = await res.json();

        // Storeing the response in the 'bag' variable
        bag = response;

        // Call the 'render' function to display the response
        render(bag);
    } catch (error) {
        // Show an alert for invalid JSON input
        alert("Invalid! Please write valid JSON data.");
    }
});


// Rendering the input data in the 'formContainer'
function render(data) {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = "block";
    formContainer.innerHTML = "";

    // Creating a form element and populating it with input data
    const form = document.createElement("form");
    for (let key in data) {
        const label = document.createElement("label");
        label.innerText = key;
        label.setAttribute("class", "output-label"); // Add CSS class for styling

        const input = document.createElement("input");
        input.type = "text";
        input.name = key;
        input.value = data[key];
        input.setAttribute("class", "output-input"); // Add CSS class for styling

        const lineBreak = document.createElement("br");

        form.append(label, input, lineBreak);
    }
    formContainer.append(form);
}
