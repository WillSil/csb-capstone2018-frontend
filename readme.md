# Automate CSB (FRONT-END)

### Project Setup
- You are going to need NodeJS, NPM, Firebase CLI, Handlebars Mustache, and GIT
    - Install NodeJS <a href="https://nodejs.org/en/">here</a>
    - Install NPM via NodeJS above
    - Install the Firebase CLI <a href="https://firebase.google.com/docs/cli/">here</a>
    - Install Handlebars Mustache <a href="http://handlebarsjs.com/installation.html">here</a>
    - Install GIT <a href="https://git-scm.com/downloads">here</a>
- To get started, run <i>firebase login</i>
    - This will allow you to sign in with the Google account that has access to the <i>Automate CSB</i> project
- Verify the other items are installed by running "version" commands in terminal
    - IE <i>git --version</i> or <i>firebase --version</i>
    - Note, if they're not working, you may need to add the executables to your PATH

### Dependency Documentation
- MaterializeCSS is a styling framework we used to add aesthetics to the web application
    - To use MaterializeCSS, look <a href="http://materializecss.com/">here</a>
- Firebase Hosting is a static web hosting framework to rapidly deploy and test your application
    - To view the documentation on Firebase Hosting, look <a href="https://firebase.google.com/docs/hosting/">here</a>
- jQuery is a library that wraps around Javascript to make it more succinct, friendlier to use, and less error-prone
    - To view the documentation on jQuery, look <a href="http://api.jquery.com/">here</a>
- Handlebars Mustache is a template library used to create reusable HTML templates
    - To view documentation on Handlebars Mustache, look <a href="http://handlebarsjs.com/">here</a>
    - You may have noticed how there is a <i>deploy.sh</i> shell script in the root of the <i>public</i> folder
        - This script is responsible for compiling your *.hb.html files (in the <i>hb</i> folder) into a single 
        <i>js/handlebars.js</i> file.
        - This <i>js/handlebars.js</i> file is used to inject all of the html templates into the DOM
        - To learn how this part of the process works, read through the Handlebars Mustache tutorial and look at how
        templates are created in Javascript in the top of the <i>init.js</i> file.
- Moment JS is a date library used to easily parse dates in Javascript
    - To view the documentation on Moment JS, look <a href="https://momentjs.com/docs/">here</a>

### Testing
- Run the command <i>firebase serve</i>
    - This will allow you to go to <a href="localhost:5000">localhost:5000</a> to see the web app and test it

### Deploying to Firebase
- Run the command <i>firebase deploy</a>
    - This command deploys the web-app to firebase
    - To see it, go to <a href="https://automate-csb-165818.firebaseapp.com">https://automate-csb-165818.firebaseapp.com</a>