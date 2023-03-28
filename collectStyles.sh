rm -rf ./styles/components
rm ./styles/index.css
touch ./styles/index.css
INDEX_FILE="./styles/index.css"
find ./app/components -name '*.css' | while IFS= read -r FILE; do
    echo "@import url('.$FILE');" >> $INDEX_FILE
done
