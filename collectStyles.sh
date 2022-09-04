rm -rf ./styles/components
mkdir ./styles/components
touch ./styles/components/index.css
INDEX_FILE="./styles/components/index.css"
# find ./app/components -name '*.css' -exec cp -prv '{}' './styles/components/' ';'
find ./app/components -name '*.css' | while IFS= read -r FILE; do
    BASE_NAME=$(basename ${FILE})
    # echo "Copying $FILE......$BASE_NAME"
    cp "$FILE" ./styles/components/
    echo "@import './$BASE_NAME';" >> $INDEX_FILE
done
