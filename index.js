(function(global) {

  var canvas, gl, program,program2;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
    // Register Callbacks
    window.addEventListener('resize', resizer);

    // Get canvas element and check if WebGL enabled
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Initialize the shaders and program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex)
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);  
    var transLoc = gl.getUniformLocation(program, 'trans');
    var trans = [0, 0, 0];
    var X = 1.0;
    var Y = 1.0;
    var Z = 1.0;
    var melebar = 1.0;

  resizer();
  // draw!

  //kubus
    var cubePoints = [
      [-0.8, -0.8, 0.8],
      [-0.8, 0.8, 0.8],
      [0.8, 0.8, 0.8],
      [0.8, -0.8, 0.8],
      [-0.8, -0.8, -0.8],
      [-0.8, 0.8, -0.8],
      [0.8, 0.8, -0.8],
      [0.8, -0.8, -0.8]
    ];
    var cubeColors = [
      [],
      [1.0, 0.0, 0.0], // merah
      [0.0, 1.0, 0.0], // hijau
      [0.0, 0.0, 1.0], // biru
      [1.0, 1.0, 1.0], // putih
      [1.0, 0.5, 0.0], // oranye
      [1.0, 1.0, 0.0], // kuning
      []
    ];
    var cubeNormals = [
      [],
      [0.0, 0.0, 1.0], // depan
      [1.0, 0.0, 0.0], // kanan
      [0.0, -1.0, 0.0], // bawah
      [0.0, 0.0, -1.0], // belakang
      [-1.0, 0.0, 0.0], // kiri
      [0.0, 1.0, 0.0], // atas
      []
    ];
    function quad(a, b, c, d) {
      var indices = [a, b, c, a, c, d];
      for (var i = 0; i < indices.length; i++) {
        for (var j = 0; j < 3; j++) {
          Kubus.push(cubePoints[indices[i]][j]);
        }
        for (var j = 0; j < 3; j++) {
          Kubus.push(cubeColors[a][j]);
        }
        for (var j = 0; j < 3; j++) {
          Kubus.push(-1 * cubeNormals[a][j]);
        }
        switch (indices[i]) {
          case a:
            Kubus.push((a - 2));
            Kubus.push(0.0);
            break;
          case b:
            Kubus.push((a - 2));
            Kubus.push(1.0);
            break;
          case c:
            Kubus.push((a - 1));
            Kubus.push(1.0);
            break;
          case d:
            Kubus.push((a - 1));
            Kubus.push(0.0);
            break;

          default:
            break;
        }
      }
    }

    // quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
    quad(6, 5, 1, 2);

  // function DrawBFill() {
  //   var fill1 = [
  //     // x, y,        r, g, b
  //     0.25, 0.5, 0.1, 1.0, 0.6,
  //     0.25, -0.5, 0.7, 0.0, 1.0,
  //     0.3, -0.5, 0.7, 0.0, 1.0,
  //     0.3, 0.5, 0.1, 1.0, 0.6
  //   ];
  //   var fill2 = [
  //     // x, y,        r, g, b
  //     0.3, 0.5, 0.1, 1.0, 0.6,
  //     0.4, 0.5, 0.7, 0.0, 1.0,
  //     0.4, 0.4, 0.7, 0.0, 1.0,
  //     0.3, 0.4, 0.1, 1.0, 0.6,
  //   ];
  //   var fill3 = [
  //     // x, y,        r, g, b
  //     0.3, 0.2, 0.1, 1.0, 0.6,
  //     0.4, 0.2, 0.7, 0.0, 1.0,
  //     0.4, -0.0001, 0.7, 0.0, 1.0,
  //     0.3, -0.0001, 0.1, 1.0, 0.6
  //   ];
  //   var fill4 = [
  //     // x, y,        r, g, b
  //     0.3, -0.4, 0.1, 1.0, 0.6,
  //     0.4, -0.4, 0.7, 0.0, 1.0,
  //     0.4, -0.5, 0.7, 0.0, 1.0,
  //     0.3, -0.5, 0.1, 1.0, 0.6
  //   ];
  //   var cir6 = [],
  //     cir7 = [];
  //   for (var m = 0.0; m <= 180; m += 1) {
  //     var n = m * Math.PI / 180;

  //     var ling3 = [
  //       0.4 + Math.sin(n) * 0.25,
  //       -0.2 + Math.cos(n) * 0.3, 0.1, 1.0, 0.6
  //     ];
  //     var vert2 = [
  //       0.4 + Math.sin(n) * 0.2,
  //       -0.2 + Math.cos(n) * 0.2, 0.7, 0.0, 1.0,
  //       // 0,
  //     ];
  //     cir6 = cir6.concat(ling3);
  //     cir6 = cir6.concat(vert2);
  //   }
  //   for (var m = 0.0; m <= 181; m += 1) {
  //     var n = m * Math.PI / 180;
  //     var ling4 = [
  //       0.4 + Math.sin(n) * 0.15,
  //       0.3 + Math.cos(n) * 0.2, 0.0, 1.0, 0.6,
  //     ];
  //     var vert3 = [
  //       0.4 + Math.sin(n) * 0.10,
  //       0.3 + Math.cos(n) * 0.10, 0.7, 0.0, 1.0,
  //       // 0,
  //     ];
  //     cir7 = cir7.concat(ling4);
  //     cir7 = cir7.concat(vert3);
  //   }
  //   DrawBuffer(gl.TRIANGLE_FAN, fill1, 4, program2);
  //   DrawBuffer(gl.TRIANGLE_FAN, fill2, 4, program2);
  //   DrawBuffer(gl.TRIANGLE_FAN, fill3, 4, program2);
  //   DrawBuffer(gl.TRIANGLE_FAN, fill4, 4, program2);
  //   DrawBuffer(gl.TRIANGLE_STRIP, cir6, 361, program2);
  //   DrawBuffer(gl.TRIANGLE_STRIP, cir7, 361, program2);
  // }  
  
  function drawShapes(type,vertices,n) {
    
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
  
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
  gl.vertexAttribPointer(
    vPosition, //variabel pemegang posisi atribut di shader
    2,          // jumlah elemen per atribut
    gl.FLOAT,   // tipe data atribut
    gl.FALSE,   
    5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
    0
  );
  gl.vertexAttribPointer(
    vColor, 
    3, 
    gl.FLOAT, 
    gl.FALSE, 
    5 * Float32Array.BYTES_PER_ELEMENT, 
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(vPosition);
  gl.enableVertexAttribArray(vColor);

  var vPosition = gl.getAttribLocation(program, 'vPosition');
  var vColor = gl.getAttribLocation(program, 'vColor');
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  if (trans[0] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) X = -1.0;
  else if (trans[0] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) X = 1.0;
  trans[0] += 0.009 * X;

  if (trans[1] >= (0.7 - (0.3 * 0.7))) Y = -1.0;
  else if (trans[1] <= (-0.7 + (0.3 * 0.7))) Y = 1.0;
  trans[1] += 0.010 * Y;

  if (trans[2] >= (0.7 - Math.abs(0.2 * 0.7 * scaleM))) Z = -1.0;
  else if (trans[2] <= (-0.7 + Math.abs(0.2 * 0.7 * scaleM))) Z = 1.0;
  trans[2] += 0.011 * Z;
  gl.uniform3fv(transLoc, trans);
  gl.enableVertexAttribArray(vPosition);
  gl.enableVertexAttribArray(vColor);
  gl.drawArrays(type, 0, n);
  }
  function DrawBuffer(type, verArray, n, noprogram) {
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(noprogram, 'vPosition');
    vNormal = gl.getAttribLocation(program, 'vNormal');
    vTexCoord = gl.getAttribLocation(noprogram, 'vTexCoord');

    gl.vertexAttribPointer(
      vPosition,  // variabel yang memegang posisi attribute di shader
      3,          // jumlah elemen per atribut
      gl.FLOAT,   // tipe data atribut
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(
      vNormal,
      3,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      6 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.vertexAttribPointer(
      vTexCoord,
      2,
      gl.FLOAT,
      gl.FALSE,
      11 * Float32Array.BYTES_PER_ELEMENT,
      9 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vNormal);
    gl.enableVertexAttribArray(vTexCoord);
    // var vPosition = gl.getAttribLocation(noprogram, 'vPosition');
    // var vColor = gl.getAttribLocation(noprogram, 'vColor');
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verArray), gl.STATIC_DRAW);
    gl.drawArrays(type, 0, n);
  }

  var thetaLoc1 = gl.getUniformLocation(program2, 'theta1'); 
  var transLoc1 = gl.getUniformLocation(program2, 'trans1');
  var thetaA1 = [10, 20, 0];
  var trans1 = [0, 0, 0]; 
  var X1 = 0.0080;
  var Y1 = 0.0090;
  var Z1 = 0.0130;

// draw kubus
function drawShapes3(type,vertices,n) {
  var vertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

  var vPosition = gl.getAttribLocation(program3, 'vPosition');
  var vColor = gl.getAttribLocation(program3, 'vColor');

  gl.vertexAttribPointer(
    vPosition, //variabel pemegang posisi atribut di shader
    3,          // jumlah elemen per atribut
    gl.FLOAT,   // tipe data atribut
    gl.FALSE,   
    6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
    0
  );

  gl.vertexAttribPointer(
    vColor, 
    3, 
    gl.FLOAT, 
    gl.FALSE, 
    6 * Float32Array.BYTES_PER_ELEMENT, 
    3 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(vPosition);
  gl.enableVertexAttribArray(vColor);

  var vPosition = gl.getAttribLocation(program3, 'vPosition');
  var vColor = gl.getAttribLocation(program3, 'vColor');
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.drawArrays(type, 0, n);
}

var thetaLocCube = gl.getUniformLocation(program3, 'theta');


    function render()
    {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      // gl.useProgram(program3);
      // var thetaCube = [10, 10, 0];
      // gl.uniform3fv(thetaLocCube, thetaCube);
      drawCube(gl.TRIANGLES, Kubus, 30)

      requestAnimationFrame(render3);
    }
    render();


}
  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

})(window || this);