# Overview

Echoes of Elarion is an interactive web application designed to support a custom Dungeons & Dragons campaign. The application allows players to explore the fictional world of Elarion through an interactive world map and a searchable encyclopedia known as the Archives of Elarion.

The purpose of this project was to strengthen my understanding of JavaScript by developing interactive features that communicate with an existing Django web application. I wanted to explore how JavaScript can manipulate HTML elements, respond to user input, organize complex information, and improve the overall user experience without requiring the server to reload the page for every interaction.

The Archives of Elarion uses JavaScript to dynamically generate a hierarchy of lore categories and entries. Players can expand and collapse categories, search for specific information, and navigate through multiple levels of historical and geographical knowledge. The search system uses recursive functions to examine nested categories and identify matching entries. JavaScript array methods such as `filter()`, `forEach()`, and `some()` are used to process the information and construct the interface.

I also incorporated the Leaflet JavaScript library to create an interactive map of Elarion. The map displays a custom world image with clickable markers representing important locations. These markers provide information about each location and connect players to related entries in the Archives.

Through this project, I gained experience with JavaScript objects, arrays, recursion, event listeners, DOM manipulation, JSON data, and external libraries. I also learned how JavaScript can work alongside Python and Django to create a more dynamic web application.

# How to Run

To run Echoes of Elarion on a local computer, you will need Python installed.

1. **Clone the Repository**

Clone or download this repository and open a terminal in the project folder.

2. **Create a Virtual Environment**

Create a new Python virtual environment:

    python -m venv .venv

3. **Activate the Virtual Environment**

On Windows PowerShell:

    .\.venv\Scripts\Activate.ps1
4. **Install the Required Packages**

Install the project's required Python packages using requirements.txt:

    pip install -r requirements.txt
5. **Start the Django Development Server**

Run the Django development server:

    python manage.py runserver
6. Open the Application

Open the following address in a web browser:

http://127.0.0.1:8000/

The application begins on the Welcome page, where the user enters their adventurer name before beginning their journey.

# Software Demo
[Software Demo Video](https://youtu.be/sjKoiJwPjaQ)

# Development Environment

I developed this project using Visual Studio Code as my primary code editor, with Git and GitHub for version control and repository management. I used a local Django development server to run and test the application in a web browser, along with the browser's developer tools to troubleshoot JavaScript errors and inspect dynamically generated HTML elements.

The primary programming language explored in this project was JavaScript, using modern ECMAScript syntax (ES6). JavaScript was responsible for handling user interactions, searching nested data structures, creating HTML elements, and managing the interactive map.

The project also uses the following technologies:

- **Python and Django:** Provide the existing web application structure, URL routing, templates, session management, and lore data.
- **HTML and CSS:** Define the website's structure and appearance, including the dynamically generated Archives interface.
- **JavaScript (ES6):** Implements recursive functions, array methods, event listeners, DOM manipulation, and dynamic content rendering.
- **Leaflet:** An external JavaScript mapping library used to display the custom world map, manage markers, and provide interactive navigation.
- **JSON:** Transfers structured lore information from Django templates into JavaScript.
- **Git and GitHub:** Track development changes and maintain the project repository.

# Useful Websites

- [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN Web Docs — Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs — Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN Web Docs — Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Django Documentation](https://docs.djangoproject.com/en/5.2/)
- [GitHub Docs](https://docs.github.com/en)

# Future Work

- **SQL Database Integration:** Replace the hardcoded lore entries, category hierarchy, and map location information with a relational database to simplify adding and managing new content.
- **Dynamic Content Management:** Develop an interface for creating, editing, and deleting lore entries without modifying Python or JavaScript source files.
- **Improved Map Integration:** Automatically generate map markers and related lore links using information retrieved from the database.
- **Expanded Campaign Encyclopedia:** Add additional locations, historical events, organizations, and characters to create a more complete reference for players.
- **Persistent User Preferences:** Remember which Archives categories players have expanded, even after refreshing the page or returning to the website.
- **Additional Interactive Features:** Explore more ways to connect the world map, player progression, and campaign information through JavaScript.