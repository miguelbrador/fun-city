
// Import our custom CSS
import '../scss/styles.scss';





 //import jQuery from 'jquery';
 import * as THREE from 'three'

 //THREE
 import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
 import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
 import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'



 
 function fieldOfViewYFromFieldOfViewX(fieldOfViewX, aspect) {
  return THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(fieldOfViewX) * 0.5) / aspect));
}


// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter



 // Canvas
 const canvas = document.querySelector('canvas.webgl')
 
 // Scene
 const scene = new THREE.Scene()
 
 /**
  * Models
  */
 
 
var renderer = new THREE.WebGLRenderer( { alpha: true } );
 const sectionMeshes = [  ]
 const objectsDistance = 4
 const model1 = new GLTFLoader()



var mesh2
let mixer = null
 const model2 = new GLTFLoader()
 model2.setDRACOLoader(model2)
 
 model2.load(
     '/assets/export2/citytestAnim.gltf',
     (gltf) =>
     {
        mesh2=gltf.scene
        mixer = new THREE.AnimationMixer(mesh2)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()

        mesh2.position.set (0,0,0)
        mesh2.scale.set(1,1,1)
        
        renderer = new THREE.WebGLRenderer( { antialias: true ,alpha: true} )
        scene.background = new THREE.Color( 0x152238 );
         scene.add(mesh2)
     }
 )

 var mesh3
 const model3 = new GLTFLoader()
 model3.setDRACOLoader(mesh3)
 
 

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

/**
 * Lights
 */
 const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
 directionalLight.position.set(1, 1, 0)
 scene.add(directionalLight)

 
function main() {
  const canvas = document.querySelector('canvas.webgl');
  const renderer = new THREE.WebGLRenderer({canvas});
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(
    fieldOfViewYFromFieldOfViewX(fov, aspect), 
    aspect,
    near,
    far);
  camera.position.z = 2;

/**
 * Cursor
 */
 const cursor = {}
 cursor.x = 0
 cursor.y = 0


/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

 /**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)


  /**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

  const loopAnim = () =>
  {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Animate camera
      camera.position.y = - scrollY / sizes.height * objectsDistance
  
      const parallaxX = cursor.x * 0.5
      const parallaxY = - cursor.y * 0.5
      cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
      cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime
      
  
      // Animate meshes
      for(const mesh of sectionMeshes)
      {
          mesh.rotation.x += deltaTime * 0.1
          mesh.rotation.y += deltaTime * 0.12
      }

        
            // Update mixer
            if(mixer != null){
              mixer.update(deltaTime)
          }

  
    // Render
    renderer.render(scene, camera)

    // Call loopAnim again on the next frame
    window.requestAnimationFrame(loopAnim)
 
  }

  loopAnim()

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.fov = fieldOfViewYFromFieldOfViewX(fov, camera.aspect);
      camera.updateProjectionMatrix();
    }


if(mesh2){
  const speed = .1;
  const rot = time * speed;
  mesh2.rotation.y=-rot
  mesh2.position.y=-.3
}

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * Animate
 */
 const clock = new THREE.Clock()
 let previousTime = 0


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main()


