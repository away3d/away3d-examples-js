WaterMethod = (function()
{
    var WaterMethod = function(texture)
    {
        this.texture = texture;
        this.numSamplersNeeded = 1;
        this.needsTime = true;
    };


    WaterMethod.prototype.activate = function(gl, program)
    {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.getTexture(gl));
        gl.uniform1i(gl.getUniformLocation(program, 'uTexture0'), 0);
    };


    WaterMethod.prototype.getFragmentCode = function(util)
    {
        return [
            'vec2 uv0 = vWorldPos.xz * 0.01 - (0.05 * time);',
            'vec2 uv1 = mod(vWorldPos.xz * 0.012 + (0.1 * time), 1.0);',
            'vec4 n0 = texture2D('+util.getSampler(0)+', uv0);',
            'vec4 n1 = texture2D('+util.getSampler(0)+', uv1);',
            'vec3 n = normalize(0.5 * n0 + 0.5 * n1).xzy;',
            'vec3 refDir = -2.0 * dot(lights[0].xyz, n) * n + lights[0].xyz;',
            'float d = dot(n, lights[0].xyz);',
            'float s = pow(max(0.0, dot(refDir, viewDir)), 100.0);',
            'vec3 color = vec3(0.7, 0.8, 1.0);',
            //'outColor = vec4(s, s, s, 1.0);',
            'outColor = vec4(0.3 * color + 0.7 * d * color + 0.4 * d, 1.0);'
        ];
    };

    return WaterMethod;
})();
