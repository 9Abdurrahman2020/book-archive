// get input value and search btn 
document.getElementById('search-btn').addEventListener('click',function(){
const inputField = document.getElementById('input-field');
const inputValue = inputField.value;
textToDynamicLink(inputValue);
inputField.value = '';
})
//function to make link dynamic based on what user search  and simple error handle
const textToDynamicLink = searchText =>{
    if(searchText.length === 0){
        document.getElementById('error').innerText = `Please write a book name.`;
    }else{
        // start spinner 
        document.getElementById('spinner').classList.remove('d-none');
        document.getElementById('error').innerText = '';
        document.getElementById('book-container').innerHTML = '';
        document.getElementById('result-found').innerHTML = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetchData(url);
    }
}
// function to fetch data 
const fetchData = async (url) =>{
    const res = await fetch(url);
    const data = await res.json();
    dataLoader(data);
}
// set data to website
const dataLoader = data =>{
    // stop spinner
    document.getElementById('spinner').classList.add('d-none');
    // no result error 
    if(data.numFound === 0){
       const error = document.getElementById('error');
       error.innerHTML = `No book found`
    }else{
            // show result quantity
    const result = document.getElementById('result-found');
    result.innerHTML =`
    <small>Total result found: ${data.numFound}</small>`;
    }
    // slicing array
    const array = data.docs.slice(0,20);
    array.forEach(obj =>{
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="col">
    <div class="card">
      <img src=" https://covers.openlibrary.org/b/id/${obj.cover_i? obj.cover_i: '10909258'}-M.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Book Name: ${obj.title}</h5>
        <p class=""><b>Author Name:</b> ${obj.author_name}</p>
        <p class=""><b>Publisher Name:</b> ${obj.publisher?.[0]}</p>
        <p class=""><b>First Publish:</b> ${obj.publish_date?.[0]}</p>
      </div>
    </div>
    </div>
    `;
    const container = document.getElementById('book-container');
    container.appendChild(div);
    })
}