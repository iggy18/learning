const headers = ['company', 'Anual Reccuring Revenue', 'Montly Recurring Revenue', 'product number', 'expense', 'revenue'];
let data = [];
const table = document.getElementById('data-table');

// does what is says
function sumvalues(nums){
    let total = 0;
    for (let i = 0; i < nums.length; nums++) {
        total += nums[i]
    }
    return total;
}

// creates new element containing text
function newTextElement(type, content){
    let newElement = document.createElement(type);
    newElement.append(document.createTextNode(content));
    return newElement;
}

// called on fileupload change from event listener
function handleUpload(){
    const file = document.getElementById('file-upload').files[0];
    const reader = new FileReader();
    reader.onload = (event) =>{
        console.log(event.target.result);
        const csvContent = event.target.result;
        Papa.parse(csvContent, {
            header: true,
            complete: (result)=> {
                data = result.data
                display();
            }
        })
    }
    reader.readAsText(file);
}

// display headers
const newRow = document.createElement('tr');
headers.forEach((item)=> {
    const headerContent = newRow.append(newTextElement('th',item));
    table.append(newRow);
})

//display content rows
function display(){
    data.forEach((item) => {;
        const newRow = document.createElement('tr');
        headers.forEach((innerItem)=> {
            const headerContent = newRow.append(newTextElement('td',item[innerItem]));
            table.append(newRow);
        })
    });
}

// event listener added to fileupload calls handleupload on change
document.getElementById('file-upload').addEventListener('change', handleUpload);