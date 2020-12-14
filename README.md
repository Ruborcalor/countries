- [Features](#sec-1)
- [Usage](#sec-2)
- [Screenshots](#sec-3)

# Features<a id="sec-1"></a>

This is a web project that displays simple country data retrieved from the public REST Countries API <https://restcountries.eu>.

-   Displays all the countries with a grid of cards. Each card allows a user to visualize the flag image, the name, the population, and the region.
-   A text field for filtering countries by name.
-   A form group of checkboxes for filtering countries by region.
-   The ability to click on a country's card in order to display the full information about that country.
-   Lazy loading. This means that rather than displaying all 250 countries at once, it only displays a few at first. Then when the user scrolls down it loads more into the display.
-   Theme switching (dark and light).
-   Responsive web design (mobile and desktop).
-   An indication of the number of matching countries.
-   A basic custom favicon.

# Usage<a id="sec-2"></a>

This project was built with Create React App and Material-UI.

Use the following commands for running the app locally:

-   **`yard install`:** Run this command first to install the node packages.
-   **`yarn start`:** Runs the app in development mode.
-   **`yarn build`:** Builds the app for production to the `build` folder.

Alternatively, find it at <https://ruborcalor.github.io/countries>

# Screenshots<a id="sec-3"></a>

![img](./screenshots/home.png)

![img](./screenshots/example_query.png)

![img](./screenshots/home_dark.png)

![img](./screenshots/country_view.png)

![img](./screenshots/home_mobile.png)

![img](./screenshots/country_view_mobile.png)
