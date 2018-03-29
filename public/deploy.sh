# Compile Handlebars tempaltes files in handlebars folders

# Your templates go in here, without the .hb!
TEMPLATES=(header footer progress-dialog)

rm ./js/templates.js

for s in ${TEMPLATES[@]}
do
    handlebars hb/$s.hb.html >> ./js/templates.js
done