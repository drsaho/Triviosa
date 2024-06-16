function fetchQuizCategories() {
  const categorySelect = document.getElementById("categories");  // Replace with your dropdown element ID

  // Display loading indicator (optional)
  categorySelect.innerHTML = '<option>Loading...</option>';  // Set loading text


fetch("https://opentdb.com/api_category.php")
  .then((response) => {
    if (!response.ok) {
      return Promise.reject(
        new Error(`Response was not okay: ${response.statusText}`)
      );
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    const quizCategories = data.trivia_categories;

    quizCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;

      document.getElementById("categories").append(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
    // Handle error gracefully, e.g., display an error message to the user
  });

  fetchQuizCategories(); 
}
