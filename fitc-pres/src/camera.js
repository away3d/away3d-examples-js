var CameraController = (function()
{
    var keysDown = {};

    var CameraController = function(camera)
    {
        this.camera = camera;
        this.dRotX = 0;
        this.dRotY = 0;

        var ctrl = this;

        document.onmousedown = function(e)
        {
            var xd = e.screenX,
                yd = e.screenY;

            document.onmousemove = function(e)
            {
                ctrl.dRotY = 0.001 * (e.screenX - xd);
                ctrl.dRotX = 0.001 * (e.screenY - yd);
            };

            document.onmouseup = function(e)
            {
                ctrl.dRotX = 0;
                ctrl.dRotY = 0;

                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    };

    CameraController.prototype.update = function()
    {
        var dx = 0, dz = 0;

        if (keysDown['87']) {
            dz += 2;
        }
        else if (keysDown['83']) {
            dz -= 2;
        }

        if (keysDown['65']) {
            dx -= 2;
        }
        else if (keysDown['68']) {
            dx += 2;
        }

        this.camera.rotationX += this.dRotX;
        this.camera.rotationY += this.dRotY;

        var mtx = away3d.Matrix3D.Translation(dx, 0, dz);

        var r = away3d.Matrix3D.Rotation(this.camera.rotationX, this.camera.rotationY, this.camera.rotationZ),
            t = away3d.Matrix3D.Translation(dx, 0, dz);

        t.mul(t, r);

        //this.camera.transform.mul(mtx, this.camera.transform);
        //this.camera.transform = this.camera.transform;
        this.camera.x += t.data[12];
        this.camera.y += t.data[13];
        this.camera.z += t.data[14];
    };


    window.onkeydown = function(e)
    {
        console.log('down', e.keyCode.toString());
        keysDown[e.keyCode.toString()] = true;
    };

    window.onkeyup = function(e)
    {
        console.log('up', e.keyCode.toString());
        keysDown[e.keyCode.toString()] = false;
    };


    return CameraController;
})();
