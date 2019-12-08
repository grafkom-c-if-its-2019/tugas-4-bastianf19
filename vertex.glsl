precision mediump float;
attribute vec2 vPosition;
attribute vec3 vColor;
attribute vec3 vNormal;
attribute vec2 vTexCoord;
varying vec3 fColor;
uniform vec3 trans;
varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTexCoord;
uniform float scaleM;
uniform int flag;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main() {

  mat4 MatrixTranslation = mat4(
    0.8, 0.0, 0.0, 0.0,
    0.0, 0.8, 0.0, 0.0,
    0.0, 0.0, 0.8, 0.0,
    trans.x, trans.y, trans.z, 1.0
  );

  mat4 MatrixScalation = mat4(
    scaleM, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  if(flag == 0){
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
    // Transfer koordinat tekstur ke fragment shader
    fTexCoord = vTexCoord;

    // Transfer vektor normal (yang telah ditransformasi) ke fragment shader
    fNormal = normalize(normalMatrix * vNormal);

    // Transfer posisi verteks
    fPosition = vPosition;
  }
  else if(flag == 1){
    gl_Position = MatrixTranslation * MatrixScalation * projectionMatrix * viewMatrix * modelMatrix * vec4(vPosition, 1.0);
    fColor = vColor;
  }
}