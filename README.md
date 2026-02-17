<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Dropdown Read Text</title>
</head>
<body>

  <h2>Select an option:</h2>

  <select id="myDropdown">
    <option value="apple">🍎 Apple</option>
    <option value="banana">🍌 Banana</option>
    <option value="cherry">🍒 Cherry</option>
  </select>

  <p>Selected text will show below:</p>
  <div id="displayText"></div>

  <script>
    // Get references to the dropdown and display area
    const dropdown = document.getElementById("myDropdown");
    const display = document.getElementById("displayText");

    // Function to update display
    function updateText() {
      // Grab selected option text
      const selectedText = dropdown.options[dropdown.selectedIndex].text;
      // Show it somewhere
      display.textContent = "You selected: " + selectedText;
    }

    // Add an event listener to run the function when selection changes
    dropdown.addEventListener("change", updateText);

    // Optionally call it once if you want initial value shown
    updateText();
  </script>

</body>
</html>
