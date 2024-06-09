fetch("https://opentdb.com/api_category.php")
.then(response =>{
    if(!response.ok) {
        throw new Error('response was not okay'+response.statusText)
    }
    return response.json();
})

.then(data =>{
    console.log(data)
    const quizCategories = data.trivia_categories

    quizCategories.forEach(category => {
        const option = document.createElement('option')
        option.value = category.id
        option.textContent = category.name

        document.getElementById('categories').append(option)
        
    });


})

