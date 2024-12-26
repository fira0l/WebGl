import * as THREE from 'three'



// Create a Scene
const scene = new THREE.Scene()

// Create Geometry
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

// Add the mesh or shape created to the scene
scene.add(mesh)

const sizes = {
    width:800,
    height: 600
}

// Add Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
camera.position.z = 3
scene.add(camera)

// renderer
const canvas = document.querySelector('.webgl')
// console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


