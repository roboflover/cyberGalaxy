import * as THREE from './lib/three.module.js';
import {OrbitControls} from './lib/OrbitControls.js'
import { FontLoader } from './lib/FontLoader.js';
import { TextGeometry } from './lib/TextGeometry.js';
import {THREEx} from './lib/threex.domevents.js'
import { GLTFLoader } from './lib/GLTFLoader.js';
import * as BufferGeometryUtils from './lib/BufferGeometryUtils.js';
import Stats from './lib/stats.module.js';



interface ObjList {
  uid: string;
  obj: THREE.Mesh;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const objList: { [uid: string]: ObjList } = {};

function textInpit(): THREE.Mesh {
  return new THREE.Mesh(geometry, material);
}

function onFire(): void {
  const mesh = textInpit();

  mesh.position.x = -5;

  const uid = `UID: ${Math.random() * Math.random() + Math.random()}`;
  objList[uid] = {
    uid,
    obj: mesh
  };
  scene.add(mesh);
}

onFire();

camera.position.z = 5;

let t = 0;

function animate() {
  requestAnimationFrame(animate);

  if (t >= 50) {
    t = 0;
    onFire();
  }
  t++;

  for (const uid in objList) {
    const el = objList[uid];
    el.obj.position.x += 0.05;
    el.obj.rotation.x += 0.01;
    el.obj.rotation.y += 0.01;

    // Удаляем по UID
    if (el.obj.position.x >= 2) {
      scene.remove(el.obj);
      delete objList[uid];
    }
  }

  renderer.render(scene, camera);
}

animate();
