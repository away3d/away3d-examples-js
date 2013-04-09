SlideShow = (function()
{
    var SlideShow = function()
    {
        this.material = new away3d.DefaultMaterial();
        this.texMethod = new away3d.TextureMethod(null);
        this.mesh = new away3d.Mesh(initGeom(), this.material);

        this.curSlideIdx = -1;
        this.slides = [];

        var i;
        for (i=1; i<=111; i++) {
            var slide, href, url;
            
            url = 'slides/Away3DInTheOpen.'+zeroPad(i)+'.png';

            switch (i) {
                case 19:
                    href = '/demos/preview01/test.html';
                    break;
                case 20:
                    href = '/demos/preview02/test.html';
                    break;
                case 21:
                    href = '/demos/preview03/test.html';
                    break;
                case 22:
                    href = '/demos/preview04/test.html';
                    break;
                case 23:
                    href = '/demos/preview05/test.html';
                    break;
                case 24:
                    href = '/demos/preview06/test2.html';
                    break;
                case 106:
                    href = '/demos/preview08/test2.html';
                    break;
                default:
                    href = null;
                    break;
            }

            slide = new Slide(url, href);
            if (i==1) {
                var ss = this;
                slide.onload = function() {
                    console.log('STARTING SLIDE');
                    ss.material.addMethod(ss.texMethod);
                    ss.next();
                };
            }

            this.slides.push(slide);
        }
    };

    SlideShow.prototype.next = function(d)
    {
        this.curSlideIdx += (d || 1);
        if (this.curSlideIdx >= this.slides.length)
            this.curSlideIdx = this.slides.length-1;

        this.texMethod.$.texture = this.slides[this.curSlideIdx].texture;
        console.log('setting texture to', this.texMethod.$.texture);
    };

    SlideShow.prototype.prev = function(d)
    {
        this.curSlideIdx -= (d || 1);
        if (this.curSlideIdx < 0)
            this.curSlideIdx = 0;

        this.texMethod.$.texture = this.slides[this.curSlideIdx].texture;
    };



    var initGeom = function()
    {
        var geom, s = 0.85;

        geom = new away3d.Geometry();
        geom.$.vertexData = [
            s * -4, s * 3, 0.0,
            s * 4, s * 3, 0.0,
            s * 4, s * -3, 0.0,
            s * -4, s * -3, 0.0
        ];
        geom.$.uvData = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ];
        geom.$.indexData = [
            0, 2, 1,
            0, 3, 2
        ];

        return geom;
    };

    var Slide = function(url, href)
    {
        var slide = this;

        var img = new Image();
        img.onload = function() {
            img.width = 512;
            img.height = 512;
            slide.texture = new away3d.ImageTexture(img);

            if (slide.onload)
                slide.onload.call(slide);
        };
        img.src = url;

        this.href = href;
    };


    var zeroPad = function(n)
    {
        if (n<10) {
            return '00'+n;
        }
        else if (n<100) {
            return '0'+n;
        }
        else return n.toString();
    };

    return SlideShow;
})();
