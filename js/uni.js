var speed = 5; //speed of particle movement
var noofparticles = 15000; //number of particles
var sizeofparticles = 10; //size of particle
var speedcam = 10; //speed of camera movement..set to ZERO for NO CAMERA MOVEMENT
var flagcam = 0;
var lastz = 3000;
lastz = lastz - lastz % speedcam;

var camera, scene, renderer, particles, geometry, material, i, h, color, size;
var mouseX = 0,
  mouseY = 0;
var flagy, flagx, flagz;
var ox1;
var oy1;
var oz1;
var exx = 0;
var eyy = 0;
var click1 = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  ox1 = new Array();
  oy1 = new Array();
  flagx = new Array();
  flagy = new Array();
  flagz = new Array();
  oz1 = new Array();
  // 这种投影模式旨在模仿人眼所见。这是用于渲染3D场景的最常见的投影模式。
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 2, noofparticles);
  camera.position.z = 0;
  // 场景允许您设置由three.js渲染的内容和位置。这是你放置物体，灯光和照相机的地方。
  scene = new THREE.Scene();
  // 这个类包含定义指数雾的参数，也就是说，随着距离的增长指数级密度增加。
  scene.fog = new THREE.FogExp2(0x0070bb, 0.1);
  scene.background = new THREE.Color(0x0070bb);
  // 所有几何的基类（但不适用于BufferGeometries）。这也可以直接用于构建自定义几何图形。
  geometry = new THREE.Geometry();
  // sprite = THREE.ImageUtils.loadTexture( " " );
  // 加载纹理的类。这在内部使用ImageLoader来加载文件。
  var spriteMap = new THREE.TextureLoader();
  var spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
    color: 0xFF3333
  });
  sprite = new THREE.Sprite(spriteMaterial);
  for (i = 0; i < noofparticles; i++) {
    var vertex = new THREE.Vector3();
    ox1[i] = parseInt(4000 * Math.random()) - 2000;
    ox1[i] = ox1[i] - (ox1[i] % speed);
    vertex.x = ox1[i];
    flagx[i] = 0;

    oy1[i] = parseInt(2000 * Math.random()) - 1000;
    oy1[i] = oy1[i] - (oy1[i] % speed);
    vertex.y = oy1[i];
    flagy[i] = 0;

    oz1[i] = parseInt(-noofparticles / 2 * Math.random()) + noofparticles / 4;
    oz1[i] = oz1[i] - (oz1[i] % speed);
    vertex.z = oz1[i];
    flagz[i] = 0;
    geometry.vertices.push(vertex);
    geometry.colors.push(new THREE.Color(Math.random() * 0x0070bb));
  }
  material = new THREE.ParticleBasicMaterial({
    size: sizeofparticles,
    vertexColors: true,
    color: 0xCCFF66
  });
  particles = new THREE.ParticleSystem(geometry, material);
  scene.add(particles);

  renderer = new THREE.WebGLRenderer();
//   renderer.setClearColor(new THREE.Color(0x616161, 1.0));

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('particle').appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {

  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var time = Date.now() * 0.0005;
  if (speedcam != 0) {
    if (flagcam == 0) camera.position.z += speedcam;
    else if (flagcam == 1) camera.position.z -= speedcam;
  }
  if (camera.position.z == lastz || camera.position.z == -lastz) {
    if (flagcam == 0) flagcam = 1;
    else flagcam = 0;
  }
  //  $('div').text(flagcam +" "+camera.position.z);
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  h = (360 * (1.0 + time) % 360) / 360;
  material.color.setHSL(h, 0.5, 0.5);

  renderer.render(scene, camera);
}