SRC=src/camera.js src/water.js src/slides.js
AWAY3D=away3d
OUT=out

all: away3d
	cat $(SRC) > $(OUT)/demo.js
	@echo Done!

away3d:
	make -B -C $(AWAY3D)
	mkdir -p $(OUT)/away3d
	cp -R $(AWAY3D)/build/*.js $(OUT)/away3d/



