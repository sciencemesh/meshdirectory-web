find .next/ -name '*.js' -exec sed -i -e 's/requestAnimationFrame(onFrame),f.ZP.update()/(function doOnFrame(){requestAnimationFrame(doOnFrame),f.ZP.update()})()/g' {} +;
echo "patched .next"
