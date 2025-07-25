import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

//directional light is like a sun light
// It has a direction but no position, it illuminates all objects in the scene equally
// It is useful for simulating sunlight or other distant light sources
// The color and intensity can be adjusted to achieve the desired effect
// The position of the light does not matter, only the direction

const directionalLight = new THREE.DirectionalLight(0xffdd09, 0.5)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0x00ffff, 0xff00cc, 0.5)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0x2244dd, 0.5)
pointLight.position.set(1,-0.5, 1)
scene.add(pointLight)

// RectArealLight only works with MeshStandardMaterial and MeshPhysicalMaterial
// It is useful for simulating light sources like windows or fluorescent lights
// It has a width and height, and can be positioned in the scene
// The color and intensity can be adjusted to achieve the desired effect 
const rectAreaLight = new THREE.RectAreaLight(0x23aa3b, 0.5, 3, 3)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3(0, 0, 0)) // Look at the origin
scene.add(rectAreaLight)


const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)


//helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)


// needs RectAreaLightHelper to be imported from three/examples/jsm/helpers/RectAreaLightHelper.js
// RectAreaLightHelper is used to visualize the position and size of the RectAreaLight
// It is useful for debugging and adjusting the position and size of the RectAreaLight
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

// Debug
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('Ambient Light Intensity')
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('Directional Light Intensity')
gui.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01).name('Hemisphere Light Intensity')
gui.add(pointLight, 'intensity').min(0).max(1).step(0.01).name('Point Light Intensity')
gui.add(rectAreaLight, 'intensity').min(0).max(1).step(0.01).name('Rect Area Light Intensity')
gui.add(spotLight, 'intensity').min(0).max(1).step(0.01).name('Spot Light Intensity')

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()