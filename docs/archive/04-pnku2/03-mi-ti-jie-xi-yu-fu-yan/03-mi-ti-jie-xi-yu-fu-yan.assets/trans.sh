[[ ! -d ./webp ]] && mkdir ./webp
for f (*.(bmp|jpg|jpeg|png)) {
  ffmpeg -i $f -c:v libwebp -lossless 1 -quality 100 -compression_level 6 ./webp/${f%.*}.webp
}