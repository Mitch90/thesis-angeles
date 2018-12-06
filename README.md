# Thesis website for angeles
Test website for angeles' thesis.

The various case studies pages are automatically generated from a *.json* file located in the `/_data` folder. One easy solution to create this *.json* file is to have an Excel file with all the desired fields and then convert it to *.json* with something like [csv2json](https://www.csvjson.com/csv2json)

The final website is complied in the `/docs` folder. To update it:

* Compile the website, running from the Terminal: `jekyll build -d docs`
* Commit the changes on Github
